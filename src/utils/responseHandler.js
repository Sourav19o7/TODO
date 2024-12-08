const successResponse = (res, id = 1, message, data = undefined) => {
    return res.status(200).json({
      id : id,
      message : message,
      data : data,
    });
  };
  
  const errorResponse = (res, message, statusCode = 500) => {
    return res.status(statusCode).json({
      success: false,
      message,
    });
  };
  
  module.exports = {
    successResponse,
    errorResponse,
  };
  