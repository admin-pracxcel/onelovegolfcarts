import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'One Love Golf Cart Rentals',
    short_name: 'One Love',
    start_url: '/',
    display: 'browser',
    theme_color: '#0a1a3a',
    background_color: '#f5efe4',
    icons: [
      { src: '/img/favicon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/img/favicon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  };
}
