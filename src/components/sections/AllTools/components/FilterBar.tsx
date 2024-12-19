import React from 'react';
import FilterItem from './FilterItem';
import { filters } from '../config/filters';

interface FilterBarProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export default function FilterBar({ activeFilter, onFilterChange }: FilterBarProps) {
  return (
    <div className="flex flex-wrap gap-3 mb-8">
      {filters.map((filter) => (
        <FilterItem
          key={filter.id}
          icon={filter.icon}
          label={filter.label}
          isActive={activeFilter === filter.id}
          onClick={() => onFilterChange(filter.id)}
          color={filter.color}
        />
      ))}
    </div>
  );
}