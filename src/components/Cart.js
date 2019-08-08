import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Link } from "react-router-dom";

import { removeFromCart, fetchCartData } from '../actions/cart'
import PropTypes from 'prop-types'

//Material-UI
import CircularProgress from '@material-ui/core/CircularProgress'
import Container from '@material-ui/core/Container'

class Cart extends Component {

    componentDidMount() {
        this.props.fetchCartData('http://localhost:3001/api/product/', this.props.cartIds)
    }

    deleteButtonClick = id => {
        this.props.removeFromCart(id)
    }

    render() {
        if (this.props.isLoading) {
            return <Container><CircularProgress /></Container>
        }
        if (this.props.hasErrored) {
            return <p>Sorry, there was a problem loading categories...</p>
        }

        const cartDetails = this.props.cartDetails
        return <div>
            {cartDetails.map(product =>
                <div style={{ backgroundColor: '#ffe6ff' }}>
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <p>{product._id}</p>
                    {product.category !== undefined ? <Link to={{ pathname: "/shop", search: `?category=${product.category._id}` }}>{product.category.name}</Link> : ''}
                    <button
                        type="button"
                        onClick={() => this.deleteButtonClick(product._id)}>
                        Remove from Cart
                    </button>
                </div>
            )}
        </div>
    }
}

const mapStateToProps = state => ({
    cartIds: state.cart.cartIds,
    cartDetails: state.cart.cartDetails,
    isLoading: state.cart.cartLoading,
    hasErrored: state.cart.cartErrored,
})

const mapDispatchToProps = dispatch => ({
    fetchCartData: (url, idArray) => dispatch(fetchCartData(url, idArray)),
    removeFromCart: id => dispatch(removeFromCart(id)),
})

Cart.propTypes = {
    cartIds: PropTypes.array.isRequired,
    cartDetails: PropTypes.array.isRequired,
    cartLoading: PropTypes.bool.isRequired,
    cartErrored: PropTypes.bool.isRequired,
    removeFromCart: PropTypes.func.isRequired,
    fetchCartData: PropTypes.func.isRequired,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Cart))