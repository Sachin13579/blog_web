import React from 'react';
import './shimmerUi.css';

const ShimmerUI = () => {
    return (
        <div className="shimmer-container">
            {
                Array.from({ length: 6 }, (_, index) => (
                    <div className="card" key={index}>
                        <div className="shimmerBG media"></div>
                        <div className="p-32">
                            <div className="shimmerBG title-line"></div>
                            <div className="shimmerBG title-line end"></div>

                            <div className="shimmerBG content-line m-t-24"></div>
                            <div className="shimmerBG content-line"></div>
                            <div className="shimmerBG content-line"></div>
                            <div className="shimmerBG content-line"></div>
                            <div className="shimmerBG content-line end"></div>
                        </div>
                    </div>
                ))
            }
            </div>
            );
};

            export default ShimmerUI;
