import { CLOSE, SHOW } from "@/utils/commonConstants"
import { NotificationPayload } from "@/utils/types"


export const actionShowNotificationModal = (message:string,hanldeServiceConfirm: () => void) : NotificationPayload => {
    return {
        type: SHOW,
        message: message,
        handleServiceConfirm: hanldeServiceConfirm
    }
}
export const actionCloseNotificationModal = ():NotificationPayload => {
    return {
        type: CLOSE
    }
}