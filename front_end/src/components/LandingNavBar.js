import React from 'react';
import './styles/navbar_styling.css';
import './styles/content_styling.css';

// LandingNavBar is the navigation bar that is used when a user is not logged in. This nav bar will
// include login and sign up buttons
class LandingNavBar extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-light bg-danger white-color-text navbar-margin-below">
                <a href="http://localhost:3000/" className="navbar-brand">
                    <i className="fas fa-shopping-bag fa-fw white-color-text fa-2x"></i>
                </a>
                <div className="form-inline">
                    <a href="http://localhost:3000/login">
                        <button className="btn btn-outline-dark my-2 my-sm-0 button-padding bg-light margin-between-buttons" type="submit">Login</button>
                    </a>
                    <a href="http://localhost:3000/signup">
                        <button className="btn btn-outline-dark my-2 my-sm-0 bg-light margin-between-buttons" type="submit" >Sign up</button>
                    </a>
                </div>
            </nav>
        )
    }
}

export default LandingNavBar;