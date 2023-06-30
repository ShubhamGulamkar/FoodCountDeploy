import React from "react";
import { CDBBtn, CDBInput } from "cdbreact";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import "../css/Profile.css";
import { CDBTable, CDBTableHeader, CDBTableBody } from "cdbreact";
import axios from "axios";
import swal from "sweetalert";
import { useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
export const Profile = () => {
  let currentDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
  let year = currentDate.getFullYear();
  let month = currentDate.getMonth() + 1;
  let day = currentDate.getDate();
  if (day < 10 && month < 10) {
    currentDate = year + "-0" + month + "-0" + day;
  } else if (month < 10) {
    currentDate = year + "-0" + month + "-" + day;
  } else if (day < 10) {
    currentDate = year + "-" + month + "-0" + day;
  } else {
    currentDate = year + "-" + month + "-" + day;
  }

  const [orderHistoryList, setOrderHistoryList] = useState([]);
  const [bookingDate, setBookingDate] = useState("");
  const [foodtype, setFoodtype] = useState("");

  const dateHandleChange = (event) => {
    setBookingDate(event.target.value);
  };

  const foodtypeHandleChange = (event) => {
    setFoodtype(event.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    var date = bookingDate;

    var id = JSON.parse(sessionStorage.getItem("User")).empid;
    var userType = JSON.parse(sessionStorage.getItem("User")).userType;
    console.log(id + " " + userType);

    var type = foodtype;

    var jwt = sessionStorage.getItem("token");
    if (bookingDate === "") {
      swal("Please select date");
      return;
    } else if (foodtype === "") {
      swal("Please select Food type");
      return;
    }

    const options = {
      method: "POST",
      url: "https://foodcount2.onrender.com/api/users/booking",
      data: {
        id,
        type,
        date,
      },
      headers: { Authorization: `Bearer ${jwt}` },
    };
    try {
      const resp = await axios.request(options);
      setOrderHistoryList([...resp.data.userhistory.orderlist]);
      console.log(resp.data.userhistory.orderlist);
      if (resp.data.booking_status === 0) {
        swal("Food is alrady booked for this day");
        return;
      }
      swal("Food type recorded successfully");
    } catch (err) {
      console.log(err);
      console.log("Food type not recorded");
    }
  };

  return (
    <div className="d-flex profile">
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
        <div style={{ height: "100%" }}>
          <div
            style={{
              height: "calc(100% - 64px)",
              padding: "20px 5%",
              overflowY: "scroll",
            }}
          >
            <div style={{ margin: "0 auto", maxWidth: "1320px" }}>
              <div className="cards-container1">
                <div>
                  <div className="card shadow border-0">
                    <div className="card-body">
                      <h4
                        className="card-title mb-2"
                        style={{ fontWeight: "600" }}
                      >
                        Select Date to book food
                      </h4>
                      <CDBInput
                        type="date"
                        placeholder="Date"
                        fontSize="23"
                        name="date"
                        value={bookingDate}
                        onChange={(e) => dateHandleChange(e)}
                        min={currentDate}
                      />
                      <form className="booking-name">
                        <div className="container">
                          <h4>
                            <br />
                            Select your Preference
                          </h4>
                          <input
                            className="first-radio"
                            type="radio"
                            name="foodtype"
                            value="0"
                            style={{ accentColor: "green" }}
                            onChange={foodtypeHandleChange}
                          />
                          <label
                            className="label-first"
                            htmlFor="veg"
                            style={{
                              fontSize: 20,
                              marginLeft: "8px",
                            }}
                          >
                            <br />
                            Veg
                          </label>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          <input
                            className="second-radio"
                            type="radio"
                            name="foodtype"
                            value="1"
                            style={{ accentColor: "red" }}
                            onChange={foodtypeHandleChange}
                          />
                          <label
                            className="label-second"
                            htmlFor="nonveg"
                            style={{ fontSize: 20, marginLeft: "8px" }}
                          >
                            Non-Veg
                          </label>
                        </div>
                        <br />
                        <p className="p-type">
                          {/* Food-Type: <b>{bookingData.foodtype}</b> */}
                        </p>
                        <div
                          className="justify-content-end pr-1"
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          <CDBBtn
                            color="#025B9A"
                            outline
                            onClick={submitHandler}
                          >
                            Submit
                          </CDBBtn>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>

                <div className="mini-container">
                  <div>
                    <div className="card shadow border-0">
                      <div className="p-3">
                        <h3>Your Orders</h3>
                        <CDBTable responsive>
                          <CDBTableHeader>
                            <tr>
                              <th>#</th>
                              <th>Date</th>
                              <th>Type of order</th>
                            </tr>
                          </CDBTableHeader>
                          <CDBTableBody>
                            {orderHistoryList.map((o, index) => {
                              return (
                                <tr>
                                  <td>{index + 1}</td>
                                  <td>{o.date}</td>
                                  <td>{o.type === "1" ? "Non-Veg" : "Veg"}</td>
                                </tr>
                              );
                            })}
                          </CDBTableBody>
                        </CDBTable>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <footer className="d-flex mx-auto py-4">
                <small className="mx-auto my-1 text-center">
                  &copy; Genzeon food
                </small>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
