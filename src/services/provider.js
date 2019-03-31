
export default class Provider {
  constructor({api, store}) {
    this._api = api;
    this._store = store;
  }

  updateTask({id, data}) {
    return this._api.updateTask({id, data})
      .then((task) => {
        this._store.setItem({key: task.id, item: task.toRAW()});
        return task;
      });
  }

  createTask({task}) {
    return this._api.createTask({task});
  }

  deleteTask({id}) {
    return this._api.deleteTask({id})
      .then(() => {
        this._store.removeItem({key: id});
      });
  }

  getTasks() {
    return this._api.getTasks()
      .then((tasks) => {
        tasks.map((it) => this._store.setItem({key: it.id, item: it.toRAW()}));
        return tasks;
      });
  }
}
