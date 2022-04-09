import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import Auth from '../models/Auth';
import { secretKey, aEmail } from '../settings';
import { isEmail, isPassword } from '../validation';
import { emailConfirmation } from '../templates';
import { sAdminTransport } from '../helper';

const authModel = new Auth();
export const login = async (req, res) => {
  const { email, password, isRememberMe } = req.body;

  try {
    if (!isEmail(email)) {
      return res.status(404).json({ message: 'Enter valid credential' });
    }

    const user = await authModel.isUserExist('email', email);

    if (user.rowCount === 0) {
      return res.status(404).json({ message: 'Please try again' });
    }

    const checkPass = await bcrypt.compare(password, user.rows[0].password);
    if (!checkPass) {
      return res
        .status(404)
        .json({ message: "Email / password doesn't match." });
    }

    if (!user.rows[0].isactive) {
      return res.status(404).json({ message: 'Account is not Active' });
    }

    const token = jwt.sign({ user: user.rows[0].id }, secretKey, {
      expiresIn: isRememberMe ? '100 days' : '1 days',
    });

    const resp = {
      accessToken: token,
      user: {
        id: user.rows[0].id,
        email: user.rows[0].email,
        firstName: user.rows[0].firstname,
        lastName: user.rows[0].lastname,
        role: user.rows[0].roleid,
        isEmailVerified: user.rows[0].isemailverified,
        isActive: user.rows[0].isactive,
        profilePicture: user.rows[0].profilepicture,
      },
    };
    return res.status(200).json(resp);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.stack,
    });
  }
};

export const register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    if (!isEmail(email) || !isPassword(password)) {
      return res.status(404).json({ message: 'Enter valid credential' });
    }

    const checkIfUserExist = await authModel.isUserExist('email', email);
    if (checkIfUserExist.rowCount !== 0) {
      return res.status(404).json({
        message: 'The email address already exists!',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const sConfig = await authModel.getSystemConfig();
    const profileImage = sConfig.rows[0].profilepicture;

    const value = {
      firstName,
      lastName,
      email,
      password: hashedPassword,
      profileImage,
    };
    const user = await authModel.register(value);

    const token = jwt.sign({ user: user.rows[0].id }, secretKey, {
      expiresIn: '1 days',
    });

    const resp = {
      accessToken: token,
      user: {
        id: user.rows[0].id,
        email: user.rows[0].email,
        firstName: user.rows[0].firstname,
        lastName: user.rows[0].lastname,
        role: user.rows[0].roleid,
        isEmailVerified: user.rows[0].isemailverified,
        isActive: user.rows[0].isactive,
        profilePicture: user.rows[0].profilepicture,
      },
    };
    return res.status(200).json(resp);
  } catch (error) {
    return res.status(500).json({
      message: error.stack,
    });
  }
};

export const sendEmail = async (req, res) => {
  const { email } = req.body;
  try {
    const checkIfUserExist = await authModel.isUserExist('email', email);

    if (checkIfUserExist.rowCount !== 0) {
      const name = `${checkIfUserExist.rows[0].firstname} ${checkIfUserExist.rows[0].lastname}`;
      const id = checkIfUserExist.rows[0].id;
      const contacts = {
        from: aEmail,
        to: email,
      };
      const mail = Object.assign(
        {},
        emailConfirmation.confirm(name, id),
        contacts
      );
      const info = await sAdminTransport.sendMail(mail);
      if (info.messageId) {
        return res.status(200).json({ message: 'Mail send successfully' });
      }
      return res.status(500).json({ message: 'Something went wrong' });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.stack,
    });
  }
};

export const verifyEmail = async (req, res) => {
  const { id } = req.params;

  try {
    const checkIfUserExist = await authModel.isUserExist('id', id);

    if (checkIfUserExist.rowCount === 0) {
      res.status(404).json({ message: 'Verification link is wrong' });
    } else if (
      checkIfUserExist.rowCount !== 0 &&
      !checkIfUserExist.rows[0].isemailverified
    ) {
      const user = await authModel.verify(true, id);

      const token = jwt.sign({ user: user.rows[0].id }, secretKey, {
        expiresIn: '1 days',
      });

      const resp = {
        accessToken: token,
        user: {
          id: user.rows[0].id,
          email: user.rows[0].email,
          firstName: user.rows[0].firstname,
          lastName: user.rows[0].lastname,
          role: user.rows[0].roleid,
          isEmailVerified: user.rows[0].isemailverified,
          isActive: user.rows[0].isactive,
          profilePicture: user.rows[0].profilepicture,
        },
      };
      return res.status(200).json(resp);
    } else {
      res.status(404).json({ message: 'Email already Confirmed' });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.stack,
    });
  }
};
