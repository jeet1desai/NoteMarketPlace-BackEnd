import Admin from '../models/Admin';

const adminModel = new Admin();
// Manage Category
export const addCategory = async (req, res) => {
  const { id } = req;
  const { name, description } = req.body;

  try {
    const admin = await adminModel.adminInfoByID(id);
    if (admin.rowCount === 0) {
      return res
        .status(404)
        .json({ message: 'You are not valid user to perform task' });
    }

    const value = {
      name: name,
      description: description,
      user: id,
    };

    const category = await adminModel.addCategory(value);
    return res.status(200).json(category.rows[0]);
  } catch (error) {
    return res.status(500).json({
      message: error.stack,
    });
  }
};

export const editCategory = async (req, res) => {
  const { id } = req;
  const { cid } = req.params;
  const { name, description } = req.body;

  try {
    const admin = await adminModel.adminInfoByID(id);
    if (admin.rowCount === 0) {
      return res
        .status(404)
        .json({ message: 'You are not valid user to perform task' });
    }

    const value = {
      name: name,
      description: description,
      user: id,
      id: cid,
    };

    const category = await adminModel.updateCategory(value);
    if (category.rowCount === 0) {
      return res.status(404).json({ message: 'Category unavailable' });
    }
    return res.status(200).json(category.rows[0]);
  } catch (error) {
    return res.status(500).json({
      message: error.stack,
    });
  }
};

export const getCategory = async (req, res) => {
  const { id } = req;
  const { cid } = req.params;

  try {
    const admin = await adminModel.adminInfoByID(id);
    if (admin.rowCount === 0) {
      return res
        .status(404)
        .json({ message: 'You are not valid user to perform task' });
    }

    const category = await adminModel.getCategory(cid);
    if (category.rowCount === 0) {
      return res.status(404).json({ message: 'Category unavailable' });
    }
    return res.status(200).json(category.rows[0]);
  } catch (error) {
    return res.status(500).json({
      message: error.stack,
    });
  }
};

export const inactiveCategory = async (req, res) => {
  const { id } = req;
  const { cid } = req.params;

  try {
    const admin = await adminModel.adminInfoByID(id);
    if (admin.rowCount === 0) {
      return res
        .status(404)
        .json({ message: 'You are not valid user to perform task' });
    }

    const category = await adminModel.inactiveCategory(id, cid);
    if (category.rowCount === 0) {
      return res.status(404).json({ message: 'Category unavailable' });
    }
    return res.status(200).json(category.rows[0]);
  } catch (error) {
    return res.status(500).json({
      message: error.stack,
    });
  }
};

export const getCategories = async (req, res) => {
  const { id } = req;

  try {
    const admin = await adminModel.adminInfoByID(id);
    if (admin.rowCount === 0) {
      return res
        .status(404)
        .json({ message: 'You are not valid user to perform task' });
    }

    const categories = await adminModel.getAllCategory();
    if (categories.rowCount === 0) {
      return res.status(404).json({ message: 'Categories unavailable' });
    }
    return res.status(200).json(categories.rows);
  } catch (error) {
    return res.status(500).json({
      message: error.stack,
    });
  }
};

// Manage Type
export const addType = async (req, res) => {
  const { id } = req;
  const { name, description } = req.body;

  try {
    const admin = await adminModel.adminInfoByID(id);
    if (admin.rowCount === 0) {
      return res
        .status(404)
        .json({ message: 'You are not valid user to perform task' });
    }

    const value = {
      name: name,
      description: description,
      user: id,
    };

    const type = await adminModel.addType(value);
    return res.status(200).json(type.rows[0]);
  } catch (error) {
    return res.status(500).json({
      message: error.stack,
    });
  }
};

export const editType = async (req, res) => {
  const { id } = req;
  const { tid } = req.params;
  const { name, description } = req.body;

  try {
    const admin = await adminModel.adminInfoByID(id);
    if (admin.rowCount === 0) {
      return res
        .status(404)
        .json({ message: 'You are not valid user to perform task' });
    }

    const value = {
      name: name,
      description: description,
      user: id,
      id: tid,
    };

    const type = await adminModel.updateType(value);
    if (type.rowCount === 0) {
      return res.status(404).json({ message: 'Type unavailable' });
    }
    return res.status(200).json(type.rows[0]);
  } catch (error) {
    return res.status(500).json({
      message: error.stack,
    });
  }
};

export const getType = async (req, res) => {
  const { id } = req;
  const { tid } = req.params;

  try {
    const admin = await adminModel.adminInfoByID(id);
    if (admin.rowCount === 0) {
      return res
        .status(404)
        .json({ message: 'You are not valid user to perform task' });
    }

    const type = await adminModel.getType(tid);
    if (type.rowCount === 0) {
      return res.status(404).json({ message: 'Type unavailable' });
    }
    return res.status(200).json(type.rows[0]);
  } catch (error) {
    return res.status(500).json({
      message: error.stack,
    });
  }
};

export const inactiveType = async (req, res) => {
  const { id } = req;
  const { tid } = req.params;

  try {
    const admin = await adminModel.adminInfoByID(id);
    if (admin.rowCount === 0) {
      return res
        .status(404)
        .json({ message: 'You are not valid user to perform task' });
    }

    const type = await adminModel.inactiveType(id, tid);
    if (type.rowCount === 0) {
      return res.status(404).json({ message: 'Type unavailable' });
    }
    return res.status(200).json(type.rows[0]);
  } catch (error) {
    return res.status(500).json({
      message: error.stack,
    });
  }
};

export const getTypes = async (req, res) => {
  const { id } = req;

  try {
    const admin = await adminModel.adminInfoByID(id);
    if (admin.rowCount === 0) {
      return res
        .status(404)
        .json({ message: 'You are not valid user to perform task' });
    }

    const types = await adminModel.getAllType();
    if (types.rowCount === 0) {
      return res.status(404).json({ message: 'Types unavailable' });
    }
    return res.status(200).json(types.rows);
  } catch (error) {
    return res.status(500).json({
      message: error.stack,
    });
  }
};

// // Manage Country
// export const addCategory = async (req, res) => {
//   const { id } = req;
//   const { name, description } = req.body;

//   try {
//     const admin = await adminModel.adminInfoByID(id);
//     if (admin.rowCount === 0) {
//       return res
//         .status(404)
//         .json({ message: 'You are not valid user to perform task' });
//     }

//     const value = {
//       name: name,
//       description: description,
//       user: id,
//     };

//     const category = await adminModel.addCategory(value);
//     return res.status(200).json(category.rows[0]);
//   } catch (error) {
//     return res.status(500).json({
//       message: error.stack,
//     });
//   }
// };

// export const editCategory = async (req, res) => {
//   const { id } = req;
//   const { cid } = req.params;
//   const { name, description } = req.body;

//   try {
//     const admin = await adminModel.adminInfoByID(id);
//     if (admin.rowCount === 0) {
//       return res
//         .status(404)
//         .json({ message: 'You are not valid user to perform task' });
//     }

//     const value = {
//       name: name,
//       description: description,
//       user: id,
//       id: cid,
//     };

//     const category = await adminModel.updateCategory(value);
//     if (category.rowCount === 0) {
//       return res.status(404).json({ message: 'Category unavailable' });
//     }
//     return res.status(200).json(category.rows[0]);
//   } catch (error) {
//     return res.status(500).json({
//       message: error.stack,
//     });
//   }
// };

// export const getCategory = async (req, res) => {
//   const { id } = req;
//   const { cid } = req.params;

//   try {
//     const admin = await adminModel.adminInfoByID(id);
//     if (admin.rowCount === 0) {
//       return res
//         .status(404)
//         .json({ message: 'You are not valid user to perform task' });
//     }

//     const category = await adminModel.getCategory(cid);
//     if (category.rowCount === 0) {
//       return res.status(404).json({ message: 'Category unavailable' });
//     }
//     return res.status(200).json(category.rows[0]);
//   } catch (error) {
//     return res.status(500).json({
//       message: error.stack,
//     });
//   }
// };

// export const inactiveCategory = async (req, res) => {
//   const { id } = req;
//   const { cid } = req.params;

//   try {
//     const admin = await adminModel.adminInfoByID(id);
//     if (admin.rowCount === 0) {
//       return res
//         .status(404)
//         .json({ message: 'You are not valid user to perform task' });
//     }

//     const category = await adminModel.inactiveCategory(id, cid);
//     if (category.rowCount === 0) {
//       return res.status(404).json({ message: 'Category unavailable' });
//     }
//     return res.status(200).json(category.rows[0]);
//   } catch (error) {
//     return res.status(500).json({
//       message: error.stack,
//     });
//   }
// };

// export const getCategories = async (req, res) => {
//   const { id } = req;

//   try {
//     const admin = await adminModel.adminInfoByID(id);
//     if (admin.rowCount === 0) {
//       return res
//         .status(404)
//         .json({ message: 'You are not valid user to perform task' });
//     }

//     const categories = await adminModel.getAllCategory();
//     if (categories.rowCount === 0) {
//       return res.status(404).json({ message: 'Categories unavailable' });
//     }
//     return res.status(200).json(categories.rows);
//   } catch (error) {
//     return res.status(500).json({
//       message: error.stack,
//     });
//   }
// };
