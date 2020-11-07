
// import necessary files 
import React from 'react';
import LandingNavBar from './LandingNavBar';
import Footer from './Footer';
import axios from "axios";
import { Redirect } from 'react-router-dom';
import './styles/content_styling.css';
import './styles/navbar_styling.css';

// Create our signup component to render the HTML to the signup page
class Signup extends React.Component {

    // We create a constructor to bind a state object to this class as well as the handleChange 
    // methods which are used to update the values inserted by the user 
    constructor(props) {
        super(props);
        this.state = { value1: '', value2: '', value3: '', value4: '', value5: '', redirect: false };

        this.handleChange1 = this.handleChange1.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        this.handleChange3 = this.handleChange3.bind(this);
        this.handleChange4 = this.handleChange4.bind(this);
        this.handleChange5 = this.handleChange5.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // The following methods are used to handle the changing inputs from the user
    handleChange1(event) {
        this.setState({ value1: event.target.value });
    }
    // The following methods are used to handle the changing inputs from the user
    handleChange2(event) {
        this.setState({ value2: event.target.value });
    }
    // The following methods are used to handle the changing inputs from the user
    handleChange3(event) {
        this.setState({ value3: event.target.value });
    }
    // The following methods are used to handle the changing inputs from the user
    handleChange4(event) {
        this.setState({ value4: event.target.value });
    }
    // The following methods are used to handle the changing inputs from the user
    handleChange5(event) {
        this.setState({ value5: event.target.value });
    }

    //submits the new user into the database by firing off an axios post request with the information needed for the
    //the users account
    submitNewUser = (fname, lname, pass, email, pass1) => {
        axios.post("http://localhost:3001/api/putData", {
            fname: fname,
            lname: lname,
            pass: pass,
            email: email,
            logged: false,
            friends: [],
            posts: []
        });
        if (pass !== pass1) {
            alert("Passwords are not the same.");
            return;
        }
        if (fname === "" || pass === "" || lname === "" || email === "") {
            alert("Please fill out the proper fields.");
        } else {
            alert("Thanks for choosing Ace Deals!");
            this.setState({ redirect: true });
        }
    }

    //this used to handle the form input when the user wants to strike the enter key instead
    //of clicking the button
    handleSubmit(event) {
        alert("Thanks for choosing Ace Deals!");
        event.preventDefault();
    }

    //renders the HTML needed for the sign up page
    render() {
        if (this.state.redirect === true) {
            return <Redirect to='/' />
        }
        return (
            <div>
                <LandingNavBar />
                <div className="center-div opacity-card">
                    <div className="card card-height">
                        <div className="card-header center-cards bg-dark white-color-text">
                            <h2>Ace Deals sign up</h2>
                        </div>
                        <div className="input-group mb-3 input-sizing signup-page-div">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon3">First Name</span>
                            </div>
                            <input type="text" className="form-control" value={this.state.value1} onChange={this.handleChange1} />
                        </div>
                        <div className="input-group mb-3 input-sizing signup-page-div">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon3">Last Name</span>
                            </div>
                            <input type="text" className="form-control" value={this.state.value2} onChange={this.handleChange2} />
                        </div>
                        <div className="input-group mb-3 input-sizing signup-page-div">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon3">Password</span>
                            </div>
                            <input type="password" className="form-control" value={this.state.value3} onChange={this.handleChange3} />
                        </div>
                        <div className="input-group mb-3 input-sizing signup-page-div">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon3">Re-enter Password</span>
                            </div>
                            <input type="password" className="form-control" value={this.state.value5} onChange={this.handleChange5} />
                        </div>
                        <div className="input-group mb-3 input-sizing signup-page-div">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon3">Email</span>
                            </div>
                            <input type="text" className="form-control" value={this.state.value4} onChange={this.handleChange4} />
                        </div>
                        <input onClick={() => this.submitNewUser(this.state.value1, this.state.value2, this.state.value3, this.state.value4, this.state.value5)} className="btn btn-primary button-sizing-login" type="submit" value="Sign up" />
                    </div>
                </div >
                <Footer />
            </div>
        )
    }
}

//exports the signup component for use in other components
export default Signup;