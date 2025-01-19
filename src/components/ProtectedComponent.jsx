import { Navigate } from "react-router-dom";


export default function ProtectedComponent({ isAuth, children }) {
    return isAuth ? children : <Navigate to="/login" replace />;
}
