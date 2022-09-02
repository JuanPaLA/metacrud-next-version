import styles from '../styles/Home.module.css'
import CreateSchema from '../components/shareds/CreateSchema';

export default function Home() {
  return (
    <div className={styles.box}>
      <h1>Home</h1>
      <div className={styles.item} style={{ flexDirection: "column" }}>
        <h4>What is this?</h4>        
          This is basic NEXT JS CRUD app that intents to deploy suchs features
          in abstract way where modularity and DRY
          principle may provide you with a very automated and conditional
          rendering.        
          
      </div>
      <div className={styles.item} style={{ flexDirection: "column" }}>
          <h4>Schemas</h4>
          Schemas are abstracts representation of the properties that defines an entity. Something like an interface. 
          Every property has a type of value and others props such as is required or not. 
          All this props are usefull to control and validate our data and works basically in the same way you would do it with a Mongo Model Schema.
          What else can we do with schemas in this app?
          <ul>
            <li>We can combine an entity values with it respecive schema so its conjuction is passed to a automated form</li>
            <li>We save our selfs to write yet another form!</li>
          </ul>
        </div>
      <CreateSchema/>

    </div>
    
  )
}
