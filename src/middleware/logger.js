// @ts-check

/**
 *
 * @param {'info'|'route'|'warn'|'error'} level
 * @param {string} scope
 * @param {string} message
 */
module.exports = (level, scope, message) =>
  /**@type {import('express').RequestHandler} */
  (req, res, next) => {
    switch (level) {
      case 'error':
        console.error(scope, message);
        break;
      case 'info':
      case 'route':
        console.log(scope, message);
        break;
      case 'warn':
        console.warn(scope, message);
        break;
    }
    next();
  };
