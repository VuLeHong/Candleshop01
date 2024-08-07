import axios from 'axios'
import React from 'react'

const baseUrl =  axios.create({baseURL:'https://nenshop.onrender.com'});

export default baseUrl 