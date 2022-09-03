require('dotenv').config();
const S3 = require('aws-sdk/clients/s3');
const aws = require('aws-sdk');
const fs = require('fs');
const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new S3({
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
    region: region,
});

//upload the file to s3 bucket
function uploadFile(file) {
    const fileStream = fs.createReadStream(file.path);
    const uploadParams = {
        Bucket: bucketName,
        Body: fileStream,
        Key: file.filename
    }
    return s3.upload(uploadParams).promise()
}
exports.uploadFile = uploadFile

//download the file to s3 bucket
function getFileStream(key) {
    return s3.getObject({ Key: key, Bucket: bucketName }).createReadStream();
}
exports.getFileStream = getFileStream

