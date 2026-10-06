import { imageInfo, type ImageName } from '@/lib/images';

type Props = {
  name: ImageName;
  alt: string;
  sizes: string;
  className?: string;
  /** LCP image: eager + fetchpriority=high. Otherwise lazy. */
  priority?: boolean;
};

/**
 * <picture> over pre-built AVIF → WebP → JPEG variants with explicit
 * width/height (no CLS). Used instead of next/image so the art-directed,
 * pre-compressed files are served as-is on any host, including static export.
 */
export function Picture({ name, alt, sizes, className = 'cover', priority = false }: Props) {
  const img = imageInfo(name);
  return (
    <picture>
      <source type="image/avif" srcSet={img.srcset('avif')} sizes={sizes} />
      <source type="image/webp" srcSet={img.srcset('webp')} sizes={sizes} />
      <img
        src={img.src}
        srcSet={img.srcset('jpg')}
        sizes={sizes}
        width={img.width}
        height={img.height}
        alt={alt}
        className={className}
        decoding="async"
        {...(priority ? { fetchPriority: 'high' as const } : { loading: 'lazy' as const })}
      />
    </picture>
  );
}
