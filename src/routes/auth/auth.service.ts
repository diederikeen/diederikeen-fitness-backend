import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { err, ok } from 'neverthrow';
import * as bcrypt from 'bcrypt';

import { IUser, IUserCreateResponse, IUserPayload } from './types';
import { PromiseResult } from '../../utils/types';
import { UserModel } from '../../models/user/UserModel';

interface JwtPayload {
  _id: string;
}

const saltRounds = 10;

@Injectable()
export class AuthService {
  async getUser(token: string): PromiseResult<IUser> {
    if (!token) {
      return err(
        new HttpException('No auth token provided', HttpStatus.FORBIDDEN),
      );
    }

    const decodedToken = jwt.verify(
      token,
      process.env.TOKEN_SECRET,
    ) as JwtPayload;

    if (!decodedToken) {
      return err(new Error('Invalid token'));
    }

    const user: IUser = await UserModel.findOne({ _id: decodedToken._id });

    try {
      return ok(user);
    } catch (error) {
      return err(new Error(error));
    }
  }
  async createUser(body: IUserPayload): PromiseResult<IUserCreateResponse> {
    const userExists = await UserModel.findOne({ email: body.email });

    if (Boolean(userExists)) {
      throw new HttpException(
        'Error: User already exists',
        HttpStatus.I_AM_A_TEAPOT,
      );
    }

    const hashedPassword = await bcrypt.hash(body.password, saltRounds);

    const userToBeSaved = new UserModel({
      name: body.name,
      email: body.email,
      password: hashedPassword,
    });

    try {
      const user = await userToBeSaved.save();
      const authToken = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);

      return ok({
        name: body.name,
        email: body.email,
        authToken,
      });
    } catch (error) {
      return err(new Error(error));
    }
  }
}
