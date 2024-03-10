import Navbar from "../features/navbar/navbar";
import AdminProductDetail from "../features/admin/components/AdminProductDetails";
function AdminProductDetailPage() {
    return ( 
        <div>
        <Navbar>
            <AdminProductDetail></AdminProductDetail>
        </Navbar>
    </div>
     );
}

export default AdminProductDetailPage;