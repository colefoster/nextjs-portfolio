import Particles from "react-tsparticles";
import { loadFull } from 'tsparticles';

export default function ParticlesBackground  ()  {

    const particlesInit = async (engine) => {
        await loadFull(engine);
      };
    
      const particlesLoaded = async (container) => {};
    const configs = {
        particles: {
          number: {
            value: 1000
          },
          stroke: {
            color: {
              value: "#ff0000",
              animation: {
                enable: true,
                speed: 360,
                sync: true
              }
            },
            width: 2
          },
          shape: {
            type: ["circle", "square", "triangle", "polygon"],
            options: {
              circle: {
                fill: false
              },
              square: {
                fill: false
              },
              triangle: {
                fill: false
              },
              polygon: [
                {
                  sides: 5,
                  fill: false
                },
                {
                  sides: 6,
                  fill: false
                }
              ]
            }
          },
          opacity: {
            value: 1
          },
          rotate: {
            value: { min: 0, max: 360 },
            direction: "random",
            animation: {
              enable: true,
              sync: true,
              speed: { min: 15, max: 30 }
            }
          },
          size: {
            value: { min: 1, max: 30 },
            animation: {
              enable: true,
              speed: { min: 40, max: 80 },
              sync: true,
              startValue: "max",
              destroy: "min"
            }
          },
          move: {
            enable: true,
            speed: { min: 5, max: 10 },
            outModes: "destroy"
          }
        },
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "trail"
            }
          },
          modes: {
            trail: {
              delay: 0,
              quantity: 7,
              pauseOnStop: false
            }
          }
        },
        background: {
          color: "#000000"
        }
      };

    return (
        <>
        <div style={{
            zIndex: -1,
        }}>
        <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
            options={configs}
        />
        </div></>
    );
};