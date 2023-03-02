import { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { createPortal } from 'react-dom'

class Modal extends PureComponent {
  render() {
    return createPortal(this.props.children, document.querySelector('#modal'))
  }
}

Modal.propTypes = {
  children: PropTypes.any,
}

export default Modal
