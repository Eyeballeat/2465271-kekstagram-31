import { ERROR_SHOW_TIME,
  errorTitleElement
}
  from './source.js';
import { getTemplateElement } from './utils.js';

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
