import { BrowserRouter, Route, Switch } from "react-router-dom";
import Banner from "./components/Banner/Banner";
import Header from "./components/Header/Header";
import Product from "./components/Product/Product";
import ShoppingCart from './pages/ShoppingCart/ShoppingCart'
import Checkout from "./pages/Checkout/Checkout"
import Thankyou from "./pages/Thankyou/Thankyou"
import commerce from './lib/commerce'
import { useEffect, useState } from "react";
function App() {
  const [productsList, setProductsList] = useState(null)
  const [productsListByCategory, setProductsListByCategory] = useState(null)
  const [cart, setCart] = useState(null)
  const [categoryList, setCategoryList] = useState(null)
  const [orderDetails, setOrderDetails] = useState({})
  const fetchProducts = async () => {
    const response = await commerce.products.list()
    setProductsList(response?.data)
  }
  const fetchProductsByCategory = async (category) => {
    const response = await commerce.products.list({
      category_slug: [category]
    })
    setProductsListByCategory(response?.data)
  }
  const addToCart = async (prodID, quantity) => {
    const response = await commerce.cart.add(prodID, quantity)
    setCart(response?.cart)
  }
  const removeFromCart = async (prodID) => {
    const response = await commerce.cart.remove(prodID)
    setCart(response?.cart)
  }
  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve())
  }
  const fetchCategories = async () => {
    const response = await commerce.categories.list();
    setCategoryList(response?.data)
  }
  const setOrder = (order) => {
    setOrderDetails(order)
  }
  useEffect(() => {
    fetchProducts()
    fetchCart()
    fetchCategories()
  }, [])
  return (
    <BrowserRouter>
      <div className="App">
        <Header cart={cart} categoryList={categoryList} />
        <Switch>
          <Route path="/" exact>
            <Banner />
            <Product productsList={productsList} addToCart={addToCart} />
          </Route>
          <Route path="/cart">
            <ShoppingCart cart={cart} removeFromCart={removeFromCart} />
          </Route>
          <Route path="/category/:slug">
            <div style={{ marginTop: "200px" }}>
              <Product
                fetchProductsByCategory={fetchProductsByCategory}
                productsList={productsListByCategory} addToCart={addToCart} />
            </div>
          </Route>
          <Route path="/checkout">
            <Checkout cart={cart} setOrder={setOrder} />
          </Route>
          <Route path="/thankyou">
            <Thankyou orderDetails={orderDetails} />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
