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
                    <div className="bg-zinc-900 p-6 border border-zinc-800 rounded-lg shadow-sm">
                        <h2 className="text-xl font-bold text-zinc-100 mb-4">Shipping</h2>
                        <p className="text-zinc-400"><strong className="text-zinc-200">Address: </strong>{cart.shippingAddress.address}, {cart.shippingAddress.city} {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}</p>
                    </div>

                    <div className="bg-zinc-900 p-6 border border-zinc-800 rounded-lg shadow-sm">
                        <h2 className="text-xl font-bold text-zinc-100 mb-4">Payment Method</h2>
                        <p className="text-zinc-400"><strong className="text-zinc-200">Method: </strong> {cart.paymentMethod}</p>
                    </div>

                    <div className="bg-zinc-900 p-6 border border-zinc-800 rounded-lg shadow-sm">
                        <h2 className="text-xl font-bold text-zinc-100 mb-4">Order Items</h2>
                        {cart.cartItems.length === 0 ? (
                            <div className="text-zinc-500">Your cart is empty</div>
                        ) : (
                            <div className="divide-y divide-zinc-800">
                                {cart.cartItems.map((item, index) => (
                                    <div key={index} className="py-4 flex justify-between items-center">
                                        <div><Link to={`/`} className="font-medium text-indigo-400 hover:text-indigo-300 hover:underline transition-colors">{item.name}</Link></div>
                                        <div className="text-zinc-300 font-medium">{item.qty} x ₹{item.price} = <span className="text-zinc-100">₹{(item.qty * item.price).toFixed(2)}</span></div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="bg-zinc-900 p-6 border border-zinc-800 rounded-lg shadow-sm h-fit">
                    <h2 className="text-xl font-bold text-zinc-100 mb-6">Order Summary</h2>
                    <div className="space-y-4 text-zinc-400">
                        <div className="flex justify-between"><span>Items</span><span className="text-zinc-200">₹{itemsPrice}</span></div>
                        <div className="flex justify-between pb-4 border-b border-zinc-800"><span>Shipping</span><span className="text-zinc-200">₹{shippingPrice}</span></div>
                        <div className="flex justify-between font-bold text-lg text-zinc-100 pt-2"><span>Total</span><span className="text-indigo-400">₹{totalPrice}</span></div>
                    </div>

                    {error && <div className="mt-4 bg-red-900/30 text-red-400 border border-red-900/50 p-3 rounded text-sm">{error}</div>}

                    <button type="button" disabled={cart.cartItems.length === 0 || loading} onClick={placeOrderHandler} className="w-full bg-white text-black py-3 rounded font-bold mt-6 hover:bg-zinc-200 transition-colors disabled:bg-zinc-800 disabled:text-zinc-600 shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                        {loading ? 'Processing...' : 'Place Order'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PlaceOrder;