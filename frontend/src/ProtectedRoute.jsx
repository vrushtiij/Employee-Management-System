import axios from 'axios';
import {useEffect, useState} from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from "react-toastify";

const ProtectedRoute = ({children}) => {
    const[loading, setLoading] = useState(true);
    const[isAuth, setisAuth] = useState(false);

    useEffect(() => 
    {
        const checkAuth = async () => {
            try {
                await axios.get("https://your-backend.up.railway.app/check-auth", {
                    withCredentials: true,
                });
                setisAuth(true);
            }
            catch (err) {
                setisAuth(false); 
                toast.info("Please Log In"); 
            }
            finally{
                setLoading(false);
            }
        }
        checkAuth();
    }, []);

    if (loading) return <p>Checking authentication...</p>;

    if (!isAuth)
            return <Navigate to="/" replace />;
    return children;
}

export default ProtectedRoute;
