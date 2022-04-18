export enum MenuItemUrl {
  Dashboard = 'dashboard',
  Users = 'users',
  Transports = 'transports',
  Routes = 'routes',
  Trips = 'trips',
  Places = 'places',
}

export interface MenuItem {
  icon: string;
  name: string;
  link: MenuItemUrl;
}

export const menu: MenuItem[] = [
  {
    icon: 'bar_chart',
    name: 'Dashboard',
    link: MenuItemUrl.Dashboard
  },
  {
    icon: 'group',
    name: 'Users',
    link: MenuItemUrl.Users
  },
  {
    icon: 'commute',
    name: 'Transports',
    link: MenuItemUrl.Transports
  },
  {
    icon: 'fork_right',
    name: 'Routes',
    link: MenuItemUrl.Routes
  },
  {
    icon: 'map',
    name: 'Trips',
    link: MenuItemUrl.Trips
  },
  {
    icon: 'map',
    name: 'Places',
    link: MenuItemUrl.Places
  }
]
