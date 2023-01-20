const express = require('express');
const app = express();

app.use('/api/posts', (req, res, next) => {
    const posts = [
        {
            id: 1, 
            title: 'First server-side post',
            content: 'This is comming from the server'
        },
        {
            id: 2, 
            title: 'Second server-side post',
            content: 'This is comming from the server!'
        },
    ];
    res.json({
        message: 'Post fetched successfully!',
        posts,
    });
});

module.exports = app;