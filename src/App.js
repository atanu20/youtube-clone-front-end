import React from 'react';

import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Error from './pages/Error';
import History from './pages/History';
// import Navbar from './component/Navbar';
import LikedVideo from './pages/LikedVideo';
import Details from './pages/Details';
import Register from './pages/Register';
import Login from './pages/Login';
import Search from './pages/Search';
import Videomessage from './admin/page/Videomessage';

import Dashboard from './admin/page/Dashboard';
import AddVideo from './admin/page/AddVideo';
import UserDetails from './admin/page/UserDetails';
import './App.css';
// https://first-mongoapp.herokuapp.com/

const App = () => {
  return (
    <>
      <Switch>
        <Route exact path="/home" component={Home} />
        <Route exact path="/history" component={History} />
        <Route exact path="/video/:id" component={Details} />
        <Route exact path="/likedvideo" component={LikedVideo} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/" component={Login} />
        <Route exact path="/search/:text" component={Search} />
        <Route exact path="/allmessage/:id" component={Videomessage} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/addvideo" component={AddVideo} />
        <Route exact path="/userdetails" component={UserDetails} />

        <Route component={Error} />
      </Switch>
    </>
  );
};

export default App;
