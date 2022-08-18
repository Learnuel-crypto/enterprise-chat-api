exports.notFound = (req,res, next) => {
  const err = new Error("Route NOT Found");
  err.status = 404;
  next(err);
};

exports.errorHandler = (err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message ?? "Unknown Error" });
} 

exports.customError = (msg, status) => {
  const err = new Error(msg);
  err.status = status;
  return err;
}

