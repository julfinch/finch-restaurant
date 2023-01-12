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

  const res = await axios.get("https://finch-tea.vercel.app/api/products");
  return {
    props:{
      pizzaList: res.data,
      admin
    }
  }
}