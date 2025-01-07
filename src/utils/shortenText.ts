
/** This function shortens the text by taking the first 5 characters and the last 5 characters of the text and concatenating them with "...." in between.
 * Example: shortenTextType1Function("Hello World") => "Hello....World"
 * @param text 
 * @param len 
 * @returns 
 */
export const shortenTextType1Function = (text: string, len = 5) => {
  return text.slice(0, len) + "...." + text.slice(-len);
};

/** This function shortens the text by taking the first 5 characters of the text and concatenating them with "....".
 * Example: shortenTextType2Function("Hello World") => "Hello...."
 * @param text 
 * @param len 
 * @returns 
 */
export const shortenTextType2Function = (text: string, len = 5) => {
  return text.slice(0, len) + "....";
}