import {renderFilters, renderTasks} from './render-elems';
import {tasksData, filtersList} from './data/data';
import './menu';


renderFilters(filtersList, tasksData);
renderTasks(tasksData);
