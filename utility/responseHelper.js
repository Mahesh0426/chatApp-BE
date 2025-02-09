export const buildSuccessResponse = (res, data, message = "") => {
  return res.json({
    status: "success",
    data,
    message,
  });
};

export const buildErrorResponse = (res, message = "") => {
  return res.json({
    status: "error",
    message: message || "something went wrong",
  });
};
