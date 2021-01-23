module.exports = class ResponseError extends (
  Error
) {
  /**
   *
   * @param {String} message error messages separated by |
   * @param {Number} status http status code
   * @param {Boolean} success Action processed successfully or not
   * @param {Object} parent Error parent (it has call stack & etc)
   * @param {Boolean} sendResult Result should be send or not
   */
  constructor(
    message,
    status = 500,
    success = false,
    parent = null,
    sendResult = false,
  ) {
    super(message);
    this.message = message;
    this.status = status;
    this.success = success;
    this.parent = parent;
    this.sendResult = sendResult;
  }
};
