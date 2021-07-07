import {Button} from 'components/Button'
import styles from './CardPatient.module.scss'

export default function CardPatient() {
  return (
    <div className={styles.card}>
      <h4 className={styles.cardTitle}>Doctor</h4>
      <p className={styles.cardDesc}>Covid 19 Delta Variant Diagnostic</p>
      <p className={styles.cardCount}>
        Remaining appointments: <span className={styles.cardCountNum}>9</span>
      </p>
      <div className={styles.patientContainer}>
        <p className={styles.patientTitle}>Patients:</p>
        <ul className={styles.patients}>
          <li>
            <span>1. </span>Test
          </li>
          <li>
            <span>2. </span>Test
          </li>
          <li>
            <span>3. </span>Test
          </li>
          <li>
            <span>4. </span>Test
          </li>
          <li>
            <span>5. </span>Test
          </li>
          <li>
            <span>6. </span>Test
          </li>
          <li>
            <span>7. </span>Test
          </li>
          <li>
            <span>8. </span>Test
          </li>
          <li>
            <span>9. </span>Test
          </li>
          <li>
            <span>10. </span>Test
          </li>
        </ul>
      </div>
      <div className={styles.cardAction}>
        <Button>Apply</Button>
      </div>
    </div>
  )
}
