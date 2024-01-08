import React from 'react'
import './DeleteModal.css'
import ReactDOM from 'react-dom'

export default function DeleteModal({ accept, reject, title}) {
  return ReactDOM.createPortal (
    <div className='modal-parent active'>
        <div className="detele-modal">
            <h1>{title}</h1>
            <div>
                <button className='delete-btn delete-modal-accept-btn' onClick={accept}>بله</button>
                <button className='delete-btn delete-modal-reject-btn' onClick={reject}>خیر</button>
            </div>
        </div>
    </div>, document.getElementById('modals-parent')
  )
}
