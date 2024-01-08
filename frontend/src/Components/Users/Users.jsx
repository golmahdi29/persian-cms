import React, { useEffect, useState } from 'react'
import './Users.css'
import Error from '../Error/Error'
import DeleteModal from '../DeleteModal/DeleteModal';
import EditModal from '../EditModal/EditModal';
import DetailsModal from '../DetailsModal/DetailsModal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Users() {

  const [allUsers, setAllUsers] = useState([])
  const [mainUser, setMainUser] = useState()

  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false)
  const [isShowEditModal, setIsShowEditModal] = useState(false)
  const [isShowDetailModal, setIsShowDetailModal] = useState(false)

  const [newId, setNewId] = useState('')
  const [newFirstName, setNewFirstName] = useState('')
  const [newLastName, setNewLastName] = useState('')
  const [newUserName, setNewUserName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newCity, setNewCity] = useState('')
  const [newEmail, setNewEmail] = useState('')
  const [newScore, setNewScore] = useState('')
  const [newBuy, setNewBuy] = useState('')

  useEffect(() => {
    getAllUsers()
  }, [])

  const getAllUsers = () => {
    fetch(`http://localhost:4000/api/users`)
      .then(res => res.json())
      .then(data => setAllUsers(data))
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

  const deleteModalAcceptHandler = () => {
    setIsShowDeleteModal(false)
    fetch(`http://localhost:4000/api/users/${mainUser.id}`, {
      method: 'DELETE'
    })
      .then(res => {
        getAllUsers()
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

  const onSubmitEditModalHandler = (e) => {
    setIsShowEditModal(false)
    e.preventDefault();

    const updatedDatas = {
      firsname: newFirstName,
      lastname: newLastName,
      username: newUserName,
      phone: newPhone,
      city: newCity,
      email: newEmail,
      score: newScore,
      buy: newBuy,
    }
    fetch(`http://localhost:4000/api/users/${newId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedDatas)
    })
      .then(res => {
        getAllUsers();
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

  const editbtnHandler = (mainUser) => {
    setIsShowEditModal(true)

    setNewId(mainUser.id)
    setNewFirstName(mainUser.firsname)
    setNewLastName(mainUser.lastname)
    setNewUserName(mainUser.username)
    setNewPhone(mainUser.phone)
    setNewCity(mainUser.city)
    setNewEmail(mainUser.email)
    setNewScore(mainUser.score)
    setNewBuy(mainUser.buy)
  }

  return (
    <div>

      <h3 className='h2'>لیست کاربران</h3>
      {allUsers.length ? (
        <table className="comment-table">
          <thead>
            <tr className='comment-table-header-tr'>
              <th>نام</th>
              <th>نام خانوادگی</th>
              <th>نام کاربری</th>
              <th>شماره تلفن</th>
              <th>ایمیل</th>
            </tr>
          </thead>

          <tbody>
            {allUsers.map(item => (
              <tr key={item.id} className='comment-table-tr'>
                <td>{item.firsname}</td>
                <td>{item.lastname}</td>
                <td>{item.username}</td>
                <td>{item.phone}</td>
                <td>{item.email}</td>
                <td>
                  <button className='product-table-btn' onClick={() => {
                    setIsShowDeleteModal(true)
                    setMainUser(item)
                  }}>حذف</button>
                  <button className='product-table-btn' onClick={() => editbtnHandler(item)}>ویرایش</button>
                  <button className='product-table-btn' onClick={() => {
                    setIsShowDetailModal(true)
                    setMainUser(item)
                  }}>جزئیات</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (<Error title={'هیچ کاربری یافت نشد'} />)}

      {isShowDetailModal && (
        <DetailsModal onHide={() => setIsShowDetailModal(false)} children={(
          <table className="comment-table">
            <thead>
              <tr className='comment-table-header-tr'>
                <th>شهر</th>
                <th>آدرس</th>
                <th>امتیاز</th>
                <th>میزان خرید</th>
              </tr>
            </thead>

            <tbody>
              <tr className='comment-table-tr'>
                <td>{mainUser.city}</td>
                <td>{mainUser.address}</td>
                <td>{mainUser.score}</td>
                <td>{mainUser.buy}</td>
              </tr>
            </tbody>
          </table>
        )} />
      )}

      {isShowDeleteModal && (
        <DeleteModal accept={deleteModalAcceptHandler} reject={() => setIsShowDeleteModal(false)} title={"آیا از حذف اطمینان دارید؟"} />
      )}

      {isShowEditModal && (
        <EditModal onClose={() => setIsShowEditModal(false)} onSubmit={(e) => onSubmitEditModalHandler(e)} >
          {/* Children */}

          <div className='d-flex flex-column gap-2 mt-4'>
            <input type="text" className='new-input' onChange={e => setNewFirstName(e.target.value)} value={newFirstName} placeholder='نام' />
            <input type="text" className='new-input' onChange={e => setNewLastName(e.target.value)} value={newLastName} placeholder='نام خانوادگی' />
            <input type="text" className='new-input' onChange={e => setNewUserName(e.target.value)} value={newUserName} placeholder='نام کاربری' />
            <input type="text" className='new-input' onChange={e => setNewPhone(e.target.value)} value={newPhone} placeholder='شماره تلفن' />
            <input type="text" className='new-input' onChange={e => setNewEmail(e.target.value)} value={newEmail} placeholder='ایمیل' />
            <input type="text" className='new-input' onChange={e => setNewCity(e.target.value)} value={newCity} placeholder='شهر' />
            <input type="text" className='new-input' onChange={e => setNewScore(e.target.value)} value={newScore} placeholder='امتیاز' />
            <input type="text" className='new-input' onChange={e => setNewBuy(e.target.value)} value={newBuy} placeholder='خرید' />
          </div>

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
