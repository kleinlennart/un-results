import type { Metadata } from "next";
import { Roboto, Roboto_Mono } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
    subsets: ["latin"],
    variable: "--font-roboto",
});

const robotoMono = Roboto_Mono({
    subsets: ["latin"],
    variable: "--font-roboto-mono",
});

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
        <html lang="en" className={`${roboto.variable} ${robotoMono.variable}`}>
            <body>
                {children}
            </body>
        </html>
    );
}
