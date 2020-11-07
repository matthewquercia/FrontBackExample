import React from 'react';
import user from './styles/man.png';
import axios from 'axios';
import StandardNavBar from './StandardNavBar';
import Footer from './Footer';

//Creates a class Contacts to render an individual contact 
//This component will take the props thats passed to it by the ContactList component
//and then render each contact with appropriate fields
class Contacts extends React.Component {

    removeFriend = (e) => {
        axios.post("http://localhost:3001/api/removeFriend", {
            email: e
        });
    }

    //renders an individual contact 
    render() {
        console.log(this.props.contact);
        return (
            <div className="col-md-8 offset-md-2 bg-white rounded">
                <div className="row shadow-sm p-3 mb-5 hover-grey rounded mx-2">
                    <div className="col-xs-6 col-md-4 col-lg-3 vcenter">
                        <img src={user} height="100px" width="100px" />
                    </div>
                    <div className="col-xs-6 col-md-8 align-items-center">
                        <h5><b>{this.props.contact.FirstName} {this.props.contact.LastName}</b></h5>
                        <p>{this.props.contact.Email}</p>
                    </div>
                    <button onClick={() => this.removeFriend(this.props.contact.Email)} className="btn btn-warning remove-friend-btn">Remove</button>
                </div>
            </div>
        )
    }
}

export default Contacts;