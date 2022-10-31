import Chart from "react-apexcharts";
  let data = {
          
            series: [{
              name: 'Backpacks',
              data: [10, 30,20,50,60,60,30,10,80]
            }, {
              name: 'T-Shirts',
              data: [40, 60,50,10,20,30,40,20,10]
            }, {
              name: 'Shoes',
              data: [50,10,30,40,20,10,30,70,10]
            }],
            options: {
              chart: {
                type: 'bar',
                height: 350,
                stacked:true
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
                categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
              },
              yaxis: {
                title: {
                  text: 'Percentage'
                }
              },
              fill: {
                opacity: 1
              },
              tooltip: {
                y: {
                  formatter: function (val) {
                    return val + "%"
                  }
                }
              }
            },
          
          
          };

function ApexColumnChart() {
  return (
  <Chart options={data.options} series={data.series} type="bar" height={350} />

  )
}

export default ApexColumnChart