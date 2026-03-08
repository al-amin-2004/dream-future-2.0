export const createMapById = <T extends { _id?: string | number }>(
  data: T[],
): Record<string, T> => {
  return Object.fromEntries(data.map((item) => [item._id?.toString(), item]));
};
