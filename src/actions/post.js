import * as api from "../api";

/*action creators are function that return action
To Fetch all post its gonna take time so we need to use redux thunk
function that return another function and use async await property
here so when using thunk instead of returning the action action has to be dispatched*/

export const getPosts = (page) => async (dispatch) => {
  try {
    const { data, currentPage,numberOfPage} = await api.fetchPosts(page);
    const action = { type: "FETCH_ALL_POSTS", payload: data };
    dispatch(action);
  } catch (error) {
    console.log("error in getPosts: ", error);
  }
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try {
    const { data } = await api.fetchPostsBySearch(searchQuery);
    const action = { type: "FETCH_ALL_POSTS_BY_SEARCH", payload: data };
    dispatch(action);
  } catch (error) {
    console.log("error in getPostsBySearch: ", error);
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    console.log("post", post);
    const { data } = await api.createPost(post);
    console.log("data", data);
    dispatch({ type: "CREATE_POST", payload: data });
  } catch (error) {
    console.log("errro in creating Post:", error);
  }
};
export const updatePost = (id, updatedPost) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, updatedPost);
    dispatch({ type: "UPDATE_POST", payload: data });
  } catch (error) {
    console.log("error while updating post:", error);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    dispatch({ type: "DELETE_POST", payload: id });
  } catch (error) {
    console.log("error while deleting:", error);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);
    dispatch({ type: "LIKE_POST", payload: data });
  } catch (error) {
    console.log("error in LikePost:", error);
  }
};
