import React, { useState, useEffect } from "react";
import useStyles from './styles';
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from 'react-file-base64'
import { useDispatch } from "react-redux";
import { createPost, updatePost, getPosts } from "../../actions/posts";
import { useSelector } from "react-redux";

const Form = ({currentId, setCurrentId}) => {
    //form template (the data a user can enter)
    const [postData, setPostData] = useState({
        creator : '',
        title : '',
        message : '',
        tags : '',
        selectedFile : ''
    });

    //the find here searches for a post with the same id as the current focused id, returning
    //null if nothing is found.
    const post = useSelector((state) => currentId ? state.posts.find((p) => p._id == currentId) : null)
    const classes = useStyles();
    const dispatch = useDispatch();
    

    

    const handleSubmit = (e) => {
        e.preventDefault();

        if (currentId) {
            dispatch(updatePost(currentId, postData))
            setCurrentId(null)
        } else {
            dispatch(createPost(postData));
        }

        clearForm();
    }

    const clearForm = () => {
        setPostData({creator: '',
        title: '',
        message: '',
        tags: '',
        selectedFile: ''})
        //affecting currentId as in a previous attempt to 
        //update the UI after an edited post proved to not work
        //at all. Somehow, this works. There's likely a better way
        //of doing this then dispatching a getPost then dispatching it again
        //from a result of calling it here, but for now it works and I'm happy.
        dispatch(getPosts())
    }

    //if a change is detected in the variable post, setPostData is ran, populating the form
    //with the data to be edited.
    useEffect(() => {
        if (post) {
            setPostData(post); 
            console.log(post._id);
        }
    }, [post])

    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">{currentId ? 'Editing' : 'Creating'} a Memory</Typography>

                <TextField name="creator" variant="outlined"  label="Creator" fullWidth value = {postData.creator} onChange= {(e) => setPostData({...postData, creator: e.target.value})} />
                <TextField name="title" variant="outlined"  label="Title" fullWidth value = {postData.title} onChange= {(e) => setPostData({...postData, title: e.target.value})} />
                <TextField name="message" variant="outlined"  label="Message" fullWidth value = {postData.message} onChange= {(e) => setPostData({...postData, message: e.target.value})} />
                <TextField name="tags" variant="outlined"  label="Tags" fullWidth value = {postData.tags} onChange= {(e) => setPostData({...postData, tags: e.target.value})} />

                <div className={classes.fileInput}>
                    <FileBase
                        type = "file"
                        multiple = {false}
                        onDone={({base64}) => setPostData({...postData, selectedFile : base64})}
                    />
                </div>

                <Button className = {classes.buttonSubmit} variant="contained" color = "primary" size ="large" type = "submit" fullWidth> Submit </Button>
                <Button variant="contained" color = "secondary" size ="small" onClick={clearForm} fullWidth> Clear </Button>
            </form>
        </Paper>
    );
}

export default Form