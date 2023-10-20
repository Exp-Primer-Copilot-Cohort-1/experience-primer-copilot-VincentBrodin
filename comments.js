// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
// Create an express app
const app = express();
// Use bodyParser to parse the body of the request
app.use(bodyParser.json());
// Use cors to allow cross-origin requests
app.use(cors());
// Create a comments object
const commentsByPostId = {};
// Create a route to get all comments for a post
app.get('/posts/:id/comments', (req, res) => {
    // Send back the comments for the post id
    res.send(commentsByPostId[req.params.id] || []);
});
// Create a route to create a comment for a post
app.post('/posts/:id/comments', (req, res) => {
    // Create a random id for the comment
    const commentId = randomBytes(4).toString('hex');
    // Get the comment content from the request body
    const { content } = req.body;
    // Get the comments for the post id
    const comments = commentsByPostId[req.params.id] || [];
    // Push the new comment to the comments
    comments.push({ id: commentId, content });
    // Save the comments for the post id
    commentsByPostId[req.params.id] = comments;
    // Send back the comments
    res.status(201).send(comments);
});
// Listen on port 4001
app.listen(4001, () => {
    console.log('Listening on 4001');
});