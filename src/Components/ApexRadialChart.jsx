import Chart from "react-apexcharts";

function ApexRadialChart({d1}) {
    let data = {     
      series: [d1],
      options: {
        chart: {
          height: 250,
          type: 'radialBar',
        },
        plotOptions: {
          radialBar: {
            hollow: {
              size: '70%',
            }
          },
        },
        labels: ['Revenue'],
      },
    
    
    };

  return (
     <Chart options={data.options} series={data.series} type="radialBar" height={250} />   
  )
}

export default ApexRadialChart