import { createContext, useContext, useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import { destroyCookie, parseCookies, setCookie } from 'nookies';
import { useEffect } from 'react';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { api } from '../../services/apiClient';

interface Credentials {
  email: string;
  password: string;
}

interface User {
  email: string;
  id: string;
}

interface AuthContextData {
  signIn(credentials: Credentials): Promise<Record<'err', string>>;
  signOut(): void;
  user: User;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthContextProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User>({} as User);
  const isAuthenticated = !!user.email;

  const router = useRouter();

  const signOut = useCallback(() => {
    destroyCookie(undefined, 'uber-eats-clone.token', { path: '/' });
    setUser({} as User);

    router.push('/');
  }, [router]);

  async function signIn({
    email,
    password,
  }: Credentials): Promise<Record<'err', string>> {
    try {
      const response = await api.post('/users/authenticate', {
        email,
        password,
      });

      const { token } = response.data;

      const { sub } = jwtDecode(token) as JwtPayload;

      setCookie(undefined, 'uber-eats-clone.token', token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/',
      });

      setUser({ email, id: String(sub) });

      api.defaults.headers.Authorization = `Bearer ${token}`;

      router.push('/');
    } catch (err) {
      const error = err as Error;
      return { err: error.message };
    }
    return { err: '' };
  }

  useEffect(() => {
    const { 'uber-eats-clone.token': token } = parseCookies();

    if (token) {
      api
        .get('/users/me')
        .then(response => {
          setUser({ email: response.data.email, id: response.data.id });
        })
        .catch(() => {
          signOut();
        });
    }
  }, [signOut]);

  return (
    <AuthContext.Provider value={{ signIn, isAuthenticated, user, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
