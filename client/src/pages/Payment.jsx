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
        <div className="max-w-md mx-auto mt-6 bg-white p-8 border border-gray-200 rounded-lg shadow-sm">
            <CheckoutSteps step1 step2 step3 />
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Payment Method</h2>

            <form onSubmit={submitHandler}>
                <div className="space-y-4 mb-8">
                    <label className="flex items-center gap-3 p-3 border border-gray-200 rounded cursor-pointer hover:bg-gray-50 transition-colors">
                        <input
                            type="radio"
                            className="text-indigo-600 focus:ring-indigo-500"
                            id="UPI"
                            name="paymentMethod"
                            value="UPI"
                            checked={paymentMethodName === 'UPI'}
                            onChange={(e) => setPaymentMethodName(e.target.value)}
                        />
                        <span className="font-medium text-gray-900">UPI (GPay, PhonePe, Paytm)</span>
                    </label>

                    <label className="flex items-center gap-3 p-3 border border-gray-200 rounded cursor-pointer hover:bg-gray-50 transition-colors">
                        <input
                            type="radio"
                            className="text-indigo-600 focus:ring-indigo-500"
                            id="Card"
                            name="paymentMethod"
                            value="Credit/Debit Card"
                            checked={paymentMethodName === 'Credit/Debit Card'}
                            onChange={(e) => setPaymentMethodName(e.target.value)}
                        />
                        <span className="font-medium text-gray-900">Credit or Debit Card</span>
                    </label>

                    <label className="flex items-center gap-3 p-3 border border-gray-200 rounded cursor-pointer hover:bg-gray-50 transition-colors">
                        <input
                            type="radio"
                            className="text-indigo-600 focus:ring-indigo-500"
                            id="COD"
                            name="paymentMethod"
                            value="Cash On Delivery"
                            checked={paymentMethodName === 'Cash On Delivery'}
                            onChange={(e) => setPaymentMethodName(e.target.value)}
                        />
                        <span className="font-medium text-gray-900">Cash On Delivery</span>
                    </label>
                </div>

                <button
                    type="submit"
                    className="w-full bg-gray-900 text-white p-2 rounded font-medium hover:bg-gray-800 transition-colors"
                >
                    Continue
                </button>
            </form>
        </div>
    );
};

export default Payment;