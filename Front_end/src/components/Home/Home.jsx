import Intro_Img from '../Intro_Img/Intro_Img'
import Trend from '../Trend/Trend';
import Collection from '../Collection/Collection';
import '../Home/Home.css'

function Home() {

  return (
    <div className='home'>
      <Intro_Img/>
      <Trend/>
      <Collection/>
    </div>
  )
}

export default Home
