
import React from 'react';
import { SplineScene } from "./splite";
import { Card } from "./card"
import { Spotlight } from "./spotlight"
 
export function SplineSceneBasic() {
  return (
    <Card className="w-full h-[350px] md:h-[400px] bg-black/[0.96] relative overflow-hidden rounded-b-none">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      
      <div className="flex h-full flex-col md:flex-row">
        {/* Left content */}
        <div className="flex-1 p-6 md:p-8 relative z-10 flex flex-col justify-center text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
            <strong>Welcome,</strong> map your mission!
          </h1>
        </div>

        {/* Right content */}
        <div className="flex-1 relative h-48 md:h-full">
          <SplineScene 
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
          />
        </div>
      </div>
    </Card>
  )
}