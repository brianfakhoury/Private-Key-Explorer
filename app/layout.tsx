export const metadata = {
  title: 'Explore Private Keys',
  description: 'Built by Brian Fakhoury',
  keywords: ['ethereum', 'cryptography', 'private keys'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
