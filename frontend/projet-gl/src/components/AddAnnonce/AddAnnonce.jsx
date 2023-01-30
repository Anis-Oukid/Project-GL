import React,{useState} from "react";
import './AddAnnonce.css'
import {AiOutlinePlus} from 'react-icons/ai'
import { useAuthContext } from '../../hooks/useAuthContext'
import cities from '../data/algeria-cities'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const AddAnnonce = () =>{
      const { user } = useAuthContext()
      const navigate = useNavigate();
    //const [category, setCategory] = useState(null);
    const [modalite, setModalite] = useState(null);
    const [theme, setTheme] = useState(null);
    const [title, setTitle] = useState(null);
    const [description, setDescription] = useState(null);
    const [tarif, setTarif] = useState(null);
    const [commune, setCommune] = useState(null);
 //   const [wilaya, setWilaya] = useState(null);
    const [files,setImages]=useState([]);


    const [wilaya, setWilaya] = useState('');
    const [communeChoisie, setCommuneChoisie] = useState('');
    const [yearLevel, setYearLevel] = useState('');
    const [category, setCategory] = useState('Select Category');
    const years = [
        {
            "level" : "Primary School",
            "Years" : ["1AP", "2AP", "3AP", "4AP", "5AP"]
        },
        {
            "level" : "Middle School",
            "Years" : ["1AM", "2AM", "3AM", "4AM"]
        },
        {
            "level" : "Secondary School",
            "Years" : ["1AS", "2AS", "3AS"]
        }
    ]

    const handleChangeWilaya = (event) =>{
        setWilaya(event.target.value);
    }
    const handleChangeYear = (event) =>{
        setYearLevel(event.target.value);
    }
    const handleChangeCommune = (event) =>{
        console.log(event.target.value)
        console.log(wilaya)
        setCommuneChoisie(event.target.value)
    }
    const handleFileChange = (event) => {
        const newFiles = Array.from(event.target.files);
        setImages([...files, ...newFiles]);
      };


    const handlesubmit = async (e) => {
        e.preventDefault()
        const add ={
            'wilaya':wilaya,
            'Commune':communeChoisie
        }
        console.log(add)
        const response =  axios.post(`http://127.0.0.1:8000/api/addadresse/`, 
            add,{
            headers:{
              'Authorization': `Bearer ${user.data.tokens.access}`,
          }
          }).then((response) => {
          
        const data = new FormData();
        data.append('title',title)
        data.append('category',category)
        data.append('modalite','offline')
        data.append('theme','math')
        data.append('description',description)
        data.append('tarif',tarif)
        data.append('adresse',response.data.id)
       

        for (const file of files) {
           data.append('uploaded_images', file);
           }
           for (var key of data.entries()) {
            console.log(key[0] + ', ' + key[1]);
        }
           axios
           .post('http://127.0.0.1:8000/api/', data,{
            headers:{
              'Authorization': `Bearer ${user.data.tokens.access}`,
          }
          })
           .then((response) => {
             console.log(response);
             navigate('/', { replace: true });
             // Handle the success response
           })
           .catch((error) => {
             console.error(error);
             // Handle the error
           });
   
      
      })
    }
    return(
        <div className="addAnnonceBody">
            <div className="annonceNew">
                <h1 className="addAnnonceTitle">
                    Add Announcement
                </h1>
                <div className="annonceNewForm">
                    <form action="" className="formContent" onSubmit={handlesubmit}>
                    <label htmlFor="titleInput" className="labelTitle">Title</label>
                        <input className="formInput" type="text" onChange={e=>setTitle(e.target.value)} id="titleInput" style={{width : "30%"}}/>
                        <label htmlFor="descriptionInput" className="labelTitle">Description</label>
                        <textarea className="formInput" type="text" onChange={(e)=>setDescription(e.target.value)} id="descriptionInput" style={{width : "60%", height : "5rem"}}/>
                        <div className="doubleForm">
                            <div className="categoryCategoryForm">
                                <label htmlFor="Category" className="labelTitle">Category</label><br />
                                <select className="formInput" id="categoryList" onChange={(event) => setCategory(event.target.value)}>
                                    <option value="" selected>Select Category</option>
                                    <option value="Primary School">Primary School</option>
                                    <option value="Middle School">Middle School</option>
                                    <option value="Secondary School">Secondary School</option>
                                </select>
                            </div>
                            <div className="yearForm">
                                <label htmlFor="Year" className="labelTitle">Year</label><br />
                                <select className="formInput" name="year" id="Year" onChange={handleChangeYear}>
                                    <option value="">Select Year</option>
                                {years.map(item => (
                                    item.Years.map(yearr =>( category===item.level && <option value={yearr}>{yearr}</option>))
                                ))}
                                </select>
                            </div>
                        </div>
                        <div className="doubleForm">
                            <div className="themeThemeForm">
                                <label htmlFor="Theme" className="labelTitle">Theme</label><br />
                                <select className="formInput" type="text" name="theme" id="Theme">
                                    <option value="">Select Theme</option>   
                        
                                </select>
                            </div>
                            <div className="modalityForm">
                                <label htmlFor="Modality" className="labelTitle">Modality</label>
                                <select className="formInput" type="text" name="modality" id="Modality" onChange={(e)=>{setModalite(e.target.value)}}>
                                    <option value="offline">Offline</option>
                                    <option value="online">Online</option>
                                </select>
                            </div>
                        </div>
                        <div className="doubleForm">
                            <div className="wilayaForm">
                                <label htmlFor="Wilaya" className="labelTitle">Wilaya</label>
                                <select className="formInput" onChange={handleChangeWilaya} id="Wilaya">
                                    <option value="" selected>Select Wilaya</option>
                                    {[...new Set(cities.map((item) => item.wilaya_name_ascii))].map((item) => (
                                        <option value={item}>{item}</option>
                                        ))}
                                </select>
                            </div>
                            <div className="communeForm">
                                <label htmlFor="Commune" className="labelTitle">Municipality</label>
                                <select className="formInput" onChange={handleChangeCommune} id="Commune" >
                                <option value="" selected>Select Municipality</option>
                                {cities.map(item => (
                                    item.wilaya_name_ascii === wilaya && <option value={item.commune_name_ascii}>{item.commune_name_ascii}</option>
                                ))}
                                </select>
                            </div>
                        </div>
                        <div className="doubleForm">
                            <div className="maxStudentNumber">
                                <label htmlFor="maxStudent" className="labelTitle">Maximum Student Number</label>
                                <input className="formInput" type="text" name="maxStudentNb" id="masStudent" />
                            </div>
                            <div className="availability">
                                <label htmlFor="Availability" className="labelTitle">Available Until</label>
                                <input className="formInput" type="text" name="availability" id="Availability"/>
                            </div>
                        </div>
                        <div className="addPicture">
                            <label htmlFor="" className="labelTitle">Add Pictures (Optional)</label>
                            <div className="pictureArea">
                                <label htmlFor="uploadFile"><AiOutlinePlus style={{cursor : "pointer"}}/></label>
                                <input type="file" id="uploadFile" multiple onChange={handleFileChange}/>

                            </div>
                        </div>
                            <label htmlFor="Price" className="labelTitle">Price</label>
                            <input className="formInput" type="number" onChange={(e)=>{setTarif(e.target.value)}} name="price" id="Price" style={{width : "20%"}}/>
                        <button type="submit" className="annonceSubmitButton">Post</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddAnnonce;