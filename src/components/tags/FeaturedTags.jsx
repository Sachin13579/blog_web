import axios from 'axios';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './FeaturedTags.css'


const FeaturedTags = ({ onSelectTag }) => {
    const [tags, setTags] = useState([]);
    const [selectFilterTag, setSelectFilterTag] = useState('');

    useEffect(() => {
        async function fetchTags() {
            try {
                const response = await axios.get("https://zany-ruby-squid-belt.cyclic.app/api/v1/blog/fetchBlogTag")
                let tagData = response.data.data;
                setTags(tagData)
            } catch (error) {
                console.log(error.message)
            }
        }
        fetchTags()
    }, [])
    onSelectTag(selectFilterTag)


    return (
        <div className='tag-containers'>
            <button onClick={() => { setSelectFilterTag('') }}>All</button>
            {tags.map((e) => {
                return (

                    <button key={e._id} onClick={(k) => setSelectFilterTag(e._id)}>{e.tagName}</button>

                )
            })}
        </div >
    );
};
FeaturedTags.propTypes = {
    onSelectTag: PropTypes.func,
};

export default FeaturedTags;
