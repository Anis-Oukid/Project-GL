import React, {useState,useEffect} from "react";
import "./MyProfile.css"
import profilePic from '../../img/profilePicture.png'
import {BsFillTelephoneFill} from 'react-icons/bs'
import {IoMdMail, IoMdPin} from 'react-icons/io'
import { useAuthContext } from '../../hooks/useAuthContext'
import Carousel, { consts } from "react-elastic-carousel";
//import annoncesFavorites from "./annoncesFavorites";
//import mesAnnonces from "./mesAnnonces";
import {AiOutlinePlus} from 'react-icons/ai'
import imgAnnonce from '../../img/imgannonce1.png'
import Annonce from "../Annonce/Annonce";
const MyProfile = () =>{
    const breakPoints = [
        { width: 1, itemsToShow: 1 },
        { width: 550, itemsToShow: 2 },
        { width: 768, itemsToShow: 3 },
        { width: 1200, itemsToShow: 4 },
      ];
  const { user } = useAuthContext()
    const [mesAnnonces,setAnnonces]=useState([]);
    const [annoncesFavorites,setFavorites]=useState([])
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
         
            const response1 =  await fetch('http://127.0.0.1:8000/api/myprofile',{
                headers:{
                    'Authorization': `Bearer ${user.data.tokens.access}`,
                    'Content-Type': 'application/json'
                }
            })

            const json1 =  await response1.json()
            
            const response2 =  await fetch('http://127.0.0.1:8000/api/myannonces',{
                headers:{
                    'Authorization': `Bearer ${user.data.tokens.access}`,
                    'Content-Type': 'application/json'
                }
            })

            const json2 =  await response2.json()

            const response3 =  await fetch('http://127.0.0.1:8000/api/bookmarks',{
                headers:{
                    'Authorization': `Bearer ${user.data.tokens.access}`,
                    'Content-Type': 'application/json'
                }
            })

            const json3 =  await response3.json()
            

            if (response1.ok) {
              setPhoneNumber(json1.phonenumber)
              setEmailAdr(json1.email)
              setPhysicalAdr(json1.addresse)
              setUsername(json1.firstname+' '+json1.lastname)
            }
            if (response2.ok){
                setAnnonces(json2)
            }
            if (response3.ok){
                console.log(json3)
                setFavorites(json3)
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
                        <input type="text" required name="phonenumber" value={phoneNumber} onChange={handleInputChangePhone} style={{"border" : editProfile ? "1px solid":"none"}} className="userAttrTest" readOnly={!editProfile}/>
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
            <div className="myAnnouncements">
                <h1 className="bigTitle">My Announcements</h1>
                <div className="annoncesCarousel">
                    <Carousel breakPoints={breakPoints} showEmptySlots className="carousShow" > 
                        <div className="newAnnonce">
                            <a href="/addannonce" className="annonceLink"><AiOutlinePlus/></a>
                        </div>
                        {mesAnnonces.map(item =>
                            <Annonce imgAnnonce={item.images[0].upload} linkAnnonce={item.id} annonceTitle={item.title} />
                        )}
                    </Carousel>
                </div>
                <h1 className="bigTitle">Saved Announcements</h1>
                <div className="annoncesCarousel">
                    <Carousel breakPoints={breakPoints}>
                            {annoncesFavorites.map(item =>(
                                
                            <Annonce imgAnnonce={item.Annonce.images[0].upload} linkAnnonce={item.Annonce.id} annonceTitle={item.Annonce.title} />
                            ))}
                    </Carousel>
                </div>
        </div>
                                </div>
    )
}

export default MyProfile;