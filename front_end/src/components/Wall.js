import React from 'react';
import StandardNavBar from './StandardNavBar';
import Footer from './Footer';
import axios from 'axios';
import WallPostList from './WallPostList';

// create a class component that extends the react component so that we can use its methods ex. render()
class Wall extends React.Component {
    // Render our combined components

    render() {
        return (
            <div>
                <StandardNavBar />
                <WallPostList />
                <Footer />
            </div>
        )
    }
}

export default Wall;