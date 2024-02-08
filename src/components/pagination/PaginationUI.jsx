import React from 'react';
import './Pagination.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const handleClick = (page) => {
        onPageChange(page);
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <li key={i} className={i === currentPage ? 'active' : null}>
                    <button onClick={() => handleClick(i)}>{i}</button>
                </li>
            );
        }
        return pageNumbers;
    };

    return (
        <ul className="pagination">
            <li><button onClick={() => handleClick(currentPage - 1)} disabled={currentPage === 1}>Previous</button></li>
            {renderPageNumbers()}
            <li><button onClick={() => handleClick(currentPage + 1)} disabled={currentPage === totalPages}>Next</button></li>
        </ul>
    );
};

export default Pagination;
