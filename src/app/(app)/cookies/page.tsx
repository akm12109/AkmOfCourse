
import { Cookie } from 'lucide-react';

export default function CookiePolicyPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-16 max-w-3xl">
      <header className="text-center mb-10 md:mb-12">
        <Cookie className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Cookie Policy</h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </header>

      <article className="prose prose-lg dark:prose-invert max-w-none mx-auto space-y-6">
        <p>
          This Cookie Policy explains what cookies are and how Akm of course ("us", "we", or "our") uses them on the akmofcourse.com website (the "Service"). You should read this policy so you can understand what type of cookies we use, the information we collect using cookies and how that information is used.
        </p>
        <p>
          By using the Service, you consent to the use of cookies.
        </p>

        <section>
          <h2 className="text-2xl font-semibold">1. What are cookies?</h2>
          <p>
            Cookies are small pieces of text sent by your web browser by a website you visit. A cookie file is stored in your web browser and allows the Service or a third-party to recognize you and make your next visit easier and the Service more useful to you.
          </p>
          <p>
            Cookies can be "persistent" or "session" cookies. Persistent cookies remain on your personal computer or mobile device when you go offline, while session cookies are deleted as soon as you close your web browser.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">2. How Akm of course uses cookies</h2>
          <p>
            When you use and access the Service, we may place a number of cookies files in your web browser. We use cookies for the following purposes:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>Essential Cookies:</strong> To enable certain functions of the Service, such as user authentication and preventing fraudulent use of user accounts.</li>
            <li><strong>Preferences Cookies:</strong> To remember information that changes the way the Service behaves or looks, such as your preferred language or region, or currency selection.</li>
            <li><strong>Analytics Cookies:</strong> To track information how the Service is used so that we can make improvements. We may also use analytics cookies to test new advertisements, pages, features or new functionality of the Service to see how our users react to them.</li>
            <li><strong>Advertising Cookies:</strong> These cookies are used to deliver advertisements more relevant to you and your interests. They are also used to limit the number of times you see an advertisement as well as help measure the effectiveness of the advertising campaigns. (We may or may not use these, this is a placeholder).</li>
          </ul>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold">3. Third-party cookies</h2>
          <p>
            In addition to our own cookies, we may also use various third-parties cookies to report usage statistics of the Service, deliver advertisements on and through the Service, and so on.
          </p>
           <p>
            For example, we may use Google Analytics to help us understand how our users use the site. You can read more about how Google uses your Personal Information here: <a href="https://www.google.com/intl/en/policies/privacy/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://www.google.com/intl/en/policies/privacy/</a>. You can also opt-out of Google Analytics here: <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://tools.google.com/dlpage/gaoptout</a>.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">4. What are your choices regarding cookies?</h2>
          <p>
            If you'd like to delete cookies or instruct your web browser to delete or refuse cookies, please visit the help pages of your web browser.
          </p>
          <p>
            Please note, however, that if you delete cookies or refuse to accept them, you might not be able to use all of the features we offer, you may not be able to store your preferences, and some of our pages might not display properly.
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>For the Chrome web browser, please visit this page from Google: <a href="https://support.google.com/accounts/answer/32050" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://support.google.com/accounts/answer/32050</a></li>
            <li>For the Internet Explorer web browser, please visit this page from Microsoft: <a href="http://support.microsoft.com/kb/278835" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">http://support.microsoft.com/kb/278835</a></li>
            <li>For the Firefox web browser, please visit this page from Mozilla: <a href="https://support.mozilla.org/en-US/kb/delete-cookies-remove-info-websites-stored" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://support.mozilla.org/en-US/kb/delete-cookies-remove-info-websites-stored</a></li>
            <li>For any other web browser, please visit your web browser's official web pages.</li>
          </ul>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold">5. Where can you find more information about cookies?</h2>
          <p>
            You can learn more about cookies and the following third-party websites:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>AllAboutCookies: <a href="http://www.allaboutcookies.org/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">http://www.allaboutcookies.org/</a></li>
            <li>Network Advertising Initiative: <a href="http://www.networkadvertising.org/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">http://www.networkadvertising.org/</a></li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">6. Contact Us</h2>
          <p>
            If you have any questions about this Cookie Policy, please contact us:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>By email: cookies@akmofcourse.com</li>
          </ul>
        </section>
      </article>
    </div>
  );
}
