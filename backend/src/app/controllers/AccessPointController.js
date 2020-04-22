const { AccessPoint } = require('../models');

module.exports = {
  async store(req, res) {
    const { address, model } = req.body;

    const ap = await AccessPoint.create({
      ap_address: address,
      ap_model: model,
    });

    res.json({ ap });
  },
};
