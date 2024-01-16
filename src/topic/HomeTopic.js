import React from "react";
import AxiosInstance from "../Helper/AxiosInstance";

const HomeTopic = () => {
    return (
        <div className="container mt-5">
            <div className="toolbar">
                <a className="btn btn-primary me-3" href="/add">Add News</a>
                <a className="btn btn-primary me-3" href="/hometopic">Topic</a>
                <a className="btn btn-primary me-3" href="/add">Statistic</a>
                <a className="btn btn-primary" href="/">List</a>
            </div>
        </div>
    )
}

export default HomeTopic;