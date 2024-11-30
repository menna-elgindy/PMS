import styles from "./DashboardHeader.module.css";
type DashboardHeaderProps = {
  title: string;
  description: string;
};

const DashboardHeader = ({ title, description }: DashboardHeaderProps) => {
  return (
    <div
      className={`${styles["header-container"]}  py-5  px-3 d-flex align-items-center   `}
    >
      <div
        className={`${styles["content"]} caption col-md-6  text-white  d-flex flex-column gap-3   `}
      >
        <h1 className="fs-1">
          Welcome <span className={styles["title"]}>{title}</span>
        </h1>
        <span className="fs-3">{description}</span>
      </div>
    </div>
  );
};

export default DashboardHeader;
