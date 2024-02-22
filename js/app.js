import { AUTORS, DESCRIPTIONS, COMMENT_MESSAGES } from './source.js';
import { getRandomData, createNoRepeatData, getRandomArrayElement } from './transform.js';


// Создаем функцию возвращающую результат
export const getResultObject = (objectCount, commentCount) => {
  const generateDescriptionID = createNoRepeatData(1, objectCount);
  const generateDescriptionURL = createNoRepeatData(1, objectCount);
  const generateCommentID = createNoRepeatData(1, objectCount * commentCount);

  const createCommentsDescription = () => ({
    id: generateCommentID(),
    avatar: `img/avatar-${getRandomData(1, 6)}`,
    message: `${getRandomArrayElement(COMMENT_MESSAGES)}`,
    name: `${getRandomArrayElement(AUTORS)}`
  });

  const createPhotoDescription = () => ({
    id: generateDescriptionID(),
    url: `photos/${generateDescriptionURL()}.jpg`,
    description: `${getRandomArrayElement(DESCRIPTIONS)}`,
    likes: getRandomData(15,200),
    comments: Array.from({length: getRandomData(0, commentCount)}, createCommentsDescription)
  });
  return Array.from({length: objectCount}, createPhotoDescription);
};
