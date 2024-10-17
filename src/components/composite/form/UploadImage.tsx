import React, { useState, useRef, memo } from 'react';
import { useFormikContext, useField } from 'formik';
import { ALLOW_IMAGES_File } from '@/utils/commonConstants';
import ImageModal from '../modal/ImageModal';
import "./styles/uploadImg.css"
interface UploadImgProps {
    name: string;
    multi: boolean;
}

const UploadImg: React.FC<UploadImgProps> = ({ ...props }) => {

    const { setFieldValue } = useFormikContext<any>();
    const fileUploadRef = useRef<HTMLInputElement | null>(null);
    const multi = props?.multi ?? false;
    const [field] = useField(props.name);
    const [show, setShow] = useState(false);
    const [urlImage, setUrlImage] = useState<string>('');
    const handleFileUpload = () => {
        if (fileUploadRef.current) {
            fileUploadRef.current.click();
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;

        if (files) {
            const newFiles = Array.from(files).filter(file => {
                // Check for duplicate files
                return !multi || !field.value.some((f: File) => f.name === file.name);
            });
            if (newFiles.length > 0) {
                setFieldValue(field.name, multi ? [...field.value, ...newFiles] : [newFiles[0]]);
            }
        }
    };

    const handleShowImage = (url: string) => {
        setUrlImage(url);
        setShow(true);
    };

    const handleDeleteImage = (index: number) => {
        const newFiles = field.value.filter((_: File, i: number) => i !== index);
        setFieldValue(field.name, newFiles);
    };


    return (
        <div className="card-upload-images">
            <div className="col-12 card-upload-tile">
                <div className="card-body-label">
                    <label>Hình ảnh</label>
                </div>
                <input
                    type="file"
                    id="file"
                    style={{ display: 'none' }}
                    ref={fileUploadRef}
                    onChange={handleFileChange}
                    accept={ALLOW_IMAGES_File}
                />
                <div className="card-body-button-upload">
                    <button type="button" className="card-upload-button" onClick={handleFileUpload}>
                        <i className="fa-solid fa-upload" />Chọn hình ảnh
                    </button>
                </div>
            </div>
            <div className="card-body card-show-images row">
                {field.value && field.value.map((file:File, index:number) => (
                    <div className="col-3 col-sm-6 col-md-4 col-xl-2 card-show-images-item" key={index}>
                        <img
                            src={URL.createObjectURL(file)}
                            alt=""
                            onClick={() => handleShowImage(URL.createObjectURL(file))}
                        />
                        <div className="delete-images-item" onClick={() => handleDeleteImage(index)}>
                            <i className="fa-solid fa-xmark"></i>
                        </div>
                    </div>
                ))}
                <ImageModal show={show} urlImage={urlImage} handleShow={setShow} />
            </div>
        </div>
    );
};

export default memo(UploadImg);
