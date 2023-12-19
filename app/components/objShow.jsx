import React, { useRef } from 'react';
import { Canvas, useFrame } from 'react-three-fiber';
import * as THREE from 'three';
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';

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
    new MTLLoader().setPath('http://127.0.0.1:8000/media/uploads/2023/00906a29-acb2-4b10-bf47-6f1c807ff76a/').load('front.mtl', function (materials) {
      materials.preload();

      new OBJLoader()
        .setMaterials(materials)
        .setPath('http://127.0.0.1:8000/media/uploads/2023/00906a29-acb2-4b10-bf47-6f1c807ff76a/')
        .load('front.obj', function (object) {
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

  return <group ref={group} />;
};

const App = () => {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={2} />
      <MyObject />
    </Canvas>
  );
};

export default App;
