export const metadata = {
  title: "Explore Private Keys",
  description:
    "This tool is for playing around with the mapping of private keys to Ethereum addresses.",
  keywords: ["ethereum", "cryptography", "private keys"],
  openGraph: {
    title: "Explore Private Keys",
    description:
      "This tool is for playing around with the mapping of private keys to Ethereum addresses.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
