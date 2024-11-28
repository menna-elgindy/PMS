import DashboardHeader from "../../shared/components/DashboardHeader/DashboardHeader";
import StatsSection from "../../stats/components/StatsSection";

function Dashboard() {
  return (
    <div className="ms-5 me-2 mx-auto pt-5 w-100  ">
      <DashboardHeader
        title="Upskilling"
        description="You can add project and assign tasks to your team"
      />
      <StatsSection />
    </div>
  );
}

export default Dashboard;
