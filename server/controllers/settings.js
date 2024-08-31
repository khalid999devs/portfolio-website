const { settings } = require('../models');
const { BadRequestError, UnauthorizedError } = require('../errors');

const addSettings = async (req, res) => {
  let data = req.body;
  if (!data.technologies)
    throw new BadRequestError('Please add technologies data of yours');

  data.technologies = JSON.stringify(data.technologies);
  let result = await settings.create(data);

  result.dataValues.technologies = JSON.parse(result.dataValues.technologies);

  res.json({
    succeed: true,
    msg: 'Successfully added settings',
    settings: result,
  });
};

const editSettings = async (req, res) => {
  let data = req.body;
  data.technologies = JSON.stringify(data.technologies);

  await settings.update({ ...data });

  res.json({
    succeed: true,
    msg: 'Successfully updated settings',
  });
};

const getSettings = async (req, res) => {
  let result = await settings.findAll();
  let settingsRes = undefined;

  if (result[0]) {
    settingsRes = result[0];
    settingsRes.dataValues.technologies = JSON.parse(
      settingsRes.dataValues.technologies
    );
  }

  res.json({
    succeed: true,
    result: settingsRes,
    msg: 'Successfully fetched settings!',
  });
};

module.exports = { addSettings, editSettings, getSettings };
