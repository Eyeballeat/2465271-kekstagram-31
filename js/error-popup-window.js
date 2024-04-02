import { ERROR_SHOW_TIME,
  errorTitleElement
}
  from './source.js';
import { getTemplateElement } from './util.js';
// Создаем всплывающее на 5 секунд окно с указанием ошибки загрузки данных с сервера
const errorContainerElement = getTemplateElement('#data-error', '.data-error');
export const showErrorMessage = (message) => {
  if (message) {
    errorTitleElement.textContent = message;
  }
  document.body.appendChild(errorContainerElement);
  setTimeout(() => {
    errorContainerElement.remove();
  }, ERROR_SHOW_TIME);
};
