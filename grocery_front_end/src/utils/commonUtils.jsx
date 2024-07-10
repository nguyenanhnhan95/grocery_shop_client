
import DateItemSearch from "../components/composite/search/DateItemSearch";
import InputDataSearch from "../components/composite/search/InputDataSearch";
import SelectItemSearch from "../components/composite/search/SelectItemSearch";
import { constLogin, DOMAIN_CLIENT, DOMAIN_SERVER, linkHttp } from "./commonConstants";
/**
* AUTHENTICATION 
*/
export const createHeader = () => {
    return {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem(constLogin.ACCESS_TOKEN)
        }
    }
}
/**
* HANDLE DATE 
*/
export function getBeforeDateCurrent() {
    const oneDayAgo = new Date();
    oneDayAgo.setDate(oneDayAgo.getDate() - 1);
    return oneDayAgo;
}

export function convertDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}
/**
* OPTION SEARCH ADVANCED 
*/
export const componentsAdvanced = {
    SelectItemSearch,
    DateItemSearch,
    InputDataSearch
};
/**
* HANDLE URL 
*/
export const createActionURL = (sub) => {
    const createUrl = (action) => `${DOMAIN_SERVER}/${sub}${action ? `/${action}` : ''}`;

    return {
        instant: () => createUrl(''),
        add: () => createUrl('add'),
        edit: () => createUrl('edit'),
        search: () => createUrl('search'),
        delete: () => createUrl('delete'),
    };
};
export const removeURIDomain = (urlCurrent) => {
    try{
        const size = DOMAIN_CLIENT.length;
        return urlCurrent.substring(size,urlCurrent.length);
    }catch(error){
        return "";
    }
}

export const handleRedirectAdmin = () => {
    window.location.href = linkHttp.linkAdmin
}
export const handleRedirectHome = () => {
    window.location.href = linkHttp.linkHome
}
export const handleRedirectLogout = () => {
    window.location.href = `${linkHttp.linkLogOut}?token=${localStorage.getItem(constLogin.ACCESS_TOKEN)}`;
}
export const handleRedirectLogIn = () => {
    window.location.href = linkHttp.linkLogin;
}
export function commonResource(href) {
    return href.replace("/add", "").replace(/\/edit\/\d+/, "").replace(/\/view\/\d+/, "");
}
export function checkResourceAdmin(resources, path) {
    let size = path.length;
    let index = 0;
    for (let i = size - 1; i >= 0; --i) {
        if (path.charCodeAt(i) > 47 && path.charCodeAt(i) < 58) {
            ++index
        } else {
            break;
        }
    }
    if (index !== 0) {
        if (path.charCodeAt(size - 1 - index) === 47) {
            path = path.substring(0, size - 1 - index);
        }
    } else {
        if (path.includes("edit") || path.includes("view")) {
            return false;
        }
    }
    return resources.some(resource => resource === path);
}
/**
* HANDLE EXCEPTION 
*/
export const handleExceptionView = (props) => {
    const{code,handleRefreshToken}=props;
    switch (code) {
        case 403:
            handleRedirectHome()
            break;
        case 4006:
            handleRedirectLogIn()
            break;
        case 4007:
            localStorage.removeItem(constLogin.ACCESS_TOKEN);
            window.location.href = linkHttp.linkLogin;
            break;
        case 4008:
            handleRefreshToken()
            break;
        default:
    }
}