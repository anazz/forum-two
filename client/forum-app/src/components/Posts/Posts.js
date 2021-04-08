import React from 'react';
import Post from '../Post/Post';
// import axios from 'axios';
import './Posts.css';

const Posts = (props) => {

    const topicTitles = props.topics.map(topic => topic.title);
    const postTopicTitle = props.posts.map(post => post.topic_title);

    console.log(postTopicTitle);

    const showPosts = () => {
        
        const topicIterator = topicTitles.values();
        const postsIterator = postTopicTitle.values();
        
        console.log(topicTitles);
        for (const titleTopic of topicIterator) {
            console.log(titleTopic);
            for (const titlePost of postsIterator) {
                console.log(titlePost);
                for(let i = 0; i <= topicTitles.length; i++) {
                    if (titleTopic === titlePost) {
                        return (
                            <div className="posts-list-wrapper">
                            {                   
                                <ul>
                                    {props.posts.map(post => (
                                    <li key={post.topic_id}>
                                        <Post post={post} />
                                    </li>
                                    ))}
                                </ul>
                            }
                            </div>
                        );

                    }
                }
            }
        }  
    };


    return (
        <div className="posts-main-wrapper">
           {showPosts()}
        </div>
    );
}
export default Posts;