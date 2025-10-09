export function getImageUrl(path: string) {
  if (path.startsWith('File:')) {
    return `https://commons.wikimedia.org/wiki/Special:FilePath/${path.replaceAll(' ', '_')}`;
  }
  return path;
}
