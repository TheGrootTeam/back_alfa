import { Request, Response, NextFunction } from 'express';
import Company from '../models/Company';
import Applicant from '../models/Applicant';
import createError from 'http-errors';
import TokenLostPassword from '../models/TokenLostPassword';
import jwt, { VerifyErrors } from 'jsonwebtoken';
import { isPasswordStrong } from '../lib/validators';
import { JwtPayload } from '../interfaces/IauthJWT';
import { getHost, hashPassword } from '../lib/utils';
import { sendEmail } from '../services/emailService';

export default class LostPasswordController {
  async email(req: Request, res: Response, next: NextFunction) {
    try {
      const email = req.params.email;
      let jwtToken = '';

      const user = (await Company.findOne({ email })) || (await Applicant.findOne({ email }));

      if (user) {
        const token = await TokenLostPassword.findOne({ userId: user._id.toString() });
        // create new jwtToken
        jwtToken = await jwt.sign({ userId: user._id.toString() }, process.env.JWT_SECRET as string, {
          expiresIn: '1h'
        });

        if (token) {
          // modifie token for document if exist
          await TokenLostPassword.findByIdAndUpdate(token._id, { token: jwtToken });
        } else {
          // save token in bbdd
          const newtoken = new TokenLostPassword({ token: jwtToken, userId: user._id.toString() });
          await newtoken.save();
        }
        const url = `${getHost(req.hostname)}/lost-password/${jwtToken}`;
        console.log(url);
        const subject = 'Recuperación de contraseña';
        const message = `
          <h1>Instrucciones para restablecer tu contraseña</h1>
          <p>Estimado/a ${user.name},</p>
          <p>Hemos recibido una solicitud para restablecer la contraseña de tu cuenta en InternIT. Para continuar con el proceso, por favor, haz clic en el siguiente enlace:</p>
          <a href="${url}">Restablecer mi contraseña</a>
          <p>Este enlace te llevará a una página donde podrás establecer una nueva contraseña para tu cuenta. Ten en cuenta que el enlace es válido por una hora, después del cual tendrás que solicitar un nuevo enlace si aún necesitas restablecer tu contraseña.</p>
          <p>Si no solicitaste un restablecimiento de contraseña, por favor ignora este correo electrónico.</p>
          <p>Gracias por usar InternIT.</p>
          <p>Atentamente,</p>
          <p>El equipo de soporte de <a href="https://internit.tech/">InternIT</a></p>
        `;

        const emailResponse = await sendEmail(email, subject, message, '');

        res.status(200).json({ result: emailResponse });
      } else {
        next(createError(404, 'No user with this email'));
        return;
      }
    } catch (error) {
      next(error);
    }
  }

  async renewPassword(req: Request, res: Response, next: NextFunction) {
    const { newPassword, token } = req.body;
    try {
      // verify all data received
      if (!newPassword || !token) {
        next(createError(400, 'Missing required fields'));
        return;
      }
      // verify format password
      if (!isPasswordStrong(newPassword)) {
        next(createError(400, 'Invalid password format'));
        return;
      }
      // verify expired jwt

      let userIdToken: undefined | string;
      jwt.verify(token, process.env.JWT_SECRET as string, (err: VerifyErrors | null, payload: unknown) => {
        if (err) {
          throw new Error(err.message);
        }
        userIdToken = (payload as JwtPayload).userId;
      });

      // verify token-userId exist in bbdd
      const tokenBbdd = await TokenLostPassword.findOne({ token, userId: userIdToken });
      if (token !== tokenBbdd?.token && userIdToken !== tokenBbdd?.userId.toString()) {
        next(createError(401, 'Invalid token'));
        return;
      }
      // verify userId exist
      const user = (await Company.findById(userIdToken)) || (await Applicant.findById(userIdToken));

      if (!user) {
        next(createError(404, 'User not found'));
        return;
      }

      // hash passwords
      const hashedNewPassword = await hashPassword(newPassword);

      if ('lastName' in user) {
        await Applicant.findByIdAndUpdate(userIdToken, { password: hashedNewPassword });
      } else {
        await Company.findByIdAndUpdate(userIdToken, { password: hashedNewPassword });
      }

      // delete token in bbdd
      if (tokenBbdd) {
        await tokenBbdd.deleteOne();
      }

      res.status(200).json({ success: `Password for user ${userIdToken} changed successfully` });
    } catch (error) {
      next(error);
    }
  }
}
