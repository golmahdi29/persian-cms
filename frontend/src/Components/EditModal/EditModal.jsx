import React, {useEffect} from 'react'
import './EditModal.css'
import ReactDOM from 'react-dom'

export default function EditModal({ children, onClose, onSubmit }) {

    useEffect(() => {
        const checkKey = e => {
            if(e.keyCode === 27) {
                onClose()
            }
        }

        window.addEventListener('keydown', checkKey)

        return () => window.removeEventListener('keydown', checkKey)
    })

  return ReactDOM.createPortal (
    <div className='modal-parent active'>
        <form className='edit-modal-form'>
            <h1 className='edit-modal-title'>اطلاعات جدید را وارد نمایید</h1>

            {children}    
            
            <button className='edit-form-submit' onClick={onSubmit}>ثبت اطلاعات جدید</button>
        </form>
    </div>, document.getElementById('modals-parent')
  )
}
