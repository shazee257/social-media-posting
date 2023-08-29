const express = require('express');
require('dotenv').config();
const SocialPost = require("social-post-api");

const app = express();
const { API_KEY } = process.env;
const social = new SocialPost(API_KEY);

// post on fb page
// multiple images in premium plan
// schedule post in premium plan
app.post('/fb-page-post', async (req, res) => {
    const post = await social.post({
        "post": "Today is a great day, test 5!",
        // "scheduleDate": "2023-08-30T12:30:00Z",
        "platforms": ["facebook"],
        "mediaUrls": ["https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"],
    }).catch(console.error);

    res.json(post);

});

// post on facebook group
// you can post in your created group only
app.post('/fb-group-post', async (req, res) => {
    const post = await social.post({
        "post": "Today is a great day, test 5!",
        "platforms": ["fbg"],
        "mediaUrls": [
            "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"

        ],
    }).catch(console.error);

    res.json(post);

});



module.exports = app;