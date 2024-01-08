import React, { useState, useEffect } from 'react'
import './Comments.css'
import Error from '../Error/Error'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DetailsModal from '../DetailsModal/DetailsModal';
import DeleteModal from '../DeleteModal/DeleteModal'
import EditModal from '../EditModal/EditModal'

export default function Comments() {

  const [allComments, setAllComments] = useState([])
  const [mainComment, setMainComment] = useState()
  const [commentNewBody, setCommentNewBody] = useState('')
  const [commentNewId, setCommentNewId] = useState('')

  const [isShowDetailsModal, setIsShowDetailsModal] = useState(false)
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false)
  const [isShowEditModal, setIsShowEditModal] = useState(false)
  const [isShowAcceptModal, setIsShowAccpetModal] = useState(false);
  const [isShowRejectModal, setIsShowRejectModal] = useState(false);

  useEffect(() => {
    getAllComments()
  })

  const getAllComments = () => {
    fetch('http://localhost:4000/api/comments')
      .then(res => res.json())
      .then(data => setAllComments(data))
      .catch(err => {
        toast.error('دریافت اطلاعات با ارور مواجه شد', {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
  }

  const hideDetailModalHandler = () => {
    setIsShowDetailsModal(false)
  }

  const detailbtnHandler = (mainComments) => {
    setIsShowDetailsModal(true)
    setMainComment(mainComments)
  }

  const deleteModalRejectHandler = () => {
    setIsShowDeleteModal(false)
  }

  const editbtnHandler = (mainComments) => {
    setIsShowEditModal(true)

    setCommentNewId(mainComments.id)
    setCommentNewBody(mainComments.body)
  }
  const onSubmitEditModalHandler = (e) => {
    setIsShowEditModal(false)
    e.preventDefault();

    const updatedDatas = {
      body: commentNewBody,
    }
    fetch(`http://localhost:4000/api/comments/${commentNewId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedDatas)
    })
      .then(res => {
        getAllComments();
        setIsShowEditModal(false)
        toast.success('با موفقیت ویرایش گردید', {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch(() => {
        toast.error('عملیات ویرایش با ارور مواجه شد', {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
  }

  const deleteModalAcceptHandler = () => {
    setIsShowDeleteModal(false)
    fetch(`http://localhost:4000/api/comments/${mainComment.id}`, {
      method: 'DELETE'
    })
      .then(res => {
        getAllComments()
        toast.success('با موفقیت حذف گردید', {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch(err => {
        toast.error('عملیات حذف با ارور مواجه شد', {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
  }

  const acceptAcceptModal = () => {
    setIsShowAccpetModal(false)
    fetch(`http://localhost:4000/api/comments/accept/${mainComment.id}`, {
      method: 'POST'
    })
      .then(res => {
        getAllComments()
        toast.success('با موفقیت تایید گردید', {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch(err => {
        toast.error('عملیات تایید با ارور مواجه شد', {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
  }
  const acceptRejectModal = () => {
    setIsShowRejectModal(false)
    fetch(`http://localhost:4000/api/comments/reject/${mainComment.id}`, {
      method: 'POST'
    })
      .then(res => {
        getAllComments()
        toast.success('با موفقیت رد شد', {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch(err => {
        toast.error('عملیات رد کردن با ارور مواجه شد', {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
  }
  const rejectAcceptModal = () => {
    setIsShowAccpetModal(false)
  }

  const acceptCommentHandler = (mainComments) => {
    setIsShowAccpetModal(true)
    setMainComment(mainComments)
  }

  const rejectCommentHandler = (mainComments) => {
    setIsShowRejectModal(true)
    setMainComment(mainComments)
  }

  const deletebtnHandler = (mainComments) => {
    setIsShowDeleteModal(true)
    setMainComment(mainComments)
  }

  return (
    <div>

      <h3 className='h2'>لیست کامنت ها</h3>

      {allComments.length ? (
        <table className="comment-table">
          <thead>
            <tr className='comment-table-header-tr'>
              <th>اسم کاربر</th>
              <th>متن کامنت</th>
              <th>محصول</th>
              <th>تاریخ</th>
              <th>ساعت</th>
            </tr>
          </thead>

          <tbody>
            {allComments.map(item => (
              <tr key={item.id} className='comment-table-tr'>
                <td>{item.userID}</td>
                <td><button className='product-table-btn' onClick={() => detailbtnHandler(item)}>دیدن متن کامنت</button></td>
                <td>{item.productID}</td>
                <td>{item.date}</td>
                <td>{item.hour}</td>
                <td>
                  <button className='product-table-btn' onClick={() => deletebtnHandler(item)}>حذف</button>
                  <button className='product-table-btn' onClick={() => editbtnHandler(item)}>ویرایش</button>
                  <button className='product-table-btn'>پاسخ</button>
                  {!item.isAccept ? (
                    <button className='product-table-btn' onClick={() => acceptCommentHandler(item)}>تایید</button>
                  ) : <button className='product-table-btn' onClick={() => rejectCommentHandler(item)}>رد</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (<Error title={'هیچ کامنتی یافت نشد'} />)}

      {isShowDetailsModal && (
        <DetailsModal onHide={hideDetailModalHandler} children={(
          <div className='d-flex flex-column'>
            <p className='comment-body'>{mainComment.body}</p>
            <button className='comment-modal-btn' onClick={hideDetailModalHandler}>بستن</button>
          </div>
        )} />
      )}

      {isShowDeleteModal && (
        <DeleteModal accept={deleteModalAcceptHandler} reject={deleteModalRejectHandler} title={"آیا از حذف اطمینان دارید؟"} />
      )}


      {isShowAcceptModal && <DeleteModal title={"آیا از تایید کامنت اطمینان دارید؟"} accept={acceptAcceptModal} reject={rejectAcceptModal} />}

      {isShowRejectModal && <DeleteModal title={"آیا از رد کامنت اطمینان دارید؟"} accept={acceptRejectModal} reject={() => setIsShowRejectModal(false)} />}

      {isShowEditModal && (
        <EditModal onClose={() => setIsShowEditModal(false)} onSubmit={onSubmitEditModalHandler} >
          {/* Children */}

          <textarea onChange={(e) => setCommentNewBody(e.target.value)} value={commentNewBody} placeholder='متن جدید را وارد کنید' className='w-100 mt-4 p-3 rounded'></textarea>

        </EditModal>
      )}


      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  )
}
