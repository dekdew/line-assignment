import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { ICandidate } from "interface/candidate";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ResultChart = ({ result }: { result: ICandidate[] }) => {
  const options = {
    indexAxis: "y" as const,
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        ticks: {
          callback: (label: any) => {
            if (Math.floor(label) === label) {
              return label;
            }
          },
        },
      },
    },
  };

  const labels = result.map((c, i) => `#${i + 1} ${c.name}`);

  const data = {
    labels,
    datasets: [
      {
        label: "Vote Result",
        data: result.map((c) => c.votedCount),
        backgroundColor: "#00B900",
      },
    ],
  };

  return (
    <div className="bg-gray-100 rounded-lg p-5">
      <h3 className="text-center text-gray-600 text-lg font-medium mb-3 ">
        Vote Result
      </h3>
      <Bar options={options} data={data} />
    </div>
  );
};

export default ResultChart;
