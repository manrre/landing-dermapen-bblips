"use client";

import dynamic from "next/dynamic";

const QualificationForm = dynamic(
  () => import("@/components/qualification-form").then((module) => module.QualificationForm),
  {
    ssr: false,
    loading: () => (
      <div className="premium-card rounded-[28px] p-5 md:p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-5 w-28 rounded-full bg-[#0E3A46]/10" />
          <div className="h-9 w-56 rounded-full bg-[#0E3A46]/10" />
          <div className="h-14 rounded-2xl bg-[#0E3A46]/10" />
          <div className="h-14 rounded-2xl bg-[#0E3A46]/10" />
          <div className="h-14 rounded-2xl bg-[#0E3A46]/10" />
          <div className="h-14 rounded-full bg-[#0E3A46]/10" />
        </div>
      </div>
    ),
  },
);

export function QualificationFormLazy() {
  return <QualificationForm />;
}
