import cn from 'classnames'
import PropTypes from 'prop-types'
import styles from './ButtonIcon.module.scss'

export default function ButtonIcon({secondary = false, children, ...props}) {
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

ButtonIcon.propTypes = {
  secondary: PropTypes.bool,
  children: PropTypes.node,
  props: PropTypes.any,
}
