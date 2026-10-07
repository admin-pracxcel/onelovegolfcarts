'use client';

import { useState } from 'react';

/**
 * Filter buttons for a server-rendered list: sets data-area on the target,
 * and CSS hides items from other areas. Without JavaScript every item shows.
 */
export function AreaFilter({ target, areas, counts }: { target: string; areas: [string, string][]; counts: Record<string, number> }) {
  const [area, setArea] = useState('all');
  const pick = (a: string) => {
    setArea(a);
    document.getElementById(target)?.setAttribute('data-area', a);
  };
  const total = Object.values(counts).reduce((x, y) => x + y, 0);
  return (
    <div className="area-filter" role="group" aria-label="Show stops in">
      {[['all', 'All stops'] as [string, string], ...areas].map(([key, label]) => (
        <button key={key} type="button" aria-pressed={area === key} aria-controls={target} onClick={() => pick(key)}>
          {label} <span>{key === 'all' ? total : counts[key]}</span>
        </button>
      ))}
    </div>
  );
}
