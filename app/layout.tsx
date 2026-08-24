import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Avani D Poojary | ML & Frontend Developer",
  description:
    "Computer Science undergraduate specializing in Machine Learning, AI, and Full-Stack Development. I build intelligent platforms that learn, adapt, and scale to solve real-world challenges.",
  openGraph: {
    title: "Avani D Poojary | ML & Frontend Developer",
    description:
      "Computer Science undergraduate specializing in Machine Learning, AI, and Full-Stack Development. Building intelligent platforms.",
    url: "https://avani.dev",
    siteName: "Avani.dev",
    images: [
      {
        url: "/assets/photo.jpg",
        width: 800,
        height: 800,
        alt: "Avani D Poojary Profile Photo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Avani D Poojary | ML & Frontend Developer",
    description:
      "Computer Science undergraduate specializing in Machine Learning, AI, and Full-Stack Development.",
    images: ["/assets/photo.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0F",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Syne:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
        />
      </head>
      <body className="antialiased bg-brand-bg text-brand-text">
        {/* Fixed gradient accent bar on the right edge */}
        <div className="accent-bar" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
