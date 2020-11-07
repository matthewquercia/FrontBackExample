import React from 'react';
import Contacts from './Contacts';
import StandardNavBar from './StandardNavBar';
import Footer from './Footer';
import axios from 'axios';

//creates a class for contactList to build the contact list
class ContactList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { friends: [], term: '' };
    }

    //retrieves all the friends and uses the map function to pass the object to the Contact component to be rendered
    //in a list
    getAllContacts = () => {
        var listOfFriends = [];
        return listOfFriends = this.state.friends.map((contact) => {
            return <Contacts contact={contact} />
        });
    }

    //when the component mounts we automatically retrieve the data necessary to pass down the Contact component
    componentDidMount = () => {
        var friendArray = [];
        fetch("http://localhost:3001/api/getData").then(data => data.json())
            .then(res => {
                var data = res.data;
                data.forEach(function (user) {
                    if (user.LoggedIn === true) {
                        friendArray = user.Friends;
                    }
                });
                return friendArray;
            }).then(f => {
                this.setState({ friends: f });
            });
    }

    // We use this method to update the term variable in the state object
    onTermChange = (event) => {
        this.setState({ term: event.target.value });
    }

    //goes and retrieves all the data from the db and checks to see if the email exists. If the email exists then we
    //simply pass that users info as a paramter to the users friend array in the document
    getDataFromDb = () => {
        fetch("http://localhost:3001/api/getData").then(data => data.json())
            .then(res => {
                var data = res.data;
                let flag = false;
                var e = this.state.term;
                var f, l, e;
                data.forEach(function (user) {
                    if (user.Email === e) {
                        flag = true;
                        f = user.FirstName;
                        l = user.LastName;
                        e = user.Email;
                    }
                });
                if (flag) {
                    alert("Added friend!");
                    axios.post("http://localhost:3001/api/addFriend", {
                        first: f,
                        last: l,
                        email: e
                    });
                }
                else alert("User not found!");
            });
    };

    //renders the list of contacts that has been added by the map fucntion to state of the class component
    render() {
        return (
            <div>
                <StandardNavBar />
                <div className="card-for-contactlist">
                    <input className="form-control" type="text" placeholder="Search for a friend to add..." value={this.state.term}
                        onChange={this.onTermChange} />
                    <input onClick={() => this.getDataFromDb()} className="btn btn-warning button-sizing-login some-margin-t-b" type="submit" value="Search" />
                </div>
                {this.getAllContacts()};
                <Footer />
            </div>
        )
    }
}

//exports the ContactList for use in another component
export default ContactList;