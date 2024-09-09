import { CustomRequest } from './IauthJWT';

export interface IChangePasswordBody extends CustomRequest {
  body: {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
    isCompany: boolean | string;
  };
}
