

import { cookies } from "next/headers";
import { COOKIE_AUTH_TOKEN, DOMAIN_SERVER, SCREEN_MODE } from "./commonConstants";
import { CurrentUser } from "@/redux/slice/common/currentUser";
import { ProductCategory } from "@/types/product";
import { ApiResponse } from "@/types/apiResponse";

export async function fetchProductCategories(): Promise<ProductCategory[]> {
    try {
        const res = await fetch(`${DOMAIN_SERVER}/product-category`,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
            }
        );
        const productCategoryMenu: ApiResponse<ProductCategory[]> = await res.json();
        if (productCategoryMenu.code === 200) {
            return productCategoryMenu.result || [];
        }
        return [];
    } catch (error) {
        console.error("Error fetching product categories", error);
        return [];
    }
}
export async function fetchCurrentUser(): Promise<CurrentUser | null> {
    const cookieStore = cookies();
    const token = cookieStore.get("auth-token")?.value;


    if (!token) {
        return null;
    }

    try {
        
        const res = await fetch(`${DOMAIN_SERVER}/user/info-user`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Cookie: `${COOKIE_AUTH_TOKEN}=${token}`,
            },
            cache: 'no-store', // Đảm bảo rằng dữ liệu không bị cache
        });

        // Kiểm tra phản hồi của API
        if (!res.ok) {
            console.error('Failed to fetch user data:', res.statusText);
            return null;
        }

        const responseUser: ApiResponse<CurrentUser> = await res.json();

        // Kiểm tra mã trạng thái API và trả về dữ liệu người dùng hoặc null
        if (responseUser.code === 200) {
            return responseUser.result || null;
        } else {
            console.error('API error:', responseUser.message);
            return null;
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
        return null;
    }

}
export async function fetchModeScreen(): Promise<string> {
    try {
        const cookieStore = cookies();
        const token = cookieStore.get("auth-token")?.value;
        const res = await fetch(`${DOMAIN_SERVER}/user/mode-theme`, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Cookie: `${COOKIE_AUTH_TOKEN}=${token}`,
            },
        });

        if (!res.ok) {
            console.error(`HTTP error! Status: ${res.status}`);
            return SCREEN_MODE.light;
        }

        let screenModeData: ApiResponse<string>;
        try {
            screenModeData = await res.json();
        } catch (jsonError) {
            console.error("Error parsing JSON response", jsonError);
            return SCREEN_MODE.light;
        }

        return screenModeData.result || SCREEN_MODE.light;
    } catch (error) {
        console.error("Network error fetching screen mode", error);
        return SCREEN_MODE.light;
    }
}