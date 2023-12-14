const express = require('express');
const validate = require('../../middlewares/validate');
const authValidation = require('../../validations/auth.validation');
const authController = require('../../controllers/auth.controller');
const postController = require('../../controllers/post.controller');
const asyncHandler = require('../../helpers/asyncHandle');
const auth = require('../../middlewares/auth');
const { postValidation } = require('../../validations');

const router = express.Router();

router
  .route('/')
  .post(auth(), validate(postValidation.createPost), asyncHandler(postController.createPost))
  .get(/* auth(),  */ validate(postValidation.getPosts), asyncHandler(postController.getPosts));

router
  .route('/:postId')
  .get(validate(postValidation.getPost), asyncHandler(postController.getPostById))
  .patch(auth(), validate(postValidation.updatePost), asyncHandler(postController.updatePost))
  .delete(auth(), validate(postValidation.deletePost), asyncHandler(postController.deletePost));

module.exports = router;
