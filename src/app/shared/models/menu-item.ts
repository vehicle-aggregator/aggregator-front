export enum MenuItemUrl {
  Dashboard = 'dashboard',
  Users = 'users',
  Transports = 'transports',
  Routes = 'routes',
  Trips = 'trips',
  Companies = 'companies'
}

export interface MenuItem {
  icon: string;
  name: string;
  role: string;
  link: MenuItemUrl;
}

export const menu: MenuItem[] = [
  {
    icon: 'bar_chart',
    name: 'Dashboard',
    role: 'user',
    link: MenuItemUrl.Dashboard
  },
  {
    icon: 'commute',
    name: 'Transports',
    role: 'user',
    link: MenuItemUrl.Transports
  },
  {
    icon: 'fork_right',
    name: 'Routes',
    role: 'user',
    link: MenuItemUrl.Routes
  },
  {
    icon: 'map',
    name: 'Trips',
    role: 'user',
    link: MenuItemUrl.Trips
  },
  {
    icon: 'group',
    name: 'Users',
    role: 'admin',
    link: MenuItemUrl.Users
  },
  {
    icon: 'business',
    name: 'Companies',
    role: 'admin',
    link: MenuItemUrl.Companies
  },
]
