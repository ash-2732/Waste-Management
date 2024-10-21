import reportWasteModel from "../models/reportWasteModel.js";

const reportWasteController = async (req, res) => {
  try {
    const { imageUrls, description, location } = req.body;
    //validate
    if (!imageUrls || !description || !location) {
      return res.status(404).send({
        success: false,
        message: "ALL FIELDS ARE REQUIRED",
      });
    }
    const report = new reportWasteModel({
      imageUrls,
      description,
      location,
      reporter: req.user._id,
    });
    await report.save();
    res.status(201).send({
      success: true,
      message: "WASTE REPORTED SUCCESSFULLY",
      report,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "ERROR IN REPORT WASTE CONTROLLER",
      error,
    });
  }
};

const getReportsController = async (req, res) => {
  try {

    const {userId} = req.params;
    const reports = await reportWasteModel
      .find({
        reporter: userId,
      })
      .populate("reporter", "name email phone address");
    res.status(200).send({
      success: true,
      reports,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "ERROR IN GET REPORTS CONTROLLER",
      error,
    });
  }
};

// find reports by specific user
const getAllReportsControllerbyAdmin = async (req, res) => {
  try {
    const reports = await reportWasteModel
      .find({})
      .populate("reporter", "name email phone address");
    res.status(200).send({
      success: true,
      reports,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "ERROR IN GET REPORTS CONTROLLER",
      error,
    });
  }
};

export { reportWasteController, getReportsController , getAllReportsControllerbyAdmin};
