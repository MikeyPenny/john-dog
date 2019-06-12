import React, { Component } from 'react';
import axios from 'axios';
import ReactToPrint from 'react-to-print';
import QrWrap from './QrWrap';

export default class PetDetails extends Component {

    constructor(props) {
        super(props);
        
        this.handleChange = this.handleChange.bind(this);
        this.filenput = React.createRef();
        this.submitForm = this.submitForm.bind(this);
        this.qrRef = React.createRef();

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
        comments: "",
        vaccine : {
            vaccineName: "",
            expirationDate: ""
        },
        medicine : "",
        injureOrDisease: "",
        petDetail: null,
        isLoading: true,
        err: null,
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleVaccineName = (e) => {
        this.setState({ 
            vaccineName: e.target.value 
        });
    }

    handleVaccineExpiration = (e) => {
        this.setState({ 
            expirationDate: e.target.value
        });
    }

    setVaccinesOnState = (e) => {
        e.preventDefault();
        let nameOfVaccine = this.state.vaccineName;
        let expVaccine = this.state.expirationDate;
        let vaccineTemp = {
            vaccineName: nameOfVaccine,
            expirationDate: expVaccine
        }
        let vaccinList = [...this.state.vaccines];
        vaccinList.push(vaccineTemp);
        debugger
        this.setState({vaccines: vaccinList});
        
    }

    handleMedicineChange = (e) => {
        this.setState({ medicine: e.target.value});
    }

    setMedicineOnState = (e) => {
        e.preventDefault();
        let medicines = [...this.state.medicines];
        medicines.push(this.state.medicine);
        this.setState({ medicines: medicines });
    }

    handleInjureOrDiseaseChange = (e) => {
        this.setState({ injureOrDisease: e.target.value });
    }

    setInjureOrDiseaseState = (e) => {
        e.preventDefault();
        let injureDisease = [...this.state.injuresOrDiseases];
        injureDisease.push(this.state.injureOrDisease);
        this.setState({injuresOrDiseases : injureDisease});
    }

    componentDidMount(){
        
        const params = this.props.match.params.id;
        axios({
            url: `${process.env.REACT_APP_BACK_END_BASE_URL}/petCrud/myPack/${params}`,
            method: 'get',
            withCredentials: true
        })
        .then(res =>{
            this.setState({
                petDetail:res.data.pet,
                isLoading:false
            })
        })
        .catch((err) => {
            this.setState({ err: err})
        })
    }

    submitForm =  (e) => {
        e.preventDefault();
        let form = this.filenput.current;
        let formData = new FormData(form);

        axios({
            url: `${process.env.REACT_APP_BACK_END_BASE_URL}/petCrud/updateDoggie`,
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

    printQRCode = (e) => {
        e.preventDefault();
        this.printCanvas()
        // print.printJS('qrCode', 'html');
    }

    render() {
        debugger
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
            
            <>
              {this.state.isLoading && <p>Loading...</p>}  
              {this.state.petDetail && <div className="petDetail">
                <form onSubmit={this.submitForm} className="pet-container" ref={this.filenput} >
                    <div className="row-pet pet-mt">
                        <div className="field is-horizontal">
                            <div className="field-label is-normal">
                                <label className="label"></label>
                            </div>
                            <div className="field-body">
                                <div className="file">
                                    <figure className="image is-128x128">
                                        <img src={`${process.env.REACT_APP_BACK_END_BASE_URL}/images/${this.state.petDetail.picture}`} alt="Doggie" />
                                    </figure>
                                </div>
                            </div>
                            <div className="field-label"></div>
                            <div className="field-body">
                                <div className="file">
                                    <label className="file-label">
                                        <input type="file" name="picture" className="file-input"  
                                        onChange={this.handleChange} />
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
                        </div>
                    </div>
                    <div className="row-pet pet-mt">
                        <div className="field is-horizontal">
                            <div className="field-label is-normal">
                                <label className="label"></label>
                            </div>
                            <div className="field-body">
                                <div className="field">
                                    <QrWrap ref={el => (this.componentRef = el)} petId={this.state.petDetail._id} />
                                </div>
                            </div>
                            <div className="field-label"></div>
                            <div className="field-body">
                                <ReactToPrint
                                    trigger={() => <button className="button is-link">Print QRCode</button>}
                                    content={() => this.componentRef}
                                />
                                
                            </div>
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
                                        <input className="input" type="text" name="name" placeholder="Name" onChange={this.handleChange} 
                                        value={this.state.petDetail.name} />
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
                                        <input className="input" type="text" name="age" placeholder="Age" 
                                        onChange={this.handleChange} value={this.state.petDetail.age}/>
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
                                        <input className="input" type="text" name="breed" placeholder="Breed" onChange={this.handleChange} 
                                            value={this.state.petDetail.age}/>
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
                                        <input className="input" name="birthday" type="date" onChange={this.handleChange} value={this.state.petDetail.birthday} />
                                        
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
                                            <select className="is-focused" name="foodType" onChange={this.handleChange} value={this.state.petDetail.foodType} >
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
                                        <input className="input" type="text" name="BrandOfFood" placeholder="Brand" onChange={this.handleChange} value={this.state.petDetail.brand} />
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
                                        <input className="input" type="text" name="chipNumber" placeholder="Chip" onChange={this.handleChange} value={this.state.petDetail.chipNumber} />
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
                                placeholder="Tell us something important about your dog" 
                                onChange={this.handleChange} value={this.state.petDetail.comments}></textarea>
                            </div>
                        </div>
                        <div className="field is-grouped">
                            <div className="control">
                                <button className="button is-link">
                                    Update
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
              </div>}


            </>
        )
    }

}

