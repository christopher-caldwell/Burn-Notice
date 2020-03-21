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
		divider: true
	},
	{
    path: '/user/table/account?header=account',
    icon: 'mdi-help',
    title: 'Account',
  },
	{
		path: '/user/table/report?header=report',
    icon: 'mdi-help',
    title: 'Reports',
  },
	{
		path: '/user/table/transfer-request?header=transfer-request',
    icon: 'mdi-help',
    title: 'Transfer Requests',
  },
	{
		path: '/user/table/vacancy?header=vacancy',
		icon: 'mdi-help',
		title: 'Vacancies',
	},
]

export const regularAdminRoutes = []