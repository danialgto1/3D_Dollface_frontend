import React , { useRef} from 'react';
import { Canvas , useFrame} from '@react-three/fiber';
import {  CameraControls, PerspectiveCamera, Environment } from '@react-three/drei';
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
export default function Generate3d({object, mtl }) {
  const MyObject = () => {
    const group = useRef();
  
    // Animation logic using useFrame
    useFrame(() => {
      group.current.rotation.y += 0.005;
    });
  
    const onProgress = function (xhr) {
      if (xhr.lengthComputable) {
        const percentComplete = (xhr.loaded / xhr.total) * 100;
        console.log(percentComplete.toFixed(2) + '% downloaded');
      }
    };
  
    const loadModel = () => {
      new MTLLoader().load(mtl, function (materials) {
        materials.preload();
  
        new OBJLoader()
          .setMaterials(materials)
          .load(object, function (object) {
            object.position.y = -0.95;
            object.scale.setScalar(10);
            group.current.add(object);
          }, onProgress);
      });
    };
  
    // Load the model when the component mounts
    React.useEffect(() => {
      loadModel();
    }, []);
  
    return <group scale={3} position={[0, 4, 0]} ref={group} />;
  };

  return (
    <Canvas flat 
    gl={{ alpha: true }}
    camera={{ position: [0, 0, 18.5] }}
    className='h-full overflow-hidden rounded-3xl shadow-lg'>
      <CameraControls minPolarAngle={0} maxPolarAngle={Math.PI / 1.6} />
      <ambientLight intensity={Math.PI / 3}  />
      <directionalLight position={[5, 15, 5]} intensity={1.5} castShadow />
        <MyObject/>
      <Environment preset="warehouse" background blur={0.2} />
      <PerspectiveCamera makeDefault position={[0, 0, 18.5]} />
    </Canvas>
  );
}
