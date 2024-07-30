import {
    S3Client, PutObjectCommand,
    GetObjectCommand,
} from "@aws-sdk/client-s3";
import { FILE_IMAGE, SLASH, THIS_FILE_EXISTING, UNDER_STROKE, connectAWSParams } from "../utils/commonConstants";
import { validation } from "../utils/validation";
import { getDateCurrent } from "../utils/commonUtils";
const s3Client = new S3Client({
    region: connectAWSParams.region,
    credentials: {
        accessKeyId: connectAWSParams.accessKeyId,
        secretAccessKey: connectAWSParams.secretAccessKey,
    },
});
export const checkFile = (typeFile, file) => {
    console.log(getDateCurrent().getTime())
    if (file !== undefined && file instanceof File) {
        console.log(file.lastModified)
        switch (typeFile) {
            case FILE_IMAGE:
                console.log(file)
                return file;
            default:
                return;
        }
    }

};
const uploadToServer = (file, directory) => {
    if (validation.isNotEmpty(directory) && file instanceof File) {
        const fileName = directory + SLASH + file.lastModified + UNDER_STROKE + file.name;

    }
}
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
        return blobUrl;
    } catch (error) {
        if (error.$metadata && error.$metadata.httpStatusCode === 404) {
            return error.$metadata.httpStatusCode;
        } else {
            console.error('Error:', error.message);
        }
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

