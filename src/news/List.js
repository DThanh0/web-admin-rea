import React, { useState, useEffect } from "react";
import AxiosInstance from "../Helper/AxiosInstance";
import "../Styles/Styles.css";
import swal from 'sweetalert'

const List = (props) => {
    const {user, saveUser} = props;

    const [news, setNews] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await AxiosInstance().get('/get-news.php');
            setNews(result);
        }
        fetchData();
    }, [])

    const handleDelete = async (id) => {
        swal({
            title: "Xác nhận xóa tin tức?",
            text: "Xóa tin tức!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (will) => {
                if (will) {
                    try {
                        
                        const result = await AxiosInstance().delete(`/delete-news.php?id=${id}`);
                        console.log(result);
                        if (result.status) {
                            swal('Xóa thành công');
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
                <a className="btn btn-primary me-3" href="/add">Add News</a>
                <a className="btn btn-primary me-3" href="/topic">Topic</a>
                <a className="btn btn-primary me-3" href="/UserProfile">Profile</a>
                <a className="btn btn-primary" onClick={() => saveUser(null)} href="/add">Logout</a>
            </div>
            <h1>Danh sách tin tức</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Tiêu đề</th>
                        <th>Nội dung</th>
                        <th>Hình ảnh</th>
                        <th>Thời gian tạo</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {news.map((item, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.title}</td>
                            <td>{item.content}</td>
                            <td>
                                <img src={item.image} alt="Hình ảnh" style={{ maxWidth: '100px' }} />
                            </td>
                            <td>{new Date(item.created_at).toLocaleString()}</td>
                            <td>
                                <a className="btn btn-primary me-2" href={`/edit/${item.id}`}>Sửa</a>
                                <button className="btn btn-danger" onClick={() => handleDelete(item.id)}>Xóa</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default List;