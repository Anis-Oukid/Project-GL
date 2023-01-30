import React from "react";
import './Account.css';
import mweo from "../../img/mweo.jpeg";

const Account = () =>{

    return(
          
        <div className="big">
            <div className="contactInfo">
                <img className="accountProfilePic" src={mweo}/> 
                <div className="contactInformation">
                    <div className="inf" ><p><span style={{"fontWeight" : "bold"}}> Mentor : </span> </p></div> 
                    <div className="inf"><p><span style={{"fontWeight" : "bold"}}> Address : </span> </p></div> 
                    <div className="inf"><p><span style={{"fontWeight" : "bold"}}> Email : </span> </p></div> 
                    <div className="inf"><p><span style={{"fontWeight" : "bold"}}> Phone number : </span> </p></div> 
                </div>
            </div>
            <div className="last">
            <input type="submit" value="Contact" className="contactButton"  />
            </div>
        </div>


    )


}
export default Account 