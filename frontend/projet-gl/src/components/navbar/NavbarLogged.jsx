import React from "react";
import './navbar.css'
import logo from '../../img/logo.png'
import {HiHome, HiInformationCircle, HiSearch} from 'react-icons/hi'
import {IoMdChatboxes} from 'react-icons/io'
import {CgProfile} from 'react-icons/cg'

const navbar = () =>{
    const profileName = "dirafinadias"
    return(
        <div className="navbar">
            <header className="main">
                <div className="logoNav">
                    <a href="/"><img src={logo} alt="logo" className="logo"/></a>
                </div>
                    <div className="smallIcon"><a href="/" id="homeIcon"><HiHome/> <p>Home</p></a></div>
                    <div className="smallIcon"><a href="/" id="infoIcon"><HiInformationCircle/> <p>About</p></a></div>
                    
                <div className="searchBar">
                    <div className="searchIcon"><HiSearch/></div>
                    <input type="search" className="searchInput" placeholder="Search for courses...."/>
                </div>
                <div className="smallIcon"><a href="/" id="messageIcon"><IoMdChatboxes/><p>Message</p></a></div>
                <div className="smallIcon"><a href="/" id="profileIcon"><CgProfile/><p>@{profileName}</p></a></div>
            </header>
        </div>
    )
}

export default navbar;