import { useHistory } from 'react-router'
import './ShoppingCart.css'
const ShoppingCart = ({ cart, removeFromCart }) => {
    const history = useHistory()
    return (
        <div className="checkout">
            <div className="checkoutLeft">
                <img className="checkout__ad" src="https://dkemhji6i1k0x.cloudfront.net/000_clients/489816/page/489816xK5jQkmW.jpg" alt="" />
                <div>
                    <h3>Hello Aneeq</h3>
                    <h2 className="checkoutTitle">Your Shopping Basket</h2>
                    {cart?.line_items.map(({ id, image: { url }, product_name, quantity, price: { formatted_with_symbol, raw } }) => (
                        <div key={id} className="checkoutProduct">
                            <img src={url} className="checkoutProduct__img" alt={product_name} />
                            <div className="checkoutProduct__info">
                                <p className="checkoutProduct__title">{product_name}</p>
                                <p className="checkoutProduct__price">
                                    <strong>{formatted_with_symbol} * {quantity} = {cart?.currency.symbol}{raw * quantity}</strong>
                                </p>
                                <button onClick={() => removeFromCart(id)}>Remove from Basket</button>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
            <div className="checkoutRight">
                <div className="subtotal">
                    <p>SubTotal ({cart?.total_items}): <strong>{cart?.subtotal?.formatted_with_symbol}</strong> </p>
                    <small className="subtotal__gift">
                        <input type="checkbox" /> This order contains a gift
                    </small>
                </div>
                <button onClick={() => history.push("/checkout")}>Proceed to Checkout</button>
            </div>
        </div>
    )
}

export default ShoppingCart
