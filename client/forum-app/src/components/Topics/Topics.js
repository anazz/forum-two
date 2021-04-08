import React, { useState, useEffect } from 'react';
import Topic from '../Topic/Topic';
import axios from 'axios';
import {Image} from 'cloudinary-react';
import canvas from 'canvas';
import './Topics.css';

const Topics = (props) => {
    const [topics, setTopics] = useState([]);

    const [title, setTitle] = useState("");
    const [date, setDate] = useState();
    const [image, setImage] = useState("");
    const [message, setMessage] = useState("");

    const [imageSelected, setImageSelected] = useState("");

    const topicItems = [];

    const addTopic = () => {

        if (image){
            axios.post("http://localhost:3001/create", {
                title: title,
                date: date,
                image: image,
                message: message,
            }).then(() => {
                setTopics([
                ...topics,
                {
                    title: title,
                    date: date,
                    image: image,
                    message: message,
                },
            ]);
            });
        }
    };

    const uploadImage = () => {
        const formData = new FormData();
        formData.append("file", imageSelected);
        formData.append("upload_preset", "v9ixmccm")

        axios.post("https://api.cloudinary.com/v1_1/https-github-com-anazz/image/upload", formData)
        .then((response) => {
            console.log(response.data.secure_url);
            setImage(response.data.secure_url);
        });
    };
    

    useEffect(() => { 
        axios.get("http://localhost:3001/topics").then((response) => {
            setTopics(response.data);
            console.log(response.data);
        });
    }, []);

    console.log(topics);

    const getTopics = () => {
        if(topics) {
            const iterator = topics.values();
    
            for (const value of iterator) {
                return (
                    topics.map(topic => (
                    <li key={topic.id}>
                        <Topic
                            topics={topics}
                            topic={topic}
                            image={image}
                        />
                    </li>
                    )
                ))    
            }
        }
    }

    return (
        <div className="topics-main-wrapper">
            <div className="add-topics-wrapper">
                <h3>Ajouter un sujet</h3>
                <label htmlFor="add-title">Titre:</label>
                <input className="add-title" type="text" onChange={(event) => {
            setTitle(event.target.value);
          }}/>
                <label htmlFor="add-date">Date:</label>
                <input className="add-date" type="date" placeholder="AAAA-MM-JJ"  onChange={(event) => {
            setDate(event.target.value);
          }}/>
                <textarea id="topic-message" name="topic-message" rows="5" cols="30" placeholder="Laissez votre message" onChange={(event) => {
            setMessage(event.target.value);}} />
                <input type="file" id="files" name="topic-image" accept="image/png, image/jpeg, image/jpg, image/gif"  onChange={(event) => {
            setImageSelected(event.target.files[0]);}}></input>
                <button onClick={uploadImage}>Ajouter une image</button>
                <button onClick={addTopic}>Ajouter le sujet</button>
                <Image cloudName="https-github-com-anazz" publicId={image} style= {{ width: 100 }}/>
            </div>
            <div className="sort-topics-by-wrapper">
            </div>
            <div className="topics-list-wrapper">
                <ul className="topics-list">
                    {getTopics()}
                </ul>
            </div>
        </div>
    );
}

export default Topics;