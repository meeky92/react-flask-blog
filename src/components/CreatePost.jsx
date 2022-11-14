import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreatePost(props) {

    const navigate = useNavigate()
    useEffect(() => {
        if (!props.loggedIn){
            props.flashMessage('login pls', 'warning');
            navigate('/login');
        }
    })

    const handleSubmit = async event => {
        event.preventDefault();
        console.log(event);

        let title = event.target.title.value;
        let content = event.target.body.value;

        let token = localStorage.getItem('token')

        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', `Bearer ${token}`);

        let requestBody = JSON.stringify({title, content});

        let res = await fetch("https://kekambas-blog.herokuapp.com/blog/posts", {
            method: 'POST',
            headers: myHeaders,
            body: requestBody
        });

        if (res.ok){
            let data = await res.json();
            props.flashMessage(`${data.title} has been created`, 'primary');
            navigate('/');
        } else {
            props.flashMessage('There was an issue, please try again', 'warning');
        }
    }

    return (
        <>
            <h3 className="text-center">Create A New Post</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text" className='form-control' placeholder='Enter Title' name='title' />
                    <label htmlFor="body">Body</label>
                    <input type="text" className='form-control' placeholder='Enter Body' name='body' />
                    <input type="submit" id="button" value="Create Post" className='btn btn-success w-100 mt-3' />
                </div>
            </form>
        </>
    )
}
