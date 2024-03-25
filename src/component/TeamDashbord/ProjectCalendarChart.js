// import { useEffect, useState } from 'react';
import React, {useState,useEffect} from 'react';
import ReactApexChart from 'react-apexcharts';



function ProjectCalendarChart() {
    // const series = [
    //     {
    //       data: [
    //         {
    //           x: 'Task A',
    //           y: [new Date('2022-01-01').getTime(), new Date('2022-01-07').getTime()],
    //           fillColor: '#008FFB',
    //         },
    //         {
    //           x: 'Task B',
    //           y: [new Date('2022-01-05').getTime(), new Date('2022-01-10').getTime()],
    //           fillColor: '#00E396',
    //         },
    //         {
    //           x: 'Task C',
    //           y: [new Date('2022-01-08').getTime(), new Date('2022-01-15').getTime()],
    //           fillColor: '#FEB019',
    //         },
    //         {
    //           x: 'Task D',
    //           y: [new Date('2022-01-12').getTime(), new Date('2022-01-18').getTime()],
    //           fillColor: '#FF4560',
    //         },
    //         {
    //           x: 'Task E',
    //           y: [new Date('2022-01-15').getTime(), new Date('2022-01-20').getTime()],
    //           fillColor: '#775DD0',
    //         },
    //         {
    //           x: 'Task F',
    //           y: [new Date('2022-01-18').getTime(), new Date('2022-01-24').getTime()],
    //           fillColor: '#3F51B5',
    //         },
    //         {
    //           x: 'Task G',
    //           y: [new Date('2022-01-22').getTime(), new Date('2022-01-28').getTime()],
    //           fillColor: '#1BC5BD',
    //         },
    //         {
    //           x: 'Task H',
    //           y: [new Date('2022-01-25').getTime(), new Date('2022-01-31').getTime()],
    //           fillColor: '#33691E',
    //         },
    //         {
    //           x: 'Task I',
    //           y: [new Date('2022-01-28').getTime(), new Date('2022-02-03').getTime()],
    //           fillColor: '#FFD600',
    //         },
    //         {
    //           x: 'Task J',
    //           y: [new Date('2022-02-01').getTime(), new Date('2022-02-07').getTime()],
    //           fillColor: '#FF6D00',
    //         },
    //       ],
    //     },
    //   ];
    
    //   const options = {
    //     chart: {
    //       height: 350,
    //       type: 'rangeBar',
    //     },
    //     plotOptions: {
    //       bar: {
    //         horizontal: true,
    //         barHeight: '80%',
    //       },
    //     },
    //     xaxis: {
    //       type: 'datetime',
    //     },
    //     fill: {
    //       opacity: 1,
    //     },
    //     legend: {
    //       position: 'top',
    //       horizontalAlign: 'left',
    //     },
    //   };
    const projectData = {
      "Project A": { completedTasks: 50, pendingTasks: 20, teamMembers: ["John", "Alice", "Bob"] },
      "Project B": { completedTasks: 40, pendingTasks: 10, teamMembers: ["Alice", "Charlie", "David"] },
      "Project C": { completedTasks: 30, pendingTasks: 5, teamMembers: ["John", "David", "Eve"] },
    };
  
    const chartData = {
      series: [
        {
          name: 'Completed Tasks',
          data: Object.values(projectData).map(project => project.completedTasks)
        },
        {
          name: 'Pending Tasks',
          data: Object.values(projectData).map(project => project.pendingTasks)
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
          categories: Object.keys(projectData),
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
          custom: function({ seriesIndex, dataPointIndex, w }) {
            const project = Object.values(projectData)[dataPointIndex];
            if (seriesIndex === 0) { // Only show tooltip for completed tasks
              const teamMembers = project.teamMembers.join(", ");
              return `<div class="tooltip">Completed Tasks: ${w.globals.series[seriesIndex][dataPointIndex]}<br>Team Members: ${teamMembers}</div>`;
            } else {
              return false; // Hide tooltip for pending tasks
            }
          }
        }
      },
    };
  
  
  
      return (
        <div>
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
