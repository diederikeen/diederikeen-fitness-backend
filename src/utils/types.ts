import { Result } from 'neverthrow';
export type PromiseResult<T, E = Error> = Promise<Result<T, E>>;
