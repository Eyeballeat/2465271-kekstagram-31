// Создаем объект с описанием свойств эффектов и функции для его заполнения
const state = {
  posts: null,
  currentPost: null,
  currentComments: 0,
};
// Установка массива постов в объект
const setPostsData = (posts) => {
  state.posts = posts;
};
// Получение массива постов из объекта
const getPostsData = () => state.posts;
// Установка текущего обрабатываемого поста в объект
const setCurrentPostData = (value) => {
  state.currentPost = value;
};
// Установка текущего ID коментария в объект
const setCurrentCommentsData = (count) => {
  state.currentComments = count;
};
// Получения поста по его ID
const getPostbyId = (id) => state.posts.find((elem) => elem.id === id);
const getCommentsFromCurrentPost = () => {
  const post = getPostbyId(state.currentPost);
  return post.comments;
};
// Функция очистки объекта
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
