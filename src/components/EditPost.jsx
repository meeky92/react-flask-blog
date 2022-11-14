import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Posts from './Posts';

export default function EditPost(props) {

    const { id } = useParams()
    const[post, setPost] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        fetch(`https://kekambas-blog.herokuapp.com/blog/posts/${id}`)
            .then(res => res.json())
            .then(data => setPost(data))
    }, [id])

    useEffect(() => {
        if (!props.loggedIn){
            props.flashMessage('login first pls', 'warning');
            navigate('/login');
        }
    })

    const handleDelete = async event => {
        event.preventDefault();
        console.log(event);

        let token = localStorage.getItem('token')
        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', `Bearer ${token}`);

        let res = await fetch(`https://kekambas-blog.herokuapp.com/blog/posts/${id}`, {
            method: 'DELETE',
            headers: myHeaders
        });

        if (res.ok){
            let data = await res.json();
            props.flashMessage(`${data.title} has been deleted`, 'primary');
            navigate('/');
        } else {
            props.flashMessage('There was an issue, please try again', 'warning');
        }
    }

    return (
        <>
            <Posts post={post} />
            <button className='btn btn-danger w-100' onClick={handleDelete}>Delete</button>

        </>
    )


}    