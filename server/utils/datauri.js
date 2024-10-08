import DataUriParser from "datauri/parser.js"
import path from "path";


// Define a function to convert a file to a Data URI
const getDataUri = (file) => {
  // Create a new instance of the DataUriParser
  const parser = new DataUriParser();
  // Get the file extension from the original file name
  const extName = path.extname(file.originalname).toString();
  // Use the parser to convert the file buffer to a Data URI
  // The format method takes the file extension and buffer as arguments
  return parser.format(extName, file.buffer);
}

export default getDataUri;