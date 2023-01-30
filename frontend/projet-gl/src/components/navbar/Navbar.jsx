import {React, useState, useRef, useEffect} from "react";
import './Navbar.css'
import logo from '../../img/logo.png'
import {HiHome, HiInformationCircle, HiSearch} from 'react-icons/hi'
import {IoMdChatboxes} from 'react-icons/io'
import {CgProfile} from 'react-icons/cg'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useLogout } from '../../hooks/useLogout'
import { redirect  } from "react-router-dom";
const Navbar = () =>{
    let menuRef = useRef();
    const {Logout}=useLogout()
    useEffect(() => {
      let handler = (e)=>{
        if(!menuRef.current.contains(e.target)){
          setOpen(false);
          console.log(menuRef.current);
        }      
      };
  
      document.addEventListener("mousedown", handler);
      
  
      return() =>{
        document.removeEventListener("mousedown", handler);
      }
  
    });
  
    

  const [open, setOpen] = useState(false);
  const [openMsg, setOpenMsg] = useState(false);

    const { user } = useAuthContext()
    const profileName = "dirafinadias"
    const [loggedIn, setLoggedIn] = useState(false);
    return(
        <div className="Navbar">
            <header className="main">
                <div className="logoNav">
                    <a href="/"><img src={logo} alt="logo" className="logo"/></a>
                </div>
                    <div className="smallIcon"><a href="/" id="homeIcon"><HiHome/> <p>Home</p></a></div>
                    <div className="smallIcon"><a href="#" id="infoIcon"><HiInformationCircle/> <p>About</p></a></div>
                    
                <div className="searchBar">
                    <div className="searchIcon"><HiSearch/></div>
                    <input type="search" className="searchInput" placeholder="Search for courses...."/>
                </div>
                {user ? <div className="smallIcon"><a href="/" id="messageIcon"><IoMdChatboxes/>
                <p>Messages</p></a><div className={`dropdown-menu ${openMsg? 'active' : 'inactive'}`} >
                <ul>
                    <li className="dropdownItem"><Message senderName="dirafinadias"/></li>
                    <li className="dropdownItem"><Message senderName="anisoukid"/></li>
                    <li className="dropdownItem"><Message senderName="akrambennacer"/></li>
                </ul>
                </div>
                    </div> :
                
                <a href="/" className="registerButton">Register</a>}
                {user ? <div className="smallIcon">
                    <a href="#" id="profileIcon" onClick={()=>{setOpen(!open)}}><CgProfile/>
                    <p>@{user.data.firstname+' '+user.data.lastname}</p></a>
                    <div className={`dropdown-menu ${open? 'active' : 'inactive'}`} >
                <ul>
                    <li className="dropdownItem"><a href="/myprofile">My Profile</a></li>
                    <li onClick={Logout}className="dropdownItem"><a href="/login">Logout</a></li>
                </ul>
                </div></div>
                     :<a href="/login" className="loginButton" onClick={redirect("/login")}>LogIn</a>}
            </header>
        </div>
    )
}

export default Navbar;

const Message = (props) =>{
    return(
        <div className="messageBody">
            <h5 className="senderName">@{props.senderName}</h5>
            <div className="contenuMessage">
                <CgProfile style={{"fontSize":"2rem", "margin" : "2px"}} />
                <p style={{"fontSize" : "0.9rem"}} >New request to join your course</p>
            </div>
        </div>
    )
}