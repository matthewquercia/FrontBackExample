
// import necessary files
import React from 'react';
import './styles/content_styling.css';

// This is the component used for our footer
class Footer extends React.Component {
    render() {
        return (
            <footer className="footer-position font-small bg-danger">
                <div className="footer-copyright text-center py-3 brand-color">
                    © 2019 AceDeals.com
                </div>
            </footer>
        )
    }
}

export default Footer;