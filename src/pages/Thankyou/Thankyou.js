import { useHistory } from 'react-router'
import './Thankyou.css'
const Thankyou = ({ orderDetails }) => {
    const history = useHistory()
    return (
        <div className={"order__confirm"}>
            <h1>Hello {orderDetails.customer.firstname} {orderDetails.customer.lastname}</h1>
            <h2>Thank you for your order</h2>
            <h3>Your Order Number is : {orderDetails?.id}</h3>
            <h4>Order Total : {orderDetails?.order.subtotal.formatted_with_symbol}</h4>
            <button onClick={() => history.push('/')}>Continue Shopping</button>
        </div>
    )
}

export default Thankyou