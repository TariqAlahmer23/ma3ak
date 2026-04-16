export function TypingPulse() {
  return (
    <div className="premium-card-soft inline-flex items-center gap-1 rounded-full px-3 py-2">
      {[0, 1, 2].map((idx) => (
        <span
          key={idx}
          className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted"
          style={{ animationDelay: `${idx * 0.15}s` }}
        />
      ))}
    </div>
  );
}
