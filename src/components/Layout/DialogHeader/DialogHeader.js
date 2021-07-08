import PropTypes from 'prop-types'
import {ButtonIcon} from 'components/Button'
import {ReactComponent as Close} from 'components/Icon/Close.svg'
import styles from './DialogHeader.module.scss'

export default function DialogHeader({title, onClick: close}) {
  return (
    <div className={styles.dialogHeader}>
      <h4 className={styles.dialogHeaderTitle}>{title}</h4>
      <ButtonIcon onClick={close} secondary={true}>
        <Close color="rgb (255,255,255)" />
      </ButtonIcon>
    </div>
  )
}

DialogHeader.propTypes = {
  title: PropTypes.string,
  onClick: PropTypes.func,
}
