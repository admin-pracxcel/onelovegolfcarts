/** Shared by the booking server action and form (a 'use server' file may only export async functions). */

export type BookingField =
  | 'firstName'
  | 'lastName'
  | 'phone'
  | 'email'
  | 'hotel'
  | 'startDate'
  | 'startTime'
  | 'returnDate'
  | 'returnTime'
  | 'cart'
  | 'mode'
  | 'deliverTo'
  | 'message';

export type BookingValues = Record<BookingField, string>;

export const BOOKING_FIELDS: BookingField[] = ['firstName', 'lastName', 'phone', 'email', 'hotel', 'startDate', 'startTime', 'returnDate', 'returnTime', 'cart', 'mode', 'deliverTo', 'message'];

export const CART_LABELS: Record<string, string> = { '4-seater': '4 Seater', '6-seater': '6 Seater' };
export const MODE_LABELS: Record<string, string> = { delivery: 'Delivery', pickup: 'Pickup at our office' };

/** The booking as plain lines, for the email and for the WhatsApp fallback. */
export function bookingLines(v: BookingValues) {
  return [
    `Name: ${v.firstName} ${v.lastName}`.trim(),
    `Phone: ${v.phone}`,
    `Email: ${v.email}`,
    `Hotel: ${v.hotel}`,
    `Start: ${v.startDate} ${v.startTime}`.trim(),
    `Return: ${v.returnDate} ${v.returnTime}`.trim(),
    `Cart: ${CART_LABELS[v.cart] ?? ''}`,
    `Delivery or pickup: ${MODE_LABELS[v.mode] ?? ''}`,
    `Deliver to: ${v.deliverTo || 'n/a'}`,
    `Message: ${v.message || 'n/a'}`,
  ];
}
