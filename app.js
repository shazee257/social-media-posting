const express = require('express');
const axios = require('axios');
require('dotenv').config();
const app = express();
const { ACCESS_TOKEN, INSTAGRAM_ID } = process.env;

// instagram posting
app.post("/ig-post", async (req, res) => {
    const response = await axios.post(`https://graph.facebook.com/${INSTAGRAM_ID}/media?access_token=${ACCESS_TOKEN}`, {
        "caption": "There is plastic...!\nJoin Us!",
        "image_url": "https://litterguru-web.techup.sg/assets/images/gallery-6.jpg"
    });

    if (response?.data?.id) {
        const post = await axios.post(`https://graph.facebook.com/${INSTAGRAM_ID}/media_publish?creation_id=${response?.data?.id}&access_token=${ACCESS_TOKEN}`);

        // check if post is not created
        if (!post?.data?.id) {
            return res.status(500).json({ error: "Something went wrong" });
        }

        console.log('successfully posted to page!', post?.data);
        res.json({ 'post_id': post?.data?.id, message: "success" });
    }
});


module.exports = app;