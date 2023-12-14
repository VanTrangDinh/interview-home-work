'use strict';

const { creatComment, getCommentByParentId, deleteComment } = require('../services/comment.service');
const { SuccessResponse } = require('../core/success.response');

class CommentController {
  creatComment = async (req, res, next) => {
    new SuccessResponse({
      message: 'A new comment was successfully created.',
      metadata: await creatComment(req.body, req.user._id),
    }).send(res);
  };

  getCommentByParentId = async (req, res, next) => {
    new SuccessResponse({
      message: 'Get comment by parent successfully',
      metadata: await getCommentByParentId(req.query),
    }).send(res);
  };

  deleteComment = async (req, res, next) => {
    new SuccessResponse({
      message: 'Delete comment successfully',
      metadata: await deleteComment(req.query),
    }).send(res);
  };
}

module.exports = new CommentController();
