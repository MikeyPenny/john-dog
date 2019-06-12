import React, { Component } from 'react';
import axios from 'axios';


class PetFound extends Component {

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);

        this.state = {
            petDetails: {},
            err: null
        }
    }

    componentDidMount() {
        
        const params = this.props.match.params.id;
        axios({
            url:`${process.env.REACT_APP_BACK_END_BASE_URL}/petCrud/found/${params}`,
            method: 'get',
            withCredentials: true
        })
        .then(res => {
            
        })
        .catch((err) =>{

        })
    }

    render() {
        return (
            <div>
                <h1>Hey Bruce!!</h1>     
            </div>
        );
    }
}

export default PetFound;
