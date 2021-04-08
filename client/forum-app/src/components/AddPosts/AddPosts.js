import React, { useState, useEffect } from 'react';
import Posts from '../Posts/Posts';
import axios from 'axios';
import './AddPosts.css';
import Topics from '../Topics/Topics';

const AddPosts = (props) => {

    const [postAuthor, setPostAuthor] = useState("");
    const [postContent, setPostContent] = useState("");
    
    const [posts, setPosts] = useState([]);

    console.log(props.topic.id);

    const topicId = props.topic.id;
    const topicTitle = props.topic.title;

    const showForm = (event) => {
        if (document.querySelector(".add-post-wrapper").style.display === "none") {
            document.querySelector(".add-post-wrapper").style.display = "flex";
        } else {
            document.querySelector(".add-post-wrapper").style.display = "none";
        }    
    }

    const addPosts = (event) => {
        axios.post("http://localhost:3001/create/posts", {
            author: postAuthor,
            content: postContent,
            topic_id: topicId,
            topic_title: topicTitle,
        }).then(() => {
            setPosts([
            ...posts,
            {
                author: postAuthor,
                content: postContent,
                topic_id: topicId,
                topic_title: topicTitle,
            },
        ]);
        });
    }

    useEffect(() => {
        axios.get(`http://localhost:3001/topics/posts`).then((response) => {
            setPosts(response.data);
            console.log(response.data);
        });
    }, []);

    const iterator = props.topics.values();
    // const postId = posts.map(post => post.id);
    
    for (const value of iterator) {
      console.log(value.id);
      const postId = posts.map(post => post.id);
      if (value.id === postId) {
          console.log(postId);
      }
    }


    console.log(posts);
    console.log(props.topic.id);

    return (
        <div className="add-posts-main-wrapper">
            <button onClick={showForm}>Ajouter un commentaire</button>
            <div className="add-post-wrapper">
                <label htmlFor="post-author">Veuillez rentrez votre pseudo : </label>
                <input type="text" name="post-author" onChange={(event)=>setPostAuthor(event.target.value)} />
                <label htmlFor="post-comment">Commentaire : </label>
                <input type="text" name="post-comment" onChange={(event)=>setPostContent(event.target.value)} />
                <button onClick={addPosts}>Ajouter un commentaire</button>
            </div>
            <div className="topic-posts-wrapper">
                <Posts posts={posts} topics={props.topics}/>
            </div>
        </div>
    );
}

export default AddPosts;