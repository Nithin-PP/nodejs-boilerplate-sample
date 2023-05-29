module.exports = {
  makeJsonResponse: (message, data = {}, errors = {}, statusCode, success = true) => {
    return {
      statusCode,
      message,
      data,
      errors,
      success,
    };
  },
};
