import manifest from './image-manifest.json';

/** Pre-built AVIF/WebP/JPEG variants in /public/img (see tools/build-images.mjs). */
export type ImageName = keyof typeof manifest;

export function imageInfo(name: ImageName) {
  const info = manifest[name];
  const max = info.widths[info.widths.length - 1];
  return {
    widths: info.widths,
    width: max,
    height: Math.round((info.h * max) / info.w),
    srcset: (ext: 'avif' | 'webp' | 'jpg') => info.widths.map((w) => `/img/${name}-${w}.${ext} ${w}w`).join(', '),
    src: `/img/${name}-${max}.jpg`,
  };
}
