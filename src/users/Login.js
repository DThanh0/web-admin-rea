import React, { useState } from 'react';
import AxiosInstance from '../Helper/AxiosInstance';

const Login = (props) => {
    const { saveUser } = props;
    const [email, setEmail] = useState('admin@gmail.com');
    const [password, setPassword] = useState('123');
  
    const handleLogin = async () => {
      try {
        const body = { email, password };
        const result = await AxiosInstance().post('/login.php', body);
  
        if (result.status) {
          saveUser(result.user);
  
          // Lưu thông tin người dùng vào local storage
          localStorage.setItem('user', JSON.stringify(result.user));
        } else {
          alert('Đăng nhập thất bại');
        }
      } catch (error) {
        console.log(error);
      }
    };
    return (
        <form className="container mt-5">
            <div className='mb-3'>
                <label className='form-label'>Email</label>
                <input
                    type='email'
                    className='form-control'
                    placeholder='Enter email'
                    name='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className='mb-3'>
                <label className='form-label'>Password</label>
                <input
                    type='password'
                    className='form-control'
                    placeholder='Enter password'
                    name='pswd'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button type='button' className='btn btn-primary' onClick={handleLogin}>
                Submit
            </button>
        </form>
    )
}

export default Login;