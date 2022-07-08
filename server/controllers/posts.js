import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';

//When we create a post, the server delegates to this controller, and adds the
//post to the database by utilising the model outlined in PostMessage.
export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find();

        res.status(200).json(postMessages);
        console.log("Finished Get");
    } catch (error) {
        res.status(404).json({message : error.message})
    }
}

//When we create a post, the server delegates to this controller, and adds the
//post to the database by utilising the model outlined in PostMessage.
export const createPost = async (req, res) => {
    const post = req.body;

    const newPost = new PostMessage(post)

    try {
        await newPost.save();

        res.status(201).json(newPost);
        console.log("Finished Create");

    } catch (error) {
        res.status(409).json( { message: error.message} )
    }
}

//When we update a post, the server delegates to this controller, updating the data
//in the database.
export const updatePost = async (req, res) => {

    const { id: _id } = req.params;
    const post = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with such an id');

    
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {new:true});

    res.json(updatedPost);
    console.log("Finished Update");
}

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with such an id');


    await PostMessage.findByIdAndRemove(id)
    
    console.log("Finished Delete");
}