import React from 'react';
import StandardNavBar from './StandardNavBar';
import Footer from './Footer';
import axios from 'axios';

import user from './styles/man.png';
import './styles/content_styling.css';
import './styles/navbar_styling.css';

//Account page component
class AccountPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { userInfo: {} };
    }
    //used to send a fetch request to server to get all user data
    getUserLoggedIn = () => {
        fetch("http://localhost:3001/api/getData").then(data => data.json())
            .then(res => {
                var data = res.data;
                var userToGrab = {};
                data.forEach(function (user) {
                    if (user.LoggedIn === true) {
                        userToGrab = user;
                    }
                });
                this.setState({ userInfo: userToGrab });
            });
    }
    //used for prototyping purposes
    resetPosts = () => {
        axios.post("http://localhost:3001/api/resetPosts");
        alert("Reset all posts");
    }
    //when the component mounts we will run the userLoggedIn function to validate credentials and log the user in
    componentDidMount = () => {
        this.getUserLoggedIn();
    }
    //HTML that is used to build the account page. This page consists of inputs, and functions that manage the inputs
    render() {
        return (
            <div>
                <StandardNavBar />
                <div className="card-for-account">
                    <img src={user} className="card-for-pic" alt="John" height="100px" width="100px" />
                    <h3><b>{this.state.userInfo.FirstName} {this.state.userInfo.LastName}</b></h3>
                    <i className="fas fa-star fa-2x"></i>
                    <p>500</p>
                    <p><b>Email:</b> {this.state.userInfo.Email}</p>
                    <input className="form-control account-creditcard-bar" type="text" placeholder="Nick Name" />
                    <input className="form-control account-creditcard-bar" value={this.state.userInfo.FirstName} type="text" placeholder="First Name" />
                    <input className="form-control account-creditcard-bar" value={this.state.userInfo.LastName} type="text" placeholder="Last Name" />
                    <input className="form-control account-creditcard-bar" type="text" placeholder="Address" />
                    <input className="form-control account-creditcard-bar" type="text" placeholder="Postal Code" />
                    <input className="form-control account-creditcard-bar" type="text" placeholder="Phone Number" />
                    <input className="form-control account-creditcard-bar" type="text" placeholder="Change Password" />
                    <input className="form-control account-creditcard-bar" type="text" placeholder="Change Email" />
                    <p><b>Province:</b></p>
                    <select>
                        <option value="AB">Alberta</option>
                        <option value="BC">British Columbia</option>
                        <option value="MB">Manitoba</option>
                        <option value="NB">New Brunswick</option>
                        <option value="NL">Newfoundland and Labrador</option>
                        <option value="NS">Nova Scotia</option>
                        <option value="ON">Ontario</option>
                        <option value="PE">Prince Edward Island</option>
                        <option value="QC">Quebec</option>
                        <option value="SK">Saskatchewan</option>
                        <option value="NT">Northwest Territories</option>
                        <option value="NU">Nunavut</option>
                        <option value="YT">Yukon</option>
                    </select>
                    <hr />
                    <input className="btn btn-primary button-sizing-login" type="submit" value="Save" />
                    <input onClick={() => this.resetPosts()} className="btn btn-warning button-sizing-login" type="submit" value="Reset Posts" />
                </div>
                <Footer />
            </div >
        )
    }
}

//exports the component
export default AccountPage;