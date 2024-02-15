
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const modal = withReactContent(Swal)

export const onClose = modal.close

export default modal