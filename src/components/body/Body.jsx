import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Body.css';
import BlogForm from '../Form/BlogForm';
import SearchComponent from '../search/SearchComponent';
import Pagination from '../pagination/PaginationUI';
import dateFormatter from '../../utils/dateFormater.js';
import FeaturedTags from '../tags/FeaturedTags.jsx';

const Body = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [searchTextInput, setSearchTextInput] = useState('');
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [tagFilter, setTagFilter] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://zany-ruby-squid-belt.cyclic.app/api/v1/blog/fetchBlog?pageNo=${currentPage}&limit=5&searchText=${searchTextInput}&tagIdFilter=${tagFilter}`);
                console.log("response", response?.data?.data?.feedData)
                setBlogs(response?.data?.data?.feedData);
                setTotalPages(Math.ceil(response?.data?.data?.pageCount / 5));
                setLoading(false);
            } catch (error) {
                console.error('Error fetching blogs:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, [searchTextInput, currentPage, tagFilter]);
    const handleCreateBlogClick = () => {
        setShowForm(prevState => !prevState); // Toggle the state
    };
    const handleSearch = (text) => {
        setSearchTextInput(text);
    };
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    const onSelectTagHandler = (id) => {
        setTagFilter(id)
    }
    console.log('onSelectTagHandler', tagFilter)

    return (
        <div className="body-container">
            <div className='container'>
                <h2>Latest Blogs</h2>
                <SearchComponent onSearch={handleSearch} />
                <button onClick={handleCreateBlogClick}>
                    {showForm ? 'Close Blog Form' : 'Create Blog'}
                </button>
            </div>
            <FeaturedTags onSelectTag={onSelectTagHandler} />
            {showForm && <BlogForm onClose={() => setShowForm(false)} />}
            {loading ? (
                <p>Loading...</p>
            ) : (
                <ul className="blog-list">
                    {blogs.map(blog => (
                        <li key={blog?.id} className="blog-item">
                            <img className='' src={blog?.imageURI} alt="blogimage" />
                            <div className='blog-text-container'>
                                <div className='tag-conatiner'>
                                    {/* <h3> */}
                                    {blog?.tagsDetails.map(e => (
                                        <h3 className="tag" key={e._id}>
                                            {e.tagName}
                                        </h3>
                                    ))}
                                    {/* </h3> */}
                                </div>
                                <h5>{dateFormatter(blog?.createdAt)}</h5>
                                <h1>{blog?.title}</h1>
                                <p>{blog?.description}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
    );
};

export default Body;
