import background from "../../../assets/images/backgd-dashboard.png";
import StatsSection from "../../stats/components/StatsSection";
import styles from "./Dashboard.module.css";

function Dashboard() {
  return (
    // d-flex flex-column
    <div className="ms-5 me-2 pt-5 w-100 ">
      <div className={`${styles["img-bashboard"]}`}>
        <img src={background} className="w-100 img-fluid " alt="" />
      </div>
      <StatsSection />
    </div>
  );
}

export default Dashboard;
