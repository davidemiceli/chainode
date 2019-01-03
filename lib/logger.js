'use strict';

// Requirements
const moment = require('moment');
const winston = require('winston');
require('winston-daily-rotate-file');
const { format } = winston;
const { utcISOstring } = require('./helpers');


module.exports = (role, id, level, logPath, silentConsole) => {
  // Log format
  const logFormat = format.printf(info => {
    return [
      utcISOstring(),
      info.level.toUpperCase(),
      role,
      id,
      info.message
    ].join('|');
  });

  // File log rotation parameters
  const transportFileParams = (fileHeader) => ({
    filename: `${fileHeader}-%DATE%.log`,
    dirname: logPath, // default =>'.',
    datePattern: 'YYYY-MM-DD-HH',
    maxSize: '20m',
    maxFiles: '15d'
  });
  
  // Set up logger
  const logger = winston.createLogger({
    level: level,
    format: format.combine(logFormat),
    transports: [
      new winston.transports.DailyRotateFile(
        transportFileParams('chainode')
      ),
      new winston.transports.Console({
        silent: silentConsole
      })
    ]
  });
  
  // Extend logger object to properly log additional arguments
  const origLog = logger.log;
  logger.log = function (level, ...args) {
    const parsedArgs = args.map(i => typeof(i) === 'object' ? JSON.stringify(i) : i).join(' ');
    origLog.apply(logger, [level, parsedArgs]);
  }

  return logger;
}
