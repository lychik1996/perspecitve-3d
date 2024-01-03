import { useEffect } from 'react';

function App() {
  useEffect(() => {
    const handleMouseMove = (e) => {
      Object.assign(document.documentElement, {
        style: `
          --move-x:${(e.clientX - window.innerWidth / 2) * -0.005}deg;
          --move-y:${(e.clientY - window.innerHeight / 2) * 0.01}deg;
        `,
      });
    };
    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      <div
      className="logo"
      style={{ backgroundImage: 'url(/img/logo.svg)' }}
    ></div>
      <section className="layers">
  <div className="layers__container">
    <div
      className="layers__item layer-1"
      style={{ backgroundImage: 'url(/img/layer-1.jpg)' }}
    ></div>
    <div
      className="layers__item layer-2"
      style={{ backgroundImage: 'url(/img/layer-2.png)' }}
    ></div>
    <div className="layers__item layer-3">
      <div className="hero-content">
        <h1>Natural Forest </h1>
        <p>Create beautiful 3d  website with a 'lens effect'</p>
        <button>Start learning</button>
      </div>
    </div>
    <div className="layers__item layer-4">
      <canvas className="rain"></canvas>
    </div>
    <div
      className="layers__item layer-5"
      style={{ backgroundImage: 'url(/img/layer-5.png)' }}
    ></div>
    <div
      className="layers__item layer-6"
      style={{ backgroundImage: 'url(/img/layer-6.png)' }}
    ></div>
  </div>
</section>
    </>
  );
}

export default App;
