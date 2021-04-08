import React from 'react';
import './Post.css';

const Post = (props) => {

    // const db = firebase.firestore();

    // const [postTitle, setPostTitle] = useState("");
    // const [postDate, setPostDate] = useState("");
    // const [postContent, setPostContent] = useState("");
    // const [postAuthor, setPostAuthor] = useState("");


    // const postTitleArray = props.posts.map(post => post.postTitle);
    // const postDateArray = props.posts.map(post => post.postDate);
    // const postContentArray = props.posts.map(post => post.postContent);
    // const postAuthorArray = props.posts.map(post => post.postAuthor);
    
    // const getTitle = () => {   

    // }

    // const titleIterator = postTitleArray.values();

    // for (const value of titleIterator) {
    //     const postTitle = value;
    //     console.log(postTitle);
    // }

    // getTitle();
    // console.log(props.items.postAuthor);
    // console.log(props.post);

    // console.log(props.posts);
    console.log(props.post);
    return (
        <div className="post-main-wrapper">
            <div className="post-wrapper">
            {/* {getPosts()} */}
                <p className="post-content">{props.post.content}</p>
                <p className="post-author">{props.post.author}</p>
            </div>
        </div>
    );
}

export default Post;