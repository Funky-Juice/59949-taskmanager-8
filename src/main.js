import {renderFilters, renderTasks} from './render-elems';
import {dataTemplate, filtersList} from './data/data';
import {generateData} from './utils';

const tasksData = generateData(dataTemplate);

renderFilters(filtersList, tasksData);
renderTasks(tasksData);
