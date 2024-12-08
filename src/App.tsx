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
import UsersList from "./modules/users/components/UsersList/UsersList";
import ChangePassword from "./modules/authentication/components/ChangePassword/ChangePassword";
import ProtectedComponent from "./modules/shared/components/ProtectedComponent/ProtectedComponent";
import EmployeeProtectedRoute from "./modules/shared/components/EmployeeProtectedRoute/EmployeeProtectedRoute"

import "react-toastify/dist/ReactToastify.css";

import "./App.css";
import TaskForm from "./modules/tasks/components/TaskForm/TaskForm";
import TasksList from "./modules/tasks/components/TasksList/TasksList";
import TaskBoard from "./modules/tasks/components/TaskBoard/TaskBoard";

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
      element: (
        <ProtectedComponent>
          <MasterLayout />
        </ProtectedComponent>
      ),
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
          element: <EmployeeProtectedRoute><ProjectForm /></EmployeeProtectedRoute> ,
        },
        {
          path: "projects/:projectId",
          element: <EmployeeProtectedRoute><ProjectForm /></EmployeeProtectedRoute>,
        },
        {
          path: "tasks",
          element: <EmployeeProtectedRoute><TasksList /></EmployeeProtectedRoute>,
        },
        {
          path: "tasks/new-task",
          element:<EmployeeProtectedRoute><TaskForm /></EmployeeProtectedRoute> ,
        },
        {
          path: "tasks/:taskId",
          element: <EmployeeProtectedRoute><TaskForm /></EmployeeProtectedRoute> ,
        },
        {
          path: "tasks-board",
          element: <TaskBoard />,
        },
        {
          path: "users",
          element: <EmployeeProtectedRoute><UsersList /></EmployeeProtectedRoute>,
        },
      ],
      errorElement: <NotFound />,
    },
  ]);

  return (
    <>
      <ToastContainer position="top-center" style={{ zIndex: 9999999 }} />
      <RouterProvider router={routes}></RouterProvider>
    </>
  );
}

export default App;
