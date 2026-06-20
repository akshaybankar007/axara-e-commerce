import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../store/cartSlice';
import CheckoutSteps from '../components/CheckoutSteps';

const Payment = () => {
    const navigate = useNavigate();
    const cart = useSelector((state) => state.cart);
    const { shippingAddress, paymentMethod } = cart;

    useEffect(() => {
        if (!shippingAddress.address) {
            navigate('/shipping');
        }
    }, [shippingAddress, navigate]);

    const [paymentMethodName, setPaymentMethodName] = useState(paymentMethod || 'UPI');
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethodName));
        navigate('/placeorder');
    };

    return (
        <div className="max-w-md mx-auto mt-6 bg-zinc-900 p-8 border border-zinc-800 rounded-lg shadow-xl">
            <CheckoutSteps step1 step2 step3 />
            <h2 className="text-2xl font-bold text-zinc-100 mb-6 text-center">Payment Method</h2>

            <form onSubmit={submitHandler}>
                <div className="space-y-4 mb-8">
                    {['UPI', 'Credit/Debit Card', 'Cash On Delivery'].map((method) => (
                        <label key={method} className="flex items-center gap-3 p-4 bg-zinc-950 border border-zinc-800 rounded cursor-pointer hover:border-zinc-700 hover:bg-zinc-900/50 transition-colors">
                            <input type="radio" className="text-indigo-500 focus:ring-indigo-500/50 focus:ring-offset-zinc-950 bg-zinc-900 border-zinc-700" name="paymentMethod" value={method} checked={paymentMethodName === method} onChange={(e) => setPaymentMethodName(e.target.value)} />
                            <span className="font-medium text-zinc-200">{method === 'UPI' ? 'UPI (GPay, PhonePe, Paytm)' : method}</span>
                        </label>
                    ))}
                </div>
                <button type="submit" className="w-full bg-white text-black font-bold p-2 rounded hover:bg-zinc-200 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                    Continue
                </button>
            </form>
        </div>
    );
};

export default Payment;