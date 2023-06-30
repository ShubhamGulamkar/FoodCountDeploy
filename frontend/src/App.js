import "./App.css";
import { Dashboard } from "./components/Dashboard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Profile } from "./components/Profile";
import { CheckProfile } from "./components/CheckProfile";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  // const [isAdmin, setIsAdmin] = useState(false);
  // const AdminHandler = () => {
  //   setIsAdmin(true);
  // };
  return (
    //<AdminContext.Provider value={{ isAdmin: isAdmin }}>
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Login} />
          <Route path="/signup" Component={Register} />
          <Route path="/dashboard" Component={Dashboard} />
          <Route path="/profile" Component={Profile} />
          <Route path="/data" Component={CheckProfile} />
        </Routes>
      </BrowserRouter>
    </div>
    //</AdminContext.Provider>
  );
}

export default App;
