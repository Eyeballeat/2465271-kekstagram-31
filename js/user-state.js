const state = {
  posts: null,
  currentPost: null,
  currentComments: 0,
};

const setPostsData = (posts) => {
  state.posts = posts;
};

const getPostsData = () => state.posts;

const setCurrentPostData = (value) => {
  state.currentPost = value;
};

const setCurrentCommentsData = (count) => {
  state.currentComments = count;
};

const getPostbyId = (id) => state.posts.find((elem) => elem.id === id);
const getCommentsFromCurrentPost = () => {
  const post = getPostbyId(state.currentPost);
  return post.comments;
};

const clearStateData = () => {
  state.currentPost = 0;
  state.currentComments = null;
};

export {
  state,
  setPostsData,
  setCurrentPostData,
  setCurrentCommentsData,
  getPostbyId,
  getCommentsFromCurrentPost,
  clearStateData,
  getPostsData
};
