import React, { useEffect, useRef } from 'react'
import './main.css'
import bigLogo from '../../img/logoGrand.png'
import gLogo from "../../img/googleLogo.png"
import heroImg from "../../img/hero.png"

import {useGoogleauth} from '../../axios/login';
import jwt_decode from "jwt-decode";
import { useState } from 'react'
const clientId='28799489235-i6dht8pfcfratg2daufchfhcfokge8lo.apps.googleusercontent.com'
const Main = () =>{
  const {login} = useGoogleauth()
  function handleCallBack(response){
    login(response.credential)
  }
  useEffect(()=>{
    /* global google */
    const google=window.google
    google.accounts.id.initialize({
      client_id:clientId,
      callback:handleCallBack
    });
    google.accounts.id.renderButton(
      document.getElementById("try"),
      {theme:"outline",size:"large"}
    )

   
  },[])   
   const onSuccess =  (response) => {
		console.log("what")
    //FacebookLogin(response.accessToken);
	};
   return(
        <div className="mainBody">
            <div className="heroPage">
                <div className="descriptionSection">
                    <div className="logoIcon">
                        <img src={bigLogo} alt="logo" className="logoImg" />
                    </div>
                        <p className="aboutUs">
                            Welcome to waste your money on stupid useless education!! <br />
                            Welcome to waste your money on stupid useless education!! Join us now!
                        </p>
                        <div id="try">
                        <button className="googleButton" id="signUpButton" ><span className="logoGoogle"><img src={gLogo} className="gLogo" alt="gLogo"/></span> Sign Up With Google</button>
                        </div>
                  
                    <p>Already have an account?</p>
                    <button className="googleButton" id="logInButton" onClick={() => alert("Log In with Google")}><span className="logoGoogle"><img src={gLogo} className="gLogo" alt="gLogo"/></span> Login With Google</button>
                </div>
                <div className="logoSection" >
                    <div className="heroImage"><img src={heroImg} alt="heroImg" className="heroImage" /></div>
                </div> 
            </div>
            <div className="aboutUsSection">
                <div className="aboutUsText">
                    <h2>About us</h2>
                    <p>The lorem ipsum is, in printing, a series of meaningless words used temporarily to calibrate a layout, the final text replacing the false text as soon as it is ready or the layout is completed. Generally, a false Latin text, Lorem ipsum or Lipsum.</p>
                </div>
            </div>
        </div>
    )
}

export default Main;