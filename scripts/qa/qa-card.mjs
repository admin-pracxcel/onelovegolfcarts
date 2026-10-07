// QA for the Pay Now card fields: typing, pasting, spacing, brand, caret,
// backspace over separators, auto-advance and on-blur errors.
import { chromium } from 'playwright';
const url = process.argv[2] || 'http://localhost:3000/pay-now/';
const b = await chromium.launch();
const p = await b.newPage();
await p.addInitScript(() => sessionStorage.setItem('ol-promo-seen:october-special-2026', '1'));
await p.goto(url, { waitUntil: 'networkidle' });
const val = (n) => p.inputValue(`[name="${n}"]`);
const focused = () => p.evaluate(() => document.activeElement?.getAttribute('name'));
const brand = () => p.textContent('.pay-form__brand');
const clear = async (n) => { await p.fill(`[name="${n}"]`, ''); };
const log = (label, ...v) => console.log(label.padEnd(34), ...v.map((x) => JSON.stringify(x)));
let pass = 0, fail = 0;
const expect = (label, got, want) => { const ok = JSON.stringify(got) === JSON.stringify(want); if (ok) pass++; else fail++; log((ok ? 'ok   ' : 'FAIL ') + label, got, ok ? '' : `want ${JSON.stringify(want)}`); };

await p.click('[name="cardNumber"]');
await p.keyboard.type('4242424242424242');
expect('visa typed', await val('cardNumber'), '4242 4242 4242 4242');
expect('visa brand', await brand(), 'Visa');
expect('advance to expiry', await focused(), 'expiry');

await clear('cardNumber'); await p.click('[name="cardNumber"]');
await p.keyboard.type('4242 4242  abc-4242');
expect('manual spaces/letters ignored', await val('cardNumber'), '4242 4242 4242');

await p.keyboard.press('Backspace'); await p.keyboard.press('Backspace'); await p.keyboard.press('Backspace'); await p.keyboard.press('Backspace');
expect('backspace a group', await val('cardNumber'), '4242 4242');
await p.keyboard.press('Backspace');
expect('backspace over space', await val('cardNumber'), '4242 424');

await p.evaluate(() => document.activeElement.setSelectionRange(2, 2));
await p.keyboard.type('9');
expect('insert mid-number', await val('cardNumber'), '4294 2424');
expect('caret after insert', await p.evaluate(() => document.activeElement.selectionStart), 3);

await clear('cardNumber'); await p.click('[name="cardNumber"]');
await p.keyboard.type('378282246310005');
expect('amex grouping', await val('cardNumber'), '3782 822463 10005');
expect('amex brand', await brand(), 'Amex');
await p.click('[name="cvc"]'); await p.keyboard.type('12345');
expect('amex cvc 4 digits', await val('cvc'), '1234');

await clear('cardNumber'); await clear('cvc');
await p.click('[name="cardNumber"]');
await p.evaluate(() => { const i = document.querySelector('[name="cardNumber"]'); i.focus(); });
await p.keyboard.insertText('5555-5555-5555-4444');
expect('paste with dashes', await val('cardNumber'), '5555 5555 5555 4444');
expect('mastercard brand', await brand(), 'Mastercard');
await p.click('[name="cvc"]'); await p.keyboard.type('12345');
expect('cvc 3 digits', await val('cvc'), '123');

await clear('expiry'); await p.click('[name="expiry"]');
await p.keyboard.type('4');
expect('expiry "4" → "04 / "', await val('expiry'), '04 / ');
await p.keyboard.type('28');
expect('expiry complete', await val('expiry'), '04 / 28');
expect('advance to cvc', await focused(), 'cvc');
await p.click('[name="expiry"]'); await p.keyboard.press('End');
await p.keyboard.press('Backspace'); await p.keyboard.press('Backspace');
expect('expiry backspace year', await val('expiry'), '04');
await p.keyboard.press('Backspace');
expect('expiry backspace month', await val('expiry'), '0');
await clear('expiry'); await p.click('[name="expiry"]'); await p.keyboard.type('1/27');
expect('typed slash ignored', await val('expiry'), '12 / 7');

await clear('cardNumber'); await p.click('[name="cardNumber"]'); await p.keyboard.type('4242');
await p.click('[name="amount"]');
expect('blur: incomplete number', await p.textContent('#pf-cardNumber-error'), 'Your card number is incomplete.');
await p.click('[name="cardNumber"]'); await p.keyboard.type('424242424241');
await p.click('[name="amount"]');
expect('blur: invalid number', await p.textContent('#pf-cardNumber-error'), 'Your card number is invalid.');
await clear('expiry'); await p.click('[name="expiry"]'); await p.keyboard.type('0124'); await p.click('[name="amount"]');
expect('blur: past expiry', await p.textContent('#pf-expiry-error'), "Your card's expiry date is in the past.");
await clear('expiry'); await p.click('[name="expiry"]'); await p.keyboard.type('13');
expect('"13" read as "01 / 3"', await val('expiry'), '01 / 3');
await clear('expiry'); await p.click('[name="expiry"]'); await p.keyboard.type('00');
await p.click('[name="amount"]');
expect('blur: bad month', await p.textContent('#pf-expiry-error'), "Your card's expiry month is invalid.");
await p.click('[name="cardNumber"]');
expect('error clears while fixing', await p.locator('#pf-cardNumber-error').count(), 1);
await p.keyboard.type('2');
expect('error hidden on edit', await p.locator('#pf-cardNumber-error').count(), 0);

console.log(`\n${pass} passed, ${fail} failed`);
await b.close();
