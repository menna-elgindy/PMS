import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);
type chartProps = {
  label: string[];
  backgroundColor: string[];
  borderColor: string[];
  values: number[];
};
const DoughnutChart = ({
  label,
  backgroundColor,
  borderColor,
  values,
}: chartProps) => {
  const data = {
    labels: label,

    datasets: [
      {
        label: "# of Votes",
        data: values,
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        borderWidth: 1,
      },
    ],
  };
  return <Doughnut data={data} />;
};

export default DoughnutChart;
