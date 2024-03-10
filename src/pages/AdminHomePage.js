import AdminProductList from "../features/admin/components/AdminproductList";
import Navbar from "../features/navbar/navbar";
function AdminHomePage() {
    return ( 
        <div>
            <Navbar>
                <AdminProductList></AdminProductList>
            </Navbar>
        </div>
     );
}

export default AdminHomePage;