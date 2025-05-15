
'use client';

import Script from 'next/script';

export default function AdScripts() {
  return (
    <>
      {/* Removed Adsterra Script 1 (//pl26649952.profitableratecpm.com/d3/a9/68/d3a968ac3ebb069aba3cb428edab3a48.js) as it was likely causing popups */}

      {/* Adsterra Script 2 (for banner in container div) */}
      <Script
        id="adsterra-script-2-invoke"
        src="//pl26649938.profitableratecpm.com/0d34bfa184002fad5912558643501f63/invoke.js"
        strategy="lazyOnload"
        data-cfasync="false"
        onError={(e) => {
          console.error('Adsterra script 2 (invoke) failed to load:', e);
        }}
      />
    </>
  );
}
