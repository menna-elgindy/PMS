import { useContext } from "react";
import DashboardHeader from "../../shared/components/DashboardHeader/DashboardHeader";
import StatsSection from "../../stats/components/StatsSection";
import { AuthContext } from "../../../context/AuthContext";

function Dashboard() {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    return null;
  }
  const { loginData } = authContext;

  return (
    <div className="ms-5 me-2 mx-auto pt-5 w-100  ">
      <DashboardHeader
        title={loginData?.userName ? loginData.userName : ""}
        description="You can add project and assign tasks to your team"
      />
      <StatsSection />
    </div>
  );
}

export default Dashboard;
