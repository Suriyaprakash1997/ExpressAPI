const { createLogger, format, transports } = require('winston');
const path=require('path')
const getLogFileName = () => {
  const date = new Date().toISOString().slice(0, 10); // Format: YYYY-MM-DD
  return path.join(__dirname, `../logs/api_${date}.log`);
};
const logger = createLogger({
  level: 'error', // You can set levels like 'info', 'warn', 'error'
  format: format.combine(
    format.timestamp(),
    format.json()
  ),
  transports: [
    new transports.File({ filename: getLogFileName() }), // Log errors to a file
  ]
});

module.exports = logger;