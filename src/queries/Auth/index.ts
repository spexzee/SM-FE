import { useMutation } from "@tanstack/react-query";
import useApi from "../useApi";

interface LoginPayload {
  username: string;
  password: string;
}

export const useSuperAdminLogin = () => {
  return useMutation({
    mutationFn: (data: LoginPayload) =>
      useApi("POST", "/api/auth/login", data),
  });
};
