import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import useThemeContext from "../../../hooks/useThemeContext";

ChartJS.register(ArcElement, Tooltip, Legend);
type chartProps = {
  label: string[];
  values: number[];
};
const darkBackgroundColor = [
  "rgba(207, 209, 236, 1)",
  "rgba(228, 228, 188, 1)",
  "rgba(231, 195, 215, 1)",
];
const darkBorderColor = [
  "rgba(229, 230, 244, 1)",
  "rgba(244, 244, 229, 1)",
  "rgba(244, 229, 237, 1)",
];

const DoughnutChart = ({ label, values }: chartProps) => {
  const { theme } = useThemeContext();

  const data = {
    labels: label,

    datasets: [
      {
        label: "# of Votes",
        data: values,
        // backgroundColor: backgroundColor,
        // borderColor: borderColor,
        backgroundColor:
          theme === "dark"
            ? darkBackgroundColor
            : [
                "rgba(229, 230, 244, 1)",
                "rgba(244, 244, 229, 1)",
                "rgba(244, 229, 237, 1)",
              ],
        borderColor:
          theme === "dark"
            ? darkBorderColor
            : [
                "rgba(207, 209, 236, 1)",
                "rgba(228, 228, 188, 1)",
                "rgba(231, 195, 215, 1)",
              ],
        borderWidth: 1,
      },
    ],
  };
  return <Doughnut data={data} />;
};

export default DoughnutChart;
