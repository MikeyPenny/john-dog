import React, { Component } from 'react';
import './Login.css';
import axios from 'axios';

export default class Login extends Component {



    state = {
        email: "",
        password: "",
        err: null
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submitForm = (e) => {
        e.preventDefault();
        axios({
            url: `${process.env.REACT_APP_BACK_END_BASE_URL}/auth/login`,
            data: this.state,
            method: 'post',
            withCredentials: true
        })
        .then((response) =>{
            this.props.fetchUser(response.data.user); 
        })
        .then(()=>{
            this.props.history.push("/")
        })
        .catch((err) => {
            this.setState({
                err
            })
        });
    }

    

    render() {
        return (
            <form onSubmit={this.submitForm}>
                <div className="form-container">
                    <div className="row form-mt">
                        <div className="field">
                            <label className="label">Email</label>
                            <div className="control has-icons-left has-icons-right">
                                <input className="input is-danger" type="email" name="email" onChange={this.handleChange} placeholder="Email input" />
                                <span className="icon is-small is-left">
                                <i className="fas fa-envelope"></i>
                                </span>
                                <span className="icon is-small is-right">
                                <i className="fas fa-exclamation-triangle"></i>
                                </span>
                            </div>
                            <p className="help is-danger">This email is invalid</p>
                        </div>

                        <div className="field">
                            <label className="label">Password</label>
                            <div className="control">
                                <input className="input" type="password" name="password" onChange={this.handleChange} placeholder="Password"/>
                            </div>
                        </div>
                        <div className="field is-grouped">
                            <div className="control">
                                <button className="button is-link">Submit</button>
                            </div>
                            <div className="control">
                                <button className="button is-text">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        )
    }

}