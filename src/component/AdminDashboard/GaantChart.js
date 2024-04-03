import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from "axios";

function ProjectCalendarChart() {
  const [projectData, setProjectData] = useState([]);
    const tlid=sessionStorage.getItem("TLID");
  useEffect(() => {
    axios.get(`http://localhost:3001/Project/ProjectwiseTaskDataChart?tlid=${tlid}`)
      .then(response => {
        setProjectData(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching project data:', error);
      });
  }, []);

  const chartData = {
    series: [
      {
        name: 'Completed Tasks',
        data: projectData.map(project => project.completed_tasks || 0)
      },
      {
        name: 'Pending Tasks',
        data: projectData.map(project => project.pending_tasks || 0)
      },
      {
        name: 'Canceled Tasks',
        data: projectData.map(project => project.canceled_tasks || 0)
      }
    ],
    options: {
      chart: {
        type: 'bar',
        height: 400,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded'
        },
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      xaxis: {
        categories: projectData.map(project => project.project_name),
      },
      yaxis: {
        title: {
          text: 'Number of Tasks'
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        custom: function ({ seriesIndex, dataPointIndex, w }) {
          const project = projectData[dataPointIndex];
          return `<div class="tooltip">${w.globals.seriesNames[seriesIndex]} Tasks: ${w.globals.series[seriesIndex][dataPointIndex]}</div>`;
        }
      }
    },
  };

  return (
    <div className='mt-24'>
      <h1>Task Completion Status</h1>
      <div className="w-full h-full">
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="bar"
          height={400}
        />
      </div>
    </div>
  );
}

export default ProjectCalendarChart;