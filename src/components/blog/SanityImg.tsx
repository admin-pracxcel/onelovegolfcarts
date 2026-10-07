import { imageSize, imageSrcSet, imageUrl, type SanityImage } from '@/lib/sanity';

/** Responsive <img> for a Sanity image (AVIF/WebP via the CDN's auto=format). */
export function SanityImg({
  image,
  sizes,
  aspect,
  priority,
  className,
  alt,
}: {
  image?: SanityImage;
  sizes: string;
  aspect?: number;
  priority?: boolean;
  className?: string;
  alt?: string;
}) {
  const size = imageSize(image);
  if (!image || !size) return null;
  const ratio = aspect ?? size.width / size.height;
  const widths = [480, 768, 1024, 1440, 1920].filter((w) => w <= size.width);
  const ws = widths.length ? widths : [size.width];
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={className}
      src={imageUrl(image, ws[Math.min(2, ws.length - 1)], aspect)}
      srcSet={imageSrcSet(image, ws, aspect)}
      sizes={sizes}
      width={ws[ws.length - 1]}
      height={Math.round(ws[ws.length - 1] / ratio)}
      alt={alt ?? image.alt ?? ''}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      decoding="async"
    />
  );
}
