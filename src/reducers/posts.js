
export default (state = [], action) => {
  switch (action.type) {
    case "FETCH_ALL_POSTS":
      console.log('action.payload',action.payload)
      return {
        ...state,
        posts:action.payload.data,
        currentPage:action.payload.currentPage,
        numberOfPage:action.payload.numberOfPage,
      };
    case "FETCH_ALL_POSTS_BY_SEARCH":
      return {
        ...state,
        posts:action.payload.data,
        currentPage:action.payload.currentPage,
        numberOfPage:action.payload.numberOfPage,
      };
    case "CREATE_POST":
      return [...state, action.payload];
    case "UPDATE_POST":
    case "LIKE_POST":
      return state.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    case 'DELETE_POST':
        return state.filter((post)=> post._id!==action.payload);
    default:
      return state;
  }
};
