import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/components/auth-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "BrainSiftAI - AI-Powered Exam Platform",
    description: "Create and take exams from your PDF content with AI assistance"
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={inter.className} suppressHydrationWarning>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem
                    disableTransitionOnChange
                >
                    <AuthProvider>{children}</AuthProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
