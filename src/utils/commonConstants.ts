
export const NOTIFICATION = "Thông Báo"
export const AGREE = "Đồng ý";
export const CLOSE = "Đóng"
export const SHOW = "Hiển thị"
export const VARIANT_OUTLINE_WANING = "outline-warning"
export const DOMAIN_SERVER = process.env.NEXT_PUBLIC_DOMAIN_SERVER;
export const DOMAIN_CLIENT = process.env.NEXT_PUBLIC_DOMAIN_CLIENT;
export const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN
export const PATH_DASHBOARD_ADMIN = ["/admin/dash-board", "/admin"];
export const NOT_AUTHORIZE_PAGE = "Bạn không có quyền truy cập trang này !";
export const NOT_AUTHORIZE = "Bạn Không Có Quyền Truy Cập  .";
export const NOT_AUTHENTICATION = "Tài khoản chưa được xác thực .";
export const LOGIN_SESSION_EXPIRE_DATE = "Phiên đăng nhập của bạn đã hêt hạn ."
export const MESSAGE_SYSTEM_ERROR = "Đã xảy ra lỗi. Chúng ta cố gắng sửa lỗi sớm nhất có thể.";
export const ACCESS_SYSTEM_FAIL = "Đã xảy ra lỗi try cập tài nguyên hệ thống .";
export const NOTIFY_DELETE = "Bạn có chắc chắn muốn xóa dữ liệu này không?";
export const CONFIRM_DELETE = "Hành động này không thể hoàn tác.";
export const CONFIRM = "Xác nhận";
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
export const FILE_STORE_AWS_PATH = {
	IMAGE: "filestore/files/image/",
	FILE: "filestore/files/file/"
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
 * Css color
 */
export const CSS9D9C97 = "color:#9D9C97";
export const CSSCCD81B = "color:#CCD81B";
export const CSSD8321B = "color:#D8321B";
export const CSS43C02A = "color:#43C02A";
export const CSS379DD3 = "color:#379DD3";
export const CSS0693e3 = "#0693e3"
export const BG_BOX_DARK = "#242526";
export const BG_SCREEN_DARK = "#0F0F0F";
export const BG_INPUT_DARK = "#3A3B3C";
export const BG_INPUT_LIGHT = "#FFFFFF"
export const BG_TRADE = "#0693e3";
export const FONT_COLOR_DARK = "#f1f1f1";
export const FONT_COLOR_LIGHT = "#6E6B7B";
export const FONT_ICON_DARK = "#B1B4B7";
export const FONT_COLOR_DANGER = "#EA5455";
export const BOX_COLOR_DANGER = "#FBDDDD";
export const BG_LIGHT_SOFT = "#fff5";
export const BG_LIGHT = "#F5F5F5";
export const PL_INPUT = "#B9B9C3";
export const RQ_INPUT = "#D22627";
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
export const SCREEN_MODE = {
	dark: "dark",
	light: "light"
};
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
/**
* Authorize 
*/
export const ROLES = {
	ROLE_ADMIN: "ROLE_ADMIN",
	ROLE_USER: "ROLE_USER",
	ROLE_MANAGER: "ROLE_MANAGER",
	ROLE_EMPLOYEE: "ROLE_EMPLOYEE",
	LIST_ALIAS:["ROLE_ADMIN","ROLE_USER","ROLE_MANAGER","ROLE_EMPLOYEE"]
}
export const PROTECTED_ROUTE_ADMIN = [ROLES.ROLE_ADMIN, ROLES.ROLE_EMPLOYEE, ROLES.ROLE_MANAGER];
export const COOKIE_AUTH_TOKEN = "auth-token";
/**
* Config type search advanced
*/
export const typeSearchAdvanced = {
	DateItemSearch: "DateItemSearch",
	SelectModelSearch: "SelectModelSearch",
	InputDataSearch: "InputDataSearch",
	SelectCustomSearch: "SelectCustomSearch"
}
/**
* OPTION SEARCH ADVANCED 
*/
export const componentsAdvanced = {
	// SelectModelSearch,
	// DateItemSearch,
	// InputDataSearch,
	// SelectCustomSearch
};
/**
 * STATUS LOADING
 */
export const LOADING_CONTENT_FORM = "loading-content-form";
export const LOADING_LIST_TABLE = "loading-list-table";
/**
 * ERROR MESSAGE
 */
export const DELETED = "Đã xóa";
export const PLEASE_COMPLETE_STEP = "Vui lòng hoàn thành bước ";
export const DUPLICATE_FILE = "File dữ liệu bị trùng";
export const FOLLOW_FORMAT_XLSX_XLS = "Chỉ chấp nhận các tệp nằm trong các định dạng sau : xls, xlsx";
export const PROCESS_IS_CHANGE = "Hệ thống nhận thấy dữ liệu đã thay đổi. Vui lòng xác nhận thay đổi dữ liệu, kiểm tra cấu hình dịch vụ và đợi quản trị viên xét duyệt lại!";
export const THANKS_CONFIRM = "Cám ơn bạn đã gửi yêu cầu. Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất";
export const TITLE_PROCESS_IS_STEP_CHANGE = "Dữ liệu đã thay đổi.";
export const PROCESS_IS_STEP_CHANGE = "Vui lòng lưu dữ liệu trước khi qua bước khác!";
export const DATE_GREATER_THAN_FROM = "Đến ngày phải lớn hơn từ ngày";
export const THIS_FIELD_CANNOT_EMPTY = "Không được để trống trường này.";
export const THIS_FIELD_CANNOT_EMPTY_2 = "Trường này là bắt buộc.";
export const PHONENUMBER_ISNOT_THE_CORRECT_FORMAT = "Số điện thoại không đúng định dạng.";
export const THIS_FILED_SELECT_ITEM_CANNOT_EMPTY = "Vui lòng lựa chọn thông tin.";
export const THIS_UPLOAD_FILE_ITEM_CANNOT_EMPTY = "Vui lòng tải dữ liệu ."
export const THIS_FILE_SIZE_TOO_LARGE = "File quá lớn ."
export const THIS_FILE_EXISTING = "File này đã tồn tại ."
export const THIS_FIELD_VALUE_NOT_FORMAT = "Trường này nhập giá trị không phù hợp ."
export const THIS_FILED_ENTER_LARGE = "Bạn nhập trường này quá dài ."
export const THIS_FILED_ENTER_SMALL = "Bạn nhập trường này quá ngắn ."
export const THIS_FILE_NOT_FORMAT = "File không đúng định dạng ."
export const THIS_FILED_MUST_POSITIVE = "Bạn nhập trường này số dương ."
export const THIS_FILED_GREATER_THAN_THOUSAND = "Bạn nhập trường này trên 1000 ₫ ."
export const THIS_FILED_MONEY_TOO_LARGE = "Bạn nhập số tiền quá lớn ."
export const THIS_ERROR_TECHNICAL = "Đã xảy ra lỗi. Việc này có thể là do lỗi kỹ thuật và chúng tôi đang khắc phục rồi"
export const THIS_FIELD_DATE_GREATER_EQUAL_DATE_CURRENT = "Phải lớn hơn hoặc bằng ngày hiện tại .";
export const THIS_FIELD_CODE_NUMBER_NOT_FORMAT = "Nhập mã code không phù hợp: ex :012345678";
export const THIS_FILE_ENTER_FAIL = "Trường này nhập dữ liệu bị lỗi . "
export const THIS_FIELD_CONFIRM_NOT_MATCH = "Mật khẩu xác nhận không đúng."
export const THIS_FIELD_BIRTH_OF_DATE_GREATER_THAN_18 = "Ngày sinh phải lớn hơn 18 tuổi .";
/**
 * Regex
 */
export const regex = {
	string: /^[A-Za-zÀÁÂÃÈÊÌÒÓÔÙĂẰẲẴẸÊỄÌỌÔÙƯỨỲÝđĐâàầặêệễôươ\s]+$/,
	number: /^\d+\.?\d*$/,
	email: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
	phone: /^[0-9\-\+]{9,11}$/,
	cccd: /^[0-9]{12}$/,
	wordVi: /[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơưĂĐĨŨƠƯẠỹ ]+/,
	fullName: /^([\p{Lu}][\p{Ll}]{1,8})(\s([\p{Lu}]|[\p{Lu}][\p{Ll}]{1,10})){0,5}$/u,
	characterNormal: /[a-z0-9A-Z]+$/,
	address: /[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơưĂĐĨŨƠƯẠỹ -,/]/,
	password:/^[^\s]+$/
}
/**
 * allowedTypes 
 */
export const ALLOW_IMAGES_File = "image/png, image/gif, image/jpeg";
export const ALLOW_VIDEOS_FILE = "video/mp4,video/x-m4v,video/*"
export const ALLOW_AUDIOS_FILE = "audio/*"
export const ALLOW_ALL_FILE = "video/*"
export const ALLOW_ARRAY_IMAGES = ["image/png", "image/gif", "image/jpeg"];
/**
 * câpcityFile
 */
export const SIZE_MAX_FILE=10 * 1024 * 1024   