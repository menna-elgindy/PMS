import React from "react";
import styles from "./StatsCard.module.css";

type StatsCardProps = {
  title: string;
  icon: React.ReactNode;
  color: string;
  data: number;
};

const StatsCard = ({ title, icon, data }: StatsCardProps) => {
  return (
    <div
      className={`${
        title === "Progress" || title === "active"
          ? styles["stats-card-progress"]
          : title === "Tasks Number" || title === "inactive"
          ? styles["stats-card-tasks"]
          : styles["stats-card"]
      }  p-3   `}
    >
      <div
        className={`${
          title === "Progress" || title === "active"
            ? styles["stats-progress"]
            : title === "Tasks Number" || title === "inactive"
            ? styles["stats-tasks"]
            : styles["stats-projects"]
        } } d-flex w-50 h-50 align-items-center  justify-content-center py-2 px-2 mb-2`}
      >
        {icon}
      </div>
      <span className={styles["title"]}>{title}</span>
      <h4>{data}</h4>
    </div>
  );
};

export default StatsCard;
