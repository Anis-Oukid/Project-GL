import React, {useState,useEffect} from "react";
import "./MyProfile.css"
import profilePic from '../../img/profilePicture.png'
import {BsFillTelephoneFill} from 'react-icons/bs'
import {IoMdMail, IoMdPin} from 'react-icons/io'
import { useAuthContext } from '../../hooks/useAuthContext'
const MyProfile = () =>{
 
  const { user } = useAuthContext()

    const [editProfile, setEditProfile] = useState(false);
    const[profile,setProfile]=useState(null)
    const [emailAdr, setEmailAdr] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState(null);
    const [physicalAdr, setPhysicalAdr] = useState(null);
    const [username,setUsername]=useState('')
    const changeForm = () =>{
        setEditProfile(!editProfile);
    }
    const handleInputChangePhone = (event) =>{
    setPhoneNumber(event.target.value);
    }
    const handleInputChangeAdress = (event) =>{
    setPhysicalAdr(event.target.value);
    }
    let isCancel=false
    const handlesubmit = async (e) => {
        e.preventDefault()
        setEditProfile(!editProfile);
       
     
        const response = await fetch(`http://127.0.0.1:8000/api/myprofile`, {
          body:JSON.stringify({addresse:physicalAdr,phonenumber:phoneNumber}),
          method: 'PATCH',
          headers:{
            'Authorization': `Bearer ${user.data.tokens.access}`,
            'Content-Type': 'application/json'
        }
        })
        const json = await response.json()
        if (response.ok) {
        
            isCancel=true
          }
      }
 
    useEffect(() => {
      
        const fetchData=  async() => {
         
            const response =  await fetch('http://127.0.0.1:8000/api/myprofile',{
                headers:{
                    'Authorization': `Bearer ${user.data.tokens.access}`,
                    'Content-Type': 'application/json'
                }
            })
            const json =  await response.json()
      
            if (response.ok) {
              setPhoneNumber(json.phonenumber)
              setEmailAdr(json.email)
              setPhysicalAdr(json.addresse)
              setUsername(json.firstname+' '+json.lastname)
              
            }
           
        }
        if(user) {
        
          fetchData()}

        //setCommunesOptions(communes[selectedWilaya]);
        
      }, [user]);    
    return(
        <div className="myProfileBody">
            <form className="myProfileTab" onSubmit={handlesubmit}>
                    <h2 className="profileTitle" style={{"fontSize" : "1.5vw"}}>Personal Information</h2>
                    <img src={profilePic} alt="Profile Picture" className="profilePic"/>
                    <div className="userAttribute" id="username"><h3>{username}</h3></div>
                <div className="lowerProfileTab">
                    <div className="userAttribute" id="phonenumber">
                        <BsFillTelephoneFill/>
                        <input type="tel" required name="phonenumber" value={profile} onChange={handleInputChangePhone} style={{"border" : editProfile ? "1px solid":"none"}} className="userAttrTest" readOnly={!editProfile}/>
                    </div>
                    <div className="userAttribute" id="emailAddress">
                        <IoMdMail style={{"fontSize" : "1.3vw"}}/>
                        <input type="text" name="email" value={emailAdr} style={{"border" : "none"}} className="userAttrTest" readOnly={true}/>
                    </div>
                    <div className="userAttribute" id="physicalAddress">
                        <IoMdPin/><input type="text" name="address" value={physicalAdr} required onChange={handleInputChangeAdress} style={{"border" : editProfile ? "1px solid":"none"}} className="userAttrTest" readOnly={!editProfile}/>
                    </div>
                </div>
            {!editProfile && <button className="editButton" onClick={changeForm}>Edit Profile</button>}
            { editProfile && <button type="submit" className="editButton" >Save changes</button>}
            </form>
        </div>
    )
}

export default MyProfile;