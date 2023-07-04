import './slider.css'

function Slider({children}) {
  const moveLeft = () =>{
    let testimonies = document.getElementById('slides');
    testimonies.scrollLeft = testimonies.scrollLeft -380
  };

  const moveRight = () =>{
    let testimonies = document.getElementById('slides');
    testimonies.scrollLeft = testimonies.scrollLeft +380
  };

  return (
    <section className='slider__container'>
      <div id='slides' className='slider__content'>
        {children}
      </div>

      <div className='slider__arrow'>
        <p className='arrow__btn' onClick={moveLeft}>{"<"}</p>
        <p className='arrow__btn' onClick={moveRight}>{">"}</p>
      </div>
    </section>
  )
}

export default Slider