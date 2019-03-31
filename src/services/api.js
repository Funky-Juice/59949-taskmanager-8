import TaskModel from '../data/task-model';

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

  getTasks() {
    return this._load({url: `tasks`})
      .then((res) => res.json())
      .then(TaskModel.parseTasks);
  }

  createTask() {}

  updateTask({id, data}) {
    return this._load({
      url: `tasks/${id}`,
      method: Method.PUT,
      body: JSON.stringify(data),
      headers: new Headers({'Content-Type': `application/json`})
    })
      .then((res) => res.json())
      .then(TaskModel.parseTask);
  }

  deleteTask({id}) {
    return this._load({url: `tasks/${id}`, method: Method.DELETE});
  }

  syncTasks({tasks}) {
    return this._load({
      url: `tasks/sync`,
      method: Method.POST,
      body: JSON.stringify(tasks),
      headers: new Headers({'Content-Type': `application/json`})
    })
      .then((res) => res.json());
  }

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
