import React, { Component } from 'react';
import './Register.css';
import axios from 'axios';

export default class Register extends Component {

    state = {
        name: "",
        email: "",
        password: "",
        phone: "",
        address: "",
        err: null
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submitForm =  (e) => {
        e.preventDefault();
        const registerData = this.state

        axios({
            url: 'http://localhost:3000/auth/signup',
            data: registerData,
            method: 'post',
            withCredentials: true
        })
        .then((response) => {
            
            this.props.history.push('/login');
        })
        .catch((err) => {
            this.setState({ err });
            
        });

    }

    render() {
        return (
            <form onSubmit={this.submitForm} className="form-container">
                <div className="row form-mt">
                    <div className="field">
                        <label className="label">Name</label>
                        <div className="control">
                            <input className="input" type="text" placeholder="Text input" name="name" onChange={this.handleChange}/>
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Email</label>
                        <div className="control has-icons-left has-icons-right">
                            <input className="input is-danger" type="email" placeholder="Email input" name="email" onChange={this.handleChange} />
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
                            <input className="input" type="password" name="password" placeholder="Password" onChange={this.handleChange}/>
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Phone</label>
                        <div className="control">
                            <input className="input" type="text" name="phone" placeholder="Area ex. '+31' phone number" onChange={this.handleChange}/>
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Address</label>
                        <div className="control">
                            <textarea className="textarea" name="address" placeholder="Textarea" onChange={this.handleChange} ></textarea>
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
            </form>
        )
    }
    
}