import React, { useState, useEffect } from "react";
import AxiosInstance from "../Helper/AxiosInstance";
import swal from 'sweetalert';

const ListTopic = () => {
    const [topics, setTopics] = useState([]);

    useEffect(() => {
        const fetchTopics = async () => {
            const result = await AxiosInstance().get('/get-topic.php');
            console.log(result);
            setTopics(result);
        };

        fetchTopics();
    }, []);

    const handleDelete = async (id) => {
        swal({
            title: "Xác nhận xóa chủ đề?",
            text: "Xóa chủ đề!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (will) => {
                if (will) {
                    try {
                        const result = await AxiosInstance().delete(`/delete-topic.php?id=${id}`);
                        if (result.status) {
                            swal('Xóa thành công');
                            // Reload or update the topic list as needed
                            window.location.reload();
                        } else {
                            swal('Xóa thất bại')
                        }
                    } catch (error) {
                        console.log(error);
                    }
                }
            });
    }

    return (
        <div className="container mt-5">
            <div className="toolbar">
                <a className="btn btn-primary me-3" href="/AddTopic">Add Topic</a>
                <a className="btn btn-primary me-3" href="/">List News</a>
            </div>
            <h1>Danh sách chủ đề</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Tên chủ đề</th>
                        <th>Mô tả</th>

                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {topics && topics.map((item, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.description}</td>
                            <td>
                                <a className="btn btn-primary me-2" href={`/EditTopic/${item.id}`}>Sửa</a>
                                <button className="btn btn-danger" onClick={() => handleDelete(item.id)}>Xóa</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ListTopic;
