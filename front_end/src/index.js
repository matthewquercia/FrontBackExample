// Import necessary files and packages
import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import App from './components/App';
import Content from './components/Content';
import Signup from './components/Signup';
import Login from './components/Login';
import AccountPage from './components/AccountPage';
import Wall from './components/Wall';
import Contacts from './components/Contacts';
import ContactList from './components/ContactList';

// We use a slightly different approach and use BrowserRouter to allow users to navigate 
// seamlessly throughout our application
ReactDom.render(
    <BrowserRouter>
        <div>
            <Route exact path='/' component={Content} />
            <Route exact path='/productsearch' component={App} />
            <div>
                <Route path='/signup' component={Signup} />
            </div>
            <div>
                <Route path='/login' component={Login} />
            </div>
            <div>
                <Route path='/accountpage' component={AccountPage} />
            </div>
            <div>
                <Route path='/wallposts' component={Wall} />
            </div>
            <div>
                <Route path='/contacts' component={ContactList} />
            </div>
        </div>
    </BrowserRouter>,
    document.querySelector('#root'));