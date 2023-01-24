require('dotenv').config();
const express = require('express');
const app = express();
const Post = require('./models/Post');

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 
    'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Alllow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    next();
});

app.post('/api/posts', async(req, res, next) => {
    const post = req.body;
    console.log( typeof await Post.create({ title: post.title, content: post.content}));
    res.status(201).json({
        message: 'Post added successfully',
    });
});

app.put('/api/posts/:id', async (req, res, next) => {
    console.log(req.body);
    console.log(req.params);
    let post = { title: req.body.title, content: req.body.content };
    await Post.update(post, { where: { id: req.params.id } });
    res.status(200).json({
        message: 'Post updated successfully!'
    });
});

app.get('/api/posts', async (req, res, next) => {
    const posts = await Post.findAll();
    res.status(200).json({
        message: 'Post fetched successfully!',
        posts,
    });
});

app.delete('/api/posts/:id', async (req, res, next) => {
    await Post.destroy({
        where: {
            id: req.params.id,
        }
    });
    const posts = await Post.findAll();
    res.status(202).json({
        message: 'A post was deleted successfully',
        posts,
    });
});

module.exports = app;