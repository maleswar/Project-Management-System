import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./component/HomePageComponents/Home";
import Login from "./component/HomePageComponents/Login";
import SignUp from "./component/HomePageComponents/SignUp";
import SideBar from "./component/AdminDashboard/SideBar";
import Dashbord from "./component/AdminDashboard/Dashboard";
import Task from "./component/AdminDashboard/Task";
import Project from './component/AdminDashboard/Project';
import Message from './component/AdminDashboard/Message';
import Tracking from './component/AdminDashboard/Tracking';


function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Home />} /> 
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />}/>
      <Route path="/AdminDashbord" element={<SideBar />}>
        <Route  index element={<Dashbord />}/>
        <Route  path="/AdminDashbord/Message" element={<Message />}/> 
        <Route  path="/AdminDashbord/project" element={<Project />}/> 
        <Route  path="/AdminDashbord/project/task" element={<Task />}/>
        <Route  path="/AdminDashbord/project/tracking" element={<Tracking />}/>
      </Route>
      {/* <Route path="/" element={<Dashbord />}/> */}
    </Routes>
  </Router>
  );
}

export default App;

