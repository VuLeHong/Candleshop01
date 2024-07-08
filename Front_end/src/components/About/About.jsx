import React from 'react'
import './About.css'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'

const About = () => {
  return (
    <div className='about'>
      <Navbar/>
      <h1>About</h1>
      <p>Creator and owner of Micandle, Mica Javier, believes that luxury can be for everyone. Experiencing luxury can be as simple as elevating experiences and spaces you already know and have. The most accessible way to experience luxury is in the comfort of your own home.</p>
      <br />
      <p>Mica has always invested time and effort in creating spaces that felt luxurious in her own way. In March 2020, that took on a whole new meaning with the onset of Covid-19. Mica soon realized how much she relied on her personal space to keep her grounded, uplifted, and mindful. As she started to run low on her own candle supply, and weary of external factors, Mica got creative.</p>
      <br />
      <p>Tapping into her knowledge and experience from her previous fragrance company, Mica understands what the power of scent can do to transform one’s thoughts, feelings, and memories. Bringing that knowledge together with the desire to uplift and bring comfort to uncertain times, Micandle was born.</p>
      <br />
      <p>Starting with over fifty scents, Mica narrowed them down to five. “These five original scents cater to basic and essential moments most of us experience or long for. Spa Day for meditation and relaxation; Baked Goods for those with a sweet-tooth; Sweet Leather to ignite a strong androgynous yet sexy vibe; Siesta for an uplifting fresh and clean feeling, and On Vacation for that tropical beach getaway we all need time and again.”</p>
      <br />
      <p>With five original scents, you can expect more of these unisex candles in the near future! All candles are made from 100% premium soy wax and quality fine fragrance oils. Make sure to reuse and repurpose the glass tumbler once you are finished with the candle! They make for minimalist planters or trinket holders.</p>
      <br />
      <Footer/>
    </div>
  )
}

export default About