import { Chart as ChartJS, ArcElement, Tooltip} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
function ChartJSDoughnut({d1,d2}) {
    ChartJS.register(ArcElement, Tooltip);
    const data = {
        labels: ['Red', "Gray"],
        datasets: [
          {
            label: 'Total Revenue',
            data: [d1,d2],
            backgroundColor: [
              'rgb(255, 99, 132)',
              '#ddddddd2',
            ],
            borderColor: [
              'rgb(255, 99, 132)',
              '#ddddddd2'
            ],
            borderWidth: 1,
          },
        ],
      };
  return (
    <Doughnut data={data}/>
  )
}

export default ChartJSDoughnut