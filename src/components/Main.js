import React from 'react'

import Cart from './Cart'
import ShopDisplay from './ShopDisplay'

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { Provider } from 'react-redux'
import store from '../store'

export default function Main() {
    return <Provider store={store}>
        <Router>
            <Route path='/' exact component={Cart}></Route>
            <Route path='/cart' exact component={Cart}></Route>
            <Route path='/shop' exact component={ShopDisplay}></Route>
        </Router>
    </Provider>
}