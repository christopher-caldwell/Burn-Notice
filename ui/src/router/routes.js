export const visitorRoutes = [
	{
    path: '/',
    icon: 'mdi-home',
    title: 'Home',
  },
	{
    path: '/login',
    icon: 'mdi-account',
    title: 'Login',
  },
	{
    path: '/register',
    icon: 'mdi-account-plus',
    title: 'Sign Up',
  },
]

export const authenticatedRoutes = [
	{
    path: '/user/home',
    icon: 'mdi-home',
    title: 'Home',
  },
	{
    path: '/user/vacancy-search',
    icon: 'mdi-transfer',
    title: 'Vacancies',
  },
	{
    path: '/user/report',
    icon: 'mdi-clipboard-text',
    title: 'Reports',
  },
	{
    path: '/user/assignment-history',
    icon: 'mdi-ambulance',
    title: 'Assignment History',
  },
	{
    divider: true
  },
	{
    path: '/user/profile',
    icon: 'mdi-account',
    title: 'Profile',
  },
	{
    path: '/logout',
    icon: 'mdi-logout',
    title: 'Log Out',
  }
]