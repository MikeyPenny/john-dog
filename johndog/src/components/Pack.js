import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Pack.css';

export default class MyPack extends Component {

    state = {
        pets: [],
        err: null
    }

    componentDidMount() {
        
        axios({
            url: `${process.env.REACT_APP_BACK_END_BASE_URL}/petCrud/myPack`,
            method: 'get',
            withCredentials: true
        })
        .then((response) => {
            this.setState({ pets: response.data.pets });
        })
        .catch((err) => {
            this.setState({ err: err });
        });

    }

    render() {
    
        let petJsx;
        if(this.state.pets) {
            petJsx = this.state.pets.map((pet, index) => 
                <div className="card" key={index.toString()}>
                    <div className="card-image">
                        <figure className="image pic">
                            <img src={`${process.env.REACT_APP_BACK_END_BASE_URL}/images/${pet.picture}`} alt="DogPicture"/>
                        </figure>
                    </div>
                    <div className="card-content">
                        <div className="media">
                            <div className="media-left">
                                <figure className="image is-128x128">
                                    {/* <img src="https://bulma.io/images/placeholders/96x96.png" alt="PlaceholderImage" /> */}
                                </figure>
                            </div>
                            <div className="media-content">
                                <p className="title is-4">Name: {pet.name}</p>
                                <p className="subtitle is-6">Breed: {pet.breed}</p>
                            </div>
                            
                        </div>
                        <div className="content">
                            {pet.comments}
                        </div>
                        <div className="buttons">
                            <Link to={`/myPack/${pet._id}`} className="button is-link">Details</Link>
                            {/* <Link to={`/pet-details/${pet._id}`} className="button is-link">Details</Link> */}
                        </div>
                    </div>
                </div>
            )
        }

        return (
            <div className="wolves-container">
                <div className="wolves-row">
                    {petJsx}
                </div>
                {/* <Route path={`${this.props.match.path}/:id`} component={PetDetails}/> */}
                
            </div>

            
        )
    }
    
}