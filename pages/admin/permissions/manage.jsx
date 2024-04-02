import { AdminLayout } from "@/layout";
import React, { Fragment, useState } from "react";

const Manage = () => {
  const [userID, setUserID] = useState("");

  const [userPersmissions, setUserPermissions] = useState([]);
  const [userData, setUserData] = useState(undefined);
  const handleUserIDChange = (e) => {
    setUserID(e.target.value);
  };
  const BASE_URL = "https://eduversa-api.onrender.com";

  const getPermissionData = async () => {
    const res = await fetch(`${BASE_URL}/account/?query=${userID}`, {
      method: "GET",
    });
    const data = await res.json();

    if (!data.status) {
      console.log(data.message);
    }
    setUserData(data.data);
    setUserPermissions(data.data.permissions);
  };
  return (
    <Fragment>
      <AdminLayout>
        <div className="container">
          <input
            type="text"
            name="userID"
            id="userID"
            placeholder="user id"
            className="textbox"
            onChange={handleUserIDChange}
          />
          <button className="btn" onClick={getPermissionData}>
            Search
          </button>
        </div>

        <section className="permission-container">
          <div className="all-permission permission-container--col">
            All Permisson
          </div>
          <div className="user-permission permission-container--col">
            <p>{userData ? userData.user_id : "Search an Account"}</p>
          </div>
        </section>

        {/* <div>{JSON.stringify(userPersmissions)}</div> */}
      </AdminLayout>
    </Fragment>
  );
};

export default Manage;
