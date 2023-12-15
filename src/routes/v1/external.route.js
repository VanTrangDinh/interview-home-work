const express = require('express');
const validate = require('../../middlewares/validate');
const externalApiController = require('../../controllers/external.controller');
const asyncHandler = require('../../helpers/asyncHandle');
const auth = require('../../middlewares/auth');
const { externalApiValidation } = require('../../validations');

const router = express.Router();

router
  .route('/posts')
  .post(auth(), validate(externalApiValidation.createPost), asyncHandler(externalApiController.createPost))
  .get(validate(externalApiValidation.getPosts), asyncHandler(externalApiController.getPosts));

router
  .route('/posts/:id')
  .get(validate(externalApiValidation.getPostById), asyncHandler(externalApiController.getPostById))
  .put(auth(), validate(externalApiValidation.updatePost), asyncHandler(externalApiController.updatePost))
  .patch(
    auth(),
    validate(externalApiValidation.partiallyUpdatePost),
    asyncHandler(externalApiController.partiallyUpdatePost)
  )
  .delete(auth(), validate(externalApiValidation.deletePost), asyncHandler(externalApiController.deletePost));

router
  .route('/posts/:id/comments')
  .get(validate(externalApiValidation.getCommentsByPostId), asyncHandler(externalApiController.getCommentsByPostId));

router
  .route('/comments')
  .get(validate(externalApiValidation.getCommentsByQuery), asyncHandler(externalApiController.getPostComments));
module.exports = router;
