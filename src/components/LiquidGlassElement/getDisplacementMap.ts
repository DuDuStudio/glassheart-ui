/**
 * Creating the displacement map that is used by feDisplacementMap filter.
 * Uses dynamic dimensions based on element size.
 */
export const getDisplacementMap = ({ 
  width, 
  height, 
  radius, 
  depth 
}: { 
  width: number; 
  height: number; 
  radius: number; 
  depth: number; 
}) => {
  // 使用實際尺寸，確保精確對齊
  const actualWidth = Math.max(width, 1);
  const actualHeight = Math.max(height, 1);
  
  // 計算邊框半徑的百分比
  const radiusXPercent = (radius / actualWidth) * 100;
  const radiusYPercent = (radius / actualHeight) * 100;
  
  return "data:image/svg+xml;utf8," +
    encodeURIComponent(`<svg height="${actualHeight}" width="${actualWidth}" viewBox="0 0 ${actualWidth} ${actualHeight}" xmlns="http://www.w3.org/2000/svg">
      <style>
          .mix { mix-blend-mode: screen; }
      </style>
      <defs>
          <linearGradient 
            id="Y" 
            x1="0" 
            x2="0" 
            y1="${Math.max(radiusYPercent * 0.5, 2)}%" 
            y2="${Math.min(100 - radiusYPercent * 0.5, 98)}%">
              <stop offset="0%" stop-color="#0F0" />
              <stop offset="100%" stop-color="#000" />
          </linearGradient>
          <linearGradient 
            id="X" 
            x1="${Math.max(radiusXPercent * 0.5, 2)}%" 
            x2="${Math.min(100 - radiusXPercent * 0.5, 98)}%"
            y1="0" 
            y2="0">
              <stop offset="0%" stop-color="#F00" />
              <stop offset="100%" stop-color="#000" />
          </linearGradient>
      </defs>

      <rect x="0" y="0" height="${actualHeight}" width="${actualWidth}" fill="#808080" />
      <g filter="blur(0.5px)">
        <rect x="0" y="0" height="${actualHeight}" width="${actualWidth}" fill="#000080" />
        <rect
            x="0"
            y="0"
            height="${actualHeight}"
            width="${actualWidth}"
            fill="url(#Y)"
            class="mix"
        />
        <rect
            x="0"
            y="0"
            height="${actualHeight}"
            width="${actualWidth}"
            fill="url(#X)"
            class="mix"
        />
        <rect
            x="${Math.max(depth, 1)}"
            y="${Math.max(depth, 1)}"
            height="${actualHeight - 2 * Math.max(depth, 1)}"
            width="${actualWidth - 2 * Math.max(depth, 1)}"
            fill="#808080"
            rx="${radius}"
            ry="${radius}"
            filter="blur(${Math.max(depth * 0.3, 0.5)}px)"
        />
      </g>
  </svg>`);
};
