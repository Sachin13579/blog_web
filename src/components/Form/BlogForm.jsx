import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';

import './blog.css';

const BlogForm = ({ onClose }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [media, setMedia] = useState(null);
    const [selectedTagIds, setSelectedTagIds] = useState([]);
    const [filteredTags, setFilteredTags] = useState([]);
    const [tags, setTags] = useState([]);
    const navigate = useNavigate();


    const handleClose = () => {
        onClose();
    };
    useEffect(() => {
        const fetchTags = async () => {
            try {
                const response = await axios.get('https://zany-ruby-squid-belt.cyclic.app/api/v1/blog/fetchBlogTag');
                console.log(response.data.data);
                setTags(response.data.data);
            } catch (error) {
                console.log("Error:", error);
            }
        }
        fetchTags();
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("selectedTagIds", selectedTagIds)
        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('description', description);
            formData.append('media', media);
            selectedTagIds.forEach((tagId, index) => {
                formData.append(`tagsId[${index}]`, tagId);
            });

            await axios.post('https://zany-ruby-squid-belt.cyclic.app/api/v1/blog/createPost', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            onClose()
            navigate('/body')

        } catch (error) {
            console.error('Error creating blog:', error);
        }
    };

    const handleTagSelect = (e) => {
        const selectedTagId = e.target.value;
        if (!selectedTagIds.includes(selectedTagId)) {
            setSelectedTagIds([...selectedTagIds, selectedTagId]);
            const filter = tags.filter((elem) => {
                return elem._id === selectedTagId
            })
            setFilteredTags([...filteredTags, ...filter])
        }
    };

    const handleTagRemove = (tagId) => {
        const updatedSelectedTagIds = selectedTagIds.filter(selectedTagId => selectedTagId !== tagId);
        setSelectedTagIds(updatedSelectedTagIds);

        const updatedFilteredTags = filteredTags.filter(tag => tag?._id !== tagId);
        setFilteredTags(updatedFilteredTags);
    };


    return (
        <div className="blog-form-container">
            <h2>Create a New Blog</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    ></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="media">Upload Image:</label>
                    <input
                        type="file"
                        id="media"
                        onChange={(e) => setMedia(e.target.files[0])}
                        accept="image/*"
                        required
                    />
                </div>
                <div className="tag-container">
                    {filteredTags.map((tag) => (
                        <div key={tag?._id} className="tag" onClick={() => handleTagRemove(tag?._id)}>
                            {tag?.tagName} &times;
                        </div>
                    ))}
                </div>
                <div className="form-group">
                    <label htmlFor="tags">Select Tag:</label>
                    <select
                        id="tags"
                        // value={'value={selectedTagId}'}
                        value={selectedTagIds}
                        onChange={handleTagSelect}
                    >
                        <option value="">Select tags</option>
                        {tags.map(tag => (
                            <option key={tag._id} value={tag._id}>{tag.tagName}</option>
                        ))}
                    </select>
                </div>
                <div className='button-container'>

                    <button className="close-button" onClick={handleClose}>
                        Cancel
                    </button>
                    <button type="submit">Create Blog</button>
                </div>
            </form >
        </div >

    );
};
BlogForm.propTypes={
    onClose: PropTypes.func
}

export default BlogForm;
