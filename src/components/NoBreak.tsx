/** Keeps hyphenated terms ("4-Seater", "off-season") from breaking across lines. */
export function NoBreak({ text }: { text: string }) {
  return text.split(/(\S+-\S+)/g).map((part, i) =>
    /\S+-\S+/.test(part) ? (
      <span key={i} className="nowrap">
        {part}
      </span>
    ) : (
      part
    ),
  );
}
