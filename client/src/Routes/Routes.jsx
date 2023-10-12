import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../pages/Home/Home/Home";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import AllCourses from "../pages/Home/AllCourse/AllCourses/AllCourses";
import AllInstructors from "../pages/AllInstructors/AllInstructors";
import ManageClasses from "../pages/Dashboard/Admin/ManageClasses/ManageClasses";
import AddClass from "../pages/Dashboard/Instructor/AddClass/AddClass";
import StudentBookings from "../pages/Dashboard/Student/Bookings/StudentBookings";
import Dashboard from "../Layouts/Dashboard";
import PrivateRoute from "./PrivateRoute";
import Payment from "../pages/Dashboard/Student/Payment/Payment";
import MyClasses from "../pages/Dashboard/Student/MyClasses/MyClasses";
import InstructorClasses from "../pages/Dashboard/Instructor/MyClasses/InstructorClasses";
import InstructorRoute from "./InstructorRoute";
import AdminRoute from "./AdminRoute";
import StudentRoute from "./StudentRoute";
import UnAuthorized from "../pages/UnAuthorized/UnAuthorized";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers/ManageUsers";
import PaymentHistory from "../pages/Dashboard/Student/PaymentHistory/PaymentHistory";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/courses",
        element: <AllCourses />,
      },
      {
        path: "/instructors",
        element: <AllInstructors />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "dashboard",
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
        children: [
          {
            path: "manage-classes", // Update path to use relative path
            element: (
              <AdminRoute>
                <ManageClasses />
              </AdminRoute>
            ),
          },
          {
            path: "manage-users",
            element: <ManageUsers />,
          },
          {
            path: "add-classes", // Update path to use relative path
            element: (
              <InstructorRoute>
                <AddClass />
              </InstructorRoute>
            ),
          },
          {
            path: "instructor-classes",
            element: (
              <InstructorRoute>
                <InstructorClasses />
              </InstructorRoute>
            ),
          },
          {
            path: "my-bookings", // Update path to use relative path
            element: (
              <StudentRoute>
                <StudentBookings />
              </StudentRoute>
            ),
          },
          {
            path: "payment",
            element: (
              <StudentRoute>
                <Payment />
              </StudentRoute>
            ),
          },
          {
            path: "my-payments", // Update path to use relative path
            element: (
              <StudentRoute>
                <PaymentHistory />
              </StudentRoute>
            ),
          },
          {
            path: "my-classes", // Update path to use relative path
            element: (
              <StudentRoute>
                <MyClasses />
              </StudentRoute>
            ),
          },
        ],
      },
    ],
    errorElement: <UnAuthorized />,
  },
  {
    path: "error",
    element: <UnAuthorized />,
  },
]);

export default router;
