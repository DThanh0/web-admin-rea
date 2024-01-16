import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AxiosInstance from '../Helper/AxiosInstance';
import swal from 'sweetalert';

const Edit = (props) => {
    const { user } = props;
    const { id } = useParams();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [topic_id, setTopic_id] = useState(1);
    const [user_id, setUser_id] = useState(user?.ID);

    const [image, setImage] = useState('');
    const [imageInput, setImageInput] = useState('');
    const [imagePreview, setImagePreview] = useState('');

    //lấy thông tin chi tiết tin tức
    useEffect(() => {
        const fetchNews = async () => {
            const result = await AxiosInstance().get(`/get-news-detail.php?id=${id}`);
            console.log(result);
            setTitle(result.title);
            setContent(result.content);
            setImage(result.image || '');
            setImagePreview(result.image || '');
            setTopic_id(result.topic_id);
        }
        fetchNews();
    }, [id]);

    const handleImageChange = async (e) => {
        //hiển thị hình ảnh
        const file = e.target.files[0];
        if (!file) return;
        //setImageInput(file);
        setImagePreview(URL.createObjectURL(file));
        // upload hình ảnh
        const formData = new FormData();
        formData.append('image', file);
        const result = await AxiosInstance('multipart/form-data').post('/upload-file.php', formData);
        console.log(result);
        setImage(result.path);
    }

    const handleEdit = async (e) => {
        swal({
            title: "Xác nhận sửa?",
            text: "Sửa dữ liệu vào hệ thống!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (will) => {
                if (will) {
                    try {
                        if (!title || !content) {
                            swal('Vui lòng nhập đầy đủ thông tin');
                            return;
                        }
                        const body = {
                            title: title,
                            content: content,
                            image: image,
                            topic_id: topic_id,
                            user_id: user_id,
                        }
                        const result = await AxiosInstance().post(`/update-news.php?id=${id}`, body);
                        console.log(result);
                        if (result.status) {
                            swal("Sửa thành công")
                            window.location.href = '/';
                        } else {
                            swal("Sửa thất bại")
                        }
                    } catch (error) {
                        console.log(error);
                    }
                }
            });

    };

    return (
        <div className="container mt-5">
            <h1>Sửa tin tức</h1>
            <form >
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Tiêu đề</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="content" className="form-label">Nội dung</label>
                    <textarea
                        className="form-control"
                        id="content"
                        name="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="image" className="form-label">Hình ảnh:</label>
                    <input type="file" className="form-control" id="image" onChange={handleImageChange} />
                </div>
                <img src={imagePreview} alt="Hình ảnh" className="img-fluid mb-3" />
                <br />
                <button type="button" className="btn btn-primary" onClick={handleEdit}>Cập nhật</button>
            </form>
        </div>
    );
};

export default Edit;
