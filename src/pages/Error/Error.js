import styles from './Error.module.scss'
import {Link} from 'react-router-dom'
import {Button} from 'components/Button'

export default function Error() {
  return (
    <div className={styles.errorContainer}>
      <div className={styles.error}>
        <h1 className={styles.errorTitle}>4🦄4</h1>
        <p className={styles.errorDesc}>✨ You found The Unicorn! ✨</p>
      </div>
      <Link to="/">
        <Button secondary={true}>{`<-`} Back to Home</Button>
      </Link>
    </div>
  )
}
