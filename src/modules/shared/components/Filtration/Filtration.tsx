import { useSearchParams } from "react-router-dom";
import styles from "./Filtration.module.css";
import { getUsersType } from "../../../users/components/UsersList/UsersList";
import { getProjectsType } from "../../../projects/components/ProjectsList/ProjectsList";
// import { emailValidation } from "../../../../validations";

interface QueryTypes {
  triggerProjects: (
    page: number,
    limit: number,
    name?: string | null
  ) => Promise<getProjectsType> | null;
  triggerTasks: (
    page: number,
    limit: number,
    title: string,
    status: string
  ) => void | null;
  triggerUsers: (
    page: number,
    limit: number,
    name?: string | null,
    email?: string | null,
    country?: string | null,
    groups?: string | null
  ) => Promise<getUsersType> | null;
}
// type QueryFunction =
//   | ((
//       page: number,
//       limit: number,
//       name?: string | null
//     ) => Promise<getProjectsType> | null)
//   | ((
//       page: number,
//       limit: number,
//       title: string,
//       status: string
//     ) => void | null)
//   | ((
//       page: number,
//       limit: number,
//       name?: string | null,
//       email?: string | null,
//       country?: string | null,
//       groups?: string | null
//     ) => Promise<getUsersType> | null);
type FiltrationProps = {
  query: QueryTypes;
  pageName: string;
};

const Filtration = ({ pageName }: FiltrationProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getNameValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchParams({ ...Object.fromEntries(searchParams), name: value });
    // if (pageName === "projects") {
    //   query?.triggerProjects(1, 3, value);
    // }
    // if (pageName === "tasks") {
    //   query?.triggerTasks(1, 3, value, searchParams.get("status") || "");
    // }
    // if (pageName === "users") {
    //   query?.triggerUsers(
    //     1,
    //     3,
    //     value,
    //     searchParams.get("email"),
    //     searchParams.get("country"),
    //     searchParams.get("groups")
    //   );
    // }
  };

  const getEmailValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchParams({ ...Object.fromEntries(searchParams), email: value });
    // query?.triggerUsers(
    //   1,
    //   3,
    //   searchParams.get("name"),
    //   value,
    //   searchParams.get("country"),
    //   searchParams.get("groups")
    // );
  };
  const getCountryValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchParams({ ...Object.fromEntries(searchParams), country: value });
    // query?.triggerUsers(
    //   1,
    //   3,
    //   searchParams.get("name"),
    //   searchParams.get("email"),
    //   value,
    //   searchParams.get("groups")
    // );
  };
  const getGroupsValue = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSearchParams({ ...Object.fromEntries(searchParams), groups: value });
    // query?.triggerUsers(
    //   1,
    //   3,
    //   searchParams.get("name"),
    //   searchParams.get("email"),
    //   searchParams.get("country"),
    //   e.target.value
    // );
  };
  return (
    <div className="row mx-2 gap-lg-0 gap-3 pb-3 pt-5">
      <div
        className={`${styles["search-input"]}col  input-group   pb-2 w-25 rounded-2`}
      >
        <span
          className="input-group-text border-end-0 bg-white"
          id="input-group-left-example"
        >
          <i className="fa fa-search " aria-hidden="true"></i>
        </span>
        <input
          type="text"
          placeholder="Search here"
          className="form-control border-start-0"
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
