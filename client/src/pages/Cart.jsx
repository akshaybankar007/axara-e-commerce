import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { addToCart, removeFromCart } from '../store/cartSlice';

const Cart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { cartItems } = useSelector((state) => state.cart);
    const { userInfo } = useSelector((state) => state.auth);

    const updateCartHandler = (item, qty) => {
        dispatch(addToCart({ ...item, qty: Number(qty) }));
    };

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
    };

    const checkoutHandler = () => {
        if (userInfo) {
            navigate('/shipping');
        } else {
            navigate('/login?redirect=/shipping');
        }
    };

    const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

return (
        <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-zinc-100 mb-8">Shopping Cart</h2>

            {cartItems.length === 0 ? (
                <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-8 text-center shadow-sm">
                    <p className="text-zinc-400 mb-4">Your Axara cart is empty.</p>
                    <Link to="/" className="inline-block bg-indigo-600 text-white px-6 py-2 rounded font-medium hover:bg-indigo-500 shadow-[0_0_15px_rgba(79,70,229,0.2)] transition-all duration-300">
                        Go Shopping
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-4">
                        {cartItems.map((item) => (
                            <div key={item._id} className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm hover:border-zinc-700 transition-colors">
                                <div className="flex-grow">
                                    <h3 className="font-semibold text-zinc-100 text-lg hover:text-indigo-400 transition-colors cursor-pointer">{item.name}</h3>
                                    <p className="text-sm text-zinc-500 mt-0.5">{item.category}</p>
                                    <p className="text-indigo-400 font-bold mt-2">₹{item.price}</p>
                                </div>

                                <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                                    <select value={item.qty} onChange={(e) => updateCartHandler(item, e.target.value)} className="border border-zinc-700 rounded p-1.5 bg-zinc-950 text-zinc-100 text-sm font-medium focus:ring-indigo-500 focus:border-indigo-500 outline-none">
                                        {[...Array(item.stock).keys()].map((x) => (
                                            <option key={x + 1} value={x + 1}>{x + 1}</option>
                                        ))}
                                    </select>

                                    <button type="button" onClick={() => removeFromCartHandler(item._id)} className="text-red-400 hover:text-red-300 font-medium text-sm transition-colors">
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 shadow-sm h-fit">
                        <h3 className="text-xl font-bold text-zinc-100 mb-4">Order Summary</h3>
                        <div className="flex justify-between border-b border-zinc-800 pb-4 mb-4 text-zinc-400">
                            <span>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)} items)</span>
                            <span className="font-semibold text-zinc-100">₹{itemsPrice}</span>
                        </div>
                        <div className="flex justify-between font-bold text-lg text-zinc-100 mb-6">
                            <span>Total Estimated</span>
                            <span className="text-indigo-400">₹{itemsPrice}</span>
                        </div>
                        <button type="button" onClick={checkoutHandler} className="w-full bg-white text-black py-3 rounded font-bold tracking-wide hover:bg-zinc-200 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;