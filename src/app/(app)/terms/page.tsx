
import { FileText } from 'lucide-react';

export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-16 max-w-3xl">
      <header className="text-center mb-10 md:mb-12">
        <FileText className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Terms of Service</h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </header>

      <article className="prose prose-lg dark:prose-invert max-w-none mx-auto space-y-6">
        <p>
          Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the Akm of course website (the "Service") operated by Akm of course ("us", "we", or "our").
        </p>
        <p>
          Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who access or use the Service.
        </p>
        <p>
          By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the Service.
        </p>

        <section>
          <h2 className="text-2xl font-semibold">1. Accounts</h2>
          <p>
            When you create an account with us, you must provide us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
          </p>
          <p>
            You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password, whether your password is with our Service or a third-party service.
          </p>
          <p>
            You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">2. Courses and Content</h2>
          <p>
            Our Service allows you to purchase and access educational content across various subjects ("Courses"). You are granted a limited, non-exclusive, non-transferable license to access and view the Courses and associated content for which you have paid all required fees, solely for your personal, non-commercial, educational purposes through the Service, in accordance with these Terms.
          </p>
          <p>
            You may not reproduce, redistribute, transmit, assign, sell, broadcast, rent, share, lend, modify, adapt, edit, create derivative works of, sublicense, or otherwise transfer or use any Course unless we give you explicit permission to do so in a written agreement signed by an Akm of course authorized representative.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">3. Payments and Refunds</h2>
          <p>
            When you make a payment, you agree to use a valid payment method. Prices for Courses are subject to change without notice.
          </p>
          <p>
            We offer a refund policy for our Courses. Please refer to our Refund Policy (typically detailed on course pages or a separate FAQ) for specific terms and conditions regarding refunds.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">4. Intellectual Property</h2>
          <p>
            The Service and its original content (excluding Content provided by users), features and functionality are and will remain the exclusive property of Akm of course and its licensors. The Service is protected by copyright, trademark, and other laws of both [Your Country/Jurisdiction] and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Akm of course.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">5. Links To Other Web Sites</h2>
          <p>
            Our Service may contain links to third-party web sites or services that are not owned or controlled by Akm of course.
          </p>
          <p>
            Akm of course has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party web sites or services. You further acknowledge and agree that Akm of course shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods or services available on or through any such web sites or services.
          </p>
          <p>
            We strongly advise you to read the terms and conditions and privacy policies of any third-party web sites or services that you visit.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">6. Termination</h2>
          <p>
            We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
          </p>
          <p>
            Upon termination, your right to use the Service will immediately cease. If you wish to terminate your account, you may simply discontinue using the Service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">7. Limitation Of Liability</h2>
          <p>
            In no event shall Akm of course, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other legal theory, whether or not we have been informed of the possibility of such damage, and even if a remedy set forth herein is found to have failed of its essential purpose.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">8. Governing Law</h2>
          <p>
            These Terms shall be governed and construed in accordance with the laws of [Your Jurisdiction, e.g., State of YourLocation, YourCountry], without regard to its conflict of law provisions.
          </p>
          <p>
            Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect. These Terms constitute the entire agreement between us regarding our Service, and supersede and replace any prior agreements we might have between us regarding the Service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">9. Changes</h2>
          <p>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
          </p>
          <p>
            By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, please stop using the Service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">10. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at legal@akmofcourse.com.
          </p>
        </section>
      </article>
    </div>
  );
}
