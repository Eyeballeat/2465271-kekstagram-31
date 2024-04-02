const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';

const createRequest = async (route, method, errorText, body = null) => {
  try {
    const response = await fetch(`${BASE_URL}${route}`, { method, body });
    if (!response.ok) {
      throw new Error();
    }
    return await response.json();
  } catch {
    throw new Error(errorText);
  }
};

const getData = () => createRequest(
  '/data',
  'GET',
  'Не удалось загрузить данные. Попробуйте обновить страницу'
);

const sendData = (body) => createRequest(
  '/',
  'POST',
  'Не удалось отправить данные. Попробуйте обновить страницу',
  body
);

export { getData, sendData };
