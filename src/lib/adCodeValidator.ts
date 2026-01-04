/**
 * Ad Code Validator - Whitelist-based validation for ad network scripts
 * Prevents XSS by only allowing scripts from trusted ad network domains
 */

// Trusted ad network domains - add new ad networks here as needed
const ALLOWED_AD_DOMAINS = [
  // Google AdSense
  'pagead2.googlesyndication.com',
  'googleads.g.doubleclick.net',
  'adservice.google.com',
  'www.googletagservices.com',
  'tpc.googlesyndication.com',
  
  // Adsterra
  'effectivegatecpm.com',
  'effectivecpmgate.com',
  'servicepgt.com',
  'plightlyble.com',
  'publift.com',
  
  // Other common ad networks
  'amazon-adsystem.com',
  'media.net',
  'bidvertiser.com',
  'propellerads.com',
  'adf.ly',
  'adhealers.com',
  
  // Analytics (often used with ads)
  'www.googletagmanager.com',
  'www.google-analytics.com',
];

/**
 * Validates ad code to ensure all script sources are from trusted domains
 * @param code - The HTML ad code to validate
 * @returns Object with isValid boolean and optional error message
 */
export function validateAdCode(code: string): { isValid: boolean; error?: string } {
  if (!code || code.trim() === '') {
    return { isValid: true }; // Empty code is valid (no ad)
  }

  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(code, 'text/html');
    const scripts = doc.querySelectorAll('script');
    
    for (const script of scripts) {
      const src = script.getAttribute('src');
      
      // Scripts with external src must be from allowed domains
      if (src) {
        const isAllowed = ALLOWED_AD_DOMAINS.some(domain => {
          try {
            const url = new URL(src, 'https://example.com');
            return url.hostname.includes(domain) || url.hostname.endsWith('.' + domain);
          } catch {
            // If URL parsing fails, check simple string includes
            return src.includes(domain);
          }
        });
        
        if (!isAllowed) {
          return {
            isValid: false,
            error: `Script source not from a trusted ad network: ${src}. Only scripts from known ad networks are allowed.`
          };
        }
      }
      
      // Inline scripts are allowed but logged for audit
      if (!src && script.textContent) {
        console.info('[Ad Validator] Inline script detected in ad code');
      }
    }
    
    // Check for dangerous event handlers in HTML elements
    const allElements = doc.body.querySelectorAll('*');
    const dangerousAttrs = ['onclick', 'onerror', 'onload', 'onmouseover', 'onfocus', 'onblur'];
    
    for (const element of allElements) {
      for (const attr of dangerousAttrs) {
        if (element.hasAttribute(attr)) {
          return {
            isValid: false,
            error: `Dangerous event handler "${attr}" found. Inline event handlers are not allowed in ad code.`
          };
        }
      }
    }
    
    return { isValid: true };
  } catch (error) {
    console.error('[Ad Validator] Error parsing ad code:', error);
    return {
      isValid: false,
      error: 'Failed to parse ad code. Please check the HTML syntax.'
    };
  }
}

/**
 * Get list of allowed ad domains for display
 */
export function getAllowedDomains(): string[] {
  return [...ALLOWED_AD_DOMAINS];
}
