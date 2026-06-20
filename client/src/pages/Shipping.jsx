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
        <div className="max-w-md mx-auto mt-6 bg-zinc-900 p-8 border border-zinc-800 rounded-lg shadow-xl">
            <CheckoutSteps step1 step2 />
            <h2 className="text-2xl font-bold text-zinc-100 mb-6 text-center">Shipping Address</h2>

            <form onSubmit={submitHandler} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-1">Street Address</label>
                    <input type="text" className="w-full p-2 bg-zinc-950 border border-zinc-700 text-zinc-100 rounded focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition-colors" value={address} onChange={(e) => setAddress(e.target.value)} required />
                </div>
                <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-1">City</label>
                    <select className="w-full p-2 bg-zinc-950 border border-zinc-700 text-zinc-100 rounded focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition-colors" value={city} onChange={(e) => setCity(e.target.value)} required>
                        <option value="Nagpur">Nagpur</option>
                        <option value="Gondiya">Gondiya</option>
                        <option value="Pune">Pune</option>
                        <option value="Mumbai">Mumbai</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-1">Postal Code</label>
                    <input type="text" className="w-full p-2 bg-zinc-950 border border-zinc-700 text-zinc-100 rounded focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition-colors" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required pattern="[0-9]{6}" title="Six digit postal code" />
                </div>
                <button type="submit" className="w-full bg-white text-black font-bold p-2 rounded hover:bg-zinc-200 transition-colors mt-6 shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                    Continue to Payment
                </button>
            </form>
        </div>
    );
};

export default Shipping;