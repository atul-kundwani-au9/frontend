import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './Header';
import HomePage from './HomePage';
import ViewUser from './User/ViewUser';
import PageNotFound from './PageNotFound';
const Routing = () => {
	return (
		<BrowserRouter>
			<Header />
			<Switch>
				<Route exact path="/" component={HomePage} />
				<Route exact path="/viewUser/:id" component={ViewUser} />
				<Route component={PageNotFound} />
			</Switch>
		</BrowserRouter>
	);
};

export default Routing;
