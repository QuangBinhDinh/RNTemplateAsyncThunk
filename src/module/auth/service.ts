import { createGetThunk, createPostThunk } from '@store/asyncThunk';
import { LoginParams } from './type';
import { User } from '@type/common';

const userLogin = createPostThunk<LoginParams, unknown, User>('auth/login', 'api/login');

export { userLogin };
