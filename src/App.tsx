import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AuthLayout from './modules/shared/components/AuthLayout/AuthLayout';
import Login from './modules/authentication/components/Login/Login';
import Registration from './modules/authentication/components/Registration/Registration';
import ForgetPassword from './modules/authentication/components/ForgetPassword/ForgetPassword';
import ResetPassword from './modules/authentication/components/ResetPassword/ResetPassword';
import Verification from './modules/authentication/components/Verification/Verification';
import NotFound from './modules/shared/components/NotFound/NotFound';
import Dashboard from './modules/Dashboard/components/Dashboard';

function App() {
	const routes = createBrowserRouter([
		{
			path: '',
			element: <AuthLayout />,
			errorElement: <NotFound />,
			children: [
				{ index: true, element: <Login /> },
				{ path: 'login', element: <Login /> },
				{ path: 'register', element: <Registration /> },
				{ path: 'verify-user', element: <Verification /> },
				{ path: 'forget-password', element: <ForgetPassword /> },
				{ path: 'reset-password', element: <ResetPassword /> },
			],
		},
		{
			path: 'dashboard',
			element: <Dashboard />,
			errorElement: <NotFound />,
		},
	]);

	return (
		<>
			<ToastContainer />
			<RouterProvider router={routes} />
		</>
	);
}

export default App;
