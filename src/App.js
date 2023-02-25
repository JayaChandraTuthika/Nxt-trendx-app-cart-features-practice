import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  onIncreaseQuantity = id => {
    const {cartList} = this.state
    const newCartList = cartList.map(each => {
      if (each.id === id) {
        return {
          ...each,
          quantity: each.quantity + 1,
        }
      }
      return each
    })
    this.setState({cartList: newCartList})
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const newList = cartList.filter(each => each.id !== id)
    this.setState({cartList: newList})
  }

  onDecrementQuantity = id => {
    const {cartList} = this.state
    const cartItem = cartList.find(each => each.id === id)
    if (cartItem.quantity > 1) {
      const newCartList = cartList.map(each => {
        if (each.id === id) {
          return {
            ...each,
            quantity: each.quantity - 1,
          }
        }
        return each
      })
      this.setState({cartList: newCartList})
    } else {
      this.removeCartItem(id)
    }
  }

  addCartItem = product => {
    const {cartList} = this.state
    const findCartItem = cartList.find(each => each.id === product.id)
    if (findCartItem === undefined) {
      this.setState(prevState => ({
        cartList: [...prevState.cartList, product],
      }))
    } else {
      const newCartList = cartList.map(each => {
        if (each.id === product.id) {
          return {
            ...each,
            quantity: each.quantity + product.quantity,
          }
        }
        return each
      })
      this.setState({cartList: newCartList})
    }
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.onIncreaseQuantity,
          decrementCartItemQuantity: this.onDecrementQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
