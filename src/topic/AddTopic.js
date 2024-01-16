// Import necessary dependencies
import React, { useEffect, useState } from "react";
import AxiosInstance from "../Helper/AxiosInstance";
import Axios from "axios";
import swal from 'sweetalert';

const AddTopic = () => {
    // State variables for topic information
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    // Function to handle adding a new topic
    const handleAddTopic = async () => {
        swal({
            title: "Xác nhận thêm mới?",
            text: "Thêm mới dữ liệu vào hệ thống!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (will) => {
                if (will) {
                    try {
                        if (!name || !description) {
                            swal('Vui lòng nhập đầy đủ thông tin');
                            return;
                        }
                        const body = {
                            name: name,
                            description: description,
                        }
                        const result = await AxiosInstance().post('/add-topic.php', body);
                        setName('');
                        setDescription('');

                        if (result.data && result.data.success) {
                            swal('Thêm chủ đề thành công', { icon: "success" });
                            window.location.href = "/Topic";
                        } else {
                            const errorMessage = result.data && result.data.message ? result.data.message : 'Thêm chủ đề không thành công';
                            swal(errorMessage);
                        }
                    } catch (error) {
                        console.error('Lỗi thêm chủ đề:', error);
                        swal('Có lỗi xảy ra khi thêm chủ đề.');
                    }
                }
            });
    }



    return (
        <div className="container mt-5">
            <div className="toolbar">
                <a className="btn btn-primary me-3" href="/topic">Topic</a>
            </div>
            <h1 className="mb-4">Thêm Chủ Đề</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Tên chủ đề:</label>
                    <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Mô tả:</label>
                    <textarea className="form-control" id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <button type="button" className="btn btn-primary" onClick={handleAddTopic}>Thêm</button>
            </form>
        </div>
    );
}

export default AddTopic;
