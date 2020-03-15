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
    path: '/user/quiz/settings',
    icon: 'mdi-help',
    title: 'Practice',
  },
	{
    path: '/user/flash-cards/settings',
    icon: 'mdi-help',
    title: 'Flash Cards',
  },
	{
    divider: true
  },
	{
    path: '/user/profile',
    icon: 'mdi-account',
    title: 'Profile',
  }
]

export const regularAdminRoutes = []