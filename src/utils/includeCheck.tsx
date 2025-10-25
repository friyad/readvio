// Check is this pathname is included on the rootPaths or
// pathname start with any element of the roothPaths array
export const includeCheck = (rootPaths: string[], pathname: string) => {
  if (rootPaths.includes(pathname)) {
    return true;
  }
  const isStartWithExist = rootPaths.find(
    (path) => pathname !== "/" && pathname.startsWith(path)
  );
  if (isStartWithExist) {
    return true;
  }
  return false;
};
