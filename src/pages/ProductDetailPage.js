import ProductDetail from "../features/product-list/components/ProductDetails";
import Navbar from "../features/navbar/navbar";
function ProductDetailPage() {
    return ( 
        <div>
        <Navbar>
            <ProductDetail></ProductDetail>
        </Navbar>
    </div>
     );
}

export default ProductDetailPage;