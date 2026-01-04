import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  id: string;
  adminId?: string;
  username?: string;
  role: string;
  exp?: number;
}

class TokenService {
  static setToken(token: string): void {
    localStorage.setItem("token", token);
  }

  static getToken(): string | null {
    return localStorage.getItem("token");
  }

  static decodeToken(): DecodedToken | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      return jwtDecode<DecodedToken>(token);
    } catch (error) {
      console.error("Invalid token", error);
      return null;
    }
  }

  static getRole(): string | null {
    return this.decodeToken()?.role ?? null;
  }

  static getAdminId(): string | null {
    return this.decodeToken()?.adminId ?? null;
  }

  static getUserId(): string | null {
    return this.decodeToken()?.id ?? null;
  }

  static getUserName(): string | null {
    return this.decodeToken()?.username ?? null;
  }

  static isTokenExpired(): boolean {
    const decoded = this.decodeToken();
    if (!decoded?.exp) return true;

    return decoded.exp * 1000 < Date.now();
  }

  static removeToken(): void {
    localStorage.removeItem("token");
  }
}

export default TokenService;
