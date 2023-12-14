'use strict';

const { NotFoundError, AuthFailureError } = require('../core/error.response');
const Post = require('../models/post.model');

class PostService {
  static async searchPostByKeys({ keySearch }) {
    const regexSearch = new RegExp(keySearch);

    const results = await Post.find(
      {
        $text: { $search: regexSearch },
      },
      { score: { $meta: 'textScore' } }
    )
      .sort({ score: { $meta: 'textScore' } })
      .lean();

    console.log({ results });
    return results;
  }

  static async createPost({ title, content }, userId) {
    const post = new Post({
      title,
      content,
      author: userId,
    });

    await post.save();
    return post;
  }

  static async getPosts({ limit = 50, offset = 0 }) {
    const posts = await Post.find()
      .select({ title: 1, content: 1, author: 1, createdAt: 1 })
      .limit(limit)
      .skip(offset)
      .sort({ createdAt: -1 });

    return posts;
  }

  static async getPostById(postId) {
    const post = await Post.findById(postId);
    if (!post) {
      throw new NotFoundError('Post not found');
    }
    return post;
  }

  static async updatePost({ postId, userId, title, content }) {
    console.log({ postId, userId, title, content });
    const post = await Post.findById(postId);
    if (!post) {
      throw new NotFoundError(`Post with id ${postId} not found`);
    }

    // Check if the user is the author of the post
    if (post.author.toString() !== userId.toString()) {
      throw new AuthFailureError('You are not authorized to update this post');
    }

    post.title = title;
    post.content = content;
    await post.save();

    return post;
  }

  static async deletePost(postId, userId) {
    const post = await Post.findOne({ _id: postId, author: userId });

    if (!post) {
      throw new NotFoundError('Post not found or you do not have permission to delete it.');
    }

    await post.remove();
    return post;
  }
}

module.exports = PostService;
