import { useEffect } from 'react'
import { useParams } from 'react-router'
import './Product.css'
const Product = ({ productsList, addToCart, fetchProductsByCategory }) => {
    const { slug } = useParams()
    useEffect(() => {
        if (slug) {
            fetchProductsByCategory(slug)
        }
    }, [slug])
    return (
        <div className="products_wrap">
            {
                productsList?.map(({ id, image: { url }, name, price: { formatted_with_symbol } }) => (
                    <div key={id} className="product">
                        <img src={url} alt={name} />
                        <h3>{name}</h3>
                        <p>{formatted_with_symbol}</p>
                        <button onClick={() => addToCart(id, 1)}>Add to Cart</button>
                    </div>
                ))
            }

        </div>
    )
}

export default Product
