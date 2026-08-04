import { Navigate } from "react-router-dom";

import { getAdminToken } from "../../utils/adminSession";

// Send the admin entry route to the correct page based on session presence.
const AdminRoute = () => (
  <Navigate
    to={getAdminToken() ? "/admin/dashboard" : "/admin/login"}
    replace
  />
);

export default AdminRoute;
