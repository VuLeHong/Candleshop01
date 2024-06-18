import React from 'react'
import product1 from './product1.jpg'

const Collection = () => {
  return (
    <div className='collection'>
        <h1>FEATURED COLLECTION</h1>
        <div className="collection-map">
            <img src={product1} />
            <br />
            <p>On Vacation</p>
            <br />
            <p>$35.00</p>
            <br />
        </div>
    </div>
  )
}

export default Collection