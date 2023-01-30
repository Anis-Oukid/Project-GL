import React from "react";
import './Home.css'
import Annonce from "../Annonce/Annonce";
import imgAnnonce from '../../img/imgannonce2.png'


import {communes ,wilayas} from './dataSet.js'
import { useState, useEffect  } from "react";
import { useAnnoncesContext } from "../../hooks/useAnnoncesContext"
import { isCancel } from "axios";
const Home = () =>{
    const {annonces, dispatch} = useAnnoncesContext()

    const [theme, setcourse] = useState('')
    const [adresse__Commune, setCommune] = useState('')
    const [adresse__wilaya, setWilaya] = useState('')
    const [category, setYear] = useState('')
    const [communeChoisie, setCommuneChoisie] = useState([]);
    const handleChangeWilaya = (event) =>{
        setWilaya(event.target.value);
        
        
    }
    const handleChangeCommune = (event) =>{
        console.log(communes[parseInt(adresse__wilaya.substring(0,2))])
        setCommuneChoisie(communes[parseInt(adresse__wilaya.substring(0,2))])
        console.log(communeChoisie)
    }
      const handleSubmit = async (e) => {
        e.preventDefault()
        const filters = {theme,category,adresse__Commune:adresse__Commune.toLowerCase(),adresse__wilaya:adresse__wilaya.slice(2).toLowerCase()}
        console.log(filters)
        const queryString = Object.keys(filters)
        .map(key => key + '=' + filters[key])
        .join('&');
        const response = await fetch(`http://127.0.0.1:8000/api/search?${queryString}`, {
          method: 'get',
       
        })
        const json = await response.json()
        if (response.ok) {
            console.log(json)
            dispatch({type: 'SET_ANNONCES', payload: json})
            isCancel=true
          }
      }
      useEffect(() => {
        let isCancel=false
        const fetchData= async () => {
            
            const response = await fetch('http://127.0.0.1:8000/api/')
            const json = await response.json()
      
            if (response.ok) {
              dispatch({type: 'SET_ANNONCES', payload: json})
              isCancel=true
            }
           
        }
        
          fetchData()
        console.log(annonces)
        //setCommunesOptions(communes[selectedWilaya]);
        
      }, [isCancel]);
      

    return(
        <div className="homeBody">
            <div className="filterTab">
                <div className="filterTitleContainer">
                    <h2 className="filterTitle">Filter By</h2>
                </div>
                <div className="filterElements">
                    <form action="" className="filterElementsForm" onSubmit={handleSubmit}>
                        <label className="filterCardTitle">Courses</label>
                        <input list="courses"  onChange={(e) => setcourse(e.target.value)} value={theme} className="filterInput" />
                        <datalist id="courses">
                            <option value="math"/>
                            <option value="AUDI"/>
                            <option value="IZZAN"/>
                            <option value="MRMR"/>
                        </datalist>
                        <label className="filterCardTitle">Wilayas</label>
                        <select className="filterInput" onChange={handleChangeWilaya} >
                            <option value="" selected>Select Wilaya</option>
                            {wilayas.map((item) => (
                                <option value={item.code+''+item.name}>{item.name}</option>
                            ))}
                        </select>
                       
                       
                        {/*
                        <input list="wilayas" className="filterInput" onChange={(e) => setWilaya(e.target.value)} value={adresse__wilaya}/>
                       
                        <datalist id="wilayas">
                        {wilayas.map((wilaya, index) => (
          <option key={index} value={wilaya.name}>{wilaya.name}</option>
        ))}
                        </datalist> */}
                        <label className="filterCardTitle">Municipality</label>
                        <select className="filterInput" onClick={handleChangeCommune} onChange={(e) => setCommune(e.target.value)}>
                            <option value="" selected>Select Municipality</option>
                            {communeChoisie&&communeChoisie.map(item => (
                              <option value={item.commune}>{item.commune}</option>
                            ))}
                        </select>
                         {/*<input list="municipality" className="filterInput" />
                        <datalist id="municipality">
                        {communesOptions&&communesOptions.map((commune, index) => (
          <option key={index} value={commune.code}>{commune.name}</option>
        ))}
                        </datalist>*/}
                        <label className="filterCardTitle">Period</label>
                        <input type ="date" className="filterInput" />
                        <input type ="date" className="filterInput" />
                        <label className="filterCardTitle">Year</label>
                        <input list="year" className="filterInput" />
                        <datalist id="year">
                            <option value="1AS"/>
                            <option value="2AS"/>
                            <option value="3AS"/>
                            <option value="4AM"/>
                        </datalist>
                                                
      
                      <input type="submit" value="Filter"  className="submitButton" />
                    </form>
                    
                </div>
            </div>
            <div className="announcementTab">
                <div className="announcementsView">
                    {annonces&& annonces.map(annonce=>{
                  
                        
                  return <Annonce  imgAnnonce={annonce.images[0].upload} annonceTitle={annonce.title} linkAnnonce={annonce.id} />
                    })}
                    
                   
                </div>
                <div className="buttonAvancer">
                    <button className="submitButton">Avancer</button>
                </div>
            </div>
        </div>
    )
}

export default Home;