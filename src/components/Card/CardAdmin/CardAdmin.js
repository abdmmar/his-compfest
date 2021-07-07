import {Button} from 'components/Button'
import styles from './CardAdmin.module.scss'

export default function CardAdmin() {
  return (
    <div className={styles.card}>
      <h4 className={styles.cardTitle}>Doctor</h4>
      <p className={styles.cardDesc}>Covid 19 Delta Variant Diagnostic</p>
      <div className={styles.patientContainer}>
        <p className={styles.patientTitle}>Patients:</p>
        <select className={styles.patientSelect}>
          <option value="Jason">Jason</option>
        </select>
      </div>
      <div className={styles.cardAction}>
        <Button secondary={true}>Edit</Button>
        <Button secondary={true}>Delete</Button>
      </div>
    </div>
  )
}
