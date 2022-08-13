import {EtheriumPrice,BNBPrice,BitcoinPrice} from './menu function/Crypto-values/CryptoPrices'
import styles from "./Menu.module.css"
export const All=()=>{
    return(
    <section className={styles.cryptoWrapper}>
      <EtheriumPrice/>
      <BNBPrice/>
      <BitcoinPrice/>
    </section>
    );
}