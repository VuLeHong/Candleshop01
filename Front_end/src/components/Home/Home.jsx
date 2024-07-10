import Intro_Img from '../Intro_Img/Intro_Img'
import Trend from '../Trend/Trend';
import Collection from '../Collection/Collection';
import '../Home/Home.css'
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

function Home() {

  return (
    <div className='home'>
      <Navbar/>
      <Intro_Img/>
      <Trend/>
      <Collection/>
      <Footer/>
    </div>
  )
}

export default Home
