const { BlobServiceClient } = require('@azure/storage-blob');

// Your connection string
const connectionString = 'DefaultEndpointsProtocol=https;AccountName=tikuntechwebimages;AccountKey=xG8gQX+s+BDQoBDZ0CN9dtgsRA4/tM0JUDb2/4qqeOufeoJ/3DvlK1P0TDyqtknA3S4bXqXnOCYs+AStuuRYDA==;EndpointSuffix=core.windows.net';
console.log(connectionString)
/**
 * Uploads an image from a form and returns the URL of the uploaded image
 * @param {Buffer} imageBuffer - The image file data (Buffer from form)
 * @param {String} imageName - The name of the image file (optional)
 * @return {String} - The URL of the uploaded image
 */
async function uploadImageAndGetUrl(imageBuffer, imageName = null) {
  // Initialize BlobServiceClient using the connection string
  const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);

  const containerName = 'your_container_name'; // Set your container name
  const blobName = imageName || `image-${uuidv4()}.jpg`; // Generate a unique name if not provided

  const containerClient = blobServiceClient.getContainerClient(containerName);
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  await blockBlobClient.upload(imageBuffer, imageBuffer.length);
  return blockBlobClient.url;
}
