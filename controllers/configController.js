const URLFactory = require("../services/deployService");

exports.createDeployment = (req, res) => {
  const { activityID, InvenRAstdID, json_params } = req.body;

  if (!activityID || !InvenRAstdID || !json_params) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const instanceURL = URLFactory.createInstanceURL(activityID);
  res.json({ activity_url: instanceURL });
};
