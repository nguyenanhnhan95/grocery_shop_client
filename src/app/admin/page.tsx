import { Metadata } from "next";

export const metadata: Metadata = {
    title: "",
    description: "Trang đăng nhập",
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
        { children }
        </>
    );
}