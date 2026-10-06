/**
 * PayPal Orders API v2 (server side). Configure with:
 *   NEXT_PUBLIC_PAYPAL_CLIENT_ID   PayPal REST app client ID (also loads the buttons)
 *   PAYPAL_CLIENT_SECRET           its secret (server only)
 *   PAYPAL_ENV                     "live" or "sandbox" (default sandbox)
 */
const base = () => (process.env.PAYPAL_ENV === 'live' ? 'https://api-m.paypal.com' : 'https://api-m.sandbox.paypal.com');

export const paypalConfigured = () => Boolean(process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID && process.env.PAYPAL_CLIENT_SECRET);

async function token() {
  const auth = Buffer.from(`${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`).toString('base64');
  const res = await fetch(`${base()}/v1/oauth2/token`, {
    method: 'POST',
    headers: { Authorization: `Basic ${auth}`, 'Content-Type': 'application/x-www-form-urlencoded' },
    body: 'grant_type=client_credentials',
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`PayPal auth ${res.status}`);
  return ((await res.json()) as { access_token: string }).access_token;
}

export async function paypalCreateOrder(amount: string, description: string) {
  const res = await fetch(`${base()}/v2/checkout/orders`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${await token()}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      intent: 'CAPTURE',
      purchase_units: [{ amount: { currency_code: 'USD', value: amount }, description: description.slice(0, 127) }],
      application_context: { shipping_preference: 'NO_SHIPPING', user_action: 'PAY_NOW', brand_name: 'One Love Golf Cart Rentals' },
    }),
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`PayPal create ${res.status}`);
  return ((await res.json()) as { id: string }).id;
}

export async function paypalCaptureOrder(orderId: string) {
  const res = await fetch(`${base()}/v2/checkout/orders/${encodeURIComponent(orderId)}/capture`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${await token()}`, 'Content-Type': 'application/json' },
    cache: 'no-store',
  });
  const data = (await res.json()) as {
    status?: string;
    purchase_units?: { payments?: { captures?: { id: string; status: string; amount: { value: string } }[] } }[];
  };
  const capture = data.purchase_units?.[0]?.payments?.captures?.[0];
  return { ok: res.ok && data.status === 'COMPLETED', captureId: capture?.id ?? '', amount: capture?.amount.value ?? '' };
}
