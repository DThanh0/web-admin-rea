import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AxiosInstance from '../Helper/AxiosInstance';
import swal from 'sweetalert';

const EditTopic = () => {
    const { id } = useParams();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        const fetchTopic = async () => {
            try {
                const result = await AxiosInstance().get(`/get-topic-detail.php?id=${id}`);
                setName(result.name);
                setDescription(result.description);
            } catch (error) {
                console.log(error);
            }
        };

        fetchTopic();
    }, [id]);

    const handleEditTopic = async () => {
        swal({
            title: "Xác nhận sửa?",
            text: "Sửa dữ liệu vào hệ thống!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then(async (will) => {
            if (will) {
                try {
                    if (!name || !description) {
                        swal('Vui lòng nhập đầy đủ thông tin');
                        return;
                    }
    
                    const body = {
                        name: name,
                        description: description,
                    };
    
                    const result = await AxiosInstance().post(`/update-topic.php?id=${id}`, body);
    
                    if (result.status) {
                        swal("Sửa thành công", "Dữ liệu đã được cập nhật thành công!", {icon:"success"});
                        window.location.href="/Topic"
                    } else {
                        const errorMessage = result.message || "Có lỗi xảy ra khi cập nhật dữ liệu";
                        swal("Sửa thất bại", errorMessage, "error");
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        });
    };       

    return (
        <div className="container mt-5">
            <h1>Sửa chủ đề</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Tên chủ đề</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Mô tả</label>
                    <textarea
                        className="form-control"
                        id="description"
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <button type="button" className="btn btn-primary" onClick={handleEditTopic}>Cập nhật</button>
            </form>
        </div>
    );
};

export default EditTopic;
