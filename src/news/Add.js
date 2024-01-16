import React, { useEffect, useState } from "react";
import AxiosInstance from "../Helper/AxiosInstance";
import swal from "sweetalert";
import Axios from "axios";

const Add = (props) => {
  const { user } = props;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [topic_id, setTopic_id] = useState(1);
  const [user_id, setUser_id] = useState(user?.ID);

  const [imageInput, setImageInput] = useState("");
  const [imagePreview, setImagePreview] = useState("");

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

    // //upload lên Cloudinary
    // const formData = new FormData();
    // formData.append("file", file);
    // formData.append("upload_preset", "ml_default");

    // Axios.post(
    //   "https://api.cloudinary.com/v1_1/dqkihuch6/image/upload",
    //   formData
    // )
    //   .then((response) => {
    //     console.log(response);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

  //danh sách chủ đề
  const [topics, setTopics] = useState([]);
  useEffect(() => {
    const fetchTopics = async () => {
      const result = await AxiosInstance().get("/get-topic.php");
      setTopics(result);
      console.log(result);
    };
    fetchTopics();
  }, []);

//thêm mới
const handleAdd = async () => {
  swal({
    title: "Xác nhận thêm mới?",
    text: "Thêm mới dữ liệu vào hệ thống!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then(async (will) => {
    if (will) {
      try {
        if (!title || !content ) {
          swal("Vui lòng nhập đầy đủ thông tin");
          return;
        }
        const body = {
          title: title,
          content: content,
          image: image,
          topic_id: topic_id,
          user_id: user_id,
        };
        const result = await AxiosInstance().post("/add-news.php", body);
        console.log("result.status",result.status);

        // Kiểm tra xem đối tượng data có tồn tại không
        if (result.data && result.data.success) {
          swal("Thêm tin tức thành công",{icon : "success"});
          window.location.href = "/"; // Chuyển hướng sau khi thêm thành công
        } else {
          swal("Thêm tin tức thành công",{icon : "success"});
          window.location.href = "/";
        }
      } catch (error) {
        console.error("Lỗi thêm tin tức:", error);
        swal("Có lỗi xảy ra khi thêm tin tức.", { icon: "error" });
      }
    }
  });
};

  return (
    <div className="container mt-5">
      <div className="toolbar">
        <a className="btn btn-primary me-3" href="/">
          List
        </a>
        <a className="btn btn-primary me-3" href="/topic">
          Topic
        </a>
        <a className="btn btn-primary me-3" href="/add">
          Statistic
        </a>
        <a className="btn btn-primary" href="/">
          List
        </a>
      </div>
      <h1 className="mb-4">Thêm Tin Tức</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Tiêu đề:
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="content" className="form-label">
            Nội dung:
          </label>
          <input
            type="text"
            className="form-control"
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Hình ảnh:
          </label>
          <input
            type="file"
            className="form-control"
            id="image"
            onChange={handleImageChange}
          />
        </div>
        <img src={imagePreview} alt="Hình ảnh" className="img-fluid mb-3" />
        <div className="mb-3">
          <label htmlFor="topic" className="form-label">
            Chủ đề:
          </label>
          <select
            className="form-select"
            id="topic"
            value={topic_id}
            onChange={(e) => setTopic_id(e.target.value)}
          >
            {topics.map((item, index) => (
              <option value={item.id} key={index}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <button type="button" className="btn btn-primary" onClick={handleAdd}>
          Thêm
        </button>
      </form>
    </div>
  );
};

export default Add;
