export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-green-50">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-green-800 mb-6">
          Privacy Policy
        </h1>

        <section className="mb-8">
          <p className="text-green-700 text-lg mb-4">
            At Hospital Finder, we are committed to protecting your privacy and
            ensuring the security of your personal information. This Privacy
            Policy outlines how we collect, use, and safeguard your data when
            you use our platform.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-green-800 mb-4">
            Information We Collect
          </h2>
          <ul className="list-disc list-inside text-green-700 text-lg">
            <li>Personal information (name, email address, phone number)</li>
            <li>Location data (to find nearby hospitals and services)</li>
            <li>Medical information (only what you choose to provide)</li>
            <li>Usage data (how you interact with our platform)</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-green-800 mb-4">
            How We Use Your Information
          </h2>
          <ul className="list-disc list-inside text-green-700 text-lg">
            <li>To provide and improve our services</li>
            <li>To connect you with healthcare providers</li>
            <li>To send you important updates and notifications</li>
            <li>To analyze and enhance our platform's performance</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-green-800 mb-4">
            Data Security
          </h2>
          <p className="text-green-700 text-lg mb-4">
            We implement robust security measures to protect your data from
            unauthorized access, alteration, disclosure, or destruction. This
            includes encryption, secure servers, and regular security audits.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-green-800 mb-4">
            Your Rights
          </h2>
          <p className="text-green-700 text-lg mb-4">You have the right to:</p>
          <ul className="list-disc list-inside text-green-700 text-lg">
            <li>Access and update your personal information</li>
            <li>Request deletion of your data</li>
            <li>Opt-out of marketing communications</li>
            <li>Lodge a complaint with a supervisory authority</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-green-800 mb-4">
            Changes to This Policy
          </h2>
          <p className="text-green-700 text-lg mb-4">
            We may update this Privacy Policy from time to time. We will notify
            you of any significant changes by posting the new policy on this
            page and updating the "last updated" date.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-green-800 mb-4">
            Contact Us
          </h2>
          <p className="text-green-700 text-lg mb-4">
            If you have any questions or concerns about our Privacy Policy,
            please contact us at:
          </p>
          <p className="text-green-700 text-lg">
            Email: privacy@hospitalfinder.com
            <br />
            Phone: (123) 456-7890
            <br />
            Address: 123 Healthcare Ave, Medical City, MC 12345
          </p>
        </section>
      </main>
    </div>
  );
}
