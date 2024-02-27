import { getResultObject } from './data.js';
import { insertImageElement } from './canvas.js';
const getArrayOfPosts = getResultObject(25,30);
insertImageElement(getArrayOfPosts);
