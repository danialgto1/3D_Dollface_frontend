'use client'
import React from 'react';
import { useState,useEffect} from 'react';
import Card from './components/3d-card';


const Home = () => {

  const [VideoSources, setVideoSources] = useState([{id:2000}]);
  const [cardHeight, setCardHeight] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setCardHeight(window.innerHeight*.7);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  const handleClick = () => {
    const newVideoSource = {
      id: Math.round(Math.random() * 3000),
    };

    setVideoSources((prevSources) => [...prevSources, newVideoSource]);
  };




  const handleDelete = (id) => {
    setVideoSources((prevSources) =>
      prevSources.filter((source) => source.id !== id)
    );
  };
return (
    <div className="  flex flex-col  justify-around gap-4">
      {VideoSources.length ? <div className='  '>
        {VideoSources.map((videoSource ) => (
        <div  key= {videoSource.id} className="  snap-center p-2 mt-4 lg:w-2/4 mx-auto shadow-2xl  rounded-3xl " style={{ height: `${cardHeight}px` }}>
            <div className=' float-right  my-4 cursor-pointer delete hover:text-red-500 hover:text-2xl transition ease-out' onClick={() => handleDelete(videoSource.id)} >×  </div>
            <div className='mx-10 h-full' >
            <Card videoSource ={videoSource}/>
            </div>
          </div>
        
        ))}
        
      </div>
      :
      <div className='text-center font-bold scroll-my-60 bottom-0' style={{ height: `${cardHeight}px` }}> Try to add new Card</div>
      }

      <div className= ' bottom-0 shadow-2xl p-4 text-center  rounded-full w-40 mx-auto cursor-pointer text-lg font-bold text-gray-800 hover:text-gray-100 hover:bg-gray-800 hover:shadow-xl ease-out transition-all '  onClick={()=> handleClick()}>Add New + </div>

    </div>
  );
};

export default Home;
