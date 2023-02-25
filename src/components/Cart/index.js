import Header from '../Header'
import CartListView from '../CartListView'

import CartContext from '../../context/CartContext'
import EmptyCartView from '../EmptyCartView'

import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems} = value
      const showEmptyView = cartList.length === 0
      const removeAllItems = () => {
        removeAllCartItems()
      }

      const getOrderTotalPrice = () => {
        let total = 0

        cartList.forEach(each => {
          total += each.price * each.quantity
        })

        return total
      }

      return (
        <>
          <Header />
          <div className="cart-container">
            {showEmptyView ? (
              <EmptyCartView />
            ) : (
              <div className="cart-content-container">
                <h1 className="cart-heading">My Cart</h1>
                <button
                  type="button"
                  onClick={removeAllItems}
                  className="remove-all-btn"
                >
                  Remove All
                </button>
                <CartListView />
                <div className="cart-summery-container">
                  <h1 className="checkout-text-1">
                    Order Total:{' '}
                    <span className="checkout-price">
                      Rs {getOrderTotalPrice()}/-
                    </span>
                  </h1>
                  <p className="items-in-cart">
                    {cartList.length} Items in Cart
                  </p>
                  <button type="button" className="checkout-btn">
                    Checkout
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)
export default Cart
