import { Link } from "react-router-dom";
import styles from "./TableHeader.module.css";

interface tableHeader {
  btnTitle?: string;
  title: string;
  url?: string;
  from?: string;
}

const TableHeader: React.FC<tableHeader> = ({ title, btnTitle, url, from }) => {
  return (
    <>
      <div
        className={`tableHeaderContainer d-flex justify-content-between  ${styles["header-container"]}`}
      >
        <h3>{title}</h3>
        {from != "Employee" ? (
          <Link to={`${url}`} className="tableHeaderBtn text-decoration-none">
            <span className="mx-2">
              <i className="fa-solid fa-plus"></i>
            </span>
            {btnTitle}
          </Link>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default TableHeader;
