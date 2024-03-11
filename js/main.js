import { getResultObject } from './data.js';
import { setPostsData } from './state.js';
import { insertImageElement } from './canvas.js';
import { validationOfForm } from './form.js';
const getArrayOfPosts = getResultObject(25,30);
setPostsData(getArrayOfPosts);
insertImageElement();
validationOfForm();
