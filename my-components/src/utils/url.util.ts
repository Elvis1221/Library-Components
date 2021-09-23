type QuerySimpleTypes = string | number | boolean;
export type QueryObject = {
  [key: string]: QuerySimpleTypes | Array<QuerySimpleTypes>;
};

export function getUrl(...urlParts: string[]): string {
  return urlParts.join('');
}

export function parseQuery(query: string): {
  [key: string]: string | string[];
} {
  const queryObject: { [key: string]: string | string[] } = {};

  if (query.length > 1) {
    const pairs = query.substring(1).split('&');
    pairs.forEach((pair) => {
      const keyValues = pair.split('=');
      const key = keyValues.shift();
      const value = keyValues.join('=');
      if (key) {
        const objectValue = queryObject[key];
        const decodedValue = decodeURIComponent(value);
        if (objectValue) {
          queryObject[key] = Array.isArray(objectValue)
            ? [...objectValue, decodedValue]
            : [objectValue, decodedValue];
        } else queryObject[key] = decodedValue;
      }
    });
  }

  return queryObject;
}

export function generateQuery(object: QueryObject): string {
  return (
    '?' +
    Object.keys(object)
      .map((key) => {
        let urlPart = '';
        if (object[key] != null && object[key] !== '') {
          if (Array.isArray(object[key])) {
            urlPart = generateQueryPartFromArray(
              key,
              object[key] as Array<QuerySimpleTypes>,
            );
          } else {
            urlPart = `${key}=${encodeURIComponent(
              object[key] as QuerySimpleTypes,
            )}`;
          }
        }
        return urlPart;
      })
      .filter((urlPart) => !!urlPart)
      .join('&')
  );
}

function generateQueryPartFromArray(
  key: string,
  array: Array<QuerySimpleTypes>,
): string {
  return array
    .map((element) =>
      element != null && element !== ''
        ? `${key}=${encodeURIComponent(element)}`
        : '',
    )
    .filter((urlPart) => !!urlPart)
    .join('&');
}
