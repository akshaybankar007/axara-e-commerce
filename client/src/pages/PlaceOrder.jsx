import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import CheckoutSteps from '../components/CheckoutSteps';
import { clearCart } from '../store/cartSlice';
import api from '../api/axios';

const PlaceOrder = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!cart.shippingAddress.address) {
            navigate('/shipping');
        } else if (!cart.paymentMethod) {
            navigate('/payment');
        }
    }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

    const addDecimals = (num) => (Math.round(num * 100) / 100).toFixed(2);

    const itemsPrice = addDecimals(cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0));
    const shippingPrice = addDecimals(itemsPrice > 2000 ? 0 : 150); // Free shipping over ₹2000
    const totalPrice = (Number(itemsPrice) + Number(shippingPrice)).toFixed(2);

    const placeOrderHandler = async () => {
        setLoading(true);
        setError('');
        try {
            const { data } = await api.post('/orders', {
                orderItems: cart.cartItems,
                shippingAddress: cart.shippingAddress,
                paymentMethod: cart.paymentMethod,
                itemsPrice: Number(itemsPrice),
                shippingPrice: Number(shippingPrice),
                totalPrice: Number(totalPrice),
            });
            dispatch(clearCart());
            // In a complete app, you would redirect to /order/:id here
            navigate('/');
            alert(`Order ${data._id} placed successfully!`);
        } catch (err) {
            setError(err.response?.data?.message || err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto mt-6">
            <CheckoutSteps step1 step2 step3 step4 />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Shipping</h2>
                        <p className="text-gray-700">
                            <strong>Address: </strong>
                            {cart.shippingAddress.address}, {cart.shippingAddress.city} {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
                        </p>
                    </div>

                    <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Payment Method</h2>
                        <p className="text-gray-700">
                            <strong>Method: </strong> {cart.paymentMethod}
                        </p>
                    </div>

                    <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Order Items</h2>
                        {cart.cartItems.length === 0 ? (
                            <div className="text-gray-500">Your cart is empty</div>
                        ) : (
                            <div className="divide-y divide-gray-100">
                                {cart.cartItems.map((item, index) => (
                                    <div key={index} className="py-4 flex justify-between items-center">
                                        <div>
                                            <Link to={`/`} className="font-medium text-indigo-600 hover:underline">{item.name}</Link>
                                        </div>
                                        <div className="text-gray-700 font-medium">
                                            {item.qty} x ₹{item.price} = ₹{(item.qty * item.price).toFixed(2)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm h-fit">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
                    <div className="space-y-4 text-gray-700">
                        <div className="flex justify-between">
                            <span>Items</span>
                            <span>₹{itemsPrice}</span>
                        </div>
                        <div className="flex justify-between pb-4 border-b border-gray-100">
                            <span>Shipping</span>
                            <span>₹{shippingPrice}</span>
                        </div>
                        <div className="flex justify-between font-bold text-lg text-gray-900 pt-2">
                            <span>Total</span>
                            <span>₹{totalPrice}</span>
                        </div>
                    </div>

                    {error && <div className="mt-4 bg-red-50 text-red-600 p-3 rounded text-sm">{error}</div>}

                    <button
                        type="button"
                        disabled={cart.cartItems.length === 0 || loading}
                        onClick={placeOrderHandler}
                        className="w-full bg-gray-900 text-white py-3 rounded font-semibold mt-6 hover:bg-gray-800 transition-colors disabled:bg-gray-400"
                    >
                        {loading ? 'Processing...' : 'Place Order'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PlaceOrder;