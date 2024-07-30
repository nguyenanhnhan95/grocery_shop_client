import { useDispatch, useSelector } from "react-redux";
import "../../../assets/css/admin/common/sectionActionAdmin.css"
import { Link } from "react-router-dom";
import { memo,  } from "react";
import { createDataEdit } from "../../../redux/slice/admin/actionAdmin";
function SectionActionAdmin() {
  const {itemAction,initialForm ,httpNavigate} = useSelector((state) => state.actionAdmin);
  const dispatch=useDispatch()
  const handleDirectSave=()=>{
    dispatch(createDataEdit(initialForm))
  }
  return (
    <>
      <div className="main-content-action">
        <div className="container-fluid container-content-action">
          <div className="row">
            <div className="col-12 col-md-6 d-flex justify-content-start ">
              <Link to={`${httpNavigate}/add`} onClick={handleDirectSave} style={{display:itemAction.add.style.display}}><button type="button"><i className={itemAction.add.icon} />{itemAction.add.name}</button>
              </Link>
            </div>
            <div className="col-12 col-md-6 d-flex justify-content-end">
              <button type="button" style={{display:itemAction.excel.style.display}}><i className={itemAction.excel.icon} />{itemAction.excel.name}</button>
            </div>
          </div>
        </div>
      </div>
    </>

  )
}
export default memo(SectionActionAdmin);