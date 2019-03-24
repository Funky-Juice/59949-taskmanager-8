
export default class TaskModel {
  constructor(data) {
    this.id = data[`id`];
    this.color = data[`color`];
    this.title = data[`title`] || ``;
    this.picture = data[`picture`] || ``;
    this.dueDate = data[`due_date`];
    this.tags = [...new Set(data[`tags`])] || [];
    this.repeatingDays = data[`repeating_days`];
    this.isFavorite = Boolean(data[`is_favorite`]);
    this.isDone = Boolean(data[`is_done`]);
  }

  static parseTask(data) {
    return new TaskModel(data);
  }

  static parseTasks(data) {
    return data.map(TaskModel.parseTask);
  }
}
