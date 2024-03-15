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
import TeamSideBar from './component/TeamDashbord/TeamSideBar';


function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Home />} /> 
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />}/>
      <Route path="/forgotpassword" element={<ForgotPassword />}/>
      <Route path="/AdminDashbord" element={<SideBar />}>
        <Route  index element={<Dashbord />}/>
        <Route  path="/AdminDashbord/Message" element={<Message />}/> 
        <Route  path="/AdminDashbord/project" element={<Project />}/> 
        <Route  path="/AdminDashbord/team" element={<Team />}/> 
        <Route  path="/AdminDashbord/EditProjectForm" element={<EditProjectForm />}/> 
        <Route  path="/AdminDashbord/project/task" element={<Task />}/>
        <Route  path="/AdminDashbord/project/tracking" element={<Tracking />}/>
        <Route  path="AdminDashbord/profile" element={<Profile />}/>
      </Route>
      <Route path="/TeamDashbord" element={<TeamSideBar />}>
        <Route  index element={<TeamSideBar />}/>
        {/* <Route  path="/AdminDashbord/Message" element={<Message />}/> 
        <Route  path="/AdminDashbord/project" element={<Project />}/> 
        <Route  path="/AdminDashbord/project/task" element={<Task />}/>
        <Route  path="/AdminDashbord/project/tracking" element={<Tracking />}/> */}
      </Route>
      {/* <Route path="/" element={<Dashbord />}/> */}
    </Routes>
  </Router>
  );
}

export default App;

