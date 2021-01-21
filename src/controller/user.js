/**@type {import('express').RequestHandler} */
module.exports.getUsers = (req, res, next) => {
  res.status(200).json({
    success: true,
    error: null,
    data: {
      list: [{ id: 123, name: "ali" }],
      page: {
        current: 1,
        min: 1,
        max: 1,
        limit: 20,
      },
    },
  });
};
