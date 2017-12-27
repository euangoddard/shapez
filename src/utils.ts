export function iter<T>(
  iterable: ArrayLike<T>,
  callback: (element: T) => void,
) {
  return Array.prototype.forEach.call(iterable, callback);
}
