import type { Product } from '../../types/ProductType';
import './ProductsTable.scss';
import React, { useState, useMemo, useEffect } from 'react';
import Pagination from '../Pagination/Pagination';
import Searchbar from '../Searchbar/Searchbar';
// import AutoSearchbar from '../Searchbar/AutoSearchbar';

type ProductsTableProps = {
    colOrder?: (keyof Product)[];
};

const ServerFetchProductsTable: React.FC<ProductsTableProps> = ({
    colOrder,
}) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalProducts, setTotalProducts] = useState<number>(0);
    const productsPerPage: number = 8;
    const [sortConfig, setSortConfig] = useState<{
        key: keyof Product | null;
        direction: 'ascending' | 'descending';
    }>({ key: null, direction: 'ascending' });
    const [searchArgs, setSearchArgs] = useState<{
        userId?: number;
        id?: number;
        title?: string;
    }>({});

    useEffect(() => {
        const callProducts = async () => {
            try {
                setLoading(true);
                let url = `https://jsonplaceholder.typicode.com/albums?_page=${currentPage}&_limit=${productsPerPage}`;
                if (
                    searchArgs.userId !== undefined &&
                    !isNaN(searchArgs.userId)
                ) {
                    url += `&userId=${searchArgs.userId}`;
                }
                if (searchArgs.id !== undefined && !isNaN(searchArgs.id)) {
                    url += `&id=${searchArgs.id}`;
                }
                if (searchArgs.title && searchArgs.title.trim() !== '') {
                    url += `&title_like=${encodeURIComponent(
                        searchArgs.title.trim(),
                    )}`;
                }
                const response = await fetch(url);
                if (!response.ok)
                    throw new Error(`Response error: ${response}`);
                const products: Product[] = await response.json(); // don't forget the await keyword
                const totalProducts: number = Number(
                    response.headers.get('X-Total-Count'),
                );
                setProducts(products);
                setTotalProducts(totalProducts);
                console.log(products);
            } catch (error) {
                console.log('error is:', error);
                setError('Failed to fetch products.');
            } finally {
                setLoading(false);
            }
        };
        callProducts();
    }, [currentPage, searchArgs]);

    const sortedData: Product[] = useMemo(() => {
        if (!sortConfig.key) return products;
        const sorted = [...products].sort((a, b) => {
            const aVal = a[sortConfig.key!];
            const bVal = b[sortConfig.key!];
            if (typeof aVal === 'number' && typeof bVal === 'number') {
                return aVal - bVal;
            } else {
                return String(aVal).localeCompare(String(bVal));
            }
        });
        return sortConfig.direction === 'ascending' ? sorted : sorted.reverse();
    }, [products, sortConfig]);

    const headers: (keyof Product)[] =
        colOrder ??
        (products.length > 0
            ? (Object.keys(products[0]) as (keyof Product)[])
            : []); // only returns a string of valid keys defiend in type Product

    const handleSort = (key: keyof Product) => {
        setSortConfig((prev) => {
            if (prev.key === key) {
                return {
                    key,
                    direction:
                        prev.direction === 'ascending'
                            ? 'descending'
                            : 'ascending',
                };
            }
            return { key, direction: 'ascending' };
        });
    };

    if (loading) return <p>Loading products...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="container">
            {/* using search button to apply filter */}
            <Searchbar onSearch={setSearchArgs} />
            {/* using useEffect for automatic search */}
            {/* <AutoSearchbar onSearch={setSearchArgs} /> */}
            {products.length === 0 ? (
                <p>No Data Available.</p>
            ) : (
                <table className="products-table">
                    <thead>
                        <tr>
                            {headers.map((header) => (
                                <th
                                    key={String(header)}
                                    className={`col-${header}`}
                                >
                                    <span>{String(header)}</span>
                                    <button onClick={() => handleSort(header)}>
                                        {sortConfig.key === header
                                            ? sortConfig.direction ===
                                              'ascending'
                                                ? '▲'
                                                : '▼'
                                            : '⇅'}
                                    </button>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {sortedData.map((row, index) => (
                            <tr key={row.id || index}>
                                {headers.map((header) => (
                                    <td
                                        key={String(header)}
                                        className={`cell-${header}`}
                                    >
                                        {typeof row[header] === 'object'
                                            ? JSON.stringify(row[header])
                                            : String(row[header])}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <Pagination
                productsPerPage={productsPerPage}
                totalProducts={totalProducts}
                currentPage={currentPage}
                paginate={setCurrentPage}
            />
        </div>
    );
};

export default ServerFetchProductsTable;
