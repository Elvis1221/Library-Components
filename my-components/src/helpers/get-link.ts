export const getLink = (link: string, id: string): string => {
  return link.replace(/:id/i, id);
};
