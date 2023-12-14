const express = require('express');
const validate = require('../../middlewares/validate');
const commentController = require('../../controllers/comment.controller');
const asyncHandler = require('../../helpers/asyncHandle');
const auth = require('../../middlewares/auth');
const { commentValidation } = require('../../validations');

const router = express.Router();

router.route('/').post(auth(), validate(commentValidation.creatComment), asyncHandler(commentController.creatComment));
//   .get(/* auth(),  */ validate(postValidation.getPosts), asyncHandler(postController.getPosts));

// router
//   .route('/:postId')
//   .get(validate(postValidation.getPost), asyncHandler(postController.getPostById))
//   .patch(auth(), validate(postValidation.updatePost), asyncHandler(postController.updatePost))
//   .delete(auth(), validate(postValidation.deletePost), asyncHandler(postController.deletePost));

module.exports = router;

/* 

router.post('/', auth(), asyncHandler(commentController.creatComment));
router.get('/', asyncHandler(commentController.getCommentByParentId));

*/
