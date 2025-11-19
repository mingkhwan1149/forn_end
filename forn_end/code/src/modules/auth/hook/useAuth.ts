import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../../router/router";

export const useAuth = () => {
  const navigate = useNavigate()

  const getAuthToken = (): string => {
    const h = localStorage.getItem("access_token") || ""
    return h
  }

  const handleLogin = () => {
    localStorage.setItem("access_token", "test")
    navigate(AppRoutes.default)
  }
  const handleLogOut = () => {
    localStorage.removeItem("access_token")
    navigate(AppRoutes.login)
  }


  return { getAuthToken, handleLogin, handleLogOut };
};