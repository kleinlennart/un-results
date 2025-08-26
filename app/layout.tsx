import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "UN RBM",
    description: "Results-based management for the UN System, for greater impact.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                {children}
            </body>
        </html>
    );
}
