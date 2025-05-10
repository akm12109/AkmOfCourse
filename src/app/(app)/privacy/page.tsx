
import { ShieldCheck } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-16 max-w-3xl">
      <header className="text-center mb-10 md:mb-12">
        <ShieldCheck className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Privacy Policy</h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </header>

      <article className="prose prose-lg dark:prose-invert max-w-none mx-auto space-y-6">
        <p>
          Welcome to Akm of course ("us", "we", or "our"). We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about this privacy notice, or our practices with regards to your personal information, please contact us at privacy@akmofcourse.com.
        </p>

        <section>
          <h2 className="text-2xl font-semibold">1. Information We Collect</h2>
          <p>
            We collect personal information that you voluntarily provide to us when you register on the Akm of course platform, express an interest in obtaining information about us or our products and Services, when you participate in activities on the Akm of course (such as posting messages in our online forums or entering competitions, contests or giveaways) or otherwise when you contact us.
          </p>
          <p>
            The personal information that we collect depends on the context of your interactions with us and the Akm of course, the choices you make and the products and features you use. The personal information we collect may include the following:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>Personal Information Provided by You:</strong> We collect names; email addresses; usernames; passwords; contact preferences; contact or authentication data; billing addresses; debit/credit card numbers (via our payment processor); and other similar information.</li>
            <li><strong>Payment Data:</strong> We may collect data necessary to process your payment if you make purchases, such as your payment instrument number (such as a credit card number), and the security code associated with your payment instrument. All payment data is stored by our payment processor and you should review its privacy policies and contact the payment processor directly to respond to your questions.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">2. How We Use Your Information</h2>
          <p>
            We use personal information collected via our Akm of course for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.
          </p>
           <ul className="list-disc pl-6 space-y-1">
            <li>To facilitate account creation and logon process.</li>
            <li>To post testimonials.</li>
            <li>Request feedback.</li>
            <li>To enable user-to-user communications (if applicable).</li>
            <li>To manage user accounts.</li>
            <li>To send administrative information to you.</li>
            <li>To protect our Services.</li>
            <li>To enforce our terms, conditions and policies for business purposes, to comply with legal and regulatory requirements or in connection with our contract.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">3. Will Your Information Be Shared With Anyone?</h2>
          <p>
            We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations.
          </p>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold">4. Cookies and Similar Technologies</h2>
          <p>
            We may use cookies and similar tracking technologies (like web beacons and pixels) to access or store information. Specific information about how we use such technologies and how you can refuse certain cookies is set out in our Cookie Policy.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">5. How Long Do We Keep Your Information?</h2>
          <p>
            We will only keep your personal information for as long as it is necessary for the purposes set out in this privacy notice, unless a longer retention period is required or permitted by law (such as tax, accounting or other legal requirements).
          </p>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold">6. How Do We Keep Your Information Safe?</h2>
          <p>
           We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">7. Do We Collect Information From Minors?</h2>
          <p>
            We do not knowingly solicit data from or market to children under 18 years of age (or the relevant age of majority in your jurisdiction). By using the Akm of course, you represent that you are at least 18 or that you are the parent or guardian of such a minor and consent to such minor dependent’s use of the Akm of course.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">8. What Are Your Privacy Rights?</h2>
          <p>
            In some regions (like the EEA, UK, and California), you have certain rights under applicable data protection laws. These may include the right (i) to request access and obtain a copy of your personal information, (ii) to request rectification or erasure; (iii) to restrict the processing of your personal information; and (iv) if applicable, to data portability.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">9. Controls for Do-Not-Track Features</h2>
          <p>
            Most web browsers and some mobile operating systems and mobile applications include a Do-Not-Track ("DNT") feature or setting you can activate to signal your privacy preference not to have data about your online browsing activities monitored and collected. At this stage no uniform technology standard for recognizing and implementing DNT signals has been finalized. As such, we do not currently respond to DNT browser signals or any other mechanism that automatically communicates your choice not to be tracked online.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">10. Do We Make Updates to This Notice?</h2>
          <p>
            Yes, we will update this notice as necessary to stay compliant with relevant laws. The updated version will be indicated by an updated "Last Updated" date and the updated version will be effective as soon as it is accessible.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">11. How Can You Contact Us About This Notice?</h2>
          <p>
            If you have questions or comments about this notice, you may email us at privacy@akmofcourse.com or by post to:
          </p>
          <p>
            Akm of course<br/>
            [Your Company Address Here, e.g., 123 Learning Lane]<br/>
            [City, State, Zip Code]<br/>
            [Country]
          </p>
        </section>
      </article>
    </div>
  );
}
