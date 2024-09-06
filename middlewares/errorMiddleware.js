// Error handler middleware
function errorHandler(err, req, res, next) {
  console.error('Error:', err.message); // Log error message for debugging

  // Determine the status code and message
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  // Send the error response
  res.status(statusCode).json({
    success: false,
    message,
  });
}

module.exports = errorHandler;