// routes/api.js
const express = require('express');
const axios = require('axios');

const router = express.Router();

// GET /api/posts
router.get('/posts', async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
      params: {
        _page: page,
        _limit: limit,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET /api/posts/1
router.get('/posts/:id', async (req, res) => {
  const postId = req.params.id;
  try {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET /api/posts/1/comments
router.get('/posts/:id/comments', async (req, res) => {
  const postId = req.params.id;
  try {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET /api/comments?postId=1
router.get('/comments', async (req, res) => {
  const postId = req.query.postId;
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/comments', {
      params: {
        postId,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST /api/posts
router.post('/posts', async (req, res) => {
  try {
    const response = await axios.post('https://jsonplaceholder.typicode.com/posts', req.body);
    res.status(201).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// PUT /api/posts/1
router.put('/posts/:id', async (req, res) => {
  const postId = req.params.id;
  try {
    const response = await axios.put(`https://jsonplaceholder.typicode.com/posts/${postId}`, req.body);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// PATCH /api/posts/1
router.patch('/posts/:id', async (req, res) => {
  const postId = req.params.id;
  try {
    const response = await axios.patch(`https://jsonplaceholder.typicode.com/posts/${postId}`, req.body);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE /api/posts/1
router.delete('/posts/:id', async (req, res) => {
  const postId = req.params.id;
  try {
    await axios.delete(`https://jsonplaceholder.typicode.com/posts/${postId}`);
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
