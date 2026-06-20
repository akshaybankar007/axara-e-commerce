// client/src/pages/Home.jsx
import { useEffect, useState } from 'react';
import api from '../api/axios';
import ProductCard from '../components/ProductCard';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await api.get('/products');
                setProducts(data);
                setLoading(false);
            } catch (err) {
                setError(err.response?.data?.message || err.message);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) return <div className="text-center mt-20 text-gray-500">Loading inventory...</div>;
    if (error) return <div className="text-center mt-20 text-red-500">Error: {error}</div>;

    return (
        <div>
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900">Latest Arrivals</h2>
                <p className="text-gray-500 mt-2">Currently serving Nagpur, Gondiya, Pune, and Mumbai.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default Home;