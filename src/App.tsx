import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AuthLayout from "./modules/shared/components/AuthLayout/AuthLayout";
import Login from "./modules/authentication/components/Login/Login";
import Registration from "./modules/authentication/components/Registration/Registration";
import ForgetPassword from "./modules/authentication/components/ForgetPassword/ForgetPassword";
import ResetPassword from "./modules/authentication/components/ResetPassword/ResetPassword";
import Verification from "./modules/authentication/components/Verification/Verification";
import NotFound from "./modules/shared/components/NotFound/NotFound";
import Dashboard from "./modules/Dashboard/components/Dashboard";
import MasterLayout from "./modules/shared/components/MasterLayout/MasterLayout";
import ProjectsList from "./modules/projects/components/ProjectsList/ProjectsList";
import ProjectForm from "./modules/projects/components/ProjectForm/ProjectForm";
import TasksList from "./modules/tasks/components/TasksList/TasksList";
import UsersList from "./modules/users/components/UsersList/UsersList";
import ChangePassword from "./modules/authentication/components/ChangePassword/ChangePassword";

import "react-toastify/dist/ReactToastify.css";

import "./App.css";

function App() {
  const routes = createBrowserRouter([
    {
      path: "",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Login /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Registration /> },
        { path: "verify-user", element: <Verification /> },
        { path: "forget-password", element: <ForgetPassword /> },
        { path: "reset-password", element: <ResetPassword /> },
        { path: "change-password", element: <ChangePassword /> },
      ],
    },
    {
      path: "",
      element: <MasterLayout />,
      children: [
        {
          path: "dashboard",
          element: <Dashboard />,
        },
        {
          path: "projects",
          element: <ProjectsList />,
        },
        {
          path: "projects/new-project",
          element: <ProjectForm />,
        },
        {
          path: "tasks",
          element: <TasksList />,
        },
        {
          path: "users",
          element: <UsersList />,
        },
      ],
      errorElement: <NotFound />,
    },
  ]);

  return (
    <>
      <ToastContainer style={{zIndex:99999}}/>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
