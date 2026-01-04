/**
 * Ad Code Validator - Whitelist-based validation for ad network scripts
 * Prevents XSS by only allowing scripts from trusted ad network domains
 */

import DOMPurify from 'dompurify';

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

// Forbidden tags that could be used for XSS
const FORBIDDEN_TAGS = ['iframe', 'object', 'embed', 'link', 'meta', 'base', 'form', 'input', 'svg'];

// Dangerous URL protocols
const FORBIDDEN_PROTOCOLS = ['javascript:', 'data:', 'vbscript:'];

// Comprehensive list of dangerous event handlers (case-insensitive check)
const DANGEROUS_EVENT_HANDLERS = [
  'onclick', 'ondblclick', 'onmousedown', 'onmouseup', 'onmouseover', 'onmousemove', 'onmouseout', 'onmouseenter', 'onmouseleave',
  'onkeydown', 'onkeypress', 'onkeyup',
  'onfocus', 'onblur', 'onchange', 'onsubmit', 'onreset', 'oninput',
  'onload', 'onerror', 'onunload', 'onresize', 'onscroll',
  'onanimationstart', 'onanimationend', 'onanimationiteration',
  'ontransitionend', 'ontransitionstart', 'ontransitioncancel', 'ontransitionrun',
  'ondrag', 'ondragend', 'ondragenter', 'ondragleave', 'ondragover', 'ondragstart', 'ondrop',
  'oncopy', 'oncut', 'onpaste',
  'oncontextmenu', 'onwheel', 'ontouchstart', 'ontouchend', 'ontouchmove', 'ontouchcancel',
  'onpointerdown', 'onpointerup', 'onpointermove', 'onpointerenter', 'onpointerleave', 'onpointerover', 'onpointerout', 'onpointercancel',
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
    
    // Check for forbidden tags
    for (const tag of FORBIDDEN_TAGS) {
      if (doc.body.querySelector(tag)) {
        return {
          isValid: false,
          error: `Forbidden tag <${tag}> found. This tag is not allowed in ad code for security reasons.`
        };
      }
    }
    
    // Check all src/href attributes for dangerous protocols
    const elementsWithUrls = doc.body.querySelectorAll('[src], [href]');
    for (const el of elementsWithUrls) {
      const src = el.getAttribute('src') || el.getAttribute('href') || '';
      const srcLower = src.toLowerCase().trim();
      if (FORBIDDEN_PROTOCOLS.some(proto => srcLower.startsWith(proto))) {
        return {
          isValid: false,
          error: `Dangerous protocol detected in URL attribute. javascript:, data:, and vbscript: protocols are not allowed.`
        };
      }
    }
    
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
      
      // Block all inline scripts to prevent XSS - most ad networks use external scripts
      if (!src && script.textContent?.trim()) {
        return {
          isValid: false,
          error: 'Inline scripts are not allowed in ad code. Please use external ad network scripts only (e.g., from Google AdSense, Adsterra). Most ad networks provide external script tags.'
        };
      }
    }
    
    // Check for dangerous event handlers in HTML elements (case-insensitive)
    const allElements = doc.body.querySelectorAll('*');
    
    for (const element of allElements) {
      const attrs = element.attributes;
      for (let i = 0; i < attrs.length; i++) {
        const attrName = attrs[i].name.toLowerCase();
        if (DANGEROUS_EVENT_HANDLERS.includes(attrName)) {
          return {
            isValid: false,
            error: `Dangerous event handler "${attrName}" found. Inline event handlers are not allowed in ad code.`
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
 * Sanitize ad code using DOMPurify for additional XSS protection
 * This should be used in combination with validateAdCode
 * @param code - The HTML ad code to sanitize
 * @returns Sanitized HTML string
 */
export function sanitizeAdCode(code: string): string {
  if (!code || code.trim() === '') {
    return '';
  }
  
  // Configure DOMPurify to allow specific ad-related elements and attributes
  return DOMPurify.sanitize(code, {
    ALLOWED_TAGS: ['div', 'ins', 'script', 'span', 'a', 'img'],
    ALLOWED_ATTR: ['class', 'id', 'style', 'data-ad-client', 'data-ad-slot', 'data-ad-format', 'data-full-width-responsive', 'src', 'href', 'alt', 'width', 'height', 'async'],
    ALLOW_DATA_ATTR: true,
    // Keep scripts but they'll be validated separately
    ADD_TAGS: ['script'],
    ADD_ATTR: ['async'],
  });
}

/**
 * Get list of allowed ad domains for display
 */
export function getAllowedDomains(): string[] {
  return [...ALLOWED_AD_DOMAINS];
}
