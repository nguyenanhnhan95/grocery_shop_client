import axios from "axios";
import { linkHttp } from "../../utils/commonConstants";
export const getListMainMenu = async (headers) => {
        const response = await axios.get(linkHttp.linkMenuAdminSide, headers);
        return response.data;

}