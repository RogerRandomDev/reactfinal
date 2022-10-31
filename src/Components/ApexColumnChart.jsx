import Chart from "react-apexcharts";
  let data = {
          
            series: [{
              name: 'PRODUCT A',
              data: [44, 55, 41]
            }, {
              name: 'PRODUCT B',
              data: [13, 23, 20]
            }, {
              name: 'PRODUCT C',
              data: [11, 17, 15]
            }],
            options: {
              chart: {
                type: 'bar',
                height: 350,
                stacked: false,
                toolbar: {
                  show: true
                },
                zoom: {
                  enabled: true
                }
              },
              responsive: [{
                breakpoint: 480,
                options: {
                  legend: {
                    position: 'bottom',
                    offsetX: -10,
                    offsetY: 0
                  }
                }
              }],
              plotOptions: {
                bar: {
                  horizontal: false,
                  borderRadius: 10,
                  dataLabels: {
                    total: {
                      enabled: true,
                      style: {
                        fontSize: '13px',
                        fontWeight: 900
                      }
                    }
                  }
                },
              },
              xaxis: {
                type: 'datetime',
                categories: ['01/01/2011 GMT', '01/02/2011 GMT', '01/03/2011 GMT'
                ],
              },
              legend: {
                position: 'right',
                offsetY: 40
              },
              fill: {
                opacity: 1
              }
            },
          
          
          };
function ApexColumnChart() {
  return (
  <Chart options={data.options} series={data.series} type="bar" height={350} />

  )
}

export default ApexColumnChart