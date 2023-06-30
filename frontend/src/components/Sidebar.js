import React from "react";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import AdminContext from "../context/admin-context";

const Sidebar = () => {
  // const context =    useContext(AdminContext)
  var userType = JSON.parse(sessionStorage.getItem("User")).userType;
  let navigate = useNavigate();

  const clearSessionStorage = () => {
    sessionStorage.clear();
    navigate("/");
  };
  return (
    <div
      className={`app`}
      style={{ display: "flex", height: "100%", overflow: "scroll initial" }}
    >
      <CDBSidebar textColor="#fff" backgroundColor="#025B9A">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a
            href="/"
            className="text-decoration-none"
            style={{ color: "inherit" }}
          >
            Booking System
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink exact to="/profile" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="columns">Book order</CDBSidebarMenuItem>
            </NavLink>

            <div>
              {userType === "admin" && (
                <NavLink exact to="/dashboard" activeClassName="activeClicked">
                  <CDBSidebarMenuItem icon="table">
                    Check Orders
                  </CDBSidebarMenuItem>
                </NavLink>
              )}
            </div>
            <NavLink exact to="/data" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="user">profile</CDBSidebarMenuItem>
            </NavLink>

            <CDBSidebarMenuItem icon="columns" onClick={clearSessionStorage}>
              Logout
            </CDBSidebarMenuItem>
          </CDBSidebarMenu>
          <CDBSidebarMenu></CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: "center" }}>
          <div
            className="sidebar-btn-wrapper"
            style={{
              padding: "20px 5px",
            }}
          >
            Sidebar Footer
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

export default Sidebar;
