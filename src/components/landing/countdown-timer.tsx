"use client";

import { useEffect, useMemo, useState } from "react";

function getDeadline() {
  const now = new Date();
  const deadline = new Date(now);
  deadline.setHours(23, 59, 59, 999);
  return deadline.getTime();
}

function getRemaining(deadline: number) {
  const total = Math.max(0, deadline - Date.now());
  const hours = Math.floor(total / 1000 / 60 / 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const seconds = Math.floor((total / 1000) % 60);

  return { total, hours, minutes, seconds };
}

export function CountdownTimer({ compact = false }: { compact?: boolean }) {
  const deadline = useMemo(getDeadline, []);
  const [remaining, setRemaining] = useState(() => getRemaining(deadline));

  useEffect(() => {
    const interval = window.setInterval(() => setRemaining(getRemaining(deadline)), 1000);
    return () => window.clearInterval(interval);
  }, [deadline]);

  const items = [
    ["Horas", remaining.hours],
    ["Min", remaining.minutes],
    ["Seg", remaining.seconds],
  ];

  return (
    <div className={compact ? "countdown countdown-compact" : "countdown"} aria-label="Cuenta regresiva de la oferta">
      {items.map(([label, value]) => (
        <span key={label}>
          <strong>{String(value).padStart(2, "0")}</strong>
          <small>{label}</small>
        </span>
      ))}
    </div>
  );
}
