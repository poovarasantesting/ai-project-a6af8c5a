import { SpinningHeart } from "./SpinningHeart";

export const AnimatedHeartExample = () => {
  return (
    <div className="flex flex-col items-center justify-center p-6 space-y-8">
      <h2 className="text-2xl font-bold">Animated Spinning Heart</h2>
      
      <div className="flex flex-wrap gap-8 justify-center items-center">
        <div className="flex flex-col items-center">
          <SpinningHeart size={60} />
          <p className="mt-2 text-sm">Default</p>
        </div>
        
        <div className="flex flex-col items-center">
          <SpinningHeart size={60} color="#ff0000" speed={2} />
          <p className="mt-2 text-sm">Slower (speed=2)</p>
        </div>
        
        <div className="flex flex-col items-center">
          <SpinningHeart size={60} color="#8b5cf6" speed={10} />
          <p className="mt-2 text-sm">Faster (speed=10)</p>
        </div>
        
        <div className="flex flex-col items-center">
          <SpinningHeart size={30} color="#10b981" speed={8} />
          <p className="mt-2 text-sm">Small & Fast</p>
        </div>
        
        <div className="flex flex-col items-center">
          <SpinningHeart size={100} color="#f59e0b" speed={3} />
          <p className="mt-2 text-sm">Large & Slow</p>
        </div>
      </div>
      
      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md mt-4">
        <pre className="text-sm overflow-x-auto">
          {'<SpinningHeart size={60} color="#ff0000" speed={2} />'}
        </pre>
      </div>
    </div>
  );
};