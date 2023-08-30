const express = require('express');
require('dotenv').config();
const axios = require("axios");

const app = express();

const { FB_PAGE_TOKEN, FB_PAGE_ID } = process.env;

// facebook page (single image post)
app.post("/fb-page-post", async (req, res) => {
    const response = await axios.post(`https://graph.facebook.com/${FB_PAGE_ID}/photos?access_token=${FB_PAGE_TOKEN}`, {
        "message": "Post 6 from Node.js API",
        "url": "https://litterguru-web.techup.sg/assets/images/reality/reality-2-after.jpeg"
    });

    if (!response) {
        return res.status(500).json({ error: "Something went wrong" });
    }

    res.json(response.data);
});

// facebook page (multiple posts)
app.post("/fb-posts", async (req, res) => {
    const photoUrls = [
        "https://litterguru-web.techup.sg/assets/images/reality/reality-2-after.jpeg",
        "https://litterguru-web.techup.sg/assets/images/reality/reality-2-after.jpeg",
        "https://litterguru-web.techup.sg/assets/images/reality/reality-2-after.jpeg"
    ];

    const photoUploadPromises = photoUrls.map(async (url) => {
        const response = await axios.post(`https://graph.facebook.com/${FB_PAGE_ID}/photos?access_token=${FB_PAGE_TOKEN}`, {
            "message": "Post from Node.js API",
            "url": url
        });

        return response.data;
    });

    try {
        const uploadResults = await Promise.all(photoUploadPromises);
        res.json(uploadResults);
    } catch (error) {
        console.error("Error uploading photos:", error);
        res.status(500).json({ error: "Something went wrong" });
    }
});

app.post("/fb-post-urls", async (req, res) => {
    const photoUrls = [
        "https://litterguru-web.techup.sg/assets/images/reality/reality-2-after.jpeg",
        "https://litterguru-web.techup.sg/assets/images/reality/reality-2-after.jpeg",
        "https://litterguru-web.techup.sg/assets/images/reality/reality-2-after.jpeg"
    ];

    const mediaAttachments = photoUrls.map((url) => {
        return {
            media_type: "IMAGE",
            url: url
        };
    });

    const postData = {
        message: "Post from Node.js API with multiple images",
        attached_media: mediaAttachments
    };

    try {
        const response = await axios.post(`https://graph.facebook.com/${FB_PAGE_ID}/feed?access_token=${FB_PAGE_TOKEN}`, postData);
        res.json(response.data);
    } catch (error) {
        console.error("Error posting with multiple images:", error);
        res.status(500).json({ error: "Something went wrong" });
    }
});

module.exports = app;