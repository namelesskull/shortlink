export function urlIsValid(url: string): boolean {
  if (!url.match(/^[a-zA-Z]+:\/\//)) {
    url = 'https://' + url;
  }

  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
}
