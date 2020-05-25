import { prepKeyValuesKeys } from "../../utils/utils"

const logger = require('pino')({
  base: {
    env: process.env.ENV || "ENV not set"
  }
})

export default (req, res) => {

  const headers = prepKeyValuesKeys(req.headers)

  logger.info({ request: { headers: headers } })

  const date = new Date()
    .toISOString()
    .replace(/T/, ' ')
    .replace(/\..+/, '');

  res.json({ date });
};