import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar(props) {

    return (
        <nav className="navbar bg-light navbar-expand-lg">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Hai</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link className="nav-link" to="/">Home</Link>
                        {props.loggedIn ? (
                            <>
                            <Link className="nav-link" to="/create">Create New Post</Link>
                            <Link className="nav-link" to="/edit">Edit Post</Link>
                            <Link className="nav-link" to="/" onClick={props.logUserOut}>Logout</Link>
                            </>
                        ): (
                            <>
                            <Link className="nav-link" to="/register">Register</Link>
                            <Link className="nav-link" to="/login">Login</Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}