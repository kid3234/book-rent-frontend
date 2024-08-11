import React ,{useEffect} from 'react';
import { jwtDecode } from 'jwt-decode';

import { useNavigate } from 'react-router-dom';
const LoginRedirect = ({ token }) => {
    const navigate = useNavigate();
  
    useEffect(() => {
      try {

        const decodedToken = jwtDecode(token);
        const userRole = decodedToken.role;
  console.log("role ", userRole);
  
        switch (userRole) {
          case 'admin':
            navigate('/admin/dashboard');
            break;
          case 'owner':
            navigate('/owner/dashboard');
            break;
          case 'customer':
            navigate('/customer/dashboard');
            break;
          default:
            navigate('/');
            break;
        }
      } catch (error) {
        console.error('Failed to decode token:', error);
        navigate('/login');
      }
    }, [token, navigate]);
  
    return null; 
  };

  export default LoginRedirect