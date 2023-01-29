import React from "react";
import './AddAnnonce.css'
import {AiOutlinePlus} from 'react-icons/ai'

const AddAnnonce = () =>{
    return(
        <div className="addAnnonceBody">
            <div className="annonceNew">
                <h1 className="addAnnonceTitle">
                    Add Announcement
                </h1>
                <div className="annonceNewForm">
                    <form action="" className="formContent">
                        <label htmlFor="titleInput" className="labelTitle">Title</label>
                        <input className="formInput" type="text" id="titleInput" style={{width : "30%"}}/>
                        <label htmlFor="descriptionInput" className="labelTitle">Description</label>
                        <textarea className="formInput" type="text" id="descriptionInput" style={{width : "60%", height : "5rem"}}/>
                        <div className="doubleForm">
                            <div className="categoryCategoryForm">
                                <label htmlFor="Category" className="labelTitle">Category</label><br />
                                <select className="formInput" id="categoryList">
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
                                <input className="formInput" type="text" name="theme" id="Theme"/>
                            </div>
                            <div className="modalityForm">
                                <label htmlFor="Modality" className="labelTitle">Modality</label>
                                <input className="formInput" type="text" name="modality" id="Modality"/>
                            </div>
                        </div>
                        <label htmlFor="Location" className="labelTitle">Location</label>
                        <input className="formInput" type="text" name="location" id="Location"/>
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
                                <input type="file" id="uploadFile"/>

                            </div>
                        </div>
                            <label htmlFor="Price" className="labelTitle">Price</label>
                            <input className="formInput" type="number" name="price" id="Price" style={{width : "20%"}}/>
                        <button type="submit" className="annonceSubmitButton">Post</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddAnnonce;