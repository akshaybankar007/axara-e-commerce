import { Link } from 'react-router-dom';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
    return (
        <nav className="flex justify-center mb-8">
            <ul className="flex space-x-2 sm:space-x-4 text-sm font-medium">
                <li>
                    {step1 ? (
                        <Link to="/login" className="text-indigo-600 hover:underline">Sign In</Link>
                    ) : (
                        <span className="text-gray-400 cursor-not-allowed">Sign In</span>
                    )}
                </li>
                <li className="text-gray-300">/</li>
                <li>
                    {step2 ? (
                        <Link to="/shipping" className="text-indigo-600 hover:underline">Shipping</Link>
                    ) : (
                        <span className="text-gray-400 cursor-not-allowed">Shipping</span>
                    )}
                </li>
                <li className="text-gray-300">/</li>
                <li>
                    {step3 ? (
                        <Link to="/payment" className="text-indigo-600 hover:underline">Payment</Link>
                    ) : (
                        <span className="text-gray-400 cursor-not-allowed">Payment</span>
                    )}
                </li>
                <li className="text-gray-300">/</li>
                <li>
                    {step4 ? (
                        <Link to="/placeorder" className="text-indigo-600 hover:underline">Place Order</Link>
                    ) : (
                        <span className="text-gray-400 cursor-not-allowed">Place Order</span>
                    )}
                </li>
            </ul>
        </nav>
    );
};

export default CheckoutSteps;