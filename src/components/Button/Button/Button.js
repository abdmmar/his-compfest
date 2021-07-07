import PropTypes from 'prop-types'
import styles from './Button.module.scss'

export default function Button({children, ...props}) {
  return (
    <button className={styles.button} {...props}>
      {children}
    </button>
  )
}

Button.propTypes = {
  props: PropTypes.any,
  children: PropTypes.node,
}
