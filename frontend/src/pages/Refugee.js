import { useAuth0 } from "@auth0/auth0-react";
import "../styles/main.css";
import "../styles/refugee.css";
import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const sidebarNavItems = [
    {
        display: 'Dashboard',
        icon: <i className='bx bx-home'></i>,
        to: '/',
        section: ''
    },
    {
        display: 'Getting Started',
        icon: <i className='bx bx-star'></i>,
        to: '/started',
        section: 'started'
    },
    {
        display: 'Calendar',
        icon: <i className='bx bx-calendar'></i>,
        to: '/calendar',
        section: 'calendar'
    },
    {
        display: 'User',
        icon: <i className='bx bx-user'></i>,
        to: '/user',
        section: 'user'
    },
    {
        display: 'Orders',
        icon: <i className='bx bx-receipt'></i>,
        to: '/order',
        section: 'order'
    },
]


const Refugee = () => {
    const { logout, getAccessTokenSilently, user, isAuthenticated } =
        useAuth0();

    console.log(isAuthenticated);

    const callApi = () => {
        fetch("http://localhost/api/public")
            .then((res) => console.log(res.message))
            .catch((err) => console.log(err.message));
    };

    const callApi2 = async () => {
        const res = await fetch("http://localhost/api/public");
        const data = await res.json();
        console.log(data.message);
    };

    const getRoute = async () => {
        const token = await getAccessTokenSilently();
        console.log(token);
        const res = await fetch("http://localhost/api/private", {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                Authorization: "Bearer " + token,
            },
        });
        const data = await res.json();
        console.log(data);
    };
    return (
      <div className="page-container">
        <div className="container">
          {isAuthenticated && <div className="profile-details-container" >
            <div className="image-container">
              <img src={user.picture}></img>
            </div>
            <div className="full-name">
              {user.given_name} {user.family_name}
              </div>
              
              <button
                  className="main__btn refugee-btn"
                  onClick={() => logout({ returnTo: window.location.origin })}
              >
                  Log Out
              </button>
              <button className="main__btn refugee-btn" onClick={getRoute}>
                  Get Route
              </button>
          </div> }

          <div className="content">

              {isAuthenticated && (
                  <pre style={{ textAlign: "start" }}>
                      {JSON.stringify(user, "salut", 2)}
                  </pre>
              )}
          </div>
        </div>
      </div>
    );
};

export default Refugee;
