import { DOMAIN_CLIENT, DOMAIN_SERVER } from "@/utils/commonConstants";
import Image from "next/image";
import Link from 'next/link';
import logo_google from "../../../public/image/logo_google.png"
import logo_facebook from "../../../public/image/logo_facebook.png"
const OAUTH2_REDIRECT_URI = `${DOMAIN_CLIENT}/oauth2/redirect`
const GOOGLE_AUTH_URL = DOMAIN_SERVER + '/oauth2/authorize/google?redirect_uri=' + OAUTH2_REDIRECT_URI;
const FACEBOOK_AUTH_URL = DOMAIN_SERVER + '/oauth2/authorize/facebook?redirect_uri=' + OAUTH2_REDIRECT_URI;

function LoginSocial() {
    return (
        <div className="submit-social d-flex align-items-center justify-content-around">
            <Link href={GOOGLE_AUTH_URL} >
                <Image src={logo_google} alt="Google Logo" width={40} height={40} className="mr-2" />

            </Link>
            <Link href={FACEBOOK_AUTH_URL} >
                <Image src={logo_facebook} alt="Facebook Logo" width={40} height={40} className="ml-2" />
            </Link>
        </div>
    )
}
export default LoginSocial;