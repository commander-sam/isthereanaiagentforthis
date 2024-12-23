// GitHub repository details
const GITHUB_REPO = 'commander-sam/isthereanaiagentforthis';
const GITHUB_BRANCH = 'main';
const LOGO_FOLDER = 'logo';

// Default logo if none is provided
const DEFAULT_LOGO = 'https://raw.githubusercontent.com/commander-sam/isthereanaiagentforthis/main/logo/default.png';

export function getGitHubLogoUrl(filename: string | undefined | null): string {
  if (!filename?.trim()) return DEFAULT_LOGO;
  
  // Clean the filename and ensure it has an extension
  const cleanFilename = filename.trim().toLowerCase();
  const hasExtension = /\.(jpg|jpeg|png|gif|svg)$/i.test(cleanFilename);
  
  // Return the raw GitHub content URL
  return `https://raw.githubusercontent.com/${GITHUB_REPO}/${GITHUB_BRANCH}/${LOGO_FOLDER}/${cleanFilename}${hasExtension ? '' : '.png'}`;
}

export function isValidLogoUrl(url: string): boolean {
  return url.startsWith(`https://raw.githubusercontent.com/${GITHUB_REPO}/${GITHUB_BRANCH}/${LOGO_FOLDER}/`);
}