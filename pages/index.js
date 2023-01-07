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