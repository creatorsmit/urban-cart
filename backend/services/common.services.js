const constants = require("../config/constants");
const { createLogger, format, transports } = require("winston");
const { combine, timestamp, json } = format;
const moment = require("moment");
const CronJob = require("cron").CronJob;
const fs = require("fs");
const path = require("path");
const dateFormat = require("../helper/dateformate.helper");

const createLogObject = (res, statusCode, status, message, data) => {
  return {
    status_code: statusCode,
    response_message: message,
    route: res.req.originalUrl,
    method: res.req.method,
    body: res?.req?.body,
    params: Object.getOwnPropertyNames(res?.req?.params).length
      ? res?.req?.params
      : null,
    query: res?.req?._parsedOriginalUrl?.query ?? null,
    requested_by: res.req?.user?._id ?? null,
    error: data?.stack,
  };
};

const sendResponseValidation = (
  res,
  statusCode,
  status,
  message,
  data,
  lang = "en",
  replaceObj = {}
) => {
  try {
    appLanguageList = constants.APP_LANGUAGE;
    const msg =
      appLanguageList.indexOf(lang) != -1
        ? require(`../lang/${lang}/validationMessage`)
        : require(`../lang/en/validationMessage`);

    let obj = message.split(".");
    keyName = obj[0];
    subKey = obj[1];

    let resMessage = msg[keyName][subKey];

    if (Object.keys(replaceObj).length !== 0) {
      resMessage = replaceString(resMessage, replaceObj);
    }

    if (
      statusCode === constants.WEB_STATUS_CODE.CREATED ||
      statusCode === constants.WEB_STATUS_CODE.OK
    ) {
      logger.info(
        "Info msg",
        createLogObject(res, statusCode, status, resMessage, data)
      );
    } else {
      errorLogger.error(
        "Server error message",
        createLogObject(res, statusCode, status, resMessage, data)
      );
    }

    res.writeHead(statusCode, { "Content-Type": "application/json" });
    res.write(
      JSON.stringify({
        status: status,
        message: resMessage,
        data: data,
      })
    );
    res.end();
  } catch (err) {
    console.log("Error(sendResponseValidation): ", err);
    throw err;
  }
};

const sendResponse = (
  res,
  statusCode,
  status,
  message,
  data,
  lang = "en",
  replaceObj = {}
) => {
  try {
    statusCode = +statusCode;

    appLanguageList = constants.APP_LANGUAGE;
    const msg =
      appLanguageList.indexOf(lang) != -1
        ? require(`../lang/${lang}/message`)
        : require(`../lang/en/message`);
    message = message.toString();
    let obj = message.split(".");
    keyName = obj[0];
    subKey = obj[1];

    let resMessage = msg[keyName][subKey];

    if (replaceObj && Object.keys(replaceObj).length !== 0) {
      resMessage = replaceString(resMessage, replaceObj);
    }
    // logger
    if (
      statusCode === constants.WEB_STATUS_CODE.CREATED ||
      statusCode === constants.WEB_STATUS_CODE.OK
    ) {
      logger.info(
        "Info msg",
        createLogObject(res, statusCode, status, resMessage, data)
      );
    } else {
      errorLogger.error(
        "Error msg",
        createLogObject(res, statusCode, status, resMessage, data)
      );
    }

    res.writeHead(statusCode, { "Content-Type": "application/json" });
    res.write(
      JSON.stringify({
        status: status,
        message: resMessage,
        data: statusCode === 500 ? data.message : data,
      })
    );
    res.end();
  } catch (err) {
    console.log("Error(sendResponse): ", err);
    throw err;
  }
};

const capitalizeFirstLetterUsingRegex = (string) => {
  string = string
    .trim()
    .toLowerCase()
    .replace(/[^a-zA-Z ]/g, "")
    .replace(/\s+/g, " ");
  return string.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
    letter.toUpperCase()
  );
};
const capitalizeFirstLetter = (string) => {
  string = string.trim().toLowerCase().replace(/\s+/g, "");
  return string.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
    letter.toUpperCase()
  );
};

const getLogFilename = () => {
  return `${moment().format("DD.MM.YYYY")}.log`;
};

//Logger
const logger = createLogger({
  level: "info",
  transports: [
    new transports.File({
      level: "info",
      filename: `${constants.PATH_TO_INFO_LOGGERFOLDER}/${getLogFilename()}`,
      format: combine(
        timestamp({ format: "MMM-DD-YYYY HH:mm:ss" }),
        json({ space: 4 })
      ),
    }),
  ],
});
const errorLogger = createLogger({
  level: "error",
  transports: [
    new transports.File({
      level: "error",
      filename: `${constants.PATH_TO_ERROR_LOGGERFOLDER}/${getLogFilename()}`,
      format: combine(
        timestamp({ format: "MMM-DD-YYYY HH:mm:ss" }),
        json({ space: 4 })
      ),
    }),
  ],
});

// const job = new CronJob({
//   // cronTime: '* * * * *',
//   // cronTime: "*/5 * * * *", //run every five minutes
//   cronTime: "00 02 * * *", //run everyday  at 2:00 AM
//   onTick: async () => {
//     console.log("job.taskRunning from removeOldLogs cron");
//     if (job.taskRunning) {
//       return;
//     }

//     job.taskRunning = true;
//     try {
//       console.log("Running removeOldLogs Cron");

//       const reportsErrDir = constants.PATH_TO_ERROR_LOGGERFOLDER;
//       const reportsInfoDir = constants.PATH_TO_INFO_LOGGERFOLDER;

//       fs.readdir(reportsInfoDir, (err, files) => {
//         if (err) throw err;

//         for (const file of files) {
//           let fileCreatedDate = file
//             .split("Logger.log")[0]
//             .split(".")
//             .join("/");
//           fileCreatedDate = moment(fileCreatedDate, "DD/MM/YYYY").format("X");

//           let beforeSevenDaysDate = dateFormat.subtractTimeToCurrentTimestamp(
//             7,
//             "days"
//           );

//           if (+beforeSevenDaysDate >= +fileCreatedDate) {
//             console.log(file, `removed at ${moment().format()}`);
//             fs.unlink(path.join(reportsErrDir, file), (err) => {
//               if (err) throw err;
//               console.log(`Successfully deleted err file ${file}`);
//             });
//             fs.unlink(path.join(reportsInfoDir, file), (err) => {
//               if (err) throw err;
//               console.log(`Successfully deleted info file ${file}`);
//             });
//           }
//         }
//       });
//     } catch (error) {
//       console.log("error in removeOldLogs Cron", error);
//       // Handle error
//     }
//     job.taskRunning = false;
//   },
//   start: true,
//   timeZone: "UTC",
// });

module.exports = {
  sendResponseValidation,
  sendResponse,
  capitalizeFirstLetterUsingRegex,
  capitalizeFirstLetter,
  // logger,
  // errorLogger,
  // job,
};
