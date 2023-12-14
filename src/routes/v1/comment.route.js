const express = require('express');
const validate = require('../../middlewares/validate');
const commentController = require('../../controllers/comment.controller');
const asyncHandler = require('../../helpers/asyncHandle');
const auth = require('../../middlewares/auth');
const { commentValidation } = require('../../validations');

const router = express.Router();

router
  .route('/')
  .post(auth(), validate(commentValidation.createComment), asyncHandler(commentController.creatComment))
  .get(auth(), validate(commentValidation.getCommentsByParentId), asyncHandler(commentController.getCommentByParentId))

  .delete(auth(), validate(commentValidation.deleteComment), asyncHandler(commentController.deleteComment));

module.exports = router;
