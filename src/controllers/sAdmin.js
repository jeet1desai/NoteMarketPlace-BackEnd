import bcrypt from 'bcrypt';

import Admin from '../models/Admin';
import { testEnvironmentVariable, aEmail } from '../settings';
import { checkSystemConfigForm, isEmail } from '../validation';
import { sAdminTransport } from '../helper';
import { TAddAdminEmail } from '../templates';

const adminModel = new Admin();
export const getSystemConfig = async (req, res) => {
  const { id } = req;

  try {
    const user = await adminModel.getUserInfo('id', id);
    if (user.rows[0].roleid !== 3) {
      return res.status(404).json({ message: 'Not a valid user' });
    }
    const sConfig = await adminModel.getSystemConfig();

    const resp = {
      email: sConfig.rowCount === 0 ? null : sConfig.rows[0].email,
      phonenumber: sConfig.rowCount === 0 ? null : sConfig.rows[0].phonenumber,
      facebookurl: sConfig.rowCount === 0 ? null : sConfig.rows[0].facebookurl,
      twitterurl: sConfig.rowCount === 0 ? null : sConfig.rows[0].twitterurl,
      linkedinurl: sConfig.rowCount === 0 ? null : sConfig.rows[0].linkedinurl,
      notepicture: sConfig.rowCount === 0 ? null : sConfig.rows[0].notepicture,
      profilepicture:
        sConfig.rowCount === 0 ? null : sConfig.rows[0].profilepicture,
    };
    return res.status(200).json(resp);
  } catch (error) {
    return res.status(500).json({
      message: error.stack,
    });
  }
};

export const addSystemConfig = async (req, res) => {
  const { id } = req;

  try {
    const user = await adminModel.getUserInfo('id', id);
    if (user.rows[0].roleid !== 3) {
      return res.status(404).json({ message: 'Not a valid user' });
    }

    const body = req.body;
    if (checkSystemConfigForm(body)) {
      const value = {
        user: id,
        email: body.email,
        phone: body.phone,
        facebook: body.facebook,
        twitter: body.twitter,
        linkedin: body.linkedin,
        profile: body.profile_image,
        note: body.note_image,
      };
      const config = await adminModel.addSystemConfig(value);
      return res.status(200).json(config.rows[0]);
    }
    return res.status(404).json({ message: 'Enter valid data' });
  } catch (error) {
    return res.status(500).json({
      message: error.stack,
    });
  }
};

export const deleteSystemConfig = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteConfig = await adminModel.deleteSystemConfig(id);
    if (deleteConfig.rowCount === 0) {
      return res.status(404).json({ message: 'Data unavailable' });
    }
    return res.status(200).json({ message: 'Deleted successfully' });
  } catch (error) {
    return res.status(500).json({
      message: error.stack,
    });
  }
};

export const getAdmins = async (req, res) => {
  res.status(200).json({ message: testEnvironmentVariable });
};

export const getAdmin = async (req, res) => {
  res.status(200).json({ message: testEnvironmentVariable });
};

export const addAdmin = async (req, res) => {
  const { id } = req;
  const { firstName, lastName, email, countryCode, phone } = req.body;
  try {
    const user = await adminModel.getUserInfo('id', id);
    if (user.rows[0].roleid !== 3) {
      return res.status(404).json({ message: 'Not a valid user' });
    }

    if (!isEmail(email) || phone.length !== 10) {
      return res.status(404).json({ message: 'Enter valid credential' });
    }

    const checkIfAdminExist = await adminModel.getUserInfo('email', email);
    if (checkIfAdminExist.rowCount !== 0) {
      return res.status(404).json({
        message: 'The email address already exists!',
      });
    }

    var randomPasswordString = Math.random().toString(36).slice(-8);
    const hashedPassword = await bcrypt.hash(randomPasswordString, 10);

    const fullName = `${firstName} ${lastName}`;
    const contacts = {
      from: aEmail,
      to: email,
    };
    const mail = Object.assign(
      {},
      TAddAdminEmail.confirm(fullName, email, randomPasswordString),
      contacts
    );
    const info = await sAdminTransport.sendMail(mail);

    if (info.messageId) {
      const value = {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        countryCode,
        phone,
        user: id,
      };
      const admin = await adminModel.addAdmin(value);
      const resp = {
        id: admin.rows[0].id,
        email: admin.rows[0].email,
        firstName: admin.rows[0].firstname,
        lastName: admin.rows[0].lastname,
        role: admin.rows[0].roleid,
        countryCode: admin.rows[0].phonecountrycode,
        phone: admin.rows[0].phonenumber,
        isEmailVerified: admin.rows[0].isemailverified,
        isActive: admin.rows[0].isactive,
        profilePicture: admin.rows[0].profilepicture,
      };
      return res.status(200).json(resp);
    } else {
      return res.status(500).json({ message: 'Something went wrong' });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.stack,
    });
  }
};

export const editAdmin = async (req, res) => {
  const { id } = req;
  const { uid } = req.params;
  const { firstName, lastName, email, countryCode, phone } = req.body;

  try {
    const sAdmin = await adminModel.getUserInfo('id', id);
    if (sAdmin.rows[0].roleid !== 3) {
      return res.status(404).json({ message: 'Not a valid user' });
    }

    const user = await adminModel.getUserInfo('id', uid);
    if (user.rowCount === 0) {
      return res.status(404).json({ message: 'User not available' });
    }
    if (user.rows[0].roleid !== 2) {
      return res.status(404).json({ message: 'Not a valid user' });
    }

    if (!isEmail(email) || phone.length !== 10) {
      return res.status(404).json({ message: 'Enter valid credential' });
    }

    const checkIfAdminExist = await adminModel.getUserInfo('email', email);
    if (
      checkIfAdminExist.rowCount !== 0 &&
      checkIfAdminExist.rows[0].id !== parseInt(uid)
    ) {
      return res.status(404).json({
        message: 'The email address already exists!',
      });
    }

    const value = {
      firstName,
      lastName,
      email,
      countryCode,
      phone,
      sAdmin: id,
      user: uid,
    };

    const admin = await adminModel.updateAdmin(value);
    const resp = {
      id: admin.rows[0].id,
      email: admin.rows[0].email,
      firstName: admin.rows[0].firstname,
      lastName: admin.rows[0].lastname,
      role: admin.rows[0].roleid,
      countryCode: admin.rows[0].phonecountrycode,
      phone: admin.rows[0].phonenumber,
      isEmailVerified: admin.rows[0].isemailverified,
      isActive: admin.rows[0].isactive,
      profilePicture: admin.rows[0].profilepicture,
    };
    return res.status(200).json(resp);
  } catch (error) {
    return res.status(500).json({
      message: error.stack,
    });
  }
};

export const inactiveAdmin = async (req, res) => {
  const { id } = req;
  const { uid } = req.params;

  try {
    const sAdmin = await adminModel.getUserInfo('id', id);
    if (sAdmin.rows[0].roleid !== 3) {
      return res.status(404).json({ message: 'Not a valid user' });
    }

    const user = await adminModel.getUserInfo('id', uid);
    if (user.rowCount === 0) {
      return res.status(404).json({ message: 'User not available' });
    }
    if (user.rows[0].roleid !== 2) {
      return res.status(404).json({ message: 'Not a valid user' });
    }

    const admin = await adminModel.inactiveAdmin(uid, id, false);
    const resp = {
      id: admin.rows[0].id,
      email: admin.rows[0].email,
      firstName: admin.rows[0].firstname,
      lastName: admin.rows[0].lastname,
      role: admin.rows[0].roleid,
      countryCode: admin.rows[0].phonecountrycode,
      phone: admin.rows[0].phonenumber,
      isEmailVerified: admin.rows[0].isemailverified,
      isActive: admin.rows[0].isactive,
      profilePicture: admin.rows[0].profilepicture,
    };
    return res.status(200).json(resp);
  } catch (error) {
    return res.status(500).json({
      message: error.stack,
    });
  }
};

export const deleteAdmin = async (req, res) => {
  try {
    res.status(200).json({ message: 'delete' });
  } catch (error) {
    return res.status(500).json({
      message: error.stack,
    });
  }
};
