import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./component/HomePageComponents/Home";
import Login from "./component/HomePageComponents/Login";
import SignUp from "./component/HomePageComponents/SignUp";
import ForgotPassword from "./component/HomePageComponents/ForgotPassword";
import SideBar from "./component/AdminDashboard/SideBar";
import Dashbord from "./component/AdminDashboard/Dashboard";
import Task from "./component/AdminDashboard/Task";
import Team from "./component/AdminDashboard/Team";
import GaantChart from "./component/AdminDashboard/GaantChart";
import Project from "./component/AdminDashboard/Project";
import EditProjectForm from "./component/AdminDashboard/EditProjectForm";
import Message from "./component/AdminDashboard/Message";
import Report from "./component/AdminDashboard/Report";

import Profile from "./component/AdminDashboard/Profile";
import ProfileForm from "./component/AdminDashboard/ProfileForm";
import UploadImage from "./component/AdminDashboard/UploadImage";
import TeamSideBar from "./component/TeamDashbord/TeamSideBar";
import HomeDashboard from "./component/TeamDashbord/HomeDashbord";
import TeamProject from "./component/TeamDashbord/TeamProject ";
import TeamTable from "./component/TeamDashbord/TeamTable ";
import TeamTask from "./component/TeamDashbord/TeamTask ";
import NotFound from "./pages/NotFound";
// import ProjectCalendarChart from "./component/TeamDashbord/ProjectCalendarChart";
import TeamMessage from "./component/TeamDashbord/TeamMessage";
import TeamReport from "./component/TeamDashbord/TeamReport";
import TeamProfile from "./component/TeamDashbord/TeamProfile";
import TeamUploadProfile from "./component/TeamDashbord/TeamUploadProfile";
import TeamUploadProfileForm from "./component/TeamDashbord/TeamUpdateProfileForm";
import ProjectWiseTeam from "./component/AdminDashboard/ProjectWiseTeam";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/AdminDashbord/*" element={<SideBar />}>
          <Route index element={<Dashbord />} />
          <Route path="Message" element={<Message />} />
          <Route path="project" element={<Project />} />
          <Route path="team" element={<Team />} />
          <Route path="chart" element={<GaantChart />} />
          <Route
            path="EditProjectForm/:projectId"
            element={<EditProjectForm />}
          />
          <Route path="task/:projectId/:Project_name" element={<Task />} />
          <Route path="report/:projectId/:Project_name" element={<Report />} />
          <Route path="projectwiseteam/:projectId/:Project_name" element={<ProjectWiseTeam />} />

          <Route path="profile" element={<Profile />} />
          <Route path="profile/UploadImage" element={<UploadImage />} />
          <Route
            path="profile/UploadImage/ProfileForm"
            element={<ProfileForm />}
          />
        </Route>
        <Route path="/TeamDashbord/*" element={<TeamSideBar />}>
          <Route index element={<HomeDashboard />} />
          <Route path="project" element={<TeamProject />} />
          <Route path="message" element={<TeamMessage />} />
          <Route path="team/:projectId/:Project_name" element={<TeamTable />} />
          <Route path="task/:projectId/:Project_name" element={<TeamTask />} />
          <Route path="report/:projectId/:Project_name" element={<TeamReport />} />
          {/* <Route path="calendar" element={<ProjectCalendarChart />} /> */}
          <Route path="profile" element={<TeamProfile />} />
          <Route path="profile/UploadImage" element={<TeamUploadProfile />} />
          <Route
            path="profile/UploadImage/ProfileForm"
            element={<TeamUploadProfileForm />}
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
