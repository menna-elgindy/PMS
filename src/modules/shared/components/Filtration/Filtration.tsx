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
    <div className="row mx-2 gap-lg-0 gap-3 pb-3 pt-5">
      <div
        className={`${styles["search-input"]}col   input-group pb-2 w-25 rounded-2`}
      >
        <span
          className="input-group-text border-end-0 bg-white"
          id="input-group-left-example"
        >
          <i className="fa fa-search " aria-hidden="true"></i>
        </span>
        <input
          type="text"
          placeholder="Search By Title "
          className={`form-control border-start-0 `}
          onChange={getNameValue}
          value={searchParams.get("name") || ""}
        />
      </div>
      {pageName === "users" && (
        <>
          <div className=" col-md-3 input-group w-auto pb-2">
            <span
              className="input-group-text border-end-0 bg-white"
              id="input-group-left-example"
            >
              <i className="fa fa-envelope " aria-hidden="true"></i>
            </span>
            <input
              type="text"
              placeholder="Email address"
              className="form-control border-start-0"
              onChange={getEmailValue}
              value={searchParams.get("email") || ""}
            />
          </div>
          <div className="col-md-3 input-group w-auto">
            <span
              className="input-group-text border-end-0 bg-white"
              id="input-group-left-example"
            >
              <i className="fa fa-globe " aria-hidden="true"></i>
            </span>
            <input
              type="text"
              placeholder="Country"
              className="form-control border-start-0"
              onChange={getCountryValue}
              value={searchParams.get("country") || ""}
            />
          </div>
          <div className="col col-md-3 col-sm-12 input-group  w-25">
            <select
              className="form-control"
              onChange={getGroupsValue}
              value={searchParams.get("groups") || ""}
            >
              <option value="">User Type</option>
              <option value={1}>Admin user</option>
              <option value={2}>System user</option>
            </select>
          </div>
        </>
      )}
    </div>
  );
};

export default Filtration;
