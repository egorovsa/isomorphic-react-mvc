# react-isomorphic-boilerplate
React-SVC-(like MVC)-isomorphic-boilerplate

This is a simple React isomorphic framework to make a simple websites with React technologies.

## How to install and start

```
yarn 
yarn dev

//or

npm i
npm run dev
```
and then just open your favorite browser 
http://localhost:3000

## How to build

```
yarn build

//or 

npm run build
```

and run server.js as

```
node dist/server/server.js

//or if you have pm2

pm2 start pm2.json
```

and then just open your favorite browser 
http://localhost:4001

4001 is default port, you might change in in config file 

## Creating to simple page

When you do a request to for instance : http://yourSite.com/pages/simple/param1/param2
it means that you have to have a public method is named as *simple* in a the *PagesController*.
At the time your url params will be available like the arguments of the method.

```typescript
public simple(param1, param2) {
	// method's code here...
}
```

Open PagesController
```
/ts/app/controllers/page-controller.tsx 
```
and create a new method

#### Sync methods:

```typescript
public simple(firstParam, secondParam) {
	let params = {
		params: firstParam,
		a: secondParam,
	};

	return this.render(() => <SimplePageComponent {...params}/>, {
		title: 'This is a simple page',
		keywords: 'This is a simple page keywords',
		description: 'This is a simple page description'
	});
}
```
By the way firstParam and secondParam went from the url 
```
"/pages/simple/1/a/param"
``` 

Or if you don't want to pass sync params to the view component just use
```typescript
public simple() {
	return this.render(SimplePageComponent, {
		title: 'This is a simple page',
		keywords: 'This is a simple page keywords',
		description: 'This is a simple page description'
	});
}
```
#### Async methods:

```typescript
public index(slug) {
	// slug is taken from url /pages/index/slug
	
	this.showMainLoading();

	let curApi = slug ? AppApi.pages.getPageDataBySlug(slug) : AppApi.pages.getPageDataById(1);
	
	
	// create a primise	
	let dataPromise = curApi.then((page) => {

		PagesStore.store.setState({
			currentPage: page
		} as PagesStore.State);

		//set meta data after promise success
		this.setMetaData({
			title: page.seo_title,
			description: page.seo_description,
			keywords: page.seo_keywords
		});

		this.hideMainLoading();
		
		//REQUIRED: return promise data
		return page;
	});

	// set render (renderComponent, yourAsyncDataPromise)
	return this.render(PagesComponent, dataPromise);
}
```
Then you have to make a View part for the method 

just make a simple react component
