import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import { getCurrentAdmin } from "../../services/adminAuth";
import {
  clearAdminSession,
  getAdminToken,
  saveAdminSession,
} from "../../utils/adminSession";

const AdminProtectedRoute = ({ children }) => {
  const token = getAdminToken();
  const [status, setStatus] = useState(() =>
    token ? "checking" : "unauthenticated",
  );

  // Verify the token with the backend before rendering protected admin content.
  useEffect(() => {
    let active = true;

    if (!token) {
      return undefined;
    }

    getCurrentAdmin(token)
      .then(({ admin }) => {
        if (active) {
          saveAdminSession({ token, admin });
          setStatus("authenticated");
        }
      })
      .catch(() => {
        if (active) {
          clearAdminSession();
          setStatus("unauthenticated");
        }
      });

    return () => {
      active = false;
    };
  }, [token]);

  if (status === "checking") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f3f7fa]">
        <div
          className="h-9 w-9 animate-spin rounded-full border-2 border-[#063d6b]/20 border-t-[#063d6b]"
          role="status"
          aria-label="Checking admin session"
        />
      </main>
    );
  }

  if (status === "unauthenticated") {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default AdminProtectedRoute;
