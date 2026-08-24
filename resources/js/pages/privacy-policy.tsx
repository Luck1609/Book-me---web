import LegalPage, { LegalSection } from '@/components/marketing/legal-page';

export default function PrivacyPolicy() {
  return (
    <LegalPage
      title="Privacy policy"
      description="This notice explains what information Book Me may collect, why we use it, and the choices available to you when you use our website and scheduling service."
      lastUpdated="August 20, 2026"
    >
      <LegalSection number="01" title="Who we are">
        <p>
          Book Me is a scheduling platform for service businesses and their
          clients. In this policy, “Book Me,” “we,” or “us” means the operator
          of the Book Me service. Add the full legal name, registered address,
          and privacy contact for the operating entity before launch.
        </p>
        <p>
          For privacy questions or requests, contact{' '}
          <a
            className="font-semibold text-[#0f8a62] hover:underline"
            href="mailto:privacy@bookme.app"
          >
            privacy@bookme.app
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection number="02" title="Information we collect">
        <p>Depending on how you use Book Me, we may collect:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            Account details such as your name, email address, password, business
            profile, and preferences.
          </li>
          <li>
            Booking details such as appointment type, availability, attendee
            information, notes, and status.
          </li>
          <li>
            Payment and transaction information handled through our payment
            providers. We do not intend to store full card numbers.
          </li>
          <li>
            Support messages, feedback, and other information you choose to send
            us.
          </li>
          <li>
            Device, browser, usage, and log information needed to operate,
            secure, and improve the service.
          </li>
        </ul>
      </LegalSection>

      <LegalSection number="03" title="How we use information">
        <p>We use information to provide and maintain Book Me, including to:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            Create and secure accounts, authenticate users, and provide customer
            support.
          </li>
          <li>
            Manage bookings, calendars, reminders, notifications, payments, and
            other features you request.
          </li>
          <li>
            Personalize and improve the service, understand product usage, and
            troubleshoot issues.
          </li>
          <li>
            Detect fraud, abuse, security incidents, and violations of our
            terms.
          </li>
          <li>
            Send service messages and, where permitted, optional product updates
            or marketing communications.
          </li>
          <li>
            Meet legal obligations and protect the rights, safety, and property
            of Book Me and our users.
          </li>
        </ul>
        <p>
          Confirm the lawful bases, consent flows, and marketing choices that
          apply to your business and the people using the service.
        </p>
      </LegalSection>

      <LegalSection number="04" title="Sharing and service providers">
        <p>
          We may share information with vendors that help us host, secure,
          analyze, communicate through, and process payments for the service.
          These providers may only use information to perform services for us
          and under appropriate contractual or other safeguards.
        </p>
        <p>
          We may also share information when you direct us to, when needed to
          complete a booking or payment, to comply with law or legal process, or
          to protect people and the service. Add the current list or categories
          of subprocessors and any international transfer details before launch.
        </p>
      </LegalSection>

      <LegalSection number="05" title="Retention, security, and your choices">
        <p>
          We keep information only for as long as needed for the purposes
          described in this policy, to provide the service, resolve disputes,
          enforce agreements, and meet legal or accounting requirements.
          Document the specific retention periods or criteria used by your
          business.
        </p>
        <p>
          We use reasonable administrative, technical, and organizational
          safeguards designed to protect information. No online service can
          guarantee absolute security, so please use a strong password and
          contact us promptly if you suspect unauthorized access.
        </p>
        <p>
          Depending on where you live and the laws that apply, you may have
          rights to access, correct, delete, restrict, object to, or receive a
          copy of your information, and to withdraw consent where processing is
          based on consent. Contact us to make a request. You may also have the
          right to complain to a relevant data protection authority.
        </p>
      </LegalSection>

      <LegalSection number="06" title="Cookies, children, and changes">
        <p>
          Book Me may use necessary cookies and similar technologies to keep the
          service working, remember preferences, understand usage, and improve
          the experience. Add a cookie notice and consent controls if your use
          of non-essential cookies requires them.
        </p>
        <p>
          Book Me is not directed to children under the minimum age permitted by
          applicable law. We do not knowingly collect personal information from
          children without appropriate authorization.
        </p>
        <p>
          We may update this policy as the service or applicable requirements
          change. We will post the updated version here and revise the “Last
          updated” date. For material changes, we will provide additional notice
          where required.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
