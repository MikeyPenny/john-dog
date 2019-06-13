import React, { Component } from 'react';
import axios from 'axios';
import './PetFound.css';

class PetFound extends Component {

    // constructor(props) {
    //     super(props);

    //     this.state = {
    //         petDetails: {},
    //         userDetails: {},
    //         err: null,
    //         contactName: "",
    //         contact: "",
    //         bodyMessage: "",
    //         dateMessage: ""
    //     }
    // }

    state = {
        petDetails: {},
        userDetails: {},
        err: null,
        contactName: "",
        contact: "",
        bodyMessage: "",
        dateMessage: ""
    }

    // state = {
    //     contactName: "",
    //     contact: "",
    //     bodyMessage: "",
    //     dateMessage: ""
    // }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    componentDidMount() {
        
        this.setState({
            bodyMessage: "Hey! I´ve found your dog!",
            dateMessage: new Date()
        });
        
        const params = this.props.match.params.id;
        axios({
            url:`${process.env.REACT_APP_BACK_END_BASE_URL}/petCrud/found/${params}`,
            method: 'get',
            withCredentials: true
        })
        .then(res => {
            this.setState({
                petDetails: res.data.pet,
                userDetails: res.data.user
            })
        })
        .catch((err) =>{
            this.setState({
                err: err
            })
        })
    }

    

    reportFound = (e) => {
        e.preventDefault();

        

        const registerData = this.state

        axios({
            url: `${process.env.REACT_APP_BACK_END_BASE_URL}/petCrud/dogFound`,
            data: registerData,
            method: 'post',
            withCredentials: true
        })
        .then((response) => {
            
            this.props.history.push('/');
        })
        .catch((err) => {
            this.setState({ err });
            
        });
    }

    render() {
        return (
            <div className="found-container">
                <header>
                    <p className="title is-4">I´m glad you found me</p>
                    <p className="subtitle is-6">Help me to go back with my family</p>
                </header>
                <div className="found-row">
                    <div className="card">
                        <div className="card-image">
                            <figure className="image pic">
                                <img src={`${process.env.REACT_APP_BACK_END_BASE_URL}/images/${this.state.petDetails.picture}`} alt="DogPicture"/>
                            </figure>
                        </div>
                        <div className="card-content">
                            <div className="media">
                                
                                <div className="media-content">
                                    <p className="title is-4">Name: {this.state.petDetails.name}</p>
                                    <p className="subtitle is-7">Breed: <strong>{this.state.petDetails.breed}</strong></p>
                                    <p className="subtitle is-7">Age: <strong>{this.state.petDetails.age}</strong></p>
                                    <p className="subtitle is-7">Favorite food: <strong>{this.state.petDetails.BrandOfFood}</strong></p>
                                </div>
                                <div className="media-content">
                                    <p className="title is-4">Owner: {this.state.userDetails.name}</p>
                                    <p className="subtitle is-7">Phone: <strong>{this.state.userDetails.phone}</strong></p>
                                    <p className="subtitle is-7">Adress: <strong>{this.state.userDetails.address}</strong></p>
                                </div>
                            </div>
                            <div className="content">
                                <p className="is-6">{this.state.petDetails.comments}</p>
                                <p className="subtitle is-5">Chip number: <strong>{this.state.petDetails.chipNumber}</strong></p>
                            </div>
                            
                        </div>
                    </div>
                </div>
                <form onSubmit={this.reportFound} className="form-container">
                    <div className="field">
                        <label className="label">Name</label>
                        <div className="control">
                            <input type="text" name="contactName" className="input" placeholder="e.g Miguel Sandoval"
                            onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Contact</label>
                        <div className="control">
                            <input type="text" name="contact" className="input" placeholder="e.g Phone or Email" 
                            onChange={this.handleChange}/>
                        </div>
                    </div>
                </form>
                <div className="field is-grouped buttons-group">
                    <div className="control">
                        <button onClick={this.reportFound} className="button is-link">Report Dog Found</button>
                    </div>
                </div>
            </div>
            
        );
    }
}

export default PetFound;
