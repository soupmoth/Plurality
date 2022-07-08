
//When an action is dispatched, we come here to handle the logic.
export default (posts = [], action) => {
    switch (action.type) {
        case 'FETCH_ALL':
            //return api data from Fetch All action
            return action.payload;
        case 'CREATE':
            return [...posts, action.payload];
        case 'UPDATE':
            //take the array of posts, and use a predicate along the map. If the map finds the
            //post of the one we wish to change, then that and only that post has its data changed.
            return posts.map((post) => post._id == action.payload._id ? action.payload : post);
        case 'DELETE':
            return posts.filter((post) => post._id != action.payload._id);
        default:
            return posts;
    }
}