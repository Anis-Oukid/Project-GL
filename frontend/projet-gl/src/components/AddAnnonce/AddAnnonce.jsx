import React,{useState} from "react";
import './AddAnnonce.css'
import {AiOutlinePlus} from 'react-icons/ai'
import { useAuthContext } from '../../hooks/useAuthContext'
const AddAnnonce = () =>{
      const { user } = useAuthContext()

    const [category, setCategory] = useState(null);
    const [modalite, setModalite] = useState(null);
    const [theme, setTheme] = useState(null);
    const [title, setTitle] = useState(null);
    const [description, setDescription] = useState(null);
    const [tarif, setTarif] = useState(null);
    const [commune, setCommune] = useState(null);
    const [wilaya, setWilaya] = useState(null);
    const [files,setImages]=useState([]);

    const handleFileChange = (e) => {
        setImages(e.target.files);
      };


    const handlesubmit = async (e) => {
        e.preventDefault()

       // const data = new FormData();
        //for (const file of files) {
          //  data.append('files', file);
          //}
        const annonce={  title,
            category,
            modalite,
            theme,
            description,
            tarif,
            wilaya,
        commune,
       // uploaded_images:data,
        }
        console.log(annonce)
      
        const response = await fetch(`http://127.0.0.1:8000/api/`, {
          body:JSON.stringify(annonce),
          method: 'POST',
          headers:{
            'Authorization': `Bearer ${user.data.tokens.access}`,
            'Content-Type': 'multipart/form-data'
        }
        })
        const json = await response.json()
        if (response.ok) {
            
    console.log('added')
          }
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
                        <input onChange={(e) => setTitle(e.target.value)} value={title || ""}className="formInput" type="text" id="titleInput" style={{width : "30%"}}/>
                        <label htmlFor="descriptionInput" className="labelTitle">Description</label>
                        <textarea  onChange={(e) => setDescription(e.target.value)} value={description || ""}  className="formInput" type="text" id="descriptionInput" style={{width : "60%", height : "5rem"}}/>
                        <div className="doubleForm">
                            <div className="categoryCategoryForm">
                                <label htmlFor="Category" className="labelTitle">Category</label><br />
                                <select onChange={(e) => setCategory(e.target.value)} value={category || ""} className="formInput" id="categoryList">
                                    <option value="" selected>Select Category</option>
                                    <option value="Primary School">Primary School</option>
                                    <option value="Middle School">Middle School</option>
                                    <option value="Secondary School">Secondary School</option>
                                </select>
                            </div>
                            <div className="yearForm">
                                <label htmlFor="Year" className="labelTitle">Year</label><br />
                                <input className="formInput" type="text" name="year" id="Year" />
                            </div>
                        </div>
                        <div className="doubleForm">
                            <div className="themeThemeForm">
                                <label htmlFor="Theme" className="labelTitle">Theme</label><br />
                                <input onChange={(e) => setTheme(e.target.value)} value={theme || ""} className="formInput" type="text" name="theme" id="Theme"/>
                            </div>
                            <div className="modalityForm">
                                <label htmlFor="Modality" className="labelTitle">Modality</label>
                                <input  onChange={(e) => setModalite(e.target.value)} value={modalite || ""} className="formInput" type="text" name="modality" id="Modality"/>
                            </div>
                        </div>
                        
                        <label htmlFor="Location" className="labelTitle">Location</label>
                        <input  onChange={(e) => setWilaya(e.target.value)} value={wilaya || ""} className="formInput" type="text" name="location" id="Location"/>
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
                                <input type="file" id="uploadFile" onChange={handleFileChange} multiple/>

                            </div>
                        </div>
                            <label htmlFor="Price" className="labelTitle">Price</label>
                            <input  onChange={(e) => setTarif(e.target.value)} value={tarif || ""} className="formInput" type="number" name="price" id="Price" style={{width : "20%"}}/>
                        <button type="submit" className="annonceSubmitButton">Post</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddAnnonce;