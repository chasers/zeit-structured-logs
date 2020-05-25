const logger = require('pino')({
  base: {
    env: process.env.ENV || "undefined"
  }
})

export default (req, res) => {

  logger.info({ user: { name: "Joe Schmo", email: "joe@dunder.dev", company: "Dunder Dev", id: 38 }, event: { type: "request", tag: "api" } })

  console.log(process.env.ENV)

  const date = new Date()
    .toISOString()
    .replace(/T/, ' ')
    .replace(/\..+/, '');

  res.json({ date });
};
