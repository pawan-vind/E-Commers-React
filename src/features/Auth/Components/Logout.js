import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectloggedInUser, signOutAsync } from "../AuthSlice";
import { Navigate } from "react-router-dom";
import { selectUserInfo } from "../../user/userSlice";

function Logout() {
    const dispatch = useDispatch()
    const user  = useSelector(selectloggedInUser)

    useEffect(() => {
      dispatch(signOutAsync(user.id))
    }, [])
    
    return ( 
        <>
        {!user && <Navigate to='/logout' replace={true}></Navigate>}
        </>
     );
}

export default Logout;