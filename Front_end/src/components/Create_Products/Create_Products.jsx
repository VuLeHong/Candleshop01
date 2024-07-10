import React, { useEffect, useState } from 'react';
import './Create_Products.css'
import Sidebar from '../Sidebar/Sidebar'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Create_Products = () => {

    const [name, setName] = useState('')
    const [quantity, setQuantity] = useState('')
    const [desc, setDesc] = useState('')
    const [price, setPrice] = useState('')
    const [category_id, setCategory_id] = useState('')
    const [detail, setDetail] = useState('')
    const [photo, setPhoto] = useState()

    const history = useNavigate()

    const [categories,setCategories] = useState([])

    const getCategories = async () => {
        try {
            const response = await axios.get('http://localhost:5000/showcategory');
            setCategories(response.data);
        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        getCategories();
    }, []);

    function submit(e) {
        e.preventDefault(); 
        try {
          axios.post("http://localhost:5000/productadd",{
            name, quantity, desc, price, category_id, detail
          })
    
          .then (res=>{
            if (res.status === 200) {
              history('/products')
            }
            else if (res.status === 500) {
              alert("Server dang bi loi")
            }
          })
    
          .catch(e=>{
            alert("Wrong details")
            console.log(e);
          })
        }

        catch(e) {
          console.log(e);
        }

        try {
          axios.post("http://localhost:5000/imageadd",{
            photo, name
          }, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
          })
          .then (res=>{
            if (res.status === 200) {
              history('/products')
            }
            else if (res.status === 500) {
              alert("Server dang bi loi")
            }
          })
        
          .catch(e=>{
            alert("Wrong details")
            console.log(e);
          })
        }

        catch(e) {
            console.log(e);
          }
      }

  return (
    <div className='create-products-container'>
        <Sidebar/>
        <form className="create-products" onSubmit={submit}>
            <div className="create-products-item">
                <p>Name</p>
                <input type="text" onChange={(e) => {setName(e.target.value)}} />
            </div>
            <div className="create-products-item">
                <label htmlFor="">Category</label>
                <select className='create-products-select-box' onChange={(e) => {setCategory_id(e.target.value)}}>
                    <option></option>
                    {categories.map(category => (
                    <option value={category.id}>{category.Name}</option>
                    ))
                    }
                </select>
            </div>
            <div className="create-products-item">
                <p>Quantity</p>
                <input type="number" min="1" onChange={(e) => {setQuantity(e.target.value)}} />
            </div>
            <div className="create-products-item-bigger-box">
                <p>Description</p>
                <textarea rows="4" cols="50" onChange={(e) => {setDesc(e.target.value)}}></textarea>
            </div>
            <div className="create-products-item">
                <p>Price(VND)</p>
                <input type="number" min="0" onChange={(e) => {setPrice(e.target.value)}} />
            </div>
            <div className="create-products-item-bigger-box">
                <p>Detail</p>
                <textarea rows="4" cols="50" onChange={(e) => {setDetail(e.target.value)}}></textarea>
            </div>
            <div className="create-products-item">
                <input type="file" onChange={(e) => {setPhoto(e.target.files[0])}} />
            </div>
            <button>Submit</button>
        </form>
    </div>
  )
}

export default Create_Products