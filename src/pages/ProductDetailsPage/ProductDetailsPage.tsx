import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
// import { Product } from '../../types/ProductType';

const fetchProductById = async (id: string) => {
    const url = `https://jsonplaceholder.typicode.com/albums/${id}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Response error: ${response.status}`);
    const product = await response.json();
    return product;
};

const ProductDetailsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['product', id],
        queryFn: () => fetchProductById(id!),
        enabled: !!id,
    });

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {(error as Error).message}</div>;
    if (!data) return <div>No product found.</div>;

    return (
        <div className="product-details">
            <h2>Product ID: {data.id}</h2>
            <p>User ID: {data.userId}</p>
            <p>Title: {data.title}</p>
        </div>
    );
};
export default ProductDetailsPage;
