'use client';
export const NOTIFICATION = "Thông Báo"
export const AGREE = "Đồng ý";
export const CLOSE = "Đóng"
export const SHOW = "Hiển thị"
export const VARIANT_OUTLINE_WANING = "outline-warning"
export const DOMAIN_SERVER = process.env.NEXT_PUBLIC_DOMAIN_SERVER;
export const DOMAIN_CLIENT = process.env.NEXT_PUBLIC_DOMAIN_CLIENT;
export const DOMAIN=process.env.NEXT_PUBLIC_DOMAIN
export const PATH_DASHBOARD_ADMIN = ["/admin/dash-board", "/admin"];
export const NOT_AUTHORIZE_PAGE="Bạn không có quyền truy cập trang này !";
export const NOT_AUTHORIZE = "Bạn Không Có Quyền Truy Cập  .";
export const NOT_AUTHENTICATION = "Tài khoản chưa được xác thực .";
export const LOGIN_SESSION_EXPIRE_DATE = "Phiên đăng nhập của bạn đã hêt hạn ."
/**
* AWS  
*/
export const connectAWSParams = {
	bucketName: process.env.NEXT_PUBLIC_AWS_S3_BUCKETS_CUSTOMER,
	dirName: 'filestore/', /* optional */
	region: process.env.NEXT_PUBLIC_AWS_S3_REGION,
	accessKeyId: process.env.NEXT_PUBLIC_AWS_S3_ACCESS_KEY,
	secretAccessKey: process.env.NEXT_PUBLIC_AWS_S3_SECRETE_KEY,
	s3Url: process.env.NEXT_PUBLIC_AWS_S3_DOMAIN,
	domainClient: process.env.NEXT_PUBLIC_DOMAIN_CLIENT
}

export const LINK_USER = {
	getProfile: `${DOMAIN_SERVER}/profile`,
	authLogin: `${DOMAIN_SERVER}/auth/login`,
	linkLogin: `${connectAWSParams.domainClient}/login`,
	linkLogOut: `${DOMAIN_SERVER}/logout`,
	getInformationUser: `${DOMAIN_SERVER}/user/info-user`,
}
/**
* throw response error  
*/
export const RESPONSE_MESSAGE_BY_CODE = new Map<number, string>([
    [401, NOT_AUTHENTICATION],
    [403, NOT_AUTHORIZE],
    [4007, LOGIN_SESSION_EXPIRE_DATE],
    [4107, NOT_AUTHORIZE_PAGE]
]);
/**
 * COLON.
 */
export const COLON = ":";

/**
 * EMPTY_STRING.
 */
export const EMPTY_STRING = "";

/**
 * COMMA_SPACE.
 */
export const COMMA_SPACE = ", ";

/**
 * COMMAS.
 */
export const COMMAS = ",";

/**
 * UNDERSTROKE.
 */
export const DASH = "-";

/**
 * UNDERSTROKE.
 */
export const UNDER_STROKE = "_";
/**
 * VND.
 */
export const VND = "₫";
/**
 * DATE_FORMAT_SPLASH.
 */

/**
 * WHITE_SPACE.
 */
export const WHITE_SPACE = " ";

/**
 * DOT.
 */
export const DOT = ".";
/**
 * END_LINE.
 */
export const END_LINE = "\n";

/**
 * EQUAL.
 */
export const EQUAL_SIGN = "=";
/**
 * EXCLAMATION.
 */
export const EXCLAMATION = "!";

/**
 * Percent String.
 */
export const PERCENT_STRING = "%";

/**
 * QUESTION_MARK.
 */
export const QUESTION_MARK = "?";

/**
 * QUOTESTRING.
 */
export const QUOTESTRING = "'";

/**
 * LEFT_PARENTHESIS.
 */
export const LEFT_PARENTHESIS = "(";

/**
 * RIGHT_PARENTHESIS.
 */
export const RIGHT_PARENTHESIS = ")";

/**
 * SLASH.
 */
export const SLASH = "/";

/**
 * SPACE_HTML.
 */
export const SPACE_HTML = "&nbsp;";
/**
 * REQUEST_PARAM
 */
export const REQUEST_PARAM_ID = "/?id=";

export const REQUEST_PARAM_QUERY = "/search?query=";

export const REQUEST_PARAM_PATH = "?path=";

export const REQUEST_PARAM_PATH_CHILDREN = "?pathChildren=";

export const NUM_0 = 0;

/** The Constant NUM_0DBL. */
export const NUM_0DBL = 0.0;

/** NUM_1. */
export const NUM_1 = 1;

/** NUM_1. */
export const MINUS_1 = -1;

/** NUM_2. */
export const NUM_2 = 2;

/** NUM_3. */
export const NUM_3 = 3;

/** NUM_4. */
export const NUM_4 = 4;

/** NUM_5. */
export const NUM_5 = 5;

/** NUM_6. */
export const NUM_6 = 6;

/** NUM_7. */
export const NUM_7 = 7;

/** NUM_8. */
export const NUM_8 = 8;

/** NUM_9. */
export const NUM_9 = 9;

/** The Constant NUM_10. */
export const NUM_10 = 10;

/** The Constant NUM_11. */
export const NUM_11 = 11;

/** The Constant NUM_12. */
export const NUM_12 = 12;

/** The Constant NUM_100. */
export const NUM_100 = 100;

/** The Constant NUM_300. */
export const NUM_300 = 300;

/**
 * CSV_EXTENSION The extension of file.
 */
export const CSV_EXTENSION = ".csv";

/**
 * PDF_EXTENSION The extension of file.
 */
export const PDF_EXTENSION = ".pdf";
export const PDF = "pdf";

/**
 * The extension of excel file.
 */
export const XLSX_EXTENSION = ".xlsx";
export const XLSX = "xlsx";
export const XLS_EXTENSION = ".xls";
export const XLS = "xls";

/**
 * The types of messages displayed
 */
export const WARNING = "warning";
export const SUCCESS = "success";
export const INFO = "info";
export const ERROR = "error";

/**
 * STRING_DATETIME_DB_FM
 */
export const STRING_DATETIME_DB_FM = "E MMM dd HH:mm:ss Z yyyy";
export const STRING_DATETIME = "dd/MM/yyyy";
/**
 * PLACE HOLDER
 */
export const PLACE_HOLDER_NAME_LOGIN = "nguyenvana";
export const PLACE_HOLDER_FULL_NAME = "Nguyen Van A";
export const PLACE_HOLDER_PASSWORD = "············"
export const PLACE_HOLDER_CURRENT_RESIDENCE = "Nhập tên đường, thôn, xóm,... nơi đăng ký hộ khẩu thường trú";
export const PLACE_HOLDER_EMAIL = "nguyenvana@gmail.com"
/**
* ICON 
*/
export const ICON_MOON = "fa-solid fa-moon";
export const ICON_CHECK = "fa-solid fa-check";
/**
* SCREEN DARK 
*/
export const CHANGE_SCREEN_THEME_REQUEST_PARAM = "change-dark";
export const SCREEN_THEME_PARAM = "screenTheme";
export const SCREEN_THEME_NAME = "Chế độ"
export const SCREEN_THEME = "SCREEN_THEME";
export const SCREEN_THEME_MODE = {
	SCREEN_LIGHT: {
		alias: "LIGHT",
		name: "Sáng"
	},
	SCREEN_DARK: {
		alias: "DARK",
		name: "Tối"
	}
}