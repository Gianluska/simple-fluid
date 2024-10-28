import FluidPlane from "@components/Fluid";
import { Canvas } from "@react-three/fiber";

function App() {
  return (
    <div className="w-full h-screen">
      <Canvas
      camera={{ position: [0, 0, 5], fov: 75 }}
        className="bg-slate-950"
        dpr={[1, 2]}
      >
        <FluidPlane />
      </Canvas>
    </div>
  );
}

export default App;
