import React, { Component } from 'react';
import './Pets.css';
import axios from 'axios';

export default class Pets extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.filenput = React.createRef();
        this.submitForm = this.submitForm.bind(this);
    }

    state = {
        name: "",
        age: "",
        breed: "",
        birthday: "",
        foodType: "",
        BrandOfFood: "",
        chipNumber: "",
        picture: "",
        vaccines: [],
        medicines: [],
        injuresOrDiseases: [],
        comments: ""
    }

    vaccine = {
        vaccineName: "",
        expirationDate: ""
    }

    medicine = "";

    injureOrDisease = "";

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleVaccineName = (e) => {
        this.vaccine.vaccineName = e.target.value;
    }

    handleVaccineExpiration = (e) => {
        this.vaccine.expirationDate = e.target.value;
    }

    setVaccinesOnState = (e) => {
        e.preventDefault();
        let vaccines = [...this.state.vaccines];
        vaccines.push(this.vaccine);
        this.setState({vaccines: vaccines});
        
    }

    handleMedicineChange = (e) => {
        this.medicine = e.target.value;
    }

    setMedicineOnState = (e) => {
        e.preventDefault();
        let medicines = [...this.state.medicines];
        medicines.push(this.medicine);
        this.setState({ medicines: medicines });
    }

    handleInjureOrDiseaseChange = (e) => {
        this.injureOrDisease = e.target.value;
    }

    setInjureOrDiseaseState = (e) => {
        e.preventDefault();
        let injureDisease = [...this.state.injuresOrDiseases];
        injureDisease.push(this.injureOrDisease);
        this.setState({injuresOrDiseases : injureDisease});
    }

    handleCommentChange = (e) =>{
        this.setState({ comments: e.target.value }); 
    }

    submitForm =  (e) => {
        e.preventDefault();
        let form = this.filenput.current;
        let formData = new FormData(form);

        axios({
            url: 'http://localhost:3000/petCrud/newDoggie',
            data: formData,
            method: 'post',
            headers: {'Content-Type': 'multipart/form-data'},
            withCredentials: true
        })
        .then((response) => {
            this.props.history.push('/myPack');
        })
        .catch((err) => {
            this.setState({ err });
            
        });

    }

    render() {
        let vaccinesJsx = this.state.vaccines.map((vaccine, index) => 
            
            <tr key={index.toString()}>
                <td>
                    {vaccine.vaccineName}
                </td>
                <td>
                    {vaccine.expirationDate}
                </td>
            </tr>
        );
        
        let medicinesJsx = this.state.medicines.map((medicine, index) => 
            <tr key={index.toString()}>
                <td>
                    {medicine}
                </td>
            </tr>
        );

        let injureDiseaseJsx = this.state.injuresOrDiseases.map((injure, index) =>
            <tr key={index.toString()}>
                <td>
                    {injure}
                </td>
            </tr>
        );

        return (
            <form onSubmit={this.submitForm} className="pet-container" >
                <div className="row-pet pet-mt">
                    <div className="field is-horizontal">
                        <div className="field-label is-normal">
                            <label className="label">Picture</label>
                        </div>
                        <div className="field-body">
                            <div className="file">
                                <label className="file-label">
                                    <input type="file" name="picture" className="file-input" ref={this.filenput} 
                                    onChange={this.handleChange} value={this.state.picture}/>
                                    <span className="file-cta">
                                        <span className="file-icon">
                                            <i className="fas fa-upload"></i>
                                        </span>
                                        <span className="file-label">
                                            Choose a file...
                                        </span>
                                    </span>
                                </label>
                            </div>
                        </div>
                        <div className="field-label"></div>
                        <div className="field-body"></div>
                    </div>
                </div>
                <div className="row-pet pet-mt">
                    
                    <div className="field is-horizontal">
                        <div className="field-label is-normal">
                            <label className="label">Name</label>
                        </div>
                        <div className="field-body">
                            <div className="field">
                                <p className="control is-expanded has-icons-left">    
                                    <input className="input" type="text" name="name" placeholder="Name" onChange={this.handleChange} />
                                    <span className="icon is-small is-left">
                                        <i className="fas fa-user"></i>
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div className="field-label is-normal">
                            <label className="label">Age</label>
                        </div>
                        <div className="field-body">
                            <div className="field">
                                <p className="control is-expanded has-icons-left">    
                                    <input className="input" type="text" name="age" placeholder="Age" onChange={this.handleChange} />
                                    <span className="icon is-small is-left">
                                        <i className="fas fa-user"></i>
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row-pet pet-mt">
                    <div className="field is-horizontal">
                        <div className="field-label is-normal">
                            <label className="label">Breed</label>
                        </div>
                        <div className="field-body">
                            <div className="field">
                                <p className="control is-expanded has-icons-left">    
                                    <input className="input" type="text" name="breed" placeholder="Breed" onChange={this.handleChange}/>
                                    <span className="icon is-small is-left">
                                        <i className="fas fa-user"></i>
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div className="field-label is-normal">
                            <label className="label">Birthday</label>
                        </div>
                        <div className="field-body">
                            <div className="field">
                                <p className="control is-expanded ">    
                                    <input className="input" name="birthday" type="date" onChange={this.handleChange} />
                                    
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row-pet pet-mt">
                    <div className="field is-horizontal">
                        <div className="field-label is-normal">
                            <label className="label">Food</label>
                        </div>
                        <div className="field-body">
                            <div className="field is-narrpw">
                                <div className="control">
                                    <div className="select is-fullwidth">
                                        <select className="is-focused" name="foodType" onChange={this.handleChange} >
                                            <option value="dry">Dry Food</option>
                                            <option value="wet">Wet Food</option>
                                            <option value="both">Both</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="field-label is-normal">
                            <label className="label">Brand</label>
                        </div>
                        <div className="field-body">
                            <div className="field">
                                <p className="control is-expanded has-icons-left">    
                                    <input className="input" type="text" name="BrandOfFood" placeholder="Brand" onChange={this.handleChange} />
                                    <span className="icon is-small is-left">
                                        <i className="fas fa-user"></i>
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row-pet pet-mt">
                    <div className="field is-horizontal">
                        <div className="field-label is-normal">
                            <label className="label">Chip Number</label>
                        </div>
                        <div className="field-body">
                            <div className="field">
                                <p className="control is-expanded has-icons-left">    
                                    <input className="input" type="text" name="chipNumber" placeholder="Chip" onChange={this.handleChange} />
                                    <span className="icon is-small is-left">
                                        <i className="fas fa-user"></i>
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div className="field-label"></div>
                        <div className="field-body"></div>
                    </div>
                </div>
                <div className="row-pet pet-mt">
                    <div className="field is-horizontal">
                        <div className="field-label is-normal">
                            <label className="label">Vaccines</label>
                        </div>
                        <div className="field-body">
                            <div className="field">
                                <p className="control is-expanded has-icons-left">    
                                    <input className="input" type="text" name="vaccineName" placeholder="Name of the vaccine"
                                    onChange={this.handleVaccineName} />
                                    <span className="icon is-small is-left">
                                        <i className="fas fa-user"></i>
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div className="field-label is-normal">
                            <label className="label">Exp. Date</label>
                        </div>
                        <div className="field-body">
                            <div className="field">
                                <p className="control">    
                                    <input className="input" name="expirationDate" type="date" 
                                    onChange={this.handleVaccineExpiration} />
                                </p>
                            </div>
                        </div>
                        <div className="field is-horizontal">
                            <div className="field-label"></div>
                            <div className="field-body">
                                <div className="field">
                                    <div className="control">
                                        <button className="button is-link" onClick={this.setVaccinesOnState} >Add</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        this.state.vaccines.length > 0 ? 
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Vaccines</th>
                                    <th>Expiration Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {vaccinesJsx}
                            </tbody>
                        </table>
                        :
                        <></>
                    }
                    
                </div>
                <div className="row-pet pet-mt">
                    <div className="field is-horizontal">
                        <div className="field-label is-normal">
                            <label className="label">Medicines</label>
                        </div>
                        <div className="field-body">
                            <div className="field">
                                <p className="control is-expanded has-icons-left">    
                                    <input className="input" type="text" name="medicine" placeholder="Name of the medicine" onChange={this.handleMedicineChange} />
                                    <span className="icon is-small is-left">
                                        <i className="fas fa-user"></i>
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div className="field-label"></div>
                        <div className="field-body">
                            <div className="field">
                                <div className="control">
                                    <button className="button is-link" onClick={this.setMedicineOnState} >Add</button>
                                </div>
                            </div>
                        </div>

                    </div>
                    {
                        this.state.medicines.length > 0 ?
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Medicines</th>
                                </tr>
                            </thead>
                            <tbody>
                                {medicinesJsx}
                            </tbody>
                        </table>
                        :
                        <></>
                    }
                </div>
                <div className="row-pet pet-mt">
                    <div className="field is-horizontal">
                        <div className="field-label is-normal">
                            <label className="label">Injures or Diseases</label>
                        </div>
                        <div className="field-body">
                            <div className="field">
                                <p className="control is-expanded has-icons-left">    
                                    <input className="input" type="text" name="injure" placeholder="Injure or disease"
                                        onChange={this.handleInjureOrDiseaseChange}
                                    />
                                    <span className="icon is-small is-left">
                                        <i className="fas fa-user"></i>
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div className="field-label"></div>
                        <div className="field-body">
                            <div className="field">
                                <div className="control">
                                    <button className="button is-link" onClick={this.setInjureOrDiseaseState} >Add</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        this.state.injuresOrDiseases.length > 0 ?
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Injures</th>
                                </tr>
                            </thead>
                            <tbody>
                                {injureDiseaseJsx}
                            </tbody>
                        </table>
                        :
                        <></>
                    }
                    <div className="field">
                        <label className="label">Comments</label>
                        <div className="control">
                            <textarea className="textarea" name="comments" 
                            placeholder="Tell us something important about your dog" onChange={this.handleCommentChange}></textarea>
                        </div>
                    </div>
                    <div className="field is-grouped">
                        <div className="control">
                            <button className="button is-link">
                                Submit
                            </button>
                        </div>
                        <div className="control">
                            <button className="button is-text">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </form>
            
        )
    }
    
}