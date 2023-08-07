import './App.css';
import LandingHeader from './LandingHeader.tsx';
import CustomParticles from './Particles.tsx'

function App() {
  return (
    <div className='container'>
      <CustomParticles className="particles" />
      <LandingHeader />
      <h2 className='headerSub'>I'm Raoul <span id='zeno'>Zeno</span> Huber. <br/> A web developer.</h2>
    </div>
  );
}

export default App;
