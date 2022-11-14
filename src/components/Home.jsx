import React, { useState, useEffect } from 'react';
import Posts from './Posts';

export default function Home(props) {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch("https://kekambas-blog.herokuapp.com/blog/posts")
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setPosts(data)
            })
            .catch(err => console.error(err))
    }, [])

    return (
        <>
            <h1 className="text-center">it's a blog</h1>
            {posts.map(post => <Posts key={post.id} post={post}/>)}
        </>
    )
}