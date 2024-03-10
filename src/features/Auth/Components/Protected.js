import { useSelector } from "react-redux";
import { selectLoggedInUser, selectloggedInUser } from "../AuthSlice";
import { Navigate } from "react-router-dom";
import { selectUserInfo } from "../../user/userSlice";

function Protected({children}) {
    const user = useSelector(selectloggedInUser)
    if(!user){
        return <Navigate to='/login' replace={true}></Navigate>
    }
    return children;
}

export default Protected;