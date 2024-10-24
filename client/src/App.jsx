import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Home from './components/Home'
import Jobs from './components/Jobs'
import Browse from './components/Browse'
import Profile from './components/Profile'
import JobDescription from './components/JobDescription'
import Companies from './components/admin/Companies'
import CompanyCreate from './components/admin/CompanyCreate'
import CompanySetup from './components/admin/CompanySetup'
import AdminJobs from "./components/admin/AdminJobs";
import PostJob from './components/admin/PostJob'
import Applicants from './components/admin/Applicants'
import ProtectedRoute from './components/admin/ProtectedRoute'
import ProtectedRouteUser from './components/protectedRoute'


const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: "/jobs",
    element: <Jobs />
  },
  {
    path: "/description/:id",
    element: <ProtectedRouteUser><JobDescription /></ProtectedRouteUser>
  },
  {
    path: "/browse",
    element: <Browse />
  },
  {
    path: "/profile",
    element: <ProtectedRouteUser><Profile /></ProtectedRouteUser>
  },
  // admin ke liye yha se start hoga
  {
    path:"/admin/companies",
    element: <ProtectedRouteUser><ProtectedRoute><Companies/></ProtectedRoute></ProtectedRouteUser>
  },
  {
    path:"/admin/companies/create",
    element: <ProtectedRouteUser><ProtectedRoute><CompanyCreate/></ProtectedRoute> </ProtectedRouteUser>
  },
  {
    path:"/admin/companies/:id",
    element: <ProtectedRouteUser><ProtectedRoute><CompanySetup/></ProtectedRoute> </ProtectedRouteUser>
  },
  {
    path:"/admin/jobs",
    element: <ProtectedRouteUser><ProtectedRoute><AdminJobs/></ProtectedRoute> </ProtectedRouteUser>
  },
  {
    path:"/admin/jobs/create",
    element: <ProtectedRouteUser><ProtectedRoute><PostJob/></ProtectedRoute> </ProtectedRouteUser>
  },
  {
    path:"/admin/jobs/:id/applicants",
    element: <ProtectedRouteUser><ProtectedRoute><Applicants/></ProtectedRoute> </ProtectedRouteUser>
  },

])
function App() {

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  )
}

export default App
