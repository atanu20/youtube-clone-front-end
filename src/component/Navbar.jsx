import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
// import Dashboard from '../admin/page/Dashboard'
import './Navbar.css';
const Navbar = () => {
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState('');
  const YoutubeUserName = localStorage.getItem('YoutubeUserName');
  const history = useHistory();
  const Logout = () => {
    localStorage.removeItem('YoutubeUserId');
    localStorage.removeItem('YoutubeEmail');
    localStorage.removeItem('YoutubeUserName');
    localStorage.removeItem('YoutubeUser');
    localStorage.removeItem('Youtubetoken');

    window.location.reload();
    // history.push("/")
  };
  const onSub = (e) => {
    e.preventDefault();
    let text = search.trim();
    text = text.replace(/\s/g, '+');
    history.push(`/search/${text}`);
    setSearch('');
  };
  return (
    <>
      <div className="navbar-box">
        <div className="logo-box">
          <i class="fa fa-bars " onClick={() => setShow(!show)}></i>
          <NavLink to="/home">
            <img src="../image/logo.png" alt="logo" />
          </NavLink>
        </div>
        <div className="search-box">
          <form onSubmit={onSub}>
            <div className="input-group ">
              <input
                type="text"
                className="form-control"
                placeholder="Search here . . ."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                required
              />
              <div className="input-group-append">
                <input
                  type="submit"
                  value="Search"
                  className="input-group-text btn"
                />
              </div>
            </div>
          </form>
        </div>
        <div className="user-box">
          <button className="btn btn-danger m-1" onClick={Logout}>
            Logout
          </button>
          <button
            className="btn btn-dark m-1"
            onClick={() => history.push('/dashboard')}
          >
            {YoutubeUserName}
          </button>
          {/* {
          login ? (<>
            <button  className="btn btn-danger m-1" >Logout</button>
          <button  className="btn btn-dark m-1" onClick={()=>history.push('/dashboard')}>User</button>
          
          </>) :(
            <>
              <button  className="btn btn-danger m-1" onClick={()=>history.push('/login')}>Login</button>
              <button  className="btn btn-dark m-1" onClick={()=>history.push('/register')}>Register</button>
              </>
          )
        } */}
        </div>
      </div>
      {show && (
        <div className="sidebar">
          <div className="top-box">
            <i class="fa fa-times" onClick={() => setShow(!show)}></i>
            <NavLink to="/home">
              <img src="../image/youtube.png" alt="logo" />
            </NavLink>
          </div>
          <div className="alltab">
            <NavLink to="/home" className="tab">
              <i class="fa fa-home" aria-hidden="true"></i>
              <h5>Home</h5>
            </NavLink>
            <NavLink to="/history" className="tab">
              <i class="fa fa-history" aria-hidden="true"></i>
              <h5>History</h5>
            </NavLink>
            <NavLink to="/likedvideo" className="tab">
              <i class="fa fa-thumbs-o-up" aria-hidden="true"></i>
              <h5>Liked Videos</h5>
            </NavLink>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
