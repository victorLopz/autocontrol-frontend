export interface NavigationModule {
  id: string;
  label: string;
  href: string;
  icon?: string;
  children?: NavigationModule[];
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
}

export interface AuthSession {
  user: AuthUser;
  token: string;
  modules: NavigationModule[];
}
