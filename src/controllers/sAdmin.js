import Admin from '../models/admin';
import { testEnvironmentVariable } from '../settings';
import { checkSystemConfigForm } from '../validation';

const adminModel = new Admin();
export const getSystemConfig = async (req, res) => {
  const { id } = req;

  try {
    const user = await adminModel.getUserInfo('id', id);
    if (user.rows[0].roleid !== 3) {
      return res.status(404).json({ message: 'Not a valid user' });
    }
    const sConfig = await adminModel.getSystemConfig();
    // console.log(sConfig);

    const resp = {
      email: null,
      phone: null,
      facebook: null,
      twitter: null,
      linkedin: null,
      note_image: null,
      profile_image: null,
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
    const files = JSON.parse(JSON.stringify(req.files));
    const body = JSON.parse(JSON.stringify(req.body));

    if (checkSystemConfigForm(body, files)) {
      console.log(files, body);

      const value = {
        user: id,
        email: body.email,
        phone: body.phone,
        facebook: body.facebook,
        twitter: body.twitter,
        linkedin: body.linkedin,
        profile,
        note,
      };

      return res.status(200).json({ message: 'Submit successfully' });
    }
    return res.status(404).json({ message: 'Enter valid data' });
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
  res.status(200).json({ message: testEnvironmentVariable });
};

export const editAdmin = async (req, res) => {
  res.status(200).json({ message: testEnvironmentVariable });
};

export const deleteAdmin = async (req, res) => {
  res.status(200).json({ message: testEnvironmentVariable });
};
