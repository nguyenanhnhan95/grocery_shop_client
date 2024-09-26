import { memo } from "react";
import LoadingBar from 'react-top-loading-bar'
import { CSS0693e3 } from "../../utils/commonConstants";

import { useAppDispatch, useAppSelector } from "@/lib/redux";
import { RootState } from "@/setting/store";
import { chaneProgressTop } from "@/redux/slice/common/loadingBarTop";
function LoadingBarTop() {
    const dispatch = useAppDispatch();
    const {progress} = useAppSelector((state: RootState)=>state.loadingBarTop)
    return (
        <div>
            <LoadingBar
                color={CSS0693e3}
                progress={progress}
                
                onLoaderFinished={() => dispatch(chaneProgressTop(0))}
            />
        </div>
    )
}
export default memo(LoadingBarTop)