import { useParams } from 'react-router-dom';

const ProductDetails = () => {
  const { id } = useParams();

  // We will fetch real data later. For now, just prove the route works.
  return (
    <div className="flex justify-center items-center h-64 border border-zinc-800 rounded-lg bg-zinc-900/50">
      <h1 className="text-xl text-zinc-400 tracking-widest uppercase">
        Product Details <span className="text-white font-bold">{id}</span>
      </h1>
    </div>
  );
};

export default ProductDetails;