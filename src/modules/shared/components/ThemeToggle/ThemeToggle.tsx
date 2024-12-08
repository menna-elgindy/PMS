import { useContext } from "react";
import { ThemeContext } from "../../../../context/ThemeContext";
import styles from "./ThemeToggle.module.css";

const ThemeToggle = () => {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error("ThemeContext is undefined");
  }

  const { theme, toggleTheme } = context;
  const handleClick = () => {
    toggleTheme();
  };

  return (
    <div onClick={handleClick} className="rounded ">
      {theme === "dark" ? (
        <i className={`fa-solid fa-moon  ${styles["moon"]}`} />
      ) : (
        <i className={`fa-solid fa-sun  ${styles["sun"]}`} />
      )}
    </div>
  );
};

export default ThemeToggle;
