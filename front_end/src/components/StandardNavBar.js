// Import necessary files
import React from 'react';
import AccountPage from './AccountPage';
import Wall from './Wall';
import Contacts from './Contacts';
import App from './App';
import axios from 'axios';

import './styles/navbar_styling.css';
import './styles/content_styling.css';


// This navbar will be used when a user is logged in
class StandardNavBar extends React.Component {
    // We use render() which to render our HTML to the page

    logUserOut = () => {
        fetch("http://localhost:3001/api/getData").then(data => data.json())
            .then(res => {
                var data = res.data;
                data.forEach(function (user) {
                    if (user.LoggedIn === true) {
                        axios.post("http://localhost:3001/api/resetLoggedIn");
                    }
                });
            });
    }

    //renders the HTML needed to display the standard navbar which is used by certain components of the program
    render() {
        return (
            <nav className="navbar navbar-light bg-danger white-color-text navbar-margin-below">
                <a href="http://localhost:3000/login">
                    <button onClick={() => this.logUserOut()} className="btn btn-outline-dark my-2 my-sm-0 button-padding bg-light margin-between-buttons" type="submit"><b>Logout</b></button>
                </a>
                <div className="form-inline">
                    <a href="http://localhost:3000/productsearch">
                        <i className="fas fa-search fa-fw white-color-text right-side-margin fa-2x"></i>
                    </a>
                    <a href="http://localhost:3000/accountpage">
                        <i className="fas fa-user-circle fa-fw white-color-text right-side-margin fa-2x"></i>
                    </a>
                    <a href="http://localhost:3000/wallposts">
                        <i className="fas fa-list-alt fa-fw white-color-text right-side-margin fa-2x"></i>
                    </a>
                    <a href="http://localhost:3000/contacts">
                        <i className="fas fa-user-friends fa-fw white-color-text right-side-margin fa-2x"></i>
                    </a>
                </div>
            </nav>
        )
    }
}

export default StandardNavBar;