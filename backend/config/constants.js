module.exports = {
  AUTH_TOKEN_EXPIRE_TIME: "1d",
  REFRESH_TOKEN_EXPIRE_TIME: "30m",
  JWT_EXPIRED_MESSAGE: "jwt expired",

  URL_EXPIRE_TIME: "2h",
  APP_LANGUAGE: ["en"],

  PAGE: 1,
  LIMIT: 10,

  STATUS_CODE: {
    SUCCESS: 1,
    FAIL: 0,
    VALIDATION: 2,
    UNAUTHENTICATED: -1,
    NOT_FOUND: -2,
    SEE_OTHER: -3,
  },

  WEB_STATUS_CODE: {
    OK: 200,
    CREATED: 201,
    NO_DATA: 203, //temporary
    NO_CONTENT: 204,
    SEE_OTHER: 303,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    SERVER_ERROR: 500,
    FORBIDDEN: 403,
  },

  STATUS: {
    ACTIVE: 1,
    INACTIVE: 2,
  },

  USER_TYPE: {
    ADMIN: 1,
    DELIVERY_MANAGER: 2,
    ACCOUNTS: 3,
    HR: 4,
    PM: 5,
    TL: 6,
    USER: 7,
    TRAINEE: 8,
    NETWORK_HEAD: 9,
    ACCOUNT_HEAD: 10,
    HR_MANAGER: 11,
  },

  DATABASE_OPERATION: {
    CREATE: "Created",
    ADD: "Added",
    UPDATE: "Quantity changed",
    DELETE: "Removed",
  },

  CSV_FILE_UPLOAD: "public/uploadFile/",
  CSV_FILE_EXPORT: "public/export-csv",
  EXCEL_FILE_EXPORT: "../../public/export-excel",

  PATH_TO_LOGGERFILE: "public/logs/logger.log",
  PATH_TO_LOGGERFOLDER: "public/logs",

  PATH_TO_ERROR_LOGGERFILE: "public/logs/error/logger.log",
  PATH_TO_ERROR_LOGGERFOLDER: "public/logs/error",

  PATH_TO_INFO_LOGGERFILE: "public/logs/info/logger.log",
  PATH_TO_INFO_LOGGERFOLDER: "public/logs/info",

  PATH_TO_PUBLIC_FOLDER: "public",
  PATH_TO_PUBLIC_PROJECT_FOLDER: "public/projects",

};
