
const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

export default class API {
  constructor(apiUrl, authorization) {
    this._api = apiUrl;
    this._authorization = authorization;
  }

  getTasks() {}

  createTask() {}

  updateTask() {}

  deleteTask() {}

  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._api}/${url}`, {method, body, headers})
      .then(checkStatus)
      .catch((err) => {
        // eslint-disable-next-line
        console.error(`fetch error: ${err}`);
        throw err;
      });
  }
}
