import React, { useState, useEffect } from 'react';
import AxiosInstance from '../Helper/AxiosInstance';
import '../Styles/Styles.css';
import swal from 'sweetalert';

const UserProfile = (props) => {
  const { user, saveUser } = props;
  const [userData, setUserData] = useState(null);

  useEffect(() => {
   const fetchUserProfile = async () => {
  try {
    const result = await AxiosInstance().get('/get-profile.php', {
      headers: {
        Authorization: `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJpZCI6MTQsImVtYWlsIjoidXUxQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImV4cCI6MTcwMTcyMDI1Mn0.wIxoyuPcVp4-3Tl74m_sSXcv1jMww3pzUpkjeYguYLQ'}`,
      },
    });
    // Rest of the code...
  } catch (error) {
    console.error('Failed to fetch user profile:', error.message);
  }
};

    fetchUserProfile();
  }, []);
  

  const handleLogout = () => {
    // Thực hiện logic đăng xuất (xóa thông tin user khỏi localStorage, vv.)
    saveUser(null);
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-header">
              <h2>User Profile</h2>
            </div>
            <div className="card-body">
              {userData && (
                <div>
                  <p><strong>ID:</strong> {userData.id}</p>
                  <p><strong>Email:</strong> {userData.email}</p>
                  <p><strong>Name:</strong> {userData.name}</p>
                  <p><strong>Role:</strong> {userData.role}</p>
                  {/* Assuming avatar is a URL */}
                  <p><strong>Avatar:</strong></p>
                  <img src={userData.avatar} alt="Avatar" className="img-fluid" style={{ maxWidth: '200px' }} />
                </div>
              )}
            </div>
            <div className="card-footer">
              <button className="btn btn-danger me-2" onClick={handleLogout}>Logout</button>
              <a className="btn btn-primary" href='/'>Home</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
