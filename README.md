icons here
https://linearicons.com/free

# react-isomorphic-boilerplate
isomorphic React MVC framework

This is a simple React isomorphic framework to make simple websites with React technologies.

## How to install and start

```
//Install modules
yarn 

//run dev

yarn dev

//or

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
http://localhost:4002

4002 is default port, you might change in in config file

## Creating to simple page

When you do a request to for instance : http://yourSite.com/pages/simple/param1/param2
it means that you have to have a public method is named as *simple* in your *PagesController*.
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
import * as React from "react";
import {AppController} from "./app-controller";
import {SimplePageComponent} from "../components/pages/simple-component";

export class PagesController extends AppController {
	constructor(data) {
		super(data);
	}

	public simple(test) {
		this.component = SimplePageComponent;

		this.set({
			params: test
		});


		this.setMetaData({
			title: "some SEO title",
			description: "some SEO description",
			keywords: "some SEO keywords"
		});
	}
}

```
By the way firstParam and secondParam went from the url 
```
"/pages/simple/1/a/param"
``` 

#### Async methods:

```typescript
import * as React from "react";
import {AppController} from "./app-controller";
import {PagesComponent} from "../components/pages/pages-component";

export class PagesController extends AppController {
	constructor(data) {
		super(data);
	}

	public async index(slug) {
		UtilsService.scrollToTop();
		this.showMainLoading();

		if (slug) {
			this.component = PagesComponent;

			try {
				const page = await AppApi.pages.getPageDataBySlug(slug);

				this.set({
					page: page
				});

				this.setMetaData({
					title: page.seo_title,
					description: page.seo_description,
					keywords: page.seo_keywords
				});
			} catch (e) {
				this.pageNotFound();
			}
		} else {
			this.pageNotFound();
		}

		this.hideMainLoading();
	}
}
```
Then you have to make a View part for the method 

just make a simple react component

```typescript
import * as React from 'react';
import {PagesStore} from "../../stores/pages";

export interface Props {
	page: PagesStore.Page
}

export interface State {

}

export class PagesComponent extends React.Component<Props, State> {
	public render() {
		return (
			<div className="container pages-container">
				<h1>{this.props.page.name}</h1>
				<div className="page-content" dangerouslySetInnerHTML={{__html: this.props.page.content}}></div>
			</div>
		);
	}
}
```