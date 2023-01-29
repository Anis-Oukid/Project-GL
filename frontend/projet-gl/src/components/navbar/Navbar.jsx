import {React, useState} from "react";
import './Navbar.css'
import logo from '../../img/logo.png'
import {HiHome, HiInformationCircle, HiSearch} from 'react-icons/hi'
import {IoMdChatboxes} from 'react-icons/io'
import {CgProfile} from 'react-icons/cg'
import { useAuthContext } from '../../hooks/useAuthContext'
import { redirect  } from "react-router-dom";
const Navbar = () =>{

    const { user } = useAuthContext()
    const profileName = "dirafinadias"
    const [loggedIn, setLoggedIn] = useState(false);
    return(
        <div className="Navbar">
            <header className="main">
                <div className="logoNav">
                    <a href="/"><img src={logo} alt="logo" className="logo"/></a>
                </div>
                    <div className="smallIcon"><a href="/home" id="homeIcon"><HiHome/> <p>Home</p></a></div>
                    <div className="smallIcon"><a href="/" id="infoIcon"><HiInformationCircle/> <p>About</p></a></div>
                    
                <div className="searchBar">
                    <div className="searchIcon"><HiSearch/></div>
                    <input type="search" className="searchInput" placeholder="Search for courses...."/>
                </div>
                {user ? <div className="smallIcon"><a href="/" id="messageIcon"><IoMdChatboxes/><p>Messages</p></a></div> : <a href="/" className="registerButton">Register</a>}
                {user ? <div className="smallIcon"><a href="#" id="profileIcon" onClick={()=> setLoggedIn(!loggedIn)}><CgProfile/><p>@{user.data.firstname+' '+user.data.lastname}</p></a></div> :<a href="/login" className="loginButton" onClick={redirect("/login")}>LogIn</a>}
            </header>
        </div>
    )
}

export default Navbar
;