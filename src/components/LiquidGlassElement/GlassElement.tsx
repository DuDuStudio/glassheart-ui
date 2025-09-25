import { CSSProperties, ReactNode, useState, useRef, useEffect } from "react";
import { getDisplacementFilter, type DisplacementOptions } from "./getDisplacementFilter.js";
import { getDisplacementMap } from "./getDisplacementMap.js";
import "./GlassElement.module.css";

type GlassElementProps = {
  children?: ReactNode | undefined;
  depth?: number;
  strength?: number;
  chromaticAberration?: number;
  blur?: number;
};

export const GlassElement = ({
  depth: baseDepth = 8,
  children,
  strength = 100,
  chromaticAberration = 5,
  blur = 2,
}: GlassElementProps) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0, radius: 0 });
  const [clicked, setClicked] = useState(false);
  
  let depth = baseDepth / (clicked ? 0.7 : 1);

  // 獲取元素尺寸
  useEffect(() => {
    const updateDimensions = () => {
      if (elementRef.current) {
        const rect = elementRef.current.getBoundingClientRect();
        const computedStyle = window.getComputedStyle(elementRef.current);
        const borderRadius = parseFloat(computedStyle.borderRadius) || 0;
        
        // 確保獲取精確的像素值
        const width = Math.round(rect.width);
        const height = Math.round(rect.height);
        
        setDimensions({
          width,
          height,
          radius: borderRadius,
        });
      }
    };

    // 使用 requestAnimationFrame 確保在下一幀更新
    const updateWithRAF = () => {
      requestAnimationFrame(updateDimensions);
    };

    updateWithRAF();
    window.addEventListener('resize', updateWithRAF);
    
    return () => window.removeEventListener('resize', updateWithRAF);
  }, []);

  /* Dynamic CSS properties */
  const style: CSSProperties = {
    backdropFilter: `blur(${blur / 2}px) url('${getDisplacementFilter({
      width: dimensions.width,
      height: dimensions.height,
      radius: dimensions.radius,
      depth,
      strength,
      chromaticAberration,
    })}') blur(${blur}px) brightness(1.1) saturate(1.5)`,
  };
  
  return (
    <div
      ref={elementRef}
      className="gh-liquid-glass-element"
      style={style}
      onMouseDown={() => setClicked(true)}
      onMouseUp={() => setClicked(false)}
    >
      {children}
    </div>
  );
};
