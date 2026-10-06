'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { business, urls } from '@/lib/business';
import { Icon } from './Icon';

/** Mobile booking bar: visible between the hero and the final CTA / footer. */
export function BookBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hero = document.querySelector('.hero');
    const ends = document.querySelectorAll('.final-cta, .site-footer');
    if (!hero) return;
    let heroIn = true;
    const endIn = new Set<Element>();
    const update = () => setShow(!heroIn && endIn.size === 0);
    const heroIo = new IntersectionObserver(
      ([e]) => {
        heroIn = e.isIntersecting;
        update();
      },
      { threshold: 0.05 },
    );
    const endIo = new IntersectionObserver((entries) => {
      entries.forEach((e) => (e.isIntersecting ? endIn.add(e.target) : endIn.delete(e.target)));
      update();
    });
    heroIo.observe(hero);
    ends.forEach((el) => endIo.observe(el));
    return () => {
      heroIo.disconnect();
      endIo.disconnect();
    };
  }, []);

  return (
    <div className={`book-bar${show ? ' is-visible' : ''}`} aria-hidden={!show}>
      <p className="book-bar__price">
        <span>From</span> <strong>${business.rates['4-seater'].day}</strong>
        <span>/day</span>
      </p>
      <Link className="btn btn--primary" href={urls.book} prefetch={false} tabIndex={show ? 0 : -1}>
        Book now <Icon name="arrow" />
      </Link>
    </div>
  );
}
