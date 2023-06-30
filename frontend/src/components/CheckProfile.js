import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import "../css/Dashboard.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import EmailIcon from "@mui/icons-material/Email";
import WorkIcon from "@mui/icons-material/Work";
import MobileFriendlyIcon from "@mui/icons-material/MobileFriendly";
import LocationOnIcon from "@mui/icons-material/LocationOn";

export const CheckProfile = () => {
  let user = JSON.parse(sessionStorage.getItem("User"));

  return (
    <div className="dashboard d-flex">
      <div>
        <Sidebar />
      </div>
      <div
        style={{
          flex: "1 1 auto",
          display: "flex",
          flexFlow: "column",
          height: "100vh",
          overflowY: "hidden",
        }}
      >
        <Navbar />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: 100,
          }}
        >
          <Card sx={{ maxWidth: 600 }} className="card" style={{ height: 300 }}>
            <CardContent>
              <div className="row">
                <div className="left ">
                  <br></br>
                  <p className="mt-9 " style={{ fontSize: 20 }}>
                    Name :<span style={{ fontWeight: 400 }}> {user.ename}</span>
                  </p>

                  <p className="mt-3" style={{ fontSize: 20 }}>
                    <WorkIcon />
                    Employee Id :
                    <span style={{ fontWeight: 400 }}> {user.empid}</span>
                  </p>

                  <p className="mt-3" style={{ fontSize: 20 }}>
                    <EmailIcon />
                    Email Id :
                    <span style={{ fontWeight: 400 }}> {user.email}</span>
                  </p>

                  <p className="mt-3" style={{ fontSize: 20 }}>
                    <MobileFriendlyIcon />
                    Mobile Number :
                    <span style={{ fontWeight: 400 }}> {user.mobile}</span>
                  </p>

                  <p className="mt-3" style={{ fontSize: 20 }}>
                    <LocationOnIcon />
                    Location :<span style={{ fontWeight: 400 }}> Pune</span>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
