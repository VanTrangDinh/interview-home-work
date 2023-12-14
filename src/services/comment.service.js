'use strict';

const { NotFoundError } = require('../core/error.response');
const Comment = require('../models/comment.model');
const Post = require('../models/post.model');
const { converToObjectInMongodb } = require('../utils/index');

class CommentService {
  static async creatComment({ postId, content, parentCommentId = null }, userId) {
    //check post already exists
    const foundPost = await Post.findById(postId);

    if (!foundPost) throw new NotFoundError('Post not found');

    const comment = new Comment({
      comment_postId: postId,
      comment_userId: userId,
      comment_content: content,
      comment_parentId: parentCommentId,
    });

    let rightValue;
    if (parentCommentId) {
      //reply comment

      const parentComment = await Comment.findById(parentCommentId);
      console.log(parentComment);

      if (!parentComment) throw new NotFoundError('Parent comment not found');

      rightValue = parentComment.comment_right;

      //updateMany  comments

      await Comment.updateMany(
        {
          comment_postId: converToObjectInMongodb(postId),
          comment_right: { $gte: rightValue },
        },
        {
          $inc: { comment_right: 2 },
        }
      );

      await Comment.updateMany(
        {
          comment_postId: converToObjectInMongodb(postId),
          comment_left: { $gt: rightValue },
        },
        {
          $inc: { comment_left: 2 },
        }
      );
    } else {
      const maxRightValue = await Comment.findOne(
        {
          comment_postId: converToObjectInMongodb(postId),
        },
        'comment_right',
        { sort: { comment_right: -1 } }
      );

      if (maxRightValue) {
        rightValue = maxRightValue.right + 1;
      } else {
        rightValue = 1;
      }
    }

    //insert comment
    comment.comment_left = rightValue;
    comment.comment_right = rightValue + 1;

    await comment.save();
    return comment;
  }

  static async getCommentByParentId({ postId, parentCommentId = null, limit = 50, offset = 0 }) {
    if (parentCommentId) {
      const parent = await Comment.findById(parentCommentId);

      if (!parent) throw new NotFoundError(`Comment ${parentCommentId} not found`);

      const comments = await Comment.find({
        comment_postId: converToObjectInMongodb(postId),
        comment_left: { $gt: parent.comment_left },
        comment_right: { $lte: parent.comment_right },
      })
        .select({ comment_left: 1, comment_right: 1, comment_content: 1, comment_parentId: 1 })
        .sort({ comment_left: 1 });

      return comments;
    }
    const comments = await Comment.find({
      comment_postId: converToObjectInMongodb(postId),
      comment_parentId: parentCommentId,
    })
      .select({ comment_left: 1, comment_right: 1, comment_content: 1, comment_parentId: 1 })
      .sort({ comment_left: 1 });

    return comments;
  }

  static async deleteComment({ commentId, postId }) {
    //check post already exists
    const foundPost = await Post.findById(postId);

    if (!foundPost) throw new NotFoundError('Post not found');

    //comment_left, comment_right ?
    const comment = await Comment.findById(commentId);

    if (!comment) throw new NotFoundError('Comment not found');

    const leftValue = comment.comment_left;
    const rightValue = comment.comment_right;

    const width = rightValue - leftValue + 1;

    //delete all children of comment
    await Comment.deleteMany({
      comment_postId: converToObjectInMongodb(postId),
      comment_left: { $gte: leftValue, $lte: rightValue },
    });

    //update comment_left value and comment_right value
    await Comment.updateMany(
      {
        comment_postId: converToObjectInMongodb(postId),
        comment_right: { $gt: rightValue },
      },
      {
        $inc: { comment_right: -width },
      }
    );

    await Comment.updateMany(
      {
        comment_postId: converToObjectInMongodb(postId),
        comment_right: { $gt: rightValue },
      },
      {
        $inc: { comment_left: -width },
      }
    );

    return true;
  }
}

module.exports = CommentService;
