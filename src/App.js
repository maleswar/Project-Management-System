import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./component/HomePageComponents/Home";
import Login from "./component/HomePageComponents/Login";
import SignUp from "./component/HomePageComponents/SignUp";
import ForgotPassword from "./component/HomePageComponents/ForgotPassword";
import SideBar from "./component/AdminDashboard/SideBar";
import Dashbord from "./component/AdminDashboard/Dashboard";
import Task from "./component/AdminDashboard/Task";
import Team from "./component/AdminDashboard/Team";
import Project from './component/AdminDashboard/Project';
import EditProjectForm from './component/AdminDashboard/EditProjectForm';
import Message from './component/AdminDashboard/Message';
import Tracking from './component/AdminDashboard/Tracking';
import Profile from './component/AdminDashboard/Profile';
import ProfileForm from './component/AdminDashboard/ProfileForm';
import UploadImage from './component/AdminDashboard/UploadImage';
import TeamSideBar from './component/TeamDashbord/TeamSideBar';
import HomeDashboard from './component/TeamDashbord/HomeDashboard';
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />}/>
        <Route path="/forgotpassword" element={<ForgotPassword />}/>
        <Route path="/AdminDashbord/*" element={<SideBar />}>
          <Route index element={<Dashbord />} />
          <Route path="Message" element={<Message />} /> 
          <Route path="project" element={<Project />}/> 
          <Route path="team" element={<Team />}/> 
          <Route path="EditProjectForm/:projectId" element={<EditProjectForm />} />
          <Route path="project/task" element={<Task />}/>
          <Route path="project/tracking" element={<Tracking />}/>
          <Route path="profile" element={<Profile />}/>
          <Route path="profile/UploadImage" element={<UploadImage />} />
          <Route path="profile/UploadImage/ProfileForm" element={<ProfileForm />} />
        </Route>
        <Route path="/TeamDashbord/*" element={<TeamSideBar />}>
  <Route index element={<HomeDashboard />} />
</Route>
        <Route path="*" element={<NotFound />} /> 
      </Routes>
    </Router>
  );
}

export default App;
