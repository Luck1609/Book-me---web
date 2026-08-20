import { Link } from '@inertiajs/react';
import LegalPage, { LegalSection } from '@/components/marketing/legal-page';
import { contact, register } from '@/routes';

export default function TermsAndConditions() {
  return (
    <LegalPage
      title="Terms and conditions"
      description="These terms explain the ground rules for using Book Me, creating an account, managing bookings, and working with the people who rely on your schedule."
      lastUpdated="August 20, 2026"
    >
      <LegalSection number="01" title="Agreement to these terms">
        <p>
          By accessing or using Book Me, you agree to these terms and any
          policies referenced in them. If you are using Book Me for a business
          or organization, you confirm that you have authority to accept these
          terms on its behalf.
        </p>
        <p>
          If you do not agree, do not use the service. We may publish additional
          terms for particular features, and those terms will apply to the
          relevant feature if they conflict with these terms.
        </p>
      </LegalSection>

      <LegalSection number="02" title="Accounts and responsible use">
        <p>
          You are responsible for providing accurate account information,
          keeping your login details confidential, and all activity under your
          account. Tell us promptly if you believe your account has been
          compromised.
        </p>
        <p>You may not use Book Me to:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            Break the law, infringe another person’s rights, or misuse someone’s
            personal information.
          </li>
          <li>
            Interfere with, probe, reverse engineer, or attempt to gain
            unauthorized access to the service.
          </li>
          <li>
            Send spam, malware, deceptive messages, or content that is abusive,
            unlawful, or harmful.
          </li>
          <li>
            Build a competing service from Book Me or use automated access in a
            way that burdens the service.
          </li>
        </ul>
      </LegalSection>

      <LegalSection number="03" title="Bookings, payments, and your clients">
        <p>
          Book Me helps you publish availability, accept booking requests, send
          notifications, and manage appointment information. You are responsible
          for the services you offer, the availability and policies you publish,
          and the accuracy of information shown to your clients.
        </p>
        <p>
          If payments, deposits, refunds, subscriptions, or cancellation charges
          are enabled, you are responsible for communicating your terms clearly
          and complying with applicable consumer, tax, and payment rules.
          Payment processing may be provided by third parties under their own
          terms.
        </p>
        <p>
          You are responsible for having a lawful basis and the necessary
          notices or permissions to provide client information to Book Me and to
          send booking-related communications.
        </p>
      </LegalSection>

      <LegalSection number="04" title="Content and ownership">
        <p>
          You retain ownership of the content you submit to Book Me. You give us
          the limited permission needed to host, process, display, and transmit
          that content to operate and improve the service for you.
        </p>
        <p>
          Book Me and its software, design, branding, and documentation are
          owned by Book Me or its licensors and are protected by applicable
          intellectual property laws. These terms give you a limited,
          non-exclusive, non-transferable right to use the service while your
          account is active.
        </p>
      </LegalSection>

      <LegalSection
        number="05"
        title="Availability, disclaimers, and liability"
      >
        <p>
          We work to keep Book Me reliable and secure, but the service is
          provided on an “as available” basis. We do not promise that it will
          always be uninterrupted, error-free, or suitable for every particular
          business need.
        </p>
        <p>
          To the maximum extent permitted by applicable law, Book Me will not be
          responsible for indirect, incidental, special, consequential, or
          punitive losses, or for loss of profits, revenue, data, goodwill, or
          business opportunities arising from your use of the service. Add the
          liability cap, mandatory consumer rights, and other
          jurisdiction-specific terms with legal counsel.
        </p>
      </LegalSection>

      <LegalSection number="06" title="Changes, termination, and contact">
        <p>
          You may stop using Book Me at any time. We may suspend or terminate
          access when reasonably necessary to protect the service, investigate
          misuse, comply with law, or address a material breach of these terms.
          We will provide notice where required or reasonably practicable.
        </p>
        <p>
          We may update these terms as Book Me changes. If a change is material,
          we will provide additional notice where required. Your continued use
          after the effective date means you accept the updated terms.
        </p>
        <p>
          Add the governing law, venue, dispute process, legal entity name, and
          official notice address before publishing. For questions about these
          terms, visit our{' '}
          <Link
            className="font-semibold text-[#0f8a62] hover:underline"
            href={contact()}
          >
            contact page
          </Link>{' '}
          or{' '}
          <Link
            className="font-semibold text-[#0f8a62] hover:underline"
            href={register()}
          >
            create an account
          </Link>{' '}
          to get started.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
