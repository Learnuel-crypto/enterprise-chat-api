class APIError{
static unauthenticated(msg, status = 401){
  const message = msg || "Login is required";
  return new this(message, status);
};

static unauthorized = (msg, status = 401) => {
  const err = new Error(msg || "Authorization is required");
  err.status = status;
  return err;
};

 
} 
module.exports = APIError;