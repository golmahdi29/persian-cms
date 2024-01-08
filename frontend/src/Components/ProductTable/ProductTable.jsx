import React, { useEffect, useState } from 'react'
import './ProductTable.css'
import DeleteModal from '../DeleteModal/DeleteModal';
import DetailsModal from '../DetailsModal/DetailsModal';
import EditModal from '../EditModal/EditModal';
import { AiOutlineDollarCircle } from 'react-icons/ai'
import Error from '../Error/Error'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ProductTable({ getAllProduct, allProduct }) {

    const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
    const [isShowDetailsModal, setIsShowDetailsModal] = useState(false);
    const [isShowEditModal, setIsShowEditModal] = useState(false);

    //const [allProduct, setAllProduct] = useState([])
    const [mainProduct, setMainProduct] = useState()

    const [productNewId, setProductNewId] = useState('')
    const [productNewTitle, setProductNewTitle] = useState('')
    const [productNewPrice, setProductNewPrice] = useState('')
    const [productNewCount, setProductNewCount] = useState('')
    const [productNewPopularity, setProductNewPopularity] = useState('')
    const [productNewImg, setProductNewImg] = useState('')
    const [productNewSale, setProductNewSale] = useState('')
    const [productNewColors, setProductNewColors] = useState('')

    useEffect(() => {
        getAllProduct()
    }, [])



    const deleteAcceptHandler = () => {
        setIsShowDeleteModal(false)
        fetch(`http://localhost:4000/api/products/${mainProduct.id}`, {
            method: 'DELETE'
        })
        .then(res => {
            getAllProduct();
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

    const deleteRejectHandler = () => {
        setIsShowDeleteModal(false)
    }

    const detailsModalHide = () => {
        setIsShowDetailsModal(false)
    }

    const deletebtnHandler = (mainProduct) => {
        setIsShowDeleteModal(true)
        setMainProduct(mainProduct)
    }

    const detailbtnHandler = (mainProduct) => {
        setIsShowDetailsModal(true)
        setMainProduct(mainProduct)
    }

    const editbtnHandler = (mainProduct) => {
        setIsShowEditModal(true)

        setProductNewId(mainProduct.id)
        setProductNewTitle(mainProduct.title)
        setProductNewPrice(mainProduct.price)
        setProductNewCount(mainProduct.count)
        setProductNewImg(mainProduct.img)
        setProductNewSale(mainProduct.sale)
        setProductNewColors(mainProduct.colors)
        setProductNewPopularity(mainProduct.popularity)
    }

    const updateProductInfos = (e) => {
        e.preventDefault();

        const updatedDatas = {
            title: productNewTitle,
            price: productNewPrice,
            count: productNewCount,
            img: productNewImg,
            popularity: productNewPopularity,
            sale: productNewSale,
            colors: productNewColors
        }

        fetch(`http://localhost:4000/api/products/${productNewId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedDatas)
        })
        .then(res => {
            getAllProduct();
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

    return (
        <>
            {!allProduct.length ? (<Error title={'هیچ محصولی یافت نشد'} />) : (
                <table className="product-table">
                    <thead>
                        <tr className='product-table-header-tr'>
                            <th>عکس</th>
                            <th>اسم</th>
                            <th>قیمت</th>
                            <th>موجودی</th>
                        </tr>
                    </thead>

                    <tbody>
                        {allProduct.map(product => (
                            <tr key={product.id} className='product-table-tr'>
                                <td>
                                    <img src={product.img} alt="1" className='product-table-img' />
                                </td>
                                <td>{product.title}</td>
                                <td>{product.price} تومان</td>
                                <td>{product.count}</td>
                                <td>
                                    <button className='product-table-btn' onClick={() => detailbtnHandler(product)}>جزئیات</button>
                                    <button className='product-table-btn' onClick={() => deletebtnHandler(product)}>حذف</button>
                                    <button className='product-table-btn' onClick={() => editbtnHandler(product)}>ویرایش</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            {isShowDeleteModal && <DeleteModal accept={deleteAcceptHandler} reject={deleteRejectHandler} title={"آیا از حذف اطمینان دارید؟"} />}

            {isShowDetailsModal && <DetailsModal onHide={detailsModalHide} children={(
                <table className='cms-table'>
                    <thead>
                        <tr>
                            <th>اسم</th>
                            <th>قیمت</th>
                            <th>محبوبیت</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td>{mainProduct.title}</td>
                            <td>{mainProduct.price} تومان</td>
                            <td>{mainProduct.popularity}%</td>
                        </tr>
                    </tbody>
                </table>
            )} />}
            {isShowEditModal && <EditModal onClose={() => setIsShowEditModal(false)} onSubmit={updateProductInfos}>

                {/* Children */}
                <div className='edit-products-form-group'>
                    <span>
                        <AiOutlineDollarCircle />
                    </span>
                    <input type="text" onChange={(e) => setProductNewTitle(e.target.value)} value={productNewTitle} placeholder='عنوان جدید را وارد کنید' className='edit-product-input' />
                </div>
                <div className='edit-products-form-group'>
                    <span>
                        <AiOutlineDollarCircle />
                    </span>
                    <input type="text" onChange={(e) => setProductNewPrice(e.target.value)} value={productNewPrice} placeholder='مبلغ جدید را وارد کنید' className='edit-product-input' />
                </div>
                <div className='edit-products-form-group'>
                    <span>
                        <AiOutlineDollarCircle />
                    </span>
                    <input type="text" onChange={(e) => setProductNewCount(e.target.value)} value={productNewCount} placeholder='موجودی جدید را وارد کنید' className='edit-product-input' />
                </div>
                <div className='edit-products-form-group'>
                    <span>
                        <AiOutlineDollarCircle />
                    </span>
                    <input type="text" onChange={(e) => setProductNewImg(e.target.value)} value={productNewImg} placeholder='آدرس کاور جدید را وارد کنید' className='edit-product-input' />
                </div>
                <div className='edit-products-form-group'>
                    <span>
                        <AiOutlineDollarCircle />
                    </span>
                    <input type="text" onChange={(e) => setProductNewSale(e.target.value)} value={productNewSale} placeholder='میزان فروش جدید را وارد کنید' className='edit-product-input' />
                </div>
                <div className='edit-products-form-group'>
                    <span>
                        <AiOutlineDollarCircle />
                    </span>
                    <input type="text" onChange={(e) => setProductNewColors(e.target.value)} value={productNewColors} placeholder='تعداد رنگبندی را وارد کنید' className='edit-product-input' />
                </div>
                <div className='edit-products-form-group'>
                    <span>
                        <AiOutlineDollarCircle />
                    </span>
                    <input type="text" onChange={(e) => setProductNewPopularity(e.target.value)} value={productNewPopularity} placeholder='محبوبیت را وارد کنید' className='edit-product-input' />
                </div>
            </EditModal>}

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
        </>
    )
}
