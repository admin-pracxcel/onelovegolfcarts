import { countryFromRequest } from '@/lib/lead-server';

/** The visitor's country code from their IP, for the forms' Lead Country field. */
export async function GET(request: Request) {
  const country = await countryFromRequest(request.headers);
  return Response.json({ country }, { headers: { 'Cache-Control': 'private, no-store' } });
}
