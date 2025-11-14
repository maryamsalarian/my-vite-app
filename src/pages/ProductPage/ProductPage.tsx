import './ProductPage.scss';
import ServerFetchProductsTable from '../../components/Table/ServerFetchProductsTable';
import ServerUseQueryProductsTable from '../../components/Table/ServerUseQueryProductsTable';

const ProductPage: React.FC = () => {
    return (
        <div className="product-page">
            <h2>Products Page</h2>
            <div className="products">
                <h2>Products Table</h2>
                {/* using server-side pagination and simple fetch */}
                {/* <ServerFetchProductsTable /> */}
                {/* using server-side pagination and react-query */}
                <ServerUseQueryProductsTable />
            </div>
            <div className="note">
                <h3>Note:</h3>
            </div>
            <ul>
                <li>
                    Notice that router is case insensitive; e.g. "/proDucTs"
                    works fine.
                </li>
                <li>
                    Notice that "/product" without the "s" would redirect to
                    "/products".
                </li>
            </ul>
        </div>
    );
};

export default ProductPage;
