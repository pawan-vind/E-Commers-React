import AdminOrders from "../features/admin/components/AdminOrders";
import AdminProductList from "../features/admin/components/AdminproductList";
import Navbar from "../features/navbar/navbar";
function AdminOrdersPage() {
    return ( 
        <div>
            <Navbar>
                <AdminOrders></AdminOrders>
            </Navbar>
        </div>
     );
}

export default AdminOrdersPage;