import React, { useState, useEffect , useRef } from 'react';
import { ArrowUpTrayIcon } from './svg/upload';
import Generate3d from './Generate3d';
import axios from 'axios';
import { LoadingSVG } from './svg/Loading';

export default function Card({videoSource}) {
    const [front, setFront] = useState()
    const [left, setLeft] = useState()
    const [right, setRight] = useState()
    const [object, setObject] = useState(false)
    const [mtl, setMtl] = useState(false)
    const [texture, setTexture] = useState(false)
    const [Loading, setLoading] = useState(false)

    const frontInputRef = useRef(null);
    const leftInputRef = useRef(null);
    const rightInputRef = useRef(null);

    const handleFrontUpload = (event) => {
      setFront(event.target.files[0]);

  }

  const handleLeftClick = () => {
      leftInputRef.current.click();
    };

    const handleLeftUpload = (event) => {
      setLeft(event.target.files[0]);

  }

  const handleRightClick = () => {
      rightInputRef.current.click();
    };

    const handleRightUpload = (event) => {
      setRight(event.target.files[0]);

  }

  const handleFrontClick = () => {
      frontInputRef.current.click();
    };

  const  handleGenerate = async  () => {
    setLoading(true)

    const formData = new FormData()
    formData.append('left', left);
    formData.append('front', front);
    formData.append('right', right);

    try {
      const response = await axios.post('http://localhost:8000/api/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
      )
      console.log(response.data)
      setObject(response.data.obj);
      setMtl(response.data.mtl);
      setTexture(response.data.texture)
    }catch (error) {
        console.error('Error uploading file:', error);
      };
    }; 

    const handleBack = () => {
      setLoading(false)
    }


    return (
    <div  className=' py-20 h-full my-auto '>
            {!Loading ? <div className='flex flex-col justify-center gap-6 h-full '>
              <div className=' text-center py-6 text-2xl font-bold text-slate-700'>
                Please select your files from your computer then click generate
              </div>
              <div id='upload-container' className='flex justify-around'>
                  <div  className=" outline_btn w-36 flex-col" onClick={handleFrontClick}>
                      <ArrowUpTrayIcon/>
                      <input
                      className='hidden'
                      ref={frontInputRef}
                      type="file"
                      accept=".jpg, .jpeg, .png"
                      onChange={handleFrontUpload}
                      />
                      <br />
                      <div>{front? front.name:'Front View'}</div>
                  </div>

                  <div  className=" outline_btn  w-36   flex-col text-slate-200" onClick={handleLeftClick}>
                      <ArrowUpTrayIcon/>
                      <input
                      className='hidden'
                      ref={leftInputRef}
                      type="file"
                      accept=".jpg, .jpeg, .png"
                      onChange={handleLeftUpload}
                      /> 
                      <br />
                      <div>{left? left.name:'Left View'}</div>
                      
                  </div>

                  <div  className="outline_btn  w-36 flex-col" onClick={handleRightClick}>
                      <ArrowUpTrayIcon/>
                      <input
                      className='hidden'
                      ref={rightInputRef}
                      type="file"
                      accept=".jpg, .jpeg, .png"
                      onChange={handleRightUpload}
                      />
                      <img src="" alt="" />
                      <br />
                      <div>{right? right.name:'Right View'}</div>
                  </div>
              
              </div>
              <div className='black_btn inline-block w-44 my-4 mx-auto ' onClick={handleGenerate}> Generate </div>
            </div>
              :
            <div className=" h-full ">
              {object?<Generate3d object={object} mtl = {mtl} texture={texture} /> : <LoadingSVG/>}
              {object && <div className='black_btn w-44 my-4 mx-auto ' onClick={handleBack}> back </div>}
            </div>}
    </div>
  )
}
