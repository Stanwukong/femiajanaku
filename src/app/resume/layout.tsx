export default function PDFLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-mono`}>{children}</body>
    </html>
  );
}
