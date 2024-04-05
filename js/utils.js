const isEscapeButton = (evt) => evt.key === 'Escape';

const getTemplateElement = (templateId, selector) => {
  const template = document.querySelector(templateId).content;
  return (selector ? template.querySelector(selector) : template).cloneNode(
    true
  );
};

const removeDebounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {
  isEscapeButton,
  getTemplateElement,
  removeDebounce,
};
