import React from 'react';

interface Detail {
  label: string;
  value: React.ReactNode;
}

interface DetailsListProps {
  details: Detail[];
}

export default function DetailsList({ details }: DetailsListProps) {
  return (
    <dl className="space-y-3">
      {details.map((detail, index) => (
        <div key={index}>
          <dt className="text-sm text-gray-400">{detail.label}</dt>
          <dd className="mt-1">{detail.value}</dd>
        </div>
      ))}
    </dl>
  );
}