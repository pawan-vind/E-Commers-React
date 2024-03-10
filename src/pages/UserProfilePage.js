import ProductDetail from "../features/product-list/components/ProductDetails";
import Navbar from "../features/navbar/navbar";
import UserOrders from "../features/user/components/UserOrders";
import UserProfile from "../features/user/components/UserProfile";
function UserProfilePage() {
    return ( 
        <div>
        <Navbar>
            <h1 className="mx-auto text-lg">My Profile</h1>
            <UserProfile></UserProfile>
        </Navbar>
    </div>
     );
}

export default UserProfilePage;