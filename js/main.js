import { getResultObject } from './data.js';
import { insertImageElement } from './canvas.js';
export const getArrayOfPosts = getResultObject(25,30);
insertImageElement(getArrayOfPosts);
import { renderFullSizeImage } from './render-full-size-img.js';
renderFullSizeImage(getArrayOfPosts);
