'use client';
import { connectAWSParams } from "@/utils/commonConstants";
import {
    S3Client, PutObjectCommand, GetObjectCommand, GetObjectCommandOutput,
} from "@aws-sdk/client-s3";


// Type definitions


const s3Client = new S3Client({
    region: connectAWSParams.region as string,
    credentials: {
        accessKeyId: connectAWSParams.accessKeyId as string,
        secretAccessKey: connectAWSParams.secretAccessKey as string,
    },
});



// Function to get object URL as image
export const getObjectUrlImage = async (keyName: string): Promise<string | undefined> => {
    try {
        const response: GetObjectCommandOutput = await s3Client.send(new GetObjectCommand({
            Bucket: connectAWSParams.bucketName,
            Key: keyName,
        }));
        const str = await response.Body?.transformToByteArray();
        if (str) {
            const blob = new Blob([str], { type: response.ContentType || 'application/octet-stream' });
            const blobUrl = URL.createObjectURL(blob);
            return blobUrl;
        }
    } catch (error) {
        console.error(error);
    }
    return undefined;
};

// Function to get S3 object as a File
export const getObjectAsFile = async (keyName: string): Promise<File | undefined> => {
    try {
        const response: GetObjectCommandOutput = await s3Client.send(new GetObjectCommand({
            Bucket: connectAWSParams.bucketName,
            Key: keyName,
        }));

        const typeFile = typeFileFromKeyName(keyName);
        const str = await response.Body?.transformToByteArray();
        if (str) {
            const blob = new Blob([str], { type: typeFile || response.ContentType || 'application/octet-stream' });
            const file = new File([blob], keyName, { type: typeFile || response.ContentType || 'application/octet-stream' });
            return file;
        }
    } catch (error) {
        console.error(error);
    }
    return undefined;
};

// Function to put object into S3 bucket
export const putObject = async (keyName: string, body: Buffer | Blob | string): Promise<any> => {
    try {
        const results = await s3Client.send(new PutObjectCommand({
            Bucket: connectAWSParams.bucketName,
            Key: keyName,
            Body: body,
        }));
        return results;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// Function to get file type from key name
const typeFileFromKeyName = (keyName: string): string | undefined => {
    const extension = keyName.substring(keyName.lastIndexOf(".") + 1);
    const mimeTypeMap: Record<string, string> = {
        "png": "image/png",
        "jpeg": "image/jpeg",
        "jpg": "image/jpeg",
    };
    return mimeTypeMap[extension];
};