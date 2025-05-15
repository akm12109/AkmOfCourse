
'use client';

import Script from 'next/script';

export default function AdScripts() {
  return (
    <>
      {/* Adsterra Script 1 */}
      <Script
        id="adsterra-script-1"
        type="text/javascript"
        src="//pl26649952.profitableratecpm.com/d3/a9/68/d3a968ac3ebb069aba3cb428edab3a48.js"
        strategy="lazyOnload"
        onError={(e) => {
          console.error('Adsterra script 1 failed to load:', e);
        }}
      />

      {/* Adsterra Script 2 (with async and data-cfasync attributes) */}
      <Script
        id="adsterra-script-2-invoke"
        src="//pl26649938.profitableratecpm.com/0d34bfa184002fad5912558643501f63/invoke.js"
        strategy="lazyOnload"
        data-cfasync="false" // next/script handles async implicitly with strategy, but data attributes can be passed
        onError={(e) => {
          console.error('Adsterra script 2 (invoke) failed to load:', e);
        }}
      />
    </>
  );
}
