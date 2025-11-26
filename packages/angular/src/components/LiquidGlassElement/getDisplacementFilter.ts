import { getDisplacementMap } from "./getDisplacementMap.js";
import { svgCache, type CacheKey } from "../../utils/svgCache.js";

export type DisplacementOptions = {
  width: number;
  height: number;
  radius: number;
  depth: number;
  strength?: number;
  chromaticAberration?: number;
};

/**
 * Creating the displacement filter.
 * Uses dynamic dimensions based on element size.
 * The file complexity is due to the experimental "chromatic aberration" effect;
 * filters from first `feColorMatrix` to last `feBlend` can be removed if the effect is not needed.
 */
export const getDisplacementFilter = ({
  width,
  height,
  radius,
  depth,
  strength = 100,
  chromaticAberration = 0,
}: DisplacementOptions) => {
  // 使用實際尺寸，確保精確對齊
  const actualWidth = Math.max(width, 1);
  const actualHeight = Math.max(height, 1);
  
  // 檢查快取
  const cacheKey: CacheKey = {
    width: actualWidth,
    height: actualHeight,
    radius,
    depth,
    strength,
    chromaticAberration,
  };
  
  const cached = svgCache.get(cacheKey);
  if (cached) {
    return cached;
  }
  
  // 生成新的 SVG
  const svgContent = `data:image/svg+xml;utf8,` +
    encodeURIComponent(`<svg height="${actualHeight}" width="${actualWidth}" viewBox="0 0 ${actualWidth} ${actualHeight}" xmlns="http://www.w3.org/2000/svg">
      <defs>
          <filter id="displace" color-interpolation-filters="sRGB" x="0%" y="0%" width="100%" height="100%">
              <feImage x="0" y="0" height="${actualHeight}" width="${actualWidth}" href="${getDisplacementMap({ width: actualWidth, height: actualHeight, radius, depth })}" result="displacementMap" />
              <feDisplacementMap
                  in="SourceGraphic"
                  in2="displacementMap"
                  scale="${strength + chromaticAberration * 2}"
                  xChannelSelector="R"
                  yChannelSelector="G"
              />
              <feColorMatrix
              type="matrix"
              values="1 0 0 0 0
                      0 0 0 0 0
                      0 0 0 0 0
                      0 0 0 1 0"
              result="displacedR"
                      />
              <feDisplacementMap
                  in="SourceGraphic"
                  in2="displacementMap"
                  scale="${strength + chromaticAberration}"
                  xChannelSelector="R"
                  yChannelSelector="G"
              />
              <feColorMatrix
              type="matrix"
              values="0 0 0 0 0
                      0 1 0 0 0
                      0 0 0 0 0
                      0 0 0 1 0"
              result="displacedG"
                      />
              <feDisplacementMap
                      in="SourceGraphic"
                      in2="displacementMap"
                      scale="${strength}"
                      xChannelSelector="R"
                      yChannelSelector="G"
                  />
                  <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0
                          0 0 0 0 0
                          0 0 1 0 0
                          0 0 0 1 0"
                  result="displacedB"
                          />
                <feBlend in="displacedR" in2="displacedG" mode="screen"/>
                <feBlend in2="displacedB" mode="screen"/>
          </filter>
      </defs>
  </svg>`) +
    "#displace";
  
  // 快取結果
  svgCache.set(cacheKey, svgContent);
  
  return svgContent;
};




