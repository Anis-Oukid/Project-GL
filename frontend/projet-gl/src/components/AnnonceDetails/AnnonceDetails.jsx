import React, {useState,useEffect} from "react";
import './AnnonceDetails.css';
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import teach from "../../img/imgannonce1.png";
import mweo from "../../img/mweo.jpeg";
import Google from "../Google/Google"
import Account from "../Account/Account";
import Carousel from "react-elastic-carousel";
import { useParams } from 'react-router-dom';

import  axios from "axios";




import { useAuthContext } from '../../hooks/useAuthContext'

    

const AnnonceDetails = () => {
    const { user } = useAuthContext()
    const { id } = useParams();
    const [bookmark, setBookmark] = useState(false);
    const [images, setImages] = useState(false);
    const [annonce,setAnnonce]=useState(false)
    const breakPoints = [
            { width: 1, itemsToShow: 1 },
            { width: 550, itemsToShow: 2 },
            { width: 768, itemsToShow: 3 },
            { width: 1200, itemsToShow: 4 },
          ];
    const handleBookmarkChange = () =>{
        bookmark ?  removeBookmark() : addBookmark()
        setBookmark(!bookmark)
    }
    const removeBookmark=()=>{
        
        
        axios.delete(`http://127.0.0.1:8000/api/delete-bookmark`, 
      {
            headers:{
              'Authorization': `Bearer ${user.data.tokens.access}`,
          },
          data:{"annonce_id":id}
          }).then((response) => {
            alert("removed from favorite")      
          })
        }
        const addBookmark=()=>{
          
            
            axios.post(`http://127.0.0.1:8000/api/add-bookmark`, 
            {"annonce_id":id},{
                headers:{
                    'Authorization': `Bearer ${user.data.tokens.access}`,
                }
              }).then((response) => {
                alert("added to favorite")      
              })
            }
    let isCancel=false
    let i =1;
    useEffect(() => {
        let i =1;
       
        const fetchData= async (isCancel=false) => {
            
            const response = await fetch('http://127.0.0.1:8000/api/annonce/'+id)
            const json = await response.json()
            if (response.ok) {
              setAnnonce(json)
              setImages(json.images)
    
              if(annonce){
                isCancel=true
              }
            }
           
        }
            if(user){
          fetchData()}

        //setCommunesOptions(communes[selectedWilaya]);
        
      }, [annonce,images]);
    return (
       <div className="Announcement_detailed_body">
        <div className="announcementDetailsContent">

        <div className="firstSec">
            <p className="txt">{annonce&&annonce.title} </p>
            <div className="bookmarkIcon" onClick={handleBookmarkChange}>
                { bookmark ? <FaBookmark /> : <FaRegBookmark/>}
            </div>
        </div>
        <div className="secondSec">
        <Carousel breakPoints={breakPoints} showEmptySlots className="carousShow" itemPadding={[10, 50]}>
        {annonce && images.map((item)=><img src={item.upload} className="postImages" />)}
          
            
       
        </Carousel>
        
        </div>
        <div className="thirdSec">
            <div className="sideOne">
                <p className="titles">Description</p>
                <p  className="desc">{annonce&&annonce.description}</p>
                <div className="itemz"> <p className="titles">Category : </p> <p className="inputs"> {annonce&&annonce.category} </p></div>
                <div className="itemz"><p className="titles">Year :</p>  <p className="inputs"> {annonce&&annonce.year} </p> </div>
                <div className="itemz"><p className="titles">Course : </p> <p className="inputs">{annonce&&annonce.theme} </p></div>
                <div className="itemz"><p className="titles">Modality :</p> <p className="inputs">{annonce&&annonce.modalite} </p></div>
                <div className="itemz"><p className="titles">Wilaya : </p> <p className="inputs">{annonce&&annonce.adresse.wilaya}</p></div>
                <div className="itemz"><p className="titles">Municipality : </p> <p className="inputs">{annonce&&annonce.adresse.wilaya}</p></div> 
                <div className="itemz"><p className="price">Price : <span style={{"fontWeight" : "normal"}}>{annonce&&annonce.tarif} DA / H</span></p> </div>
            </div>
            <div className="sideTwo">
              
             <Google/>
             <p>Location </p>
             
            </div>
            

        </div>
            <div className="accountTab"> <Account/> </div>
        </div>
        </div>
       
        
    )
   
}
export default AnnonceDetails