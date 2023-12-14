const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createComment = {
  body: Joi.object().keys({
    postId: Joi.string().required().custom(objectId),
    content: Joi.string().required(),
    parentCommentId: Joi.string().custom(objectId).optional(), // optional
  }),
};

const getCommentsByParentId = {
  query: Joi.object().keys({
    postId: Joi.string().required().custom(objectId),
    parentCommentId: Joi.string().custom(objectId).allow(null), // optional, allow null for top-level comments
    limit: Joi.number().integer(),
    offset: Joi.number().integer(),
  }),
};

module.exports = {
  createComment,
  getCommentsByParentId,
};
