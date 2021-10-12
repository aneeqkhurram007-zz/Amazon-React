import { Input } from '@mui/material'
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import commerce from '../../lib/commerce'
import './Checkout.css'
const Checkout = ({ cart, setOrder }) => {
    const [countriesList, setCountriesList] = useState([]);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [city, setCity] = useState("");
    const [address, setAddress] = useState("");
    const [zip, setZip] = useState("");
    const [country, setCountry] = useState();
    const [subDivision, setsubDivision] = useState();
    const [subDivisionList, setsubDivisionList] = useState([]);
    const [token, settoken] = useState()
    const [shipping, setShipping] = useState()
    const [shippingOptions, setShippingOptions] = useState()
    const history = useHistory()

    const getShippingCountries = async (tokenID) => {
        const { countries } = await commerce.services.localeListShippingCountries(tokenID)
        setCountriesList(Object.entries(countries))

    }
    const getShippingSubDivision = async (tokenID, country) => {
        const { subdivisions } = await commerce.services.localeListShippingSubdivisions(tokenID, country)
        setsubDivisionList(Object.entries(subdivisions))
        setsubDivision(Object.keys(subdivisions)[0])
    }
    const generateToken = async (cartID) => {
        const response = await commerce.checkout.generateToken(cartID, { type: 'cart' })
        getShippingCountries(response?.id)
        settoken(response)
    }
    const getShippingOptions = async (token, country, subDivision) => {
        const response = await commerce.checkout.getShippingOptions(token, {
            country: country,
            region: subDivision
        })

        setShipping((response)[0].id);
        setShippingOptions(response)
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (token) {
            const incomingOrder = await commerce.checkout.capture(token?.id, {
                line_items: token.live.line_items,
                customer: {
                    firstname: firstName,
                    lastname: lastName,
                    email: email
                },
                shipping: {
                    name: 'Primary',
                    street: address,
                    town_city: city,
                    county_state: subDivision,
                    postal_zip_code: zip,
                    country: country
                },
                fulfillment: {
                    shipping_method: shipping
                },
                payment: {
                    gateway: 'test_gateway',
                    card: {
                        number: '4242424242424242',
                        expiry_month: '02',
                        expiry_year: '24',
                        cvc: '123',
                        postal_zip_code: '94107',
                    },
                },
                pay_what_you_want: cart.subtotal.raw
            })
            setOrder(incomingOrder)
            history.push("/thankyou")
        }
    }
    useEffect(() => {
        generateToken(cart?.id)
    }, [cart])
    useEffect(() => {
        if (country) getShippingSubDivision(token?.id, country)
    }, [country])
    useEffect(() => {
        if (subDivision) getShippingOptions(token?.id, country, subDivision)
    }, [subDivision])
    return (
        <div className={"checkout_wrap"}>
            <h2>Shipping Details</h2>
            <br />
            <form onSubmit={e => handleSubmit(e)}>
                <div className={"checkout__form"}>
                    <div className={"checkout_column"}>
                        <label >First Name</label>
                        <Input require="true" value={firstName} onChange={e => setFirstName(e.target.value)} name="firstname"></Input>
                    </div>
                    <div className={"checkout_column"}>
                        <label >Last Name</label>
                        <Input require="true" value={lastName} onChange={e => setLastName(e.target.value)} name="lastname"></Input>
                    </div>
                    <div className={"checkout_column"}>
                        <label >Email</label>
                        <Input require="true" value={email} onChange={e => setEmail(e.target.value)} name="email"></Input>
                    </div>
                    <div className={"checkout_column"}>
                        <label >Address</label>
                        <Input require="true" value={address} onChange={e => setAddress(e.target.value)} name="address"></Input>
                    </div>
                    <div className={"checkout_column"}>
                        <label >City</label>
                        <Input require="true" value={city} onChange={e => setCity(e.target.value)} name="city"></Input>
                    </div>
                    <div className={"checkout_column"}>
                        <label >Zip Code</label>
                        <Input require="true" value={zip} onChange={e => setZip(e.target.value)} name="zipCode"></Input>
                    </div>
                    <div className={"checkout_column"}>
                        <label >Shipping Country</label>
                        <select value={country} require="true" name="country" onChange={e => setCountry(e.target.value)}>
                            {countriesList.map(country => (

                                <option key={country} value={country[0]}>{country[1]}</option>
                            ))}
                        </select>
                    </div>
                    <div className={"checkout_column"}>
                        <label >Shipping SubDivision</label>
                        <select value={subDivision} require="true" name="city" onChange={e => setsubDivision(e.target.value)}>
                            {subDivisionList.map(subDivision => (

                                <option key={subDivision} value={subDivision[0]}>{subDivision[1]}</option>
                            ))}
                        </select>
                    </div>
                    <div className={"checkout_column"}>
                        <label >Shipping Options</label>
                        <select value={shipping} require="true" name="subDivision" onChange={e => setShipping(e.target.value)}>
                            {shippingOptions?.map(shippingOption => (

                                <option key={shippingOption.id} value={shippingOption.id}>{shippingOption.description} {shippingOption.price.formatted_with_symbol}</option>
                            ))}
                        </select>
                    </div>
                    <div className={"checkout_column"}>
                        <label >&nbsp; </label>
                        <button type="submit">Pay now</button>
                    </div>
                </div>
            </form >
        </div >
    )
}

export default Checkout