import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch, // for NotFoundPage
} from 'react-router-dom';
import './css/App.css';
import HomePage from './pages/HomePage';
import ClubPage from './pages/ClubPage';
import ClubsListPage from './pages/ClubsListPage';
import MembersPage from './pages/MembersPage';
import NavBar from "./NavBar";
import NotFoundPage from "./pages/NotFoundPage";

const App = () => (
    <>
        {
            <Router className="container">
                <div className="row">
                    <NavBar className="col m-3"/>
                </div>
                <Switch>
                    <Route path="/" component={HomePage} exact/>
                    <Route path="/club-list" component={ClubsListPage}/>
                    <Route path="/members" component={MembersPage}/>
                    <Route path="/clubs/:initials" component={ClubPage}/>
                    <Route component={NotFoundPage}/>
                </Switch>
            </Router>
        }
    </>
)

export default App;
