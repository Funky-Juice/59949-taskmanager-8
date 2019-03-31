
export default class Provider {
  constructor({api}) {
    this._api = api;
  }

  updateTask({id, data}) {
    return this._api.updateTask({id, data});
  }

  createTask({task}) {
    return this._api.createTask({task});
  }

  deleteTask({id}) {
    return this._api.deleteTask({id});
  }

  getTasks() {
    return this._api.getTasks();
  }
}
