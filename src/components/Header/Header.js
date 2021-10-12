import { Search, ShoppingCart } from '@mui/icons-material'
import { Link, NavLink } from 'react-router-dom'
import './Header.css'
const Header = ({ cart, categoryList }) => {
    return (
        <>
            <div className="header">
                <NavLink to="/">
                    <img src="https://pngimg.com/uploads/amazon/amazon_PNG11.png" alt="Logo" className="header__logo" />
                </NavLink>
                <div className="header__search">
                    <input type="text" />
                    <Search className="header__searchIcon" />
                </div>
                <div className="header__nav">
                    <div className="header__option">
                        <span className="header__optionOne">Hello Aneeq</span>
                        <span className="header__optionTwo">Sign In</span>
                    </div>
                    <div className="header__option">
                        <span className="header__optionOne">Reutrn</span>
                        <span className="header__optionTwo">& Orders</span>
                    </div>
                    <div className="header__option">
                        <span className="header__optionOne">Your</span>
                        <span className="header__optionTwo">Prime</span>
                    </div>
                    <div className="header__optionBasket">
                        <NavLink to="/cart">
                            <ShoppingCart />
                            <span>{cart?.total_items}</span>
                        </NavLink>
                    </div>
                </div>
            </div>
            <div className="header__bottom">
                <ul>
                    {categoryList?.map(({ id, name }) => (
                        <li key={id}>
                            <Link to={`/category/${name}`} >
                                {name}
                            </Link>
                        </li>
                    ))}
                    <li>
                        <img className="bannerImage" src="https://cdn.iphoneincanada.ca/wp-content/uploads/2019/06/prime-video-channels-canada.png" alt="BannerImage" />
                    </li>
                </ul>
            </div>
        </>
    )
}

export default Header
