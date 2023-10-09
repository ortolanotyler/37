/** ExpressError extends the standard JavaScript error for adding status easily
 *  when creating an instance of it.
 *
 *  This error-handling middleware will respond with this custom error.
 */

class ExpressError extends Error {
  constructor(message, status) {
    super();
    this.message = message;
    this.status = status;
    console.error(this.stack);
  }
}

module.exports = ExpressError;
