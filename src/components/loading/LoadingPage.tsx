'use client';
import React from "react";
import "./loadingPage.css"
const LoadingPage: React.FC = () => {
    return (
        <div className="loading-page">
            <div className="spinner-border" role="status">
                <span className="visually-hidden"></span>
            </div>
        </div>
    );
};
export default LoadingPage;