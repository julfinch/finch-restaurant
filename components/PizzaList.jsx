import styles from "../styles/PizzaList.module.css";
import PizzaCard from "./PizzaCard"

const PizzaList = ({ pizzaList }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>THE BEST MILKTEA FROM TAIWAN IS NOW HERE!</h1>
      <p className={styles.desc}>
      Getting that perfect milk tea fix is easy now more than ever!💚 Get your Alishan favorites today. Order now for fast delivery at the comfort of your home and on your office.
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
