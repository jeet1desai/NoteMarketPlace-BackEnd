import Admin from '../../models/Admin';

const adminModel = new Admin();

export const getStats = async (req, res) => {
  const { id } = req;

  try {
    const admin = await adminModel.adminInfoByID(id);
    if (admin.rowCount === 0) {
      return res
        .status(404)
        .json({ message: 'You are not valid user to perform task' });
    }

    const inReviewNotes = await adminModel.getStatInReviewNote();
    const downloadedNotes = await adminModel.getStatDownloadedNote();
    const newRegistration = await adminModel.getStatNewRegistration();

    const data = {
      inReviewNotes: inReviewNotes.rows[0].count,
      downloadedNotes: downloadedNotes.rows[0].count,
      newRegistration: newRegistration.rows[0].count,
    };

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      message: 'Something went wrong!',
    });
  }
};

export const publishedNotes = async (req, res) => {
  const { id } = req;
  const { month, search } = req.query;

  try {
    const admin = await adminModel.adminInfoByID(id);
    if (admin.rowCount === 0) {
      return res
        .status(404)
        .json({ message: 'You are not valid user to perform task' });
    }

    // const publishedNotes = await adminModel.publishedNotes(month, search);

    // return res.status(200).json({});
  } catch (error) {
    return res.status(500).json({
      message: 'Something went wrong!',
    });
  }
};
