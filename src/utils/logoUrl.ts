// GitHub repository details
const GITHUB_REPO = 'commander-sam/isthereanaiagentforthis';
const GITHUB_BRANCH = 'main';
const LOGO_FOLDER = 'Logo';

export function getGitHubLogoUrl(filename: string): string {
  if (!filename) return '';
  
  // Clean the filename and ensure it has an extension
  const cleanFilename = filename.trim();
  const hasExtension = /\.(jpg|jpeg|png|gif|svg)$/i.test(cleanFilename);
  
  // Return the raw GitHub content URL
  return `https://raw.githubusercontent.com/${GITHUB_REPO}/${GITHUB_BRANCH}/${LOGO_FOLDER}/${cleanFilename}${hasExtension ? '' : '.png'}`;
}