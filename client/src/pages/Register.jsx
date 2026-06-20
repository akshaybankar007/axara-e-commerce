import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../store/authSlice';
import api from '../api/axios';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [selectedLocations, setSelectedLocations] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { search } = useLocation();

    const redirectUrl = new URLSearchParams(search).get('redirect') || '/';
    const { userInfo } = useSelector((state) => state.auth);

    const availableLocations = ['Nagpur', 'Gondiya', 'Pune', 'Mumbai'];

    useEffect(() => {
        if (userInfo) {
            navigate(redirectUrl);
        }
    }, [navigate, userInfo, redirectUrl]);

    const locationChangeHandler = (city) => {
        if (selectedLocations.includes(city)) {
            setSelectedLocations(selectedLocations.filter((c) => c !== city));
        } else {
            setSelectedLocations([...selectedLocations, city]);
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);
        try {
            const { data } = await api.post('/auth/register', {
                name,
                email,
                password,
                activeLocations: selectedLocations
            });
            dispatch(setCredentials(data));
            navigate(redirectUrl);
        } catch (err) {
            setError(err.response?.data?.message || err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-6 bg-white p-8 border border-gray-200 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Create Axara Account</h2>

            {error && <div className="bg-red-50 text-red-600 p-3 rounded mb-4 text-sm">{error}</div>}

            <form onSubmit={submitHandler} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input
                        type="email"
                        className="w-full p-2 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <input
                        type="password"
                        className="w-full p-2 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                    <input
                        type="password"
                        className="w-full p-2 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Delivery Locations</label>
                    <div className="grid grid-cols-2 gap-2 bg-gray-50 p-3 rounded border border-gray-200">
                        {availableLocations.map((city) => (
                            <label key={city} className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer select-none">
                                <input
                                    type="checkbox"
                                    checked={selectedLocations.includes(city)}
                                    onChange={() => locationChangeHandler(city)}
                                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                {city}
                            </label>
                        ))}
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gray-900 text-white p-2 rounded font-medium hover:bg-gray-800 transition-colors disabled:bg-gray-400"
                >
                    {loading ? 'Creating Account...' : 'Register'}
                </button>
            </form>

            <div className="mt-4 text-center text-sm text-gray-600">
                Already have an account? <Link to="/login" className="text-indigo-600 hover:underline">Sign In</Link>
            </div>
        </div>
    );
};

export default Register;