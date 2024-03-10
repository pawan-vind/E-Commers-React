import ProductDetail from "../features/product-list/components/ProductDetails";
import Navbar from "../features/navbar/navbar";
import Footer from "../features/common/Footer";
function ProductDetailPage() {
    return ( 
        <div>
        <Navbar>
            <ProductDetail></ProductDetail>
        </Navbar>
        <Footer></Footer>
    </div>
     );
}

export default ProductDetailPage;