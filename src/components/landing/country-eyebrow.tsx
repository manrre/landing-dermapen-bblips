"use client";
import { useEffect, useState } from "react";

export function CountryEyebrow() {
  const [countryName, setCountryName] = useState("Colombia");

  useEffect(() => {
    fetch("/api/pricing")
      .then(r => r.json())
      .then(d => setCountryName(d.countryName || "tu pais"))
      .catch(() => {});
  }, []);

  return <p className="eyebrow">Formacion estetica online · {countryName}</p>;
}
