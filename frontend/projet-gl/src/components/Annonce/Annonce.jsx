import React,{Link} from "react";
import './Annonce.css'

const Annonce = (props) =>{
    return(
        <div className="annonceBody annonceCard">
            <img src={props.imgAnnonce} alt="imageAnnonce" className="imgAnnonce" />
            <div className="infoAnnonce">
                <a href={"/annonce/"+props.linkAnnonce} className="linkToAnnonce">{props.annonceTitle.substring(0,100)}</a>
            </div>
            
        </div>
    )
}

export default Annonce;