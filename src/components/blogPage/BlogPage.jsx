import React, { useState, useEffect } from 'react';
import axios from 'axios';
import dateFormatter from '../../utils/dateFormater.js';
import { useParams } from 'react-router-dom';
import './BlogPage.css';

const BlogPage = () => {
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await axios.get(`https://zany-ruby-squid-belt.cyclic.app/api/v1/blog/fetchBlogById?_id=${id}`);
                console.log("blog page response", response?.data?.data?.feedData[0])
                setBlog(response?.data?.data?.feedData[0]);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching blog:', error);
                setLoading(false);
            }
        };

        fetchBlog();
    }, [id]);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="blog-page-container"> {/* Apply container class */}
            {blog && (
                <div>
                    <h2 className="blog-title">{blog?.title}</h2>
                    <p className="blog-date">{dateFormatter(blog.createdAt)}</p>
                    <img className="blog-image" src={blog.imageURI} alt="Blog" />
                    <p className="blog-description">{blog.description}</p>
                    {/* Display other blog content */}
                </div>
            )}
        </div>
    );
};

export default BlogPage;
