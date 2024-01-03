import { useEffect } from 'react';

function App() {
  useEffect(() => {
    const handleMouseMove = (e) => {
      const moveX = (e.clientX || e.touches[0].clientX) - window.innerWidth / 2;
    const moveY = (e.clientY || e.touches[0].clientY) - window.innerHeight / 2;
      Object.assign(document.documentElement, {
        style: `
          --move-x:${moveX * -0.005}deg;
          --move-y:${moveY * 0.01}deg;
        `,
      });
    };
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('touchmove',handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('tuchmove',handleMouseMove);
    };
  }, []);
  useEffect(() => {
    let canvas = document.getElementsByClassName('rain')[0];
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let c = canvas.getContext('2d');

    function randomNum(max, min) {
      return Math.floor(Math.random() * max) + min;
    }

    function RainDrops(x, y, endy, velocity, opacity) {
      this.x = x;
      this.y = y;
      this.endy = endy;
      this.velocity = velocity;
      this.opacity = opacity;

      this.draw = function() {
        c.beginPath();
        c.moveTo(this.x, this.y);
        c.lineTo(this.x, this.y - this.endy);
        c.lineWidth = 1;
        c.strokeStyle = "rgba(255, 255, 255, " + this.opacity + ")";
        c.stroke();
      };

      this.update = function() {
        let rainEnd = window.innerHeight + 100;
        if (this.y >= rainEnd) {
          this.y = this.endy - 100;
        } else {
          this.y = this.y + this.velocity;
        }
        this.draw();
      };
    }

    let rainArray = [];

    for (let i = 0; i < 140; i++) {
      let rainXLocation = Math.floor(Math.random() * window.innerWidth) + 1;
      let rainYLocation = Math.random() * -500;
      let randomRainHeight = randomNum(10, 2);
      let randomSpeed = randomNum(20, 0.2);
      let randomOpacity = Math.random() * 0.55;
      rainArray.push(new RainDrops(rainXLocation, rainYLocation, randomRainHeight, randomSpeed, randomOpacity));
    }

    function animateRain() {
      requestAnimationFrame(animateRain);
      c.clearRect(0, 0, window.innerWidth, window.innerHeight);

      for (let i = 0; i < rainArray.length; i++) {
        rainArray[i].update();
      }
    }

    animateRain();
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
