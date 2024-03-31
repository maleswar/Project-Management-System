import React from 'react';
import { GanttComponent, Inject } from '@syncfusion/ej2-react-gantt';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';


const GanttChart = () => {
  // Define your task data
  const taskDataSource = new DataManager({
    url: 'https://js.syncfusion.com/demos/ejservices/api/GanttData/Url',
    adaptor: new WebApiAdaptor(),
    crossDomain: true
});

// Define columns for the Gantt chart
const columns = [
    { field: 'TaskID', headerText: 'Task ID' },
    { field: 'TaskName', headerText: 'Task Name', width: '250' },
    { field: 'StartDate', headerText: 'Start Date' },
    { field: 'EndDate', headerText: 'End Date' },
    { field: 'Duration', headerText: 'Duration' }
];

return (
    <div className='control-pane'>
        <div className='control-section'>
            <div className='control-wrapper'>
                {/* Render the Gantt component */}
                <GanttComponent dataSource={taskDataSource} columns={columns}>
                    <Inject services={[/* Add necessary services */]} />
                </GanttComponent>
            </div>
        </div>
    </div>
);
};

export default GanttChart;
