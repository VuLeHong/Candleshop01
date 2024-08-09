import React from 'react'
import trend from './trend.jpg'
import '../Trend/Trend.css'

const Trend = () => {
  return (
    <div className='trend'>
        <div className="trend-left-and-right">
            <div className="trend-left">
                <img src={trend} />
            </div>
            <div className="trend-right">
                <h1>MUST-HAVE: Siesta</h1>
                <p>A pillowy powder fresh aroma with an underlying deep yet subtle sweetness to relax and calm your space with notes of tonka oud and vanilla. Whether you're having a chill or chore day at home, this candle scent will surely add love and light into your space.</p>
                <br />
                <button>SHOP NOW</button>
            </div>
        </div>
        <div className="trend-bottom">
            <h1>Treat Yourself with VBcandle</h1>
            <p>Scent has the power to transcend you to a place, a memory, or a feeling. With scent, you can travel without leaving your home. By lighting a candle, you are igniting a moment of self-care, luxury, and immersion.</p>
        </div>
    </div>
  )
}

export default Trend