import * as api from '../api';

//Action creators

//this is dispatched to when 
export const getPosts = () => async (dispatch) => {

    try {
        const {data} = await api.fetchPosts();

        dispatch({ type: 'FETCH_ALL', payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const createPost = (post) => async (dispatch) => {
    try { 
        const { data } = await api.createPost(post);

        dispatch({type : 'CREATE', payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const updatePost = (id, post) => async (dispatch) => {
    try {
        const {data} = await api.updatePost(id, post); 
        await dispatch({type: 'UPDATE', payload: data})

        const {data2} = await api.fetchPosts();
        
        dispatch({ type: 'FETCH_ALL', payload: data2});
    } catch (error) {
        console.log(error);
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id);

        await dispatch({type: 'DELETE', payload: id})

        const {data} = await api.fetchPosts();

        dispatch({ type: 'FETCH_ALL', payload: data});
    } catch (error) {
        console.log(error);
    }
}