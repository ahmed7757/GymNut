const handleServerError = (fn) => {
  return async function (req, res, next) {
    try {
      await fn(req, res, next);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
      console.log("Error occurred:", error);
    }
  };
}

module.exports = {handleServerError};