# Alishan - Finch Tea
  -Live Site URL: [https://finch-tea.vercel.app/](https://finch-tea.vercel.app/)

# My Process

## Install NEXT.js

1.  **Create the finch-restaurant folder.**
1.  **Install Next.Js**

    ```shell
    npx create-next-app
    (y/n) -> y
    
    # write a dot when asked for the app name so it will install on the folder and use the folder name as project name.
    (app-name) .

    yarn dev
    ```

1.  **Clean the installation**

    - pages > api > index.js
    - Delete everything except for the <Head> tag
        ```shell
        import Head from 'next/head'
        import Image from 'next/image'
        import styles from '../styles/Home.module.css'

        export default function Home() {
        return (
            <div className={styles.container}>
            <Head>
                <title>Finch Restaurant in Cebu</title>
                <meta name="description" content="Best Restaurant in Town" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
                homepage
            </div>
        )
        }
        ```

1.  **Creating the Layout**

    - Create image folder under public folder and put all the images there:

        ```shell
        --📁public
            --📁img
                --bake.png
                --bg.png
        ```

    - Create components folder inside the root directory:

        ```shell
        --📁root
            --📁components
                --Footer.jsx
                --Layout.js
                --Navbar.jsx
        ```

    - Inside Layout.js, paste the code

        ```shell
        import React from 'react'
        import Footer from './Footer'
        import Navbar from './Navbar'

        const Layout = ({ children }) => {
        return (
            <>
            <Navbar/>
                {children}
            <Footer/>
            </>
        )
        }
        export default Layout
        ```

    - Inside _app.js, import the Layout and wrap the Component:
        ```shell
        import Layout from '../components/Layout'
        import '../styles/globals.css'

        function MyApp({ Component, pageProps }) {
        return (
            <Layout>
                <Component {...pageProps} />
            </Layout>
        )
        }

        export default MyApp
        ```

1.  **Navbar.jsx**

    - Create **Navbar.module.css** inside styles folder
        ```shell
        --📁styles
            --Navbar.module.css
        ```

    - Import Navbar.module.css inside Navbar.jsx
        ```shell
        import styles from "../styles/Navbar.modules.css"
        ```

1.  **Featured.jsx**

    - Create **Navbar.module.css** inside styles folder
        ```shell
        --📁styles
            --Navbar.module.css
        ```

    - Import Navbar.module.css inside Navbar.jsx
        ```shell
        import styles from "../styles/Navbar.modules.css"
        ```

1.  **PizzaList.jsx**

    - Import Navbar.module.css inside Navbar.jsx
        ```shell
        import styles from "../styles/Navbar.modules.css"
        ```
1.  **PizzaCard.jsx**

    - Import Navbar.module.css inside Navbar.jsx
        ```shell
        import styles from "../styles/Navbar.modules.css"
        ```

## BACKEND

1.  **MONGODB ACCOUNT**

    1.  Create a new project named **finch-restaurant**
    1.  Under Network Access, add IP Address 0.0.0.0/0 to access in any network.
    1.  Build Database > Free Shared > Create Cluster > Create User > Finish and Close
    1.  Database > Connect > Connect your application > Copy the connection URL
    1.  Create a .env in the root directory and paste the URL
        ```shell
        MONGO_URL = xxxxxxx<ChangeThePassword>xxxxxmongodb.net/finch-restaurant?retryWritesxxxxxx
        ```
    1.  Restart server
    
1.  **Install Monggose**

    ```shell
    yarn add mongoose
    ```

1.  **Connect Mongoose for Next.js**

    1.  Follow the instruction based on Vercel's repo: [LINK](https://github.com/vercel/next.js/blob/canary/examples/with-mongodb-mongoose/lib/dbConnect.js)
    1.  Copy the content.
    1.  Create a folder in the root named **util** and create a file called **mongo.js**
        ```shell
        --📁root
            --📁util
                --mongo.js
        ```
        - Use URL instead of URI
        - Use MONGO_URL instead of MONGODB_URL
        ```shell
        import mongoose from 'mongoose'

        const MONGO_URL = process.env.MONGO_URL

        if (!MONGO_URL) {
        throw new Error(
            'Please define the MONGO_URL environment variable inside .env.local'
        )
        }

        /**
        * Global is used here to maintain a cached connection across hot reloads
        * in development. This prevents connections growing exponentially
        * during API Route usage.
        */
        let cached = global.mongoose

        if (!cached) {
        cached = global.mongoose = { conn: null, promise: null }
        }

        async function dbConnect() {
        if (cached.conn) {
            return cached.conn
        }

        if (!cached.promise) {
            const opts = {
            bufferCommands: false,
            useUnifiedTopology: true,
            UseNewUrlParser: true,
            }

            cached.promise = mongoose.connect(MONGO_URL, opts).then((mongoose) => {
            return mongoose
            })
        }

        try {
            cached.conn = await cached.promise
        } catch (e) {
            cached.promise = null
            throw e
        }

        return cached.conn
        }

        export default dbConnect
        ```

1.  **BACKEND - MODELS**
    ```shell
    --📁root
        --📁models
            --Product.js
            --Order.js
    ```

    1.  **Product.js**
        ```shell
        import mongoose from "mongoose";

        const ProductSchema = new mongoose.Schema({
            title: {
                type: String,
                required: true,
                maxlength: 60,
            },
            desc: {
                type: String,
                required: true,
                maxlength: 200,
            },
            img: {
                type: String,
                required: true,
            },
            prices: {
                type: [Number],
                required: true,
            },
            extraOptions: {
                type: [
                    {
                        text: { type:String, required:true}, 
                        price:{type:Number, required:true},
                    }
                ],
            },
        },{timestamps: true})

        export default mongoose.models.Product || mongoose.model("Product", ProductSchema);
        ```

    1.  **Order.js**
        ```shell
        import mongoose from "mongoose";

        const OrderSchema = new mongoose.Schema({
            customer: {
                type: String,
                required: true,
                maxlength: 60,
            },
            address: {
                type: String,
                required: true,
                maxlength: 200,
            },
            total: {
                type: Number,
                required: true,
            },
            status: {
                type: Number,
                default: 0,
            },
            method: {
                type: Number,
                required: true,
            },
        },{timestamps: true})

        export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
        ```

1.  **BACKEND - API**
    ```shell
    --📁root
        --📁pages
            --📁api
                --📁orders
                    --index.js
                --📁products
                    --index.js
    ```

    1.  **Set-up POSTMAN**

        - POST: localhost/3000/api/products
        - raw
        - JSON

        ```shell
        {
        "title": "pizza1",
        "img": "/img/pizza.png",
        "desc": "desc1",
        "prices": [
            12,
            13,
            14
        ],
        "extraOptions": [
            {
                "text": "Garlic sauce",
                "price": 2
            }
        ]
        }
        ```

    1.  **products >> index.js**

        - Set-up POST method in the index.js of /products
            ```shell
            import dbConnect from "../../../util/mongo"
            import Product from "../../../models/Product"


            export default async function handler(req, res) {
                const { method } = req;

                dbConnect()

                if(method === "GET"){

                }
                if(method === "POST"){
                    try{
                        const product = await Product.create(req.body);
                        res.status(201).json(product);
                    } catch(err) {
                        res.status(500).json(err)
                    }
                }
            }
            ```

        - We should get a response from POSTMAN and MONGODB
        - STATUS: 200 OK
            ```shell
            {
                "title": "pizza1",
                "desc": "desc1",
                "img": "/img/pizza.png",
                "prices": [
                    12,
                    13,
                    14
                ],
                "extraOptions": [
                    {
                        "text": "Garlic sauce",
                        "price": 2,
                        "_id": "63b8cf691d2e18b7acc443fe"
                    }
                ],
                "_id": "63b8cf691d2e18b7acc443fd",
                "createdAt": "2023-01-07T01:48:25.289Z",
                "updatedAt": "2023-01-07T01:48:25.289Z",
                "__v": 0
            }
            ```
            
        - Add the GET method to index.js
            ```shell
                if(method === "GET"){
                    try {
                        const products = await Product.find();
                        res.status(200).json(products)
                    } catch(err) {
                        res.status(500).json(err)
                    }
                }
            ```
            - GET: localhost/3000/api/products
            - STATUS: 200 OK
    

    1.  **pages >> index.js (HOME)**

        - Fetch data of all pizzaList from API to the HOME Frontend using axios and getServerSideProps 
            ```shell
                yarn add axios
            ```

        - Add getServerSideProps at the bottom, import axios, add {pizzaList} as props and pass it to <PizzaList/> component
            ```shell
            import Head from 'next/head'
            import Image from 'next/image'
            import Featured from '../components/Featured'
            import PizzaList from '../components/PizzaList'
            import styles from '../styles/Home.module.css'
            import axios from 'axios'

            export default function Home({ pizzaList }) {
            return (
                <div className={styles.container}>
                <Head>
                    <title>Finch Restaurant</title>
                    <meta name="description" content="Best Restaurant in Cebu" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <Featured/>
                <PizzaList pizzaList={pizzaList}/>
                </div>
            )
            }

            export const getServerSideProps = async () => {
            const res = await axios.get("http://localhost:3000/api/products");
            return {
                props:{
                pizzaList: res.data,
                }
            }
            }
            ```

        - Go to PizzaList component
            ```shell
                --📁components
                    --PizzaList.jsx
            ```
            ```shell
            import styles from "../styles/PizzaList.module.css";
            import PizzaCard from "./PizzaCard"

            const PizzaList = ({ pizzaList }) => {
            return (
                <div className={styles.container}>
                <h1 className={styles.title}>THE BEST PIZZA IN TOWN</h1>
                <p className={styles.desc}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut blandit arcu
                    in pretium molestie. Interdum et malesuada fames acme. Lorem ipsum dolor
                    sit amet, consectetur adipiscing elit.
                </p>
                <div className={styles.wrapper}>
                    {pizzaList.map((pizza) => (
                    <PizzaCard pizza={pizza} key={pizza._id}/>
                    ))}
                </div>
                </div>
            );
            };

            export default PizzaList;
            ```

        - Go to PizzaCard component
            ```shell
                --📁components
                    --PizzaCard.jsx
            ```
            ```shell
            import Image from "next/image";
            import styles from "../styles/PizzaCard.module.css";
            import Link from "next/link"

            const PizzaCard = ({ pizza }) => {
            return (
                <div className={styles.container}>
                <Link href={`/product/${pizza._id}`} passHref >
                    <Image src={pizza.img} alt="" width={200} height={200} />
                </Link>
                <h1 className={styles.title}>{pizza.title}</h1>
                <span className={styles.price}>${pizza.prices[0]}</span>
                <p className={styles.desc}>
                    {pizza.desc}
                </p>
                </div>
            );
            };

            export default PizzaCard;
            ```
    1.  **pages >> product >> [id].js**

        1. Fetch data of a single pizza product from API
            ```shell

            ```

        1. **pages >> api >> products >> [id].js**
            - Create methods for CRUD 
                ```shell
                ```

        1. Install Redux Toolkit to update cart icon 
            ```shell
            yarn add @reduxjs/toolkit redux react-redux
            ```

        1. **Create slice in redux.**
            ```shell
            --📁root
                --📁redux
                    --cartSlice.js
                    --store.js
            ```
            - **cartSlice.js**
                ```shell
                import { createSlice } from '@reduxjs/toolkit';

                const cartSlice = createSlice({
                    name: "cart",
                    initialState: {
                        products: [],
                        quantity: 0,
                        total: 0,
                    },
                    reducers: {
                        addProduct: (state, action) => {
                            state.products.push(action.payload);
                            state.total += action.payload.price * action.payload.quantity;
                        },
                        reset: (state) => {
                            state = initialState;
                        }
                    }
                })

                export const {addProduct, reset} = cartSlice.actions;
                export default cartSlice.reducer;
                ```

            - **store.js**
                ```shell
                import { configureStore } from "@reduxjs/toolkit";
                import cartReducer from "./cartSlice";

                export default configureStore({
                    reducer: {
                        cart: cartReducer,
                    }
                })
                ```

        1.  **Set Provider in _app.js**
            ```shell
            import Layout from '../components/Layout'
            import '../styles/globals.css'
            import store from '../redux/store'
            import { Provider } from 'react-redux'

            function MyApp({ Component, pageProps }) {
            return (
                <Provider store={store}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
                </Provider>
            )
            }

            export default MyApp
            ```   

        1.  **Update Navbar.js so that cart will get the state of order quantity**

                ```shell
                import Image from "next/image";
                import styles from "../styles/Navbar.module.css";
                import { useSelector } from "react-redux";
                import Link from "next/link";

                const Navbar = () => {
                const quantity = useSelector((state) => state.cart.quantity);
                return (
                    <div className={styles.container}>
                    ..........................
                    </div>
                    <Link href="/cart" passHref>
                        <div className={styles.item}>
                        <div className={styles.cart}>
                            <Image src="/img/cart.png" alt="" width="30px" height="30px" />
                            <div className={styles.counter}>{quantity}</div>
                        </div>
                        </div>
                    </Link>
                    </div>
                );
                };

                export default Navbar;
                ```

    1.  **Connect Paypal**
        - Install Paypal
            ```shell
            yarn add @paypal/react-paypal-js
            ```

        - Follow the instruction based on Paypal's repo: [LINK](https://paypal.github.io/react-paypal-js/?path=/docs/example-paypalbuttons--default).

        - We need to get the **client-id** and for that, go to [https://developer.paypal.com/dashboard/](https://developer.paypal.com/dashboard/) and create an account if you don't have a Paypal account. 

        - Create a Sandbox account: [https://developer.paypal.com/dashboard/accounts](https://developer.paypal.com/dashboard/accounts). Create one Merchant Account then another one for Buyer Account.

        - Create the application: [https://developer.paypal.com/dashboard/applications/sandbox](https://developer.paypal.com/dashboard/applications/sandbox)
            - Create app
            - App name: finch-restaurant
            - Merchant - Accept payments as a merchant (seller)
            - Choose the business account that you created (xxx@business.example.com)
            - Create app
            - Copy the **client-id** and paste in the cart.jsx

        - Test the account by sending a fake money from personal account to the merchant account.
            - Go to [https://developer.paypal.com/dashboard/accounts](https://developer.paypal.com/dashboard/accounts) and click the 3 dots and then **View/Edit account** to see credentials. Use the Email Id nad System Generated Password to sign in at the link below.
            - Open a new tab  and sign in at [https://www.sandbox.paypal.com/signin](https://www.sandbox.paypal.com/signin) using the Merchant Account.
            - You should see a fake $5,000 money in your account.
            - Do the same using your personal account that you created but this time by signing in in another browser window on incognito mode.
            - Go to the cart page of your order in localhost and click Paypal, pay using the personal account.
            - You should see that the order amount was subtracted from your personal account and that amount was added to your merchant account plus some fees for paypal.
            - sb-lkgse24840259@personal.example.com
            - G:&dgo/6

        1.  **cart.jsx**

            ```shell
            ...updated CART.JSX code here
            ```

        1. **pages >> api >> orders >> [id].js**
            - Create methods for CRUD: **pages >> api >> orders >> index.js**
                ```shell
                import dbConnect from "../../../util/mongo";
                import Order from "../../../models/Order";

                const handler = async (req, res) => {
                    const { method } = req;

                    await dbConnect();

                    if(method === "GET"){
                        try {
                            const orders = await Order.find();
                            res.status(201).json(orders);
                        } catch(err) {
                            res.status(500).json(err);
                        }
                    }
                    if(method === "POST"){
                        try {
                            const order = await Order.create(req.body);
                            res.status(201).json(order);
                        } catch(err) {
                            res.status(500).json(err);
                        }
                    }
                };

                export default handler;
                ```

            - Update reset reducer from **cartSlice.js** 
                ```shell
                ```

            - Create methods for CRUD: **pages >> api >> orders >> [id].js**
                ```shell
                import dbConnect from "../../../util/mongo";
                import Order from "../../../models/Order";

                const handler = async(req, res) => {
                    const { method, query:{id} } = req;

                    await dbConnect();

                    if(method === "GET"){
                        try {
                            const order = await Order.findById(id);
                            res.status(200).json(order);
                        } catch(err) {
                            res.status(500).json(err)
                        }
                    }
                    if(method === "PUT"){}
                    if(method === "DELETE"){}
                }

                export default handler;
                ```
                - Add **getServerSideProps** at the bottom of Order page: **pages >> orders >> [id].jsx** and update the props

                    ```shell
                    import styles from "../../styles/Order.module.css";
                    import Image from "next/image";
                    import axios from "axios";

                    const Order = ({order}) => {
                    const status = order.status;

                    const statusClass = (index) => {
                        if (index - status < 1) return styles.done;
                        if (index - status === 1) return styles.inProgress;
                        if (index - status > 1) return styles.undone;
                    };
                    return (
                        <div className={styles.container}>
                        <div className={styles.left}>
                            <div className={styles.row}>
                            <table className={styles.table}>
                                <tr className={styles.trTitle}>
                                <th>Order ID</th>
                                <th>Customer</th>
                                <th>Address</th>
                                <th>Total</th>
                                </tr>
                                <tr className={styles.tr}>
                                <td>
                                    <span className={styles.id}>{order._id}</span>
                                </td>
                                <td>
                                    <span className={styles.name}>{order.customer}</span>
                                </td>
                                <td>
                                    <span className={styles.address}>{order.address}</span>
                                </td>
                                <td>
                                    <span className={styles.total}>${order.total}</span>
                                </td>
                                </tr>
                            </table>
                            </div>
                            <div className={styles.row}>
                            <div className={statusClass(0)}>
                                <Image src="/img/paid.png" width={30} height={30} alt="" />
                                <span>Payment</span>
                                <div className={styles.checkedIcon}>
                                <Image
                                    className={styles.checkedIcon}
                                    src="/img/checked.png"
                                    width={20}
                                    height={20}
                                    alt=""
                                />
                                </div>
                            </div>
                            <div className={statusClass(1)}>
                                <Image src="/img/bake.png" width={30} height={30} alt="" />
                                <span>Preparing</span>
                                <div className={styles.checkedIcon}>
                                <Image
                                    className={styles.checkedIcon}
                                    src="/img/checked.png"
                                    width={20}
                                    height={20}
                                    alt=""
                                />
                                </div>
                            </div>
                            <div className={statusClass(2)}>
                                <Image src="/img/bike.png" width={30} height={30} alt="" />
                                <span>On the way</span>
                                <div className={styles.checkedIcon}>
                                <Image
                                    className={styles.checkedIcon}
                                    src="/img/checked.png"
                                    width={20}
                                    height={20}
                                    alt=""
                                />
                                </div>
                            </div>
                            <div className={statusClass(3)}>
                                <Image src="/img/delivered.png" width={30} height={30} alt="" />
                                <span>Delivered</span>
                                <div className={styles.checkedIcon}>
                                <Image
                                    className={styles.checkedIcon}
                                    src="/img/checked.png"
                                    width={20}
                                    height={20}
                                    alt=""
                                />
                                </div>
                            </div>
                            </div>
                        </div>
                        <div className={styles.right}>
                            <div className={styles.wrapper}>
                            <h2 className={styles.title}>CART TOTAL</h2>
                            <div className={styles.totalText}>
                                <b className={styles.totalTextTitle}>Subtotal:</b>${order.total}
                            </div>
                            <div className={styles.totalText}>
                                <b className={styles.totalTextTitle}>Discount:</b>$0.00
                            </div>
                            <div className={styles.totalText}>
                                <b className={styles.totalTextTitle}>Total:</b>${order.total}
                            </div>
                            <button disabled className={styles.button}>
                                PAID
                            </button>
                            </div>
                        </div>
                        </div>
                    );
                    };

                    export const getServerSideProps = async ({params}) => {
                    const res = await axios.get(`https://finch-tea.vercel.app/api/orders/${params.id}`);
                    return {
                        props: { order: res.data },
                    };
                    };

                    export default Order;

                    ```
                
                - Proceed into creating the **OrderDetail.jsx** for Cash on Delivery.

## ADMIN PAGE

1.  **Create admin folder**
    ```shell
    --📁pages
        --📁admin
            --index.jsx
    ```
1.  **Create Admin.module.css**

1.  **Create index.jsx under admin**
    ```shell
    ...check the code in the repo
    ```
1.  Create DELETE method: **pages >> api >> products >> [id].js**
    ```shell
    if(method === "DELETE"){
        try{
            await Product.findByIdAndDelete(id);
            res.status(201).json("The product has been deleted");
        } catch(err) {
            res.status(500).json(err)
        }
    }
    ```

1.  Create UPDATE method for ORDER: **pages >> api >> order >> [id].js**
    ```shell
    if(method === "PUT"){
        try{
            const order = await Order.findByIdAndUpdate(id,req.body, {new: true});
            res.status(201).json(order);
        } catch(err) {
            res.status(500).json(err)
        }
    }
    ```

1.  **Admin Log-in Page**

    1. Create **login.js** inside **api folder** : **pages >> api >> login.js**
        ```shell
        import cookie from 'cookie';

        const handler = (req, res) => {
            if (req.method === "POST") {
                const {username, password} = req.body;
                if (
                    username === process.env.ADMIN_USERNAME &&
                    password === process.env.ADMIN_PASSWORD
                ) {
                    res.setHeader(
                        "Set-Cookie",
                        cookie.serialize("token", process.env.TOKEN, {
                            maxAge: 60 * 60,
                            sameSite: "strict",
                            path: "/",
                        })
                    );
                    res.status(200).json("Successful");
                } else {
                    res.status(400).json("Invalid Credentials");
                }
            }
        };

        export default handler;
        ```

    1.  **Create Username, Password , and Token in the .env file. We'll create one since this is a single page only and  nto a complex website with more roles**
        ```shell
        ADMIN_USERNAME = admin
        ADMIN_PASSWORD = 123456
        TOKEN = SWdw4CV||663Z{p3|ZXtP%0k6Ejj;F
        ```
        - Refresh the application after adding into .env file.

    1.  **Create login.jsx under admin folder: pages >> admin >> login.jsx**

        ```shell
        import axios from "axios";
        import { useRouter } from "next/router";
        import { useState } from "react";
        import styles from "../../styles/Login.module.css";

        const Login = () => {
        const [username, setUsername] = useState(null);
        const [password, setPassword] = useState(null);
        const [error, setError] = useState(false);
        const router = useRouter();

        const handleClick = async () => {
            try {
            await axios.post("http://localhost:3000/api/login", {
                username,
                password,
            });
            router.push("/admin");
            } catch (err) {
            setError(true);
            }
        };

        return (
            <div className={styles.container}>
            <div className={styles.wrapper}>
                <h1>Admin Dashboard</h1>
                <input
                placeholder="username"
                className={styles.input}
                onChange={(e) => setUsername(e.target.value)}
                />
                <input
                placeholder="password"
                type="password"
                className={styles.input}
                onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={handleClick} className={styles.button}>
                Sign In
                </button>
                {error && <span className={styles.error}>Wrong Credentials!</span>}
            </div>
            </div>
        );
        };

        export default Login;
        ```

    1.  **Update getServerSideProps inside pages >> admin >> index.js**. This is for route protection so that anyone with no cookie can enter admin page and will be redirected to the login page. Use context **ctx** argument for getServerSideProps when using cookies.

        ```shell
        export const getServerSideProps = async (ctx) => {
        const myCookie = ctx.req?.cookies || "";

        if (myCookie.token !== process.env.TOKEN) {
            return {
            redirect: {
                destination: "/admin/login",
                permanent: false,
            },
            };
        }

        const productRes = await axios.get("http://localhost:3000/api/products");
        const orderRes = await axios.get("http://localhost:3000/api/orders");

        return {
            props: {
            orders: orderRes.data,
            products: productRes.data,
            },
        };
        };
        ```

    1.  **Create AddButton.jsx components and render them inside pages >> index.js**
        ```shell
        import styles from "../styles/Add.module.css";

        const AddButton = ({ setClose }) => {
        return (
            <div onClick={() => setClose(false)} className={styles.mainAddButton}>
            Add New Pizza
            </div>
        );
        };

        export default AddButton;
        ```

    1.  **Create CLOUDINARY account**
        - Go to Settings
        - Upload
        - Upload Preset Name : finch-restaurant
        - Folder: finch-restaurant
        - Unsigned
        - Save

    1.  **Create Add.jsx components and render them inside pages >> index.js**
        ```shell
        ```

    1.  **Update getServerSideProps inside pages >> index.js and pass admin as prop to create the button. **
        ```shell
        import React, {useState} from 'react'
        import Head from 'next/head'
        import Image from 'next/image'
        import Featured from '../components/Featured'
        import PizzaList from '../components/PizzaList'
        import Add from '../components/Add'
        import AddButton from '../components/AddButton'
        import styles from '../styles/Home.module.css'
        import axios from 'axios'

        export default function Home({ pizzaList, admin }) {
        const [close, setClose] = useState(true);
        return (
            <div className={styles.container}>
            <Head>
                <title>Finch Restaurant</title>
                <meta name="description" content="Best Restaurant in Cebu" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Featured/>
            {admin && <AddButton setClose={setClose}/>}
            <PizzaList pizzaList={pizzaList}/>
            {!close && <Add setClose={setClose}/>}
            </div>
        )
        }

        export const getServerSideProps = async (ctx) => {
        const myCookie = ctx.req?.cookies || "";
        let admin = false;

        if(myCookie.token === process.env.TOKEN) {
            admin = true;
        }

        const res = await axios.get("http://localhost:3000/api/products");
        return {
            props:{
            pizzaList: res.data,
            admin
            }
        }
        }
        ```

    1.  **Update next.config.js** if an error regarding cloudinary occurs after adding a product.
        ```shell
        /** @type {import('next').NextConfig} */
        const nextConfig = {
        reactStrictMode: true,
        swcMinify: true,
        images: {
            domains:["res.cloudinary.com"]
        }
        }

        module.exports = nextConfig
        ```
---
 
## Author

- Twitter - [@julfinch](https://www.twitter.com/julfinch)
