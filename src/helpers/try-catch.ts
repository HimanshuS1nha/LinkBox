export function tryCatch<T>(
  promise: Promise<T>
): Promise<[undefined, T] | [Error]> {
  return promise
    .then((res) => {
      return [undefined, res] as [undefined, T];
    })
    .catch((e) => {
      return [e];
    });
}
