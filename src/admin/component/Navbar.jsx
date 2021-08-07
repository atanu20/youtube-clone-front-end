import React,{useState} from 'react'
import { NavLink, useHistory } from 'react-router-dom'
// import Dashboard from '../admin/page/Dashboard'
import './Navbar.css'
const Navbar = () => {
    const [show, setShow] = useState(false)
    const YoutubeUserName=localStorage.getItem('YoutubeUserName')
  const history= useHistory()

  const  Logout=()=>{
    localStorage.removeItem("YoutubeUserId");
    localStorage.removeItem("YoutubeEmail");
    localStorage.removeItem("YoutubeUserName");
    localStorage.removeItem("YoutubeUser");
    localStorage.removeItem("Youtubetoken");
    
    window.location.reload()
    // history.push("/")
   }

    return (
        <>
        <div className="navbar-box">
            <div className="logo-box">
            <i class="fa fa-bars " onClick={()=>setShow(!show)}></i>
                <NavLink to="/home">
                    <img src="../image/logo.png" alt="logo"  />
                </NavLink>
            </div>
           
            <div className="user-box">
            <button  className="btn btn-danger m-1" onClick={Logout} >Logout</button>
          <button  className="btn btn-dark m-1" onClick={()=>history.push('/dashboard')}>{YoutubeUserName}</button>
            </div>

        </div>
        {
            show && <div className="sidebar">
            <div className="top-box">
            <i class="fa fa-times" onClick={()=>setShow(!show)}></i>
             <NavLink to="/home">
                     <img src="../image/youtube.png" alt="logo"  />
                 </NavLink>
            </div>
            <div className="alltab">
                 
                {/* <NavLink to="/" className="tab">
                <i class="fa fa-home" aria-hidden="true"></i>
                 <h5>All Videos</h5>
                </NavLink> */}
                <NavLink to="/dashboard" className="tab">
                <i class="fa fa-video-camera" aria-hidden="true"></i>
                 <h5>Your Videos</h5>
                </NavLink>
                <NavLink to="/addvideo" className="tab">
                <i class="fa fa-youtube" aria-hidden="true"></i>
                 <h5>Add Video</h5>
                </NavLink>
                <NavLink to="/userdetails" className="tab">
                <i class="fa fa-user" aria-hidden="true"></i>
                 <h5>User Details</h5>
                </NavLink>
                {/* <NavLink to="/" className="tab">
                <i class="fa fa-commenting-o" aria-hidden="true"></i>
                 <h5>All Comments</h5>
                </NavLink> */}
                {/* <NavLink to="/subscriber" className="tab">
                <i class="fa fa-hand-o-up" aria-hidden="true"></i>
                 <h5>Your Subscriber</h5>
                </NavLink> */}
                
                 
            </div>
 
         </div>
        }
        
            
        </>
    )
}

export default Navbar
