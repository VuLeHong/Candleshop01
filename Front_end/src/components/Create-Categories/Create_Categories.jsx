import React, { useState } from 'react';
import './Create_Categories.css'
import Sidebar from '../Sidebar/Sidebar'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Create_Categories = () => {

  const [name, setName] = useState('')
  const [desc, setDesc] = useState('')
  const history = useNavigate()

  function submit(e) {
    e.preventDefault(); 
    try {
      axios.post("http://localhost:5000/api/v1/category",{
        name, desc
      })

      .then (res=>{
        if (res.status === 200) {
          history('/categories')
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
    <div className='create-categories-container'>
        <Sidebar/>
        <form className="create-categories" onSubmit={submit}>
            <div className="create-categories-item">
                <label>Name</label>
                <input type="text" onChange={(e) => {setName(e.target.value)}} />
            </div>
            <div className="create-categories-item-bigger-box">
                <p>Description</p>
                <textarea rows="4" cols="50" onChange={(e) => {setDesc(e.target.value)}}></textarea>
            </div>
            <button>Submit</button>
        </form>
    </div>
  )
}

export default Create_Categories