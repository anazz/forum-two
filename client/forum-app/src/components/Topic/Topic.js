import React from 'react';
import Posts from '../Posts/Posts';
import AddPosts from '../AddPosts/AddPosts';
import './Topic.css';

const Topic = (props) => {

    //     const encodeImageFileAsURL = (element) => {
    //     // var file = element.files[0];
    //     let reader = new FileReader();
    //     reader.onloadend = function() {
    //       console.log('RESULT', reader.result)
    //     }
    //     return reader.readAsDataURL(element);
    // }

    // encodeImageFileAsURL(props.topic.image);
    console.log(props.topic.id);

    // const fileReader = new FileReader();
    // if(props.topic.image.data){
    //     console.log(fileReader.readAsDataURL(props.topic.image.data ));
    // }
    

    return (
        <div className="topic-main-wrapper">
            <div className="topic-wrapper">   
                <div className="topic-top-wrapper">
                    <h2>{props.topic.title}</h2>
                    <span>{props.topic.message}</span>
                    <p className="topic-date">{props.topic.date}</p>
                </div>
                <div className="topic-image-wrapper">
                    <img src={props.topic.image} alt="" />
                </div>
            </div>
            <AddPosts topic={props.topic} topics={props.topics}/>
        </div>
    );
}

export default Topic;