const express = require('express');
require('dotenv').config();
const FB = require('fb');
const axios = require("axios");

const app = express();
const { FB_PAGE_TOKEN, FB_PAGE_ID } = process.env;

FB.setAccessToken(FB_PAGE_TOKEN);




// facebook page (single image post)
app.post("/fb-page-post", async (req, res) => {
    FB.api('me/photos', 'post', {
        message: "Test Post from Node.js API",
        // link: "www.google.com",
        url: "https://images.unsplash.com/photo-1693370268702-92402dd47484?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60"
    }, (result) => {
        if (!result || result.error) {
            console.log(!result ? 'error occurred' : result.error);
            return res.status(500).json({ error: "Something went wrong" });
        }
        console.log('Post Id: ' + result.id);
        res.json(result.id);
    });


    // "message": "Image Post from Node.js API",
    // "url": "https://images.unsplash.com/photo-1693370268702-92402dd47484?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60"
    //     "message": "Video Post from Node.js API",
    //     "link": "www.google.com",
    //     "source": "https://images.unsplash.com/photo-1693370268702-92402dd47484?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60"
    //     // "url": "https://peacemakers3.s3.us-east-2.amazonaws.com/uploads/6e8ff526-3879-444b-9ebc-834d8ad41412-monarch_-_327%20(720p).mp4"

    //     return res.status(500).json({ error: "Something went wrong" });
    // }

    // res.json(response.data);

    // const response = await axios.post(`https://graph.facebook.com/${FB_PAGE_ID}/me/photos?access_token=${FB_PAGE_TOKEN}`, {
    //     // "message": "Image Post from Node.js API",
    //     // "url": "https://images.unsplash.com/photo-1693370268702-92402dd47484?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60"
    //     "message": "Video Post from Node.js API",
    //     "link": "www.google.com",
    //     "source": "https://images.unsplash.com/photo-1693370268702-92402dd47484?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60"

    //     // "url": "https://peacemakers3.s3.us-east-2.amazonaws.com/uploads/6e8ff526-3879-444b-9ebc-834d8ad41412-monarch_-_327%20(720p).mp4"

    // });

    // if (!response) {
    //     return res.status(500).json({ error: "Something went wrong" });
    // }

    // res.json(response.data);
});





module.exports = app;