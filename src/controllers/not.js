import Not from "../models/Not";

const notModel = new Not();;

export const getAllUsers = async (req, res) => {
  try {
    const users = await notModel.getAllUsers();
    return res.status(200).json(users.rows);
  } catch (error) {
    return res.status(500).json({
      message: error.stack,
    });
  }
};

export const getUsersByRoleID = async (req, res) => {
  const { rid } = req.params;
  try {
    const users = await notModel.getUsersByRoleID(rid);
    return res.status(200).json(users.rows);
  } catch (error) {
    return res.status(500).json({
      message: error.stack,
    });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await notModel.deleteUser(id);
    if (user.rowCount === 0) {
      return res
        .status(404)
        .json({ message: 'This user is not available on Database' });
    }
    return res.status(200).json({ message: 'Deleted successfully' });
  } catch (error) {
    return res.status(500).json({
      message: error.stack,
    });
  }
};

export const allSystemConfig = async (req, res) => {
  try {
    const configs = await notModel.getAllSystemConfig();
    return res.status(200).json(configs.rows);
  } catch (error) {
    return res.status(500).json({
      message: error.stack,
    });
  }
}

export const deleteSystemConfig = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteConfig = await notModel.deleteSystemConfig(id);
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