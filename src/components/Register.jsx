import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';

export default class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            redirect: false,
            to: '/'
        }
    }

    handleRegister = event => {
        event.preventDefault();

        let password = event.target.password.value;
        let confirmPass = event.target.confirmPass.value;
        if (password !== confirmPass){
            this.props.flashMessage('Oops, passwords do not match!', 'danger');
        } else {

            let myHeaders = new Headers();
            myHeaders.append('Content-Type', 'application/json');

            let formData = JSON.stringify({
                username: event.target.username.value,
                email: event.target.email.value,
                password
            })

            fetch("https://kekambas-blog.herokuapp.com/auth/users", {
                method: 'POST',
                headers: myHeaders,
                body: formData
            })
                .then(res => res.json())
                .then(data => {
                    if (data.error){
                        this.props.flashMessage(data.error, 'danger')
                    } else {
                        console.log(data)
                        this.props.flashMessage(`${data.username} has been created`, 'success')
                        this.setState({
                            redirect: true
                        })
                    }
                })
                .catch(err => console.error(err))
        };
    };

    render() {
        return (
            <>
                {this.state.redirect ? <Navigate to='/register' /> :  (
                    <>
                        <h3 className="text-center">Register</h3>
                        <form onSubmit={this.handleRegister}>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="text" className='form-control' placeholder='Enter Email' name='email' />
                                <label htmlFor="username">Username</label>
                                <input type="text" className='form-control' placeholder='Enter Username' name='username' />
                                <label htmlFor="password">Password</label>
                                <input type="password" className='form-control' placeholder='Enter Password' name='password' />
                                <label htmlFor="confirmPass">Confirm Password</label>
                                <input type="password" className='form-control' placeholder='Re-Enter Password' name='confirmPass' />
                                <input type="submit" value="Register" className='btn btn-primary w-100 mt-3' />
                            </div>
                        </form>
                    </>
                )}
            </>
        )
    }
}