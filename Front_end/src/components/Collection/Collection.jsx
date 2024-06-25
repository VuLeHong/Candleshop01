import React from 'react'
import product1 from './product1.jpg'
import '../Collection/Collection.css'

const Collection = () => {
  return (
    <div className='collection'>
      <div className="collection-title">
        <h1>FEATURED COLLECTION</h1>
      </div>
        <div className="collection-map">
          <div className='collection-map-list'>
            <img src={product1} />
            <p>On Vacation</p>
            <p>$35.00</p>
          </div>
          <div className='collection-map-list'>
            <img src={product1} />
            <p>On Vacation</p>
            <p>$35.00</p>
          </div>
          <div className='collection-map-list'>
            <img src={product1} />
            <p>On Vacation</p>
            <p>$35.00</p>
          </div>
          <div className='collection-map-list'>
            <img src={product1} />
            <p>On Vacation</p>
            <p>$35.00</p>
          </div>
          <div className='collection-map-list'>
            <img src={product1} />
            <p>On Vacation</p>
            <p>$35.00</p>
          </div>
          <div className='collection-map-list'>
            <img src={product1} />
            <p>On Vacation</p>
            <p>$35.00</p>
          </div>
        </div>
    </div>
  )
}

export default Collection