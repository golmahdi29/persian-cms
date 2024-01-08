import React, { useState } from 'react'
import './NewProduct.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function NewProduct({ getAllProduct }) {

    const [productNewTitle, setProductNewTitle] = useState('')
    const [productNewPrice, setProductNewPrice] = useState('')
    const [productNewCount, setProductNewCount] = useState('')
    const [productNewPopularity, setProductNewPopularity] = useState('')
    const [productNewImg, setProductNewImg] = useState('')
    const [productNewSale, setProductNewSale] = useState('')
    const [productNewColors, setProductNewColors] = useState('')

    const submitHandler = () => {

        const updatedDatas = {
            title: productNewTitle,
            price: productNewPrice,
            count: productNewCount,
            img: productNewImg,
            popularity: productNewPopularity,
            sale: productNewSale,
            colors: productNewColors,
        }

        fetch('http://localhost:4000/api/products/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedDatas)
        })
        .then(res => {
            getAllProduct('');
            setProductNewTitle('')
            setProductNewPrice('')
            setProductNewCount('')
            setProductNewImg('')
            setProductNewPopularity('')
            setProductNewSale('')
            setProductNewColors('')
            toast.success('با موفقیت ایجاد گردید', {
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
            toast.error('عملیات ایجاد با ارور مواجه شد', {
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
            <h1 className='title'>افزودن محصول جدید</h1>
            <div className='new-box mb-4'>
                <div className='inputs-right'>
                    <input type="text" value={productNewTitle} onChange={e => setProductNewTitle(e.target.value)} className='new-input' placeholder='اسم محصول را بنویسید' />
                    <input type="text" value={productNewCount} onChange={e => setProductNewCount(e.target.value)} className='new-input' placeholder='موجودی محصول را بنویسید' />
                    <input type="text" value={productNewPopularity} onChange={e => setProductNewPopularity(e.target.value)} className='new-input' placeholder='میزان محبوبیت محصول را بنویسید' />
                    <input type="text" value={productNewColors} onChange={e => setProductNewColors(e.target.value)} className='new-input' placeholder='تعداد رنگبندی محصول را بنویسید' />
                </div>
                <div className='inputs-left'>
                    <input type="text" value={productNewPrice} onChange={e => setProductNewPrice(e.target.value)} className='new-input' placeholder='قیمت محصول را بنویسید' />
                    <input type="text" value={productNewImg} onChange={e => setProductNewImg(e.target.value)} className='new-input' placeholder='آدرس عکس محصول را بنویسید' />
                    <input type="text" value={productNewSale} onChange={e => setProductNewSale(e.target.value)} className='new-input' placeholder='میزان فروش محصول را بنویسید' />
                    <button className='new-btn' onClick={submitHandler}>ثبت محصول</button>
                </div>
            </div>
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
