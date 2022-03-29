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

export const searchCategory = async (req, res) => {
  const { id } = req;

  try {
    const admin = await adminModel.adminInfoByID(id);
    if (admin.rowCount === 0) {
      return res
        .status(404)
        .json({ message: 'You are not valid user to perform task' });
    }

    console.log(req.query.search);

    const categories = await adminModel.searchCategory(req.query.search);

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

// Manage Country
export const addCountry = async (req, res) => {
  const { id } = req;
  const { name, code } = req.body;

  try {
    const admin = await adminModel.adminInfoByID(id);
    if (admin.rowCount === 0) {
      return res
        .status(404)
        .json({ message: 'You are not valid user to perform task' });
    }

    const value = {
      name: name,
      code: code,
      user: id,
    };

    const country = await adminModel.addCountry(value);
    return res.status(200).json(country.rows[0]);
  } catch (error) {
    return res.status(500).json({
      message: error.stack,
    });
  }
};

export const editCountry = async (req, res) => {
  const { id } = req;
  const { cid } = req.params;
  const { name, code } = req.body;

  try {
    const admin = await adminModel.adminInfoByID(id);
    if (admin.rowCount === 0) {
      return res
        .status(404)
        .json({ message: 'You are not valid user to perform task' });
    }

    const value = {
      name: name,
      code: code,
      user: id,
      id: cid,
    };

    const country = await adminModel.updateCountry(value);
    if (country.rowCount === 0) {
      return res.status(404).json({ message: 'Country unavailable' });
    }
    return res.status(200).json(country.rows[0]);
  } catch (error) {
    return res.status(500).json({
      message: error.stack,
    });
  }
};

export const getCountry = async (req, res) => {
  const { id } = req;
  const { cid } = req.params;

  try {
    const admin = await adminModel.adminInfoByID(id);
    if (admin.rowCount === 0) {
      return res
        .status(404)
        .json({ message: 'You are not valid user to perform task' });
    }

    const country = await adminModel.getCountry(cid);
    if (country.rowCount === 0) {
      return res.status(404).json({ message: 'Country unavailable' });
    }
    return res.status(200).json(country.rows[0]);
  } catch (error) {
    return res.status(500).json({
      message: error.stack,
    });
  }
};

export const inactiveCountry = async (req, res) => {
  const { id } = req;
  const { cid } = req.params;

  try {
    const admin = await adminModel.adminInfoByID(id);
    if (admin.rowCount === 0) {
      return res
        .status(404)
        .json({ message: 'You are not valid user to perform task' });
    }

    const country = await adminModel.inactiveCountry(id, cid);
    if (country.rowCount === 0) {
      return res.status(404).json({ message: 'Country unavailable' });
    }
    return res.status(200).json(country.rows[0]);
  } catch (error) {
    return res.status(500).json({
      message: error.stack,
    });
  }
};

export const getCountries = async (req, res) => {
  const { id } = req;

  try {
    const admin = await adminModel.adminInfoByID(id);
    if (admin.rowCount === 0) {
      return res
        .status(404)
        .json({ message: 'You are not valid user to perform task' });
    }

    const countries = await adminModel.getAllCountry();
    if (countries.rowCount === 0) {
      return res.status(404).json({ message: 'Countries unavailable' });
    }
    return res.status(200).json(countries.rows);
  } catch (error) {
    return res.status(500).json({
      message: error.stack,
    });
  }
};
