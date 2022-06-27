import React from 'react';

const Wrapper = ({ children , className }) => {
    return (
        <div className={`p-3 p-md-4 bg-white rounded-12 shadow-card ${className || ""}`}>
            {children}
        </div>
    )
};

export default Wrapper;
