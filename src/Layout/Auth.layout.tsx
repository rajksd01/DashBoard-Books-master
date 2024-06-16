import { useAppSelector } from "@/store/hooks";
import { Navigate, Outlet } from "react-router-dom";
function Auth() {
  const token = useAppSelector((store) => store.user.token);
  if (token !== "") {
    return <Navigate to={"/dashboard/home"} replace />;
  }
  return (
    <>
      <Outlet />
    </>
  );
}

export default Auth;
