import { useEffect, useRef, useState } from "react";
import "../../../assets/css/composite/formik/uploadImg.css"
import { convertFileToImg } from "../../../constants/common/fomik";
import { fileChange, getObject } from "../../../config/S3Config";
import { FILE_IMAGE } from "../../../utils/commonConstants";
function UploadImg() {
    const [selectedFile, setSelectedFile] = useState(null);
    const fileUploadRef = useRef(null);
    const [testAws, setTestAws] = useState(null)
    useEffect(() => {
        test()
    }, [])

    const handleFileUpload = () => {
        fileUploadRef.current.click();
    };
    const test = async () => {
        try {
            const response = await getObject("filestore/files/file/1719717658077_add.apache.maven.txt")
            console.log(response)
            setTestAws(response)
        } catch (error) {

        }
    }
    const handleFileChange = (event) => {
        fileChange(setSelectedFile, FILE_IMAGE, event)
    }
    console.log(selectedFile)
    console.log(testAws)
    return (
        <div className="col-12 card-upload-img">
            <label>Hình ảnh</label>
            <input type="file" id="file" style={{ display: 'none' }} ref={fileUploadRef} onChange={handleFileChange} accept=".png,.jpg" />
            <div className="card-upload-img-upload">
                <button className="card-upload-img-upload-button" value="Upload" onClick={handleFileUpload}><i className="fa-solid fa-upload" />Chọn hình ảnh</button>
                {selectedFile ? (
                    <img
                        style={{ width: '200px', height: '100px' }}
                        src={testAws}
                        alt="Selected"
                    />
                ) : (
                    <img style={{ display: 'none' }} alt="" />)}
            </div>
        </div>
    )
}
export default UploadImg;