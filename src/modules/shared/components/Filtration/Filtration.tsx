import { useSearchParams } from "react-router-dom";
import styles from "./Filtration.module.css";

type FiltrationProps = {
  pageName: string;
};

const Filtration = ({ pageName }: FiltrationProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getNameValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchParams({ ...Object.fromEntries(searchParams), name: value });
  };

  const getEmailValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchParams({ ...Object.fromEntries(searchParams), email: value });
  };
  const getCountryValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchParams({ ...Object.fromEntries(searchParams), country: value });
  };
  const getGroupsValue = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSearchParams({ ...Object.fromEntries(searchParams), groups: value });
  };
  return (
    <div className="row mx-0 gap-lg-0 gap-3  py-3 px-2 bg-white mt-3">
      <div className="col-md-3">
        <div
          className={` ${
            pageName !== "projects" ? "col" : "col-md-3"
          }  input-group pb-2  rounded-2 `}
        >
          <span
            className={`input-group-text border-end-0 bg-white ${styles["icon"]}`}
            id="input-group-left-example"
          >
            <i className="fa fa-search " aria-hidden="true"></i>
          </span>
          <input
            type="text"
            placeholder="Search By Title "
            className={`form-control border-start-0  ${styles["input"]}`}
            onChange={getNameValue}
            value={searchParams.get("name") || ""}
          />
        </div>
      </div>
      {pageName === "users" && (
        <>
          <div className="col-md-3">
            <div className=" input-group pb-2">
              <span
                className={`input-group-text border-end-0 bg-white ${styles["icon"]}`}
                id="input-group-left-example"
              >
                <i className="fa fa-envelope " aria-hidden="true"></i>
              </span>
              <input
                type="text"
                placeholder="Email address"
                className={`form-control border-start-0  ${styles["input"]}`}
                onChange={getEmailValue}
                value={searchParams.get("email") || ""}
              />
            </div>
          </div>
          <div className="col-md-3">
            <div className="input-group h-25 ">
              <span
                className={`input-group-text border-end-0 bg-white ${styles["icon"]}`}
                id="input-group-left-example"
              >
                <i className="fa fa-globe " aria-hidden="true"></i>
              </span>
              <input
                type="text"
                placeholder="Country"
                className={`form-control border-start-0 ${styles["input"]}`}
                onChange={getCountryValue}
                value={searchParams.get("country") || ""}
              />
            </div>
          </div>
          <div className="col-md-3">
            <div className="input-group  h-25">
              <span
                className={`input-group-text border-end-0 bg-white ${styles["icon"]}`}
                id="input-group-left-example"
              >
                <i className="fa fa-user " aria-hidden="true"></i>
              </span>
              <select
                className={`form-control border-start-0 ${styles["input"]}`}
                onChange={getGroupsValue}
                value={searchParams.get("groups") || ""}
              >
                <option value="">User Type</option>
                <option value={1}>Admin user</option>
                <option value={2}>System user</option>
              </select>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Filtration;
