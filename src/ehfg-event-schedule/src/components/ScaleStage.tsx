'use client';

import { useEffect, useState } from 'react';

// Fixed 4K design canvas - content is authored for this exact size, then
// uniformly scaled to fit any real screen so the layout never reflows.
export const DESIGN_WIDTH = 3840;
export const DESIGN_HEIGHT = 2160;

interface ScaleStageProps {
  children: React.ReactNode;
}

export default function ScaleStage({ children }: ScaleStageProps) {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      setScale(
        Math.min(
          window.innerWidth / DESIGN_WIDTH,
          window.innerHeight / DESIGN_HEIGHT
        )
      );
    };
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  return (
    // bg-black/20 lives here (not inside the scaled canvas) so the dim tint is uniform
    // across the whole viewport, with no seam where the canvas falls short of the edges
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden bg-black/20 backdrop-blur-sm">
      <div
        style={{ width: DESIGN_WIDTH, height: DESIGN_HEIGHT, transform: `scale(${scale})` }}
        className="relative flex-shrink-0"
      >
        {children}
      </div>
    </div>
  );
}
