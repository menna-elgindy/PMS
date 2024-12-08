import styles from "./ThemeToggle.module.css";
import useThemeContext from "../../../../hooks/useThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useThemeContext();
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
