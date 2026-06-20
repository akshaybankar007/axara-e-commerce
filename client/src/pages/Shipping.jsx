import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../store/cartSlice';
import CheckoutSteps from '../components/CheckoutSteps';

const Shipping = () => {
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    const [address, setAddress] = useState(shippingAddress?.address || '');
    const [city, setCity] = useState(shippingAddress?.city || 'Nagpur');
    const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode || '');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({ address, city, postalCode, country: 'India' }));
        navigate('/payment');
    };

    return (
        <div className="max-w-md mx-auto mt-6 bg-white p-8 border border-gray-200 rounded-lg shadow-sm">
            <CheckoutSteps step1 step2 />
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Shipping Address</h2>

            <form onSubmit={submitHandler} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                    <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <select
                        className="w-full p-2 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                    >
                        <option value="Nagpur">Nagpur</option>
                        <option value="Gondiya">Gondiya</option>
                        <option value="Pune">Pune</option>
                        <option value="Mumbai">Mumbai</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                    <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        required
                        pattern="[0-9]{6}"
                        title="Six digit postal code"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-gray-900 text-white p-2 rounded font-medium hover:bg-gray-800 transition-colors mt-6"
                >
                    Continue to Payment
                </button>
            </form>
        </div>
    );
};

export default Shipping;