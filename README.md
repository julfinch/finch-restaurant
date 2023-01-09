# Finch Restaurant Frontend
  -Live Site URL: [https://jul-lactao.netlify.app/](https://jul-lactao.netlify.app/)
  
## Table of contents

- [Overview](#overview)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My Process](#process)
  - [Install Dependencies](#dependencies)
  - [Additional Info](#additional-info)
  - [Errors](#errors)
  - [Built With](#built-with)
- [Author](#author)

## Overview

### Screenshot

![](./_readme_img/portfolio.png)

### Links

  -Live Site URL: [https://jul-lactao.netlify.app/](https://jul-lactao.netlify.app/)

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

                
    1.  **Order.js**
    ```shell
    ```

    1.  **Order.js**
    ```shell
    ```

        1.  **Order.js**
    ```shell
    ```

        1.  **Order.js**
    ```shell
    ```

        1.  **Order.js**
    ```shell
    ```
















### Install Dependencies

```js
"dependencies": {
    "classnames": "^2.3.1",
    "eslint": "^8.20.0",
    "framer-motion": "^6.5.1",
    "gatsby": "^4.19.2",
    "gatsby-plugin-gatsby-cloud": "^4.19.0",
    "gatsby-plugin-image": "^2.19.0",
    "gatsby-plugin-less": "^6.19.0",
    "gatsby-plugin-manifest": "^4.19.0",
    "gatsby-plugin-offline": "^5.19.0",
    "gatsby-plugin-react-helmet": "^5.19.0",
    "gatsby-plugin-sass": "^5.19.0",
    "gatsby-plugin-sharp": "^4.19.0",
    "gatsby-source-filesystem": "^4.19.0",
    "gatsby-transformer-sharp": "^4.19.0",
    "gsap": "^3.10.4",
    "less": "^4.1.3",
    "less-loader": "^11.0.0",
    "locomotive-scroll": "^4.1.4",
    "prop-types": "^15.8.1",
    "react": "^18.1.0",
    "react-dom": "^18.1.0",
    "react-helmet": "^6.1.0",
    "react-icons": "^4.4.0",
    "react-loadable": "^5.5.0",
    "sass": "^1.54.0",
    "sharp": "0.30.7",
    "smooth-scrollbar": "^8.7.5"
  },
```


### Built with

- Semantic HTML5 markup
- SASS
- ReactJS
- Gatsby
- GSAP
- Framer Motion

---
 
## Author

- Twitter - [@julfinch](https://www.twitter.com/julfinch)
