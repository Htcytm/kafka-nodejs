const winston = require('winston');
const path = require("path");

const RotatingFile = require('winston-daily-rotate-file');

const combinedRotatingFileTransport = new RotatingFile({
    datePattern: 'YYYY-MM-DD',
    dirname: path.join(__dirname, "/../../logs"),
    filename: 'logs/%DATE%-combined.log',
    level: 'info',
    maxFiles: '14d',
    maxSize: '20m',
  });
  
  const errorRotatingFileTransport = new RotatingFile({
    datePattern: 'YYYY-MM-DD',
    dirname: path.join(__dirname, "/../../logs"),
    filename: 'logs/%DATE%-error.log',
    level: 'error',
    maxFiles: '14d',
    maxSize: '20m',
  });
  
  const developmentConsoleRotatingTransport = new winston.transports.Console({
    format: winston.format.simple(),
    level: 'silly',
  });
  
  const winstonOptions = {
    transports: [
      combinedRotatingFileTransport,
      errorRotatingFileTransport,
      developmentConsoleRotatingTransport,
    ],
  };

const logger = winston.createLogger( winstonOptions);
module.exports = logger;