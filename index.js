const AWS = require("aws-sdk");
const s3 = new AWS.S3();

module.exports.handler = async (event, context) =>{
    const {bucketName, keyName} = event;
    const size = await sizeOf(keyName, bucketName);
    const isFileTooBig = await isS3FileTooBig(keyName, bucketName);
    console.log(size, isFileTooBig);
    return size;
}

/**
 * Retrieve the file size of S3 object without downloading.
 * @param {string} key    Key of S3 object
 * @param {string} bucket Bucket of S3 Object
 * @return {int} Length of S3 object in bytes.
 */
async function sizeOf(key, bucket) {
    let res = await s3.headObject({ Key: key, Bucket: bucket }).promise();
    return res.ContentLength;
}

/**
 * Check if S3 object is larger then the MAX_FILE_SIZE set.
 * @param {string} s3ObjectKey       Key of S3 Object
 * @param {string} s3ObjectBucket   Bucket of S3 object
 * @return {boolean} True if S3 object is larger then MAX_FILE_SIZE
 */
async function isS3FileTooBig(s3ObjectKey, s3ObjectBucket)
{
    let fileSize = await sizeOf(s3ObjectKey, s3ObjectBucket);
    return (fileSize > constants.MAX_FILE_SIZE);
}

//or
// async function handler (event, context) {

// } 

// //or 
// const handler = async() = (event, context) => {

// }

// module.exports = handler;