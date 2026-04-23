import "./globals.css";

export const metadata = {
  title: "Antigravity | Developer Portfolio",
  description: "Building the future of code intelligence with knowledge graphs and AI.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
