import { CsvHeader } from './types';

export const CSV_HEADERS: CsvHeader[] = [
  { field: 'name', variations: ['name', 'agentname', 'title'] },
  { field: 'shortDescription', variations: ['shortdescription', 'description', 'desc', 'shortdesc', 'about'] },
  { field: 'source', variations: ['source', 'sourcetype', 'type'] },
  { field: 'pricing', variations: ['pricing', 'price', 'pricingmodel', 'cost'] },
  { field: 'contactEmail', variations: ['contactemail', 'email', 'contact'] },
  { field: 'websiteUrl', variations: ['websiteurl', 'website', 'url', 'link', 'websiteURL'] },
  { field: 'category', variations: ['category', 'categoryid'] },
  { field: 'logoFilename', variations: ['logofilename', 'logo', 'image', 'imagefilename'] }
];

export const REQUIRED_FIELDS = [
  'name',
  'shortDescription',
  'source',
  'pricing',
  'contactEmail',
  'websiteUrl',
  'category'
];

export const normalizeHeader = (header: string): string => {
  return header.toLowerCase().replace(/[^a-z]/g, '');
};