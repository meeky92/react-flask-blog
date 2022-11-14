import React from 'react';

export default function Posts({ post }) {
    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{ post.title }</h5>
                <p className="card-text">{ post.content }</p>
                <p class="card-text"><small class="text-muted">{ post.author.date_created }</small></p>
                {/* <a className='btn btn-primary' href='/'>See More</a> */}
            </div>
        </div>
    )
}

// <img src={post.content} className="card-img-top mh-58" alt=""></img>

// import React, { useState, useEffect } from 'react';

// export default function Posts(props) {

//     const [posts, setPosts] = useState([]);

//     useEffect(() => {
//         fetch("https://kekambas-blog.herokuapp.com/blog/posts")
//             .then(res => res.json())
//             .then(data => {
//                 console.log(data);
//                 setPosts(data);
//             })
//     }, []);

//     return (
//         <>
//         <div className="row">
//             <div className="col">
//                 <ul className="list-group">
//                     {posts.map(post=> (
//                         <li className="list-group-item" key={post.id}>{post.title}<p>{post.content}</p></li>
//                 ))}
//                 </ul>
//             </div>
//         </div>
//         </>
//     )
// }