export const shortenTextFunction = (text: string, len = 5) => {
  return text.slice(0, len) + "...." + text.slice(-len);
};