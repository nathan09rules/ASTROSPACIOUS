import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Points, PointMaterial , OrbitControls} from "@react-three/drei";
import * as THREE from "three";


function bias( vec: THREE.Vector3, b: number ) {
  const biased = new THREE.Vector3(
    Math.sign(vec.x) * Math.pow( Math.abs(vec.x), 1/b),
    Math.sign(vec.y) * Math.pow( Math.abs(vec.y), 1/b),
    Math.sign(vec.z) * Math.pow( Math.abs(vec.z), 1/b),
  );
  return biased
}
function Galaxy() {
  const pointsR = useRef(null);

  const gen = () => {
    const positions = [];
    const numStars = 2000;
    const numSpiral = 1000
    const clusters = 50;
    const clustermax = 10;

    for (let i = 0; i < numStars; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);
      const r = 5 * Math.pow(Math.random() , 1) * 1;

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      positions.push(x, y, z);
    }

    for (let i = 0; i < numSpiral; i++) {
      const r = Math.random() * 10; 
      const angle = Math.random() * Math.PI * 3 + 2; 
      const x = Math.cos(angle) * angle + Math.random() * 1; 
      const z = Math.sin(angle) * angle + Math.random() * 1;
      const y = (Math.random() - .5);

      positions.push(x, y, z);

      const x2 = Math.cos(angle + Math.PI * .75) * angle + Math.random() * 1; 
      const z2 = Math.sin(angle + Math.PI * .75) * angle + Math.random() * 1;
      const y2 = Math.sin(angle + Math.PI * .75) * angle * 0.1;

      positions.push(x2, y2, z2);

      const x3 = Math.cos(angle + Math.PI * 1.5) * angle + Math.random() * 1; 
      const z3 = Math.sin(angle + Math.PI * 1.5) * angle + Math.random() * 1;
      const y3 = Math.cos(angle + Math.PI * 1.5) * angle * 0.1;

      positions.push(x3, y3, z3);
    }

    for (let i = 0; i < clusters; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(3 * v - 1);
      const r = 5 * Math.pow(Math.random() , 1) * 2;

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      for (let i = 0; i < clustermax; i++) {
        const u = Math.random();
        const v = Math.random();
        const theta = 2 * Math.PI * u;
        const phi = Math.acos(2 * v - 1);
        const r = 2 * Math.pow(Math.random() , 1) * .5;

        const xc = r * Math.sin(phi) * Math.cos(theta);
        const yc = r * Math.sin(phi) * Math.sin(theta);
        const zc = r * Math.cos(phi);

        positions.push(x + xc, y + yc, z + zc);
      }
    }

    return new Float32Array(positions);
  };

return (
    <Canvas
      camera={{ position: [10, 10, 10], fov: 75 }}
      style={{ height: "100vh", background: "black" }}
    >
      <OrbitControls
        enableZoom={true}
        enablePan={true}
        enableRotate={true}
        zoomSpeed={0.5}
        rotateSpeed={0.5}
      />

      <Points ref={pointsR} positions={gen()} stride={3}>
        <PointMaterial
          transparent
          color="#ffffff"
          size={0.05}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>
    </Canvas>
  );
}

export default Galaxy;
