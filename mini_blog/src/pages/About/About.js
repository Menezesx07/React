//CSS
import styles from "./About.module.css"

import { Link } from "react-router-dom"

const About = () => {
  return (
    <div className={styles.about}>
        <h2>Sobre o Mini <span>Blog</span></h2>
        <p>Este projeto trabalha o front-end com React e Bootstrap, e no 
          no Back-End está sendo usado o Firebase
        </p>
        <Link to="/post/create"> Criar Post</Link>
    </div>
  )
}

export default About