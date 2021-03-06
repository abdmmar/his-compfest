import cn from 'classnames'
import PropTypes from 'prop-types'
import styles from './Button.module.scss'

export default function Button({secondary = false, children, ...props}) {
  return (
    <button
      className={cn({
        [styles.button]: secondary === false,
        [styles.buttonSecondary]: secondary === true,
      })}
      {...props}
    >
      {children}
    </button>
  )
}

Button.propTypes = {
  secondary: PropTypes.bool,
  children: PropTypes.node,
  props: PropTypes.any,
}
