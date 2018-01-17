interface Routes {
	path: string,
	controller: string,
	action: string
}

const routes: Routes[] = [
	{
		path: '/',
		controller: 'pages',
		action: 'main'
	},
];

export let CUSTOM_ROUTES = routes;
