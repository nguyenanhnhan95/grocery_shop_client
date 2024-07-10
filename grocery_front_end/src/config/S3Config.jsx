import {
    S3Client, PutObjectCommand, CreateBucketCommand,
    DeleteObjectCommand,
    DeleteBucketCommand,
    paginateListObjectsV2,
    GetObjectCommand,
    ListObjectsV2Command,
    S3,
} from "@aws-sdk/client-s3";
import { FILE_IMAGE, connectAWSParams } from "../utils/commonConstants";
const s3Client = new S3Client({
    region: connectAWSParams.region,
    credentials: {
        accessKeyId: connectAWSParams.accessKeyId,
        secretAccessKey: connectAWSParams.secretAccessKey,
    },
});
export const fileChange = (setFile, typeFile, event) => {
    const selectedFile = event.target.files[0];
    console.log(event.target.files[0].size)
    switch (typeFile) {
        case FILE_IMAGE:
            setFile(selectedFile)
            break;
        default:
            return;
    }
};
export const getObject = async (keyName) => {
    try {
        const response = await s3Client.send(new GetObjectCommand({
            Bucket: connectAWSParams.bucketName,
            Key: keyName,
        }));
        console.log(response)
        const str = await response.Body?.transformToByteArray();
        const blob = new Blob([str], { type: response.ContentType });
        var blobUrl = URL.createObjectURL(blob)
        console.log(response.ContentType)
        return str;
    } catch (error) {
        console.error(error)
    }
}
export const putObject = async (keyName, body) => {
    try {
        const results = await s3Client.send(new PutObjectCommand({
            Bucket: connectAWSParams.bucketName,
            Key: keyName,
            Body: body, // Dữ liệu tải lên
        }));
        return results;
    } catch (error) {
        console.error(error);// Ném lỗi ra ngoài nếu cần xử lý thêm
    }
};

