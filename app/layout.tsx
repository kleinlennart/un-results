import type { Metadata } from "next";
import { Roboto, Roboto_Mono } from "next/font/google";
import { thesis } from "@/lib/site";
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
    metadataBase: new URL("https://rbm.unfck.org"),
    title: {
        default: "resulting in ___",
        template: "%s · resulting in ___",
    },
    description: thesis,
    openGraph: {
        title: "resulting in ___",
        description: thesis,
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${roboto.variable} ${robotoMono.variable}`}>
            <body className="font-mono min-h-screen flex flex-col">
                {children}
            </body>
        </html>
    );
}
