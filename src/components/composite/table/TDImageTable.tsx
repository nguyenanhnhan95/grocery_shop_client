'use client'
import { useFetchImageUrl } from "@/hooks/aws/useFetchImageUrl"
import { FILE_STORE_AWS_PATH } from "@/utils/commonConstants"
import { memo, useEffect } from "react"
import imageError from "./../../../../public/image/image-error.jpg"
import "./styles/tdImageTable.css"
interface TDImageTableProps {
    srcImage: string;
}
function TDImageTable({ srcImage }: TDImageTableProps) {
    const { fetchUrlImage, data, isPending, error } = useFetchImageUrl()
    useEffect(() => {
        if (srcImage && srcImage.includes(FILE_STORE_AWS_PATH.IMAGE)) {
            fetchUrlImage(srcImage);
        }
    }, [srcImage, fetchUrlImage]);
    const imageSrc = error ? imageError.src : data || undefined;
    return (
        <div className={isPending ? `loading-td-image` : ''}>
            <div className="contain-td-image">
                {srcImage  ? (
                    <img
                        src={imageSrc}
                        alt=""
                        onError={(e) => {
                            const target = e.target as HTMLImageElement; // TypeScript now knows it's an <img> element
                            target.src = imageError.src; // Set error image if the image fails to load
                        }}
                    />
                ) : null}
            </div>
        </div>
    )
}
export default memo(TDImageTable)