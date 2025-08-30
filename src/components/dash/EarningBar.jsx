import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { connect } from 'react-redux';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function EarningBar({ deals }) {
  const [monthlyEarnings, setMonthlyEarnings] = useState(Array(12).fill(0));

  useEffect(() => {
    if (deals?.length > 0) {
      const earningsByMonth = Array(12).fill(0);

      deals?.forEach(deal => {
        const dealDate = new Date(deal.deal_date);
        const month = dealDate.getMonth();
        const commission = parseFloat(deal.commission) || 0;
        earningsByMonth[month] += commission;
      });

      setMonthlyEarnings(earningsByMonth);
    }
  }, [deals])

  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: '',
        data: monthlyEarnings,
        backgroundColor: '#5F85DB',
        borderColor: 'rgb(52, 109, 183)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
        text: 'Monthly Sales Revenue',
        color: '#ffffffff'
      },
      tooltip: {
        displayColors: false,
        callbacks: {
          label: function (tooltipItem) {
            let value = tooltipItem.raw || 0;
            return `$${value.toLocaleString()}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: '#ffffffff',
          borderColor: '#ffffffff',
          borderDash: [5, 5],
        },
        ticks: {
          color: 'white',
          callback: function (value, index, ticks) {
            return '$' + value;
          }
        },
      },
      x: {
        grid: {
          color: '#ffffffff',
          drawOnChartArea: false,
        },
        ticks: {
          color: '#ffffffff',
        },
      },
    },
  };

  return (
    <div className='earningContainer'>
      <Bar data={data} options={options} id="bar" />
    </div>
  )
}

const mapStateToProps = state => ({
  error: state.auth.error,
  deals: state.agent.deals,
  user: state.auth.user
});

export default connect(mapStateToProps, {})(EarningBar);