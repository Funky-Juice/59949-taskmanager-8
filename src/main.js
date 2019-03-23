import {renderFilters, renderTasks} from './screen/tasks-screen';
import {tasksData, filtersList} from './data/data';
import './menu';


renderFilters(filtersList, tasksData);
renderTasks(tasksData);
