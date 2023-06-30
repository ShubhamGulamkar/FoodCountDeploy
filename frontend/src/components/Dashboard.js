import React from "react";
import { CDBTable, CDBTableHeader, CDBTableBody, CDBInput } from "cdbreact";
import { useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import { CDBBtn } from "cdbreact";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import "../css/Dashboard.css";

export const Dashboard = () => {
  const [nvOrderList, setNvOrderList] = useState([]);
  const [vOrderList, setVOrderList] = useState([]);
  const [bookingDate, setBookingDate] = useState("");

  const dateHandleChange = (event) => {
    setBookingDate(event.target.value);
  };

  const submitHandler = async (e) => {
    var jwt = sessionStorage.getItem("token");
    let resp;
    let d = bookingDate;
    if (bookingDate === "") {
      swal("Please select date");
      return;
    }
    const options = {
      method: "POST",
      url: "http://localhost:5000/api/users/orderlist",
      data: {
        d,
      },
      headers: { Authorization: `Bearer ${jwt}` },
    };
    try {
      resp = await axios.request(options);
      //console.log("1", resp.data);
      if (resp.status === 204) {
        swal("No Orders on " + bookingDate);
      } else {
        console.log(resp.data);
        setNvOrderList([...resp.data.NonvegOrderList]);
        setVOrderList([...resp.data.VegOrderList]);
      }
    } catch (err) {
      console.log("Food type not recorded");
    }
    console.log(nvOrderList);
    console.log(vOrderList);
  };

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
          }}
        >
          <h3>Select date to Check orders</h3>
          <CDBInput
            type="date"
            placeholder="Date"
            fontSize="23"
            onChange={dateHandleChange}
          />
          <br></br>
          <CDBBtn
            color="prime"
            outline
            style={{ width: "150px" }}
            onClick={submitHandler}
          >
            Check Orders
          </CDBBtn>
        </div>
        <div style={{ height: "100%" }}>
          <div style={{ height: "calc(100% - 64px)", overflowY: "scroll" }}>
            <div className="d-flex card-section">
              <div className="cards-container">
                <div className="card-bg w-100 border d-flex flex-column">
                  <h3>Vegitarian Orders count : {vOrderList.length}</h3>
                  <CDBTable bordered responsive>
                    <CDBTableHeader>
                      <tr>
                        <th>#</th>
                        <th>Employee Id</th>
                        <th>Name</th>
                      </tr>
                    </CDBTableHeader>
                    <CDBTableBody>
                      {vOrderList.map((vl, index) => {
                        return (
                          <tr>
                            <td>{index + 1}</td>
                            <td>{vl.empid}</td>
                            <td>{vl.ename}</td>
                          </tr>
                        );
                      })}
                    </CDBTableBody>
                  </CDBTable>
                </div>

                <div className="card-bg w-100 border d-flex flex-column">
                  <h3>Non-Vegitarian Orders count : {nvOrderList.length}</h3>
                  <CDBTable bordered responsive>
                    <CDBTableHeader>
                      <tr>
                        <th>#</th>
                        <th>Employee Id</th>
                        <th>Name</th>
                      </tr>
                    </CDBTableHeader>
                    <CDBTableBody>
                      {nvOrderList.map((vl, index) => {
                        return (
                          <tr>
                            <td>{index + 1}</td>
                            <td>{vl.empid}</td>
                            <td>{vl.ename}</td>
                          </tr>
                        );
                      })}
                    </CDBTableBody>
                  </CDBTable>
                </div>
              </div>
            </div>
            <footer className="footer">
              <div className="d-flex align-items-center">
                <small className="ml-2 mt-1">
                  &copy; Devwares, 2020. All rights reserved.
                </small>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};
