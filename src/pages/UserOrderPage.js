import ProductDetail from "../features/product-list/components/ProductDetails";
import Navbar from "../features/navbar/navbar";
import UserOrders from "../features/user/components/UserOrders";
function UserOrderPage() {
    return ( 
        <div>
        <Navbar>
            <h1 className="mx-auto text-lg">My Orders</h1>
            <UserOrders></UserOrders>
        </Navbar>
    </div>
     );
}

export default UserOrderPage;