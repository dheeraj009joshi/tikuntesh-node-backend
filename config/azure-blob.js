const { BlobServiceClient } = require('@azure/storage-blob');

/**
 * Uploads an image from a buffer and returns the URL of the uploaded image.
 *
 * @param {Buffer} imageBuffer - The image file data (buffer from form).
 * @param {String} imageName - The name of the image file (optional).
 * @return {Promise<String>} - The URL of the uploaded image.
 */
async function uploadImageAndGetUrl(imageBuffer, imageName = null) {
  try {
    // SAS Token-based URL
    const sasUrl = 'https://tikuntechwebimages.blob.core.windows.net/?sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2040-09-06T22:21:37Z&st=2024-09-06T14:21:37Z&spr=https&sig=nMvWOuicYnFS%2BS4MVRqzbLYtR4lGCdg5uoomFv8hI88%3D'; // Replace with your SAS URL

    const blobServiceClient = new BlobServiceClient(sasUrl);

    const containerName = 'tikunimages';
    const blobName = imageName || `image-${uuidv4()}.jpg`;

    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    await blockBlobClient.upload(imageBuffer, imageBuffer.length);
    return blockBlobClient.url;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw new Error('Failed to upload image');
  }
}

module.exports = { uploadImageAndGetUrl };
