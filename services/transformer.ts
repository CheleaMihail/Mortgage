// transformer.ts
export const transformToCamelCase = (data: any): any => {
    if (Array.isArray(data)) {
      return data.map((item) => transformToCamelCase(item));
    } else if (typeof data === "object" && data !== null) {
      return Object.entries(data).reduce((acc, [key, value]) => {
        const camelKey = key.replace(/_([a-z])/g, (_, letter) =>
          letter.toUpperCase()
        );
        acc[camelKey] = transformToCamelCase(value);
        return acc;
      }, {} as any);
    }
    return data;
  };
  