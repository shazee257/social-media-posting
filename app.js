const express = require('express');
require('dotenv').config();
const FB = require('fb');
const fs = require('fs');
const app = express();
const { FB_PAGE_TOKEN, FB_PAGE_ID } = process.env;

FB.setAccessToken(FB_PAGE_TOKEN);


// // facebook page (image live url)
// app.post("/fb-page-post", async (req, res) => {
//     FB.api('me/photos', 'post', {
//         message: "Test Post from Node.js API 6",
//         url: "https://images.unsplash.com/photo-1693370268702-92402dd47484?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60"
//     }, (result) => {
//         if (!result || result.error) {
//             console.log(!result ? 'error occurred' : result.error);
//             return res.status(500).json({ error: "Something went wrong" });
//         }
//         console.log('Post Id: ' + result.id);
//         res.json(result.id);
//     });
// });


// const imagePaths = ['./test2.jpeg', './test.jpeg'];

// // Function to upload images one by one
// function uploadImages(images, callback) {
//     if (images.length === 0) {
//         callback([]);
//         return;
//     }

//     const imagePath = images.pop();

//     FB.api('me/photos', 'post', {
//         source: fs.createReadStream(imagePath),
//         caption: 'My vacation'
//     }, (result) => {
//         if (!result || result.error) {
//             console.log(!result ? 'Error occurred' : result.error);
//             callback(null);
//         } else {
//             console.log('Image uploaded. Post Id: ' + result.id);
//             uploadImages(images, (remainingImages) => {
//                 if (remainingImages === null) {
//                     callback(null);
//                 } else {
//                     callback([result.id, ...remainingImages]);
//                 }
//             });
//         }
//     });
// }

// // Endpoint to create a post with multiple images
// app.post("/fb-page-post", async (req, res) => {
//     uploadImages([...imagePaths], (uploadedImageIds) => {
//         if (uploadedImageIds === null) {
//             return res.status(500).json({ error: "Something went wrong" });
//         }

//         // Now that all images are uploaded, create a post with the image IDs
//         const imageAttachments = uploadedImageIds.map((imageId) => ({
//             media_fbid: imageId
//         }));

//         FB.api('me/feed', 'post', {
//             message: 'My vacation post with multiple images',
//             attached_media: imageAttachments
//         }, (result) => {
//             if (!result || result.error) {
//                 console.log(!result ? 'Error occurred' : result.error);
//                 return res.status(500).json({ error: "Something went wrong" });
//             }
//             console.log('Post created with multiple images. Post Id: ' + result.id);
//             res.json(result.id);
//         });
//     });
// });

// facebook page (local image)
app.post("/fb-page-post", async (req, res) => {
    FB.api('me/photos', 'post', {
        source: fs.createReadStream('./test2.jpeg'),
        caption: 'Post via node.js API'
    }, (result) => {
        if (!result || result.error) {
            console.log(!result ? 'error occurred' : result.error);
            return res.status(500).json({ error: "Something went wrong" });
        }
        console.log('Post Id: ' + result.id);
        res.json(result.id);
    });
});

// // facebook batch request
// app.post("/fb-page-post", async (req, res) => {
//     var message = 'Hi from facebook-node-js';
//     FB.api('', 'post', {
//         batch: [
//             { method: 'post', relative_url: 'me/feed', body: 'message=' + encodeURIComponent(message) }
//         ]
//     }, function (res) {
//         var res0;

//         if (!res || res.error) {
//             console.log(!res ? 'error occurred' : res.error);
//             return;
//         }

//         res0 = JSON.parse(res[0].body);

//         if (res0.error) {
//             console.log(res0.error);
//         } else {
//             console.log('Post Id: ' + res0.id);
//         }
//     });
// });


module.exports = app;