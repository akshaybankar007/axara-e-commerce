import { Link } from 'react-router-dom';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
   return (
        <nav className="flex justify-center mb-8">
            <ul className="flex space-x-2 sm:space-x-4 text-sm font-medium">
                <li>{step1 ? <Link to="/login" className="text-indigo-400 hover:text-indigo-300 hover:underline transition-colors">Sign In</Link> : <span className="text-zinc-600 cursor-not-allowed">Sign In</span>}</li>
                <li className="text-zinc-700">/</li>
                <li>{step2 ? <Link to="/shipping" className="text-indigo-400 hover:text-indigo-300 hover:underline transition-colors">Shipping</Link> : <span className="text-zinc-600 cursor-not-allowed">Shipping</span>}</li>
                <li className="text-zinc-700">/</li>
                <li>{step3 ? <Link to="/payment" className="text-indigo-400 hover:text-indigo-300 hover:underline transition-colors">Payment</Link> : <span className="text-zinc-600 cursor-not-allowed">Payment</span>}</li>
                <li className="text-zinc-700">/</li>
                <li>{step4 ? <Link to="/placeorder" className="text-indigo-400 hover:text-indigo-300 hover:underline transition-colors">Place Order</Link> : <span className="text-zinc-600 cursor-not-allowed">Place Order</span>}</li>
            </ul>
        </nav>
    );
};

export default CheckoutSteps;