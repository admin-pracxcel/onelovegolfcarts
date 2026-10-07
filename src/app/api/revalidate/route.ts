import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook';
import { revalidateTag } from 'next/cache';
import { SANITY_TAG } from '@/lib/sanity';

/**
 * Sanity webhook: publishing, editing or deleting content refreshes every page
 * that reads from Sanity. Set up in sanity.io/manage → API → Webhooks with this
 * URL and SANITY_REVALIDATE_SECRET as the secret.
 */
export async function POST(req: Request) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) return Response.json({ ok: false, error: 'Not configured' }, { status: 501 });

  const body = await req.text();
  const signature = req.headers.get(SIGNATURE_HEADER_NAME) ?? '';
  if (!(await isValidSignature(body, signature, secret))) {
    return Response.json({ ok: false, error: 'Invalid signature' }, { status: 401 });
  }

  // Expire immediately: the next visit renders fresh content.
  revalidateTag(SANITY_TAG, { expire: 0 });
  return Response.json({ ok: true, revalidated: SANITY_TAG, at: new Date().toISOString() });
}
