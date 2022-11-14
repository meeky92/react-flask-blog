import React from 'react';
import { useNavigate } from 'react-router-dom';


export default function Login(props) {

    const navigate = useNavigate();

    const handleSubmit = async event => {
        event.preventDefault();
        let username = event.target.username.value;
        let password = event.target.password.value;
        let stringToEncode = `${username}:${password}`;

        let myHeaders = new Headers();
        myHeaders.append('Authorization', `Basic ${btoa(stringToEncode)}`)

        let response = await fetch('https://kekambas-blog.herokuapp.com/auth/token', {
            method: 'POST',
            headers: myHeaders
        })

        if (response.ok){
            let data = await response.json()
            let token = data.token;
            let expiration = data.token_expiration;
            localStorage.setItem('token', token);
            localStorage.setItem('tokenExp', expiration);
            props.flashMessage("yer gewd", "success");
            props.logUserIn();
            navigate('/');
        } else {
            // flash a fail message
            props.flashMessage('try again', 'danger')
        }
    }

    return (
        <>
            <h3 className="text-center">Login</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" className='form-control' placeholder='Enter Username' name='username' />
                    <label htmlFor="password">Password</label>
                    <input type="password" className='form-control' placeholder='Enter Password' name='password' />
                    <input type="submit" id="button" value="Login" className='btn btn-success w-100 mt-3' />

                </div>
            </form>
        </>
    )
}