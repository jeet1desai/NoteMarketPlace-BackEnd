import bcrypt from 'bcrypt';

import Admin from '../../models/Admin';
import { aEmail } from '../../settings';
import { checkSystemConfigForm, isEmail } from '../../validation';
import { sAdminTransport } from '../../helper';
import { TAddAdminEmail } from '../../templates';

const adminModel = new Admin();

export const addSystemConfig = async (req, res) => {
  const { id } = req;

  try {
    const sAdmin = await adminModel.getSAdminInfoByID(id);
    if (sAdmin.rowCount === 0) {
      return res.status(404).json({ message: 'You are not valid user' });
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

export const getSystemConfig = async (req, res) => {
  const { id } = req;

  try {
    const sAdmin = await adminModel.getSAdminInfoByID(id);
    if (sAdmin.rowCount === 0) {
      return res.status(404).json({ message: 'You are not valid user' });
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

export const addAdmin = async (req, res) => {
  const { id } = req;
  const { firstName, lastName, email, countryCode, phone } = req.body;
  try {
    const sAdmin = await adminModel.getSAdminInfoByID(id);
    if (sAdmin.rowCount === 0) {
      return res
        .status(404)
        .json({ message: 'You are not valid user to perform task' });
    }

    const checkIfAdminExist = await adminModel.getInfoByEmail(email);
    if (checkIfAdminExist.rowCount !== 0) {
      return res.status(404).json({
        message: 'The email address already exists!',
      });
    }

    if (!isEmail(email) || phone.length !== 10) {
      return res.status(404).json({ message: 'Enter valid credential' });
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
      return res.status(200).json(admin.rows[0]);
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
    const sAdmin = await adminModel.getSAdminInfoByID(id);
    if (sAdmin.rowCount === 0) {
      return res
        .status(404)
        .json({ message: 'You are not valid user to perform task' });
    }

    const checkIfAdminExist = await adminModel.getAdminInfoByID(uid);
    if (
      checkIfAdminExist.rowCount === 0 ||
      checkIfAdminExist.rows[0].email !== email
    ) {
      return res.status(404).json({
        message: 'This admin is not available',
      });
    }

    if (!isEmail(email) || phone.length !== 10) {
      return res.status(404).json({ message: 'Enter valid credential' });
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
    return res.status(200).json(admin.rows[0]);
  } catch (error) {
    return res.status(500).json({
      message: error.stack,
    });
  }
};

export const getAdmins = async (req, res) => {
  const { id } = req;
  try {
    const sAdmin = await adminModel.getSAdminInfoByID(id);
    if (sAdmin.rowCount === 0) {
      return res
        .status(404)
        .json({ message: 'You are not valid user to perform task' });
    }

    const admins = await adminModel.getAllAdmin();
    return res.status(200).json(admins.rows);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: error.stack,
    });
  }
};

export const getAdmin = async (req, res) => {
  const { id } = req;
  const { uid } = req.params;

  try {
    const sAdmin = await adminModel.getSAdminInfoByID(id);
    if (sAdmin.rowCount === 0) {
      return res
        .status(404)
        .json({ message: 'You are not valid user to perform task' });
    }

    const checkIfAdminExist = await adminModel.getAdmin(uid);
    if (checkIfAdminExist.rowCount === 0) {
      return res.status(404).json({
        message: 'This admin is not available',
      });
    }
    return res.status(200).json(checkIfAdminExist.rows[0]);
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
    const sAdmin = await adminModel.getSAdminInfoByID(id);
    if (sAdmin.rowCount === 0) {
      return res
        .status(404)
        .json({ message: 'You are not valid user to perform task' });
    }

    const checkIfAdminExist = await adminModel.getAdminInfoByID(uid);
    if (checkIfAdminExist.rowCount === 0) {
      return res.status(404).json({
        message: 'This admin is not available',
      });
    }

    const admin = await adminModel.inactiveAdmin(uid, id);
    return res.status(200).json(admin.rows[0]);
  } catch (error) {
    return res.status(500).json({
      message: error.stack,
    });
  }
};

export const searchAdmin = async (req, res) => {
  const { id } = req;

  try {
    const sAdmin = await adminModel.getSAdminInfoByID(id);
    if (sAdmin.rowCount === 0) {
      return res
        .status(404)
        .json({ message: 'You are not valid user to perform task' });
    }

    const admin = await adminModel.searchAdmin(req.query.search);

    return res.status(200).json(admin.rows);
  } catch (error) {
    return res.status(500).json({
      message: 'Something went wrong!',
    });
  }
};
