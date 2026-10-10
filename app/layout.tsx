import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: 'B2B SaaS Affiliate Program Comparison', template: '%s | B2B Automation Lab' },
  description:
    'Compare commission rates, cookie windows and estimated payouts across B2B SaaS affiliate programs, and forecast earnings with a free calculator.',
  openGraph: { type: 'website', title: 'B2B SaaS Affiliate Program Comparison', siteName: 'B2B Automation Lab' },
  twitter: { card: 'summary_large_image' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-zinc-950 text-zinc-100 antialiased">
        {children}
        <footer className="border-t border-zinc-800 px-4 py-8 text-center text-sm text-zinc-400">
          <p>
            Some links on this site are affiliate links; we may earn a commission at no extra cost to
            you.{' '}
            <Link href="/disclosure" className="text-emerald-400 underline underline-offset-2">
              Full disclosure
            </Link>
          </p>
        </footer>
      </body>
    </html>
  );
}
