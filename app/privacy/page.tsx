import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Privacy Policy' };

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 leading-relaxed text-zinc-300">
      <h1 className="mb-6 text-3xl font-bold text-zinc-100">Privacy Policy</h1>
      <p className="mb-4 text-sm text-zinc-400">
        Starter text. Have it reviewed against your actual tools and the laws that apply to your
        visitors before launch.
      </p>
      <h2 className="mb-2 mt-6 text-xl font-semibold text-zinc-100">What we collect</h2>
      <p className="mb-4">
        If you request the Blueprint, we collect your name and email address and send them to our
        email provider so we can deliver the download and follow-up emails. We also log, without
        personal identifiers, which outbound affiliate links are clicked (the program and any UTM
        tags in the link).
      </p>
      <h2 className="mb-2 mt-6 text-xl font-semibold text-zinc-100">Affiliate links</h2>
      <p className="mb-4">
        When you click a link marked &quot;(Sponsored)&quot;, the company you visit may place its own
        cookies to attribute a sale to us. Their privacy policy governs that data.
      </p>
      <h2 className="mb-2 mt-6 text-xl font-semibold text-zinc-100">Your choices</h2>
      <p>
        You can unsubscribe from emails with one click at any time, and you can ask us to delete your
        data by replying to any email we send.
      </p>
    </main>
  );
}
