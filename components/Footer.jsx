import Image from "next/image";
import styles from "../styles/Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <Image src="/img/footer2.jpg" objectFit="contain" layout="fill" alt=""  className={styles.image}/>
      </div>
      <div className={styles.item}>
        <div className={styles.card}>
          <h1 className={styles.title}>FIND OUR STORES</h1>
          <p className={styles.text}>
            Hanston Building
            <br /> Ortigas
            <br /> (0917) 165-2688
          </p>
          <p className={styles.text}>
            Rockwell
            <br /> (02) 79583644
          </p>
          <p className={styles.text}>
            Ore Central
            <br /> BGC, Taguig City
            <br /> (0917) 180-8808
          </p>
          <p className={styles.text}>
            Eton Tower
            <br /> Makati City
            <br /> (02) 7944-6802
          </p>
          <p className={styles.text}>
            Scout Rallos
            <br /> Quezon City
            <br /> (02) 7-507-5356
          </p>
        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>WORKING HOURS</h1>
          <p className={styles.text}>
            MONDAY UNTIL FRIDAY
            <br /> 10:00AM - 9:00PM
          </p>
          <p className={styles.text}>
            SATURDAY - SUNDAY
            <br /> 11:00AM - 8:00PM
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
