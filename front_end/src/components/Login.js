import React from 'react';
import NavBar from './NavBar';
import Footer from './Footer';
import axios from "axios";
import App from './App';
import LandingNavBar from './LandingNavBar';
import { Redirect } from 'react-router-dom';
import './styles/content_styling.css';
import './styles/navbar_styling.css';

//This class is used to log the user into their account that they created on Ace Deals
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value1: '', value2: '', userEmail: "", redirect: false };

        this.handleChange1 = this.handleChange1.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
    }

    //takes the changing text from the input and updates the term variable in the state with each keystroke
    handleChange1(event) {
        this.setState({ value1: event.target.value });
    }
    //takes the changing text from the input and updates the term variable in the state with each keystroke
    handleChange2(event) {
        this.setState({ value2: event.target.value });
    }
    //takes the changing text from the input and updates the term variable in the state with each keystroke
    logUserIn = () => {
        var e = this.state.value1;
        console.log("DEBUGGER: LOG USER IN " + e);
        axios.post("http://localhost:3001/api/logUserIn", {
            email: e
        });
    }

    //this will get all the data from the database and check to see if the email and password that was passed to this
    //component is correct
    getDataFromDb = () => {
        fetch("http://localhost:3001/api/getData").then(data => data.json())
            .then(res => {
                var data = res.data;
                let flag = false;
                let e = this.state.value1;
                let p = this.state.value2;
                data.forEach(function (user) {
                    if (user.Email === e && user.Password === p) {
                        flag = true;
                    }
                });
                if (flag) {
                    this.logUserIn();
                    this.setState({ redirect: true });
                }
                else alert("Invalid credentials!");
            });
    };

    //calls the function that is used to get all the data from the database
    fetchAndPost = () => {
        this.getDataFromDb();
    }

    //when the component mounts to the DOM we will get all the data and check to see which user is logged and reset
    //the LoggedIn varialbe. This is used for prototyping purposes only
    componentDidMount = () => {
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

    //Renders the login page's HTML which uses a series of div's and input tags to catch the values entered and update
    //the state
    render() {
        if (this.state.redirect === true) {
            return <App usersEmailAddress={this.state.value1} />
        }
        return (
            <div>
                <div>
                    <LandingNavBar />
                    <div className="center-div opacity-card">
                        <div className="card card-height-login">
                            <div className="card-header center-cards bg-dark white-color-text">
                                <h2>Ace Deals Login</h2>
                            </div>
                            <div className="input-group mb-3 input-sizing signup-page-div">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon3">Email</span>
                                </div>
                                <input type="text" className="form-control" value={this.state.value1} onChange={this.handleChange1} />
                            </div>
                            <div className="input-group mb-3 input-sizing signup-page-div">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon3">Password</span>
                                </div>
                                <input type="password" className="form-control" value={this.state.value2} onChange={this.handleChange2} />
                            </div>
                            <input onClick={() => this.fetchAndPost()} className="btn btn-primary button-sizing-login" type="submit" value="Login" />
                        </div>
                    </div >
                    <Footer />
                </div>
            </div>
        )
    }
}

//exports the Login component for use in other components
export default Login;