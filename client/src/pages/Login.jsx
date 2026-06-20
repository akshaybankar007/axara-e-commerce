import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../store/authSlice';
import api from '../api/axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { search } = useLocation();

    const redirectUrl = new URLSearchParams(search).get('redirect') || '/';

    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        if (userInfo) {
            navigate(redirectUrl);
        }
    }, [navigate, userInfo, redirectUrl]);

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const { data } = await api.post('/auth/login', { email, password });
            dispatch(setCredentials(data));
            navigate(redirectUrl);
        } catch (err) {
            setError(err.response?.data?.message || err.message);
        } finally {
            setLoading(false);
        }
    };

return (
        <div className="max-w-md mx-auto mt-10 bg-zinc-900 p-8 border border-zinc-800 rounded-lg shadow-xl">
            <h2 className="text-2xl font-bold text-zinc-100 mb-6 text-center">Sign In to Axara</h2>
            
            {error && <div className="bg-red-900/30 border border-red-900/50 text-red-400 p-3 rounded mb-4 text-sm">{error}</div>}
            
            <form onSubmit={submitHandler} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-1">Email Address</label>
                    <input type="email" className="w-full p-2 bg-zinc-950 border border-zinc-700 text-zinc-100 rounded focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition-colors" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-1">Password</label>
                    <input type="password" className="w-full p-2 bg-zinc-950 border border-zinc-700 text-zinc-100 rounded focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition-colors" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit" disabled={loading} className="w-full bg-white text-black font-bold p-2 rounded hover:bg-zinc-200 transition-colors disabled:bg-zinc-700 disabled:text-zinc-500 shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                    {loading ? 'Authenticating...' : 'Sign In'}
                </button>
            </form>

            <div className="mt-6 text-center text-sm text-zinc-500">
                New to Axara? <Link to={redirectUrl === '/' ? '/register' : `/register?redirect=${redirectUrl}`} className="text-indigo-400 hover:text-indigo-300 hover:underline transition-colors">Create an account</Link>
            </div>
        </div>
    );
};

export default Login;