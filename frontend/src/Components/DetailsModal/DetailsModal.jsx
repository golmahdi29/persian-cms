import React, { useEffect } from 'react'
import './DetailsModal.css'
import ReactDOM from 'react-dom'

export default function DetailsModal({ onHide, children }) {

    useEffect(() => {
        const checkKey = e => {
            if(e.keyCode === 27) {
                onHide()
            }
        }

        window.addEventListener('keydown', checkKey)

        return () => window.removeEventListener('keydown', checkKey)
    })

    return ReactDOM.createPortal(
        <div className='modal-parent active'>
            <div className='details-modal'>
                { children }
            </div>
        </div>, document.getElementById('modals-parent')
    )
}
