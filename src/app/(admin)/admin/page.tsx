import { Metadata } from "next";

export const metadata: Metadata = {
    title: "",
    description: "Trang đăng nhập",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
        { children }
        </>
    );
}