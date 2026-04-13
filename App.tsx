
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Smartphone, 
  MapPin, 
  Zap, 
  Scan, 
  CheckCircle2, 
  Menu,
  X,
  Plus,
  Cable,
  ArrowRight,
  Navigation,
  Unlock,
  BatteryCharging,
  CornerDownRight,
  AlertTriangle,
  Globe
} from 'lucide-react';

// --- Types ---
type Page = 'home' | 'how-it-works' | 'pricing' | 'find-power' | 'the-app' | 'business' | 'station-detail';
type Language = 'en' | 'he';

// --- Translations ---
const translations = {
  en: {
    nav: {
      howItWorks: 'How it works',
      pricing: 'Pricing',
      findPower: 'Find Power',
      theApp: 'The App',
      business: 'For Business',
      download: 'Download App'
    },
    hero: {
      freePromo: 'First Hour Free Charging',
      title: <>Battery <br /> Low <span className="text-[#3BB55C]">?</span></>,
      subtitle: 'The city is yours. Stay connected with premium power bank rentals at every corner.',
      cta: 'Scan to Start',
      priceLabel: '₪12 / hr',
      priceSub: 'Flat Rate'
    },
    features: {
      cables: { title: 'Built-in Cables', desc: 'No more messy wires. Every bank includes Lightning, USB-C, and Micro-USB cables.' },
      turbo: { title: 'Turbo Speed', desc: 'Charge your device from 0% to 50% in just 30 minutes with our high-output tech.' },
      network: { title: 'Growing Network', desc: 'Find us in your favorite spots. We are adding new stations to the network every week.' }
    },
    how: {
      title: <div className="inline-block relative">
        <span className="relative z-10 font-light text-zinc-400 text-4xl md:text-5xl mr-2">How it</span>
        <span className="relative z-10 font-black text-[#3BB55C] text-6xl md:text-9xl tracking-tighter">Works</span>
      </div>,
      subtitle: 'Four simple steps to unlimited power',
      steps: [
        { step: "01", title: "Locate", desc: "Open the map in our app to find the nearest Fulin station." },
        { step: "02", title: "Unlock", desc: "Scan the QR code and the battery pops out instantly." },
        { step: "03", title: "Charge", desc: "Plug in any device using the high-speed built-in cables." },
        { step: "04", title: "Return", desc: "Drop it off at any available Fulin station citywide." }
      ],
      showcaseTitle: <>Designed for the <span className="text-[#3BB55C]">Modern</span> Lifestyle</>,
      pocketTitle: 'Fits in your pocket',
      pocketDesc: 'Ultra-slim design that fits alongside your phone in one hand.',
      compatTitle: 'Universal Compatibility',
      compatDesc: 'Apple Lightning, USB-C, and Micro-USB included.',
      quote: '"The easiest way to stay charged in the city. Never look for a wall socket again."',
      launching: 'NOW LAUNCHING',
      expanding: 'Expanding our network every single day'
    },
    pricing: {
      title: <div className="flex flex-col items-center gap-2">
        <span className="text-4xl font-light text-zinc-400 tracking-tight uppercase">Simple</span>
        <span className="text-6xl md:text-8xl font-black text-zinc-900 tracking-tighter">PRICING</span>
      </div>,
      standard: 'Standard',
      perHour: 'per hour',
      welcome: 'New User Welcome',
      free: 'FREE',
      first30: 'First Hour',
      claim: 'Claim Now',
      max: 'MAX',
      capped: 'capped per day',
      footer: 'Automatic Billing • No Deposits • Instant Access'
    },
    find: {
      title: <>Find <span className="text-[#3BB55C]">Power</span></>,
      stations: 'Stations Near You',
      desc: 'Access the live interactive map via our mobile app.',
      openMap: 'Open Map in App'
    },
    ctaSection: {
      title: <>Join the <br/><span className="text-[#3BB55C]">Power</span> Network</>,
      subtitle: 'Start charging for free today.'
    },
    faq: {
      title: 'Frequently Asked Questions',
      questions: [
        { q: 'How do I rent a power bank?', a: 'Just download the FULLIN app, find a station, and scan the QR code. The power bank will pop out automatically.' },
        { q: 'Where can I return the power bank?', a: 'You can return it to any FULLIN station in the city. Just push it into an empty slot until it clicks.' },
        { q: 'What cables are included?', a: 'Every FULLIN power bank comes with built-in Apple Lightning, USB-C, and Micro-USB cables.' },
        { q: 'How much does it cost?', a: 'The first hour is free! After that, it costs ₪12 per hour, capped at ₪100 per day.' }
      ]
    },
    appSection: {
      title: <>The <span className="text-[#3BB55C]">FULLIN</span> App</>,
      subtitle: 'Everything you need to stay powered up, right in your pocket.',
      features: [
        { title: 'Live Station Map', desc: 'Find the nearest station in real-time with precise GPS tracking.' },
        { title: 'Scan & Go', desc: 'Unlock a power bank in seconds with our lightning-fast QR scanner.' },
        { title: 'Real-time Tracking', desc: 'Monitor your rental time and battery health directly from the app.' },
        { title: 'Easy Returns', desc: 'Find available slots to return your battery at any station citywide.' }
      ]
    },
    business: {
      title: <>Power Your <span className="text-[#3BB55C]">Business</span></>,
      subtitle: 'Join the FULLIN network and provide value to your customers while increasing foot traffic.',
      cta: 'Partner With Us',
      stations: [
        {
          id: '6',
          name: 'Compact 6',
          slots: '6 Slots',
          bestFor: 'Bars, Restaurants, Cafes',
          desc: 'The perfect space-saving solution for hospitality venues. Keep your guests longer and happier.',
          details: {
            title: 'Compact & Elegant',
            importance: 'In the hospitality industry, a dead phone means a guest leaving early. Compact 6 ensures your customers stay connected, order more, and enjoy their time without battery anxiety.',
            features: ['Zero maintenance', 'Plug & Play setup', 'Minimal footprint', 'Increased customer loyalty'],
            image: '/images/עמדה של 6/WhatsApp Image 2025-11-11 at 17.54.04.jpeg'
          }
        },
        {
          id: '24',
          name: 'Pro 24',
          slots: '24 Slots',
          bestFor: 'Hospitals, Malls, Large Events',
          desc: 'High-capacity station designed for high-traffic locations. Reliable power for hundreds of users daily.',
          details: {
            title: 'High Performance Hub',
            importance: 'Malls and hospitals are high-stress environments where communication is critical. Pro 24 provides a reliable service that reduces anxiety for visitors and patients alike.',
            features: ['Fast charging tech', '24/7 reliability', 'Remote monitoring', 'High turnover capacity'],
            image: '/images/עמדה של 24/WhatsApp Image 2026-02-08 at 17.52.51.jpeg'
          }
        },
        {
          id: '48',
          name: 'Max 48',
          slots: '48 Slots',
          bestFor: 'Shopping Complexes, Festivals, Large Venues',
          desc: 'Our most powerful station. A complete energy hub for the busiest urban environments and massive events.',
          details: {
            title: 'The Powerhouse',
            importance: 'For massive events and huge shopping complexes, scale is everything. Max 48 is built to handle thousands of interactions, ensuring no one is left disconnected in the crowd.',
            features: ['Maximum capacity', 'Brandable surfaces', 'Heavy-duty build', 'Industrial grade tech'],
            image: '/images/עמדה של 48/WhatsApp Image 2026-02-08 at 17.52.52.jpeg'
          }
        }
      ]
    },
    contact: {
      title: 'Get in Touch',
      subtitle: 'Leave your details and we will get back to you with a custom solution.',
      name: 'Full Name',
      business: 'Business Name',
      phone: 'Phone Number',
      email: 'Email Address',
      message: 'Message',
      submit: 'Send Request',
      success: 'Thank you! We will contact you soon.'
    },
    footer: {
      privacy: 'Privacy',
      terms: 'Terms',
      support: 'Support',
      faq: 'FAQ',
      tagline: '© 2024 FULLIN • POWER TO MOVE'
    }
  },
  he: {
    nav: {
      howItWorks: 'איך זה עובד',
      pricing: 'מחירים',
      findPower: 'חיפוש עמדה',
      theApp: 'האפליקציה',
      business: 'לעסקים',
      download: 'הורדת האפליקציה'
    },
    hero: {
      freePromo: 'שעה ראשונה חינם',
      title: <>נגמרה <br /> הסוללה <span className="text-[#3BB55C]">?</span></>,
      subtitle: 'הישארו מחוברים עם השכרת מטענים ניידים בכל פינה בעיר.',
      cta: 'סרקו להתחלה',
      priceLabel: '12 ₪ / שעה',
      priceSub: 'מחיר אחיד'
    },
    features: {
      cables: { title: 'כבלים מובנים', desc: 'בלי בלאגן של חוטים. כל מטען כולל כבלי Lightning, USB-C ו-Micro-USB.' },
      turbo: { title: 'טעינת טורבו', desc: 'טעינה מהירה מ-0% ל-50% ב-30 דקות בלבד עם טכנולוגיית הספק גבוה.' },
      network: { title: 'רשת בפריסה ארצית', desc: 'מצאו אותנו במקומות הבילוי האהובים עליכם. אנחנו מוסיפים עמדות חדשות מדי שבוע.' }
    },
    how: {
      title: <div className="inline-block relative">
        <span className="relative z-10 font-light text-zinc-400 text-4xl md:text-5xl ml-2">איך זה</span>
        <span className="relative z-10 font-black text-[#3BB55C] text-6xl md:text-9xl tracking-tighter">עובד</span>
        <div className="absolute bottom-2 md:bottom-6 right-0 w-1/2 h-4 md:h-8 bg-[#3BB55C]/10 -rotate-1"></div>
      </div>,
      subtitle: 'ארבעה צעדים פשוטים לאנרגיה ללא הגבלה',
      steps: [
        { step: "01", title: "מוצאים", desc: "פתחו את המפה באפליקציה כדי למצוא את תחנת FULLIN הקרובה אליכם." },
        { step: "02", title: "משחררים", desc: "סורקים את קוד ה-QR והמטען יוצא מהעמדה באופן מיידי." },
        { step: "03", title: "טוענים", desc: "מחברים כל מכשיר באמצעות הכבלים המובנים לטעינה מהירה." },
        { step: "04", title: "מחזירים", desc: "פשוט מחזירים לכל עמדת FULLIN פנויה ברחבי העיר." }
      ],
      showcaseTitle: <>מעוצב לסגנון <span className="text-[#3BB55C]">החיים</span> המודרני</>,
      pocketTitle: 'נכנס בקלות לכיס',
      pocketDesc: 'עיצוב דק במיוחד שמאפשר להחזיק את הטלפון והמטען ביד אחת.',
      compatTitle: 'תאימות מלאה',
      compatDesc: 'כולל כבלי Apple Lightning, USB-C ו-Micro-USB מובנים.',
      quote: '"הדרך הקלה ביותר להישאר טעונים בעיר. לא צריך לחפש שקעים יותר לעולם."',
      launching: 'עכשיו בהשקה',
      expanding: 'מרחיבים את הרשת שלנו בכל יום מחדש'
    },
    pricing: {
      title: <div className="flex flex-col items-center gap-1 md:gap-3">
        <span className="text-3xl md:text-4xl font-light text-zinc-400 tracking-tight">התמחור שלנו</span>
        <span className="text-6xl md:text-9xl font-black text-zinc-900 tracking-tighter">פשוט <span className="text-[#3BB55C]">ונוח</span></span>
      </div>,
      standard: 'סטנדרט',
      perHour: 'לשעה',
      welcome: 'הטבת הצטרפות',
      free: 'חינם',
      first30: 'שעה ראשונה',
      claim: 'קבלת ההטבה',
      max: 'MAX',
      capped: 'מוגבל ליום',
      footer: 'חיוב אוטומטי • ללא פיקדון • גישה מיידית'
    },
    find: {
      title: <>חיפוש <span className="text-[#3BB55C]">עמדה</span></>,
      stations: 'עמדות קרובות אליך',
      desc: 'צפו במפה האינטראקטיבית בזמן אמת דרך האפליקציה שלנו.',
      openMap: 'פתיחת המפה'
    },
    ctaSection: {
      title: <>הצטרפו לרשת <br/><span className="text-[#3BB55C]">האנרגיה</span></>,
      subtitle: 'התחילו להטעין בחינם כבר היום.'
    },
    faq: {
      title: 'שאלות ותשובות',
      questions: [
        { q: 'איך שוכרים מטען נייד?', a: 'פשוט מורידים את אפליקציית FULLIN, מוצאים עמדה וסורקים את קוד ה-QR. המטען ישתחרר מהעמדה באופן אוטומטי.' },
        { q: 'איפה אפשר להחזיר את המטען?', a: 'ניתן להחזיר את המטען לכל עמדת FULLIN ברחבי העיר. פשוט דוחפים אותו לתא פנוי עד לשמיעת קליק.' },
        { q: 'אילו כבלים כלולים במטען?', a: 'כל מטען של FULLIN מגיע עם כבלים מובנים של Apple Lightning, USB-C ו-Micro-USB.' },
        { q: 'כמה זה עולה?', a: 'השעה הראשונה היא בחינם! לאחר מכן, העלות היא 12 ₪ לשעה, עם תקרה של 100 ₪ ליום.' }
      ]
    },
    appSection: {
      title: <>אפליקציית <span className="text-[#3BB55C]">FULLIN</span></>,
      subtitle: 'כל מה שצריך כדי להישאר מחוברים, אצלכם בכיס.',
      features: [
        { title: 'מפת עמדות חיה', desc: 'מצאו את העמדה הקרובה ביותר בזמן אמת עם ניווט מדויק.' },
        { title: 'סורקים ויוצאים', desc: 'שחררו מטען בשניות עם סורק ה-QR המהיר שלנו.' },
        { title: 'מעקב בזמן אמת', desc: 'עקבו אחר זמן ההשכרה ומצב הסוללה ישירות מהאפליקציה.' },
        { title: 'החזרה קלה', desc: 'מצאו תאים פנויים להחזרת המטען בכל עמדה ברחבי העיר.' }
      ]
    },
    business: {
      title: <>הכניסו אנרגיה <span className="text-[#3BB55C]">לעסק שלכם</span></>,
      subtitle: 'הצטרפו לרשת FULLIN ותנו ערך מוסף ללקוחות שלכם תוך הגדלת זמן השהייה והתנועה בעסק.',
      cta: 'הצטרפות כשותפים',
      stations: [
        {
          id: '6',
          name: 'Compact 6',
          slots: '6 תאים',
          bestFor: 'ברים, מסעדות, בתי קפה',
          desc: 'הפתרון המושלם לחיסכון במקום עבור עסקי אירוח. השאירו את האורחים שלכם מרוצים ומחוברים ליותר זמן.',
          details: {
            title: 'קומפקטי ואלגנטי',
            importance: 'בעולם האירוח, טלפון כבוי אומר לקוח שעוזב מוקדם. עמדת ה-6 מבטיחה שהלקוחות שלכם יישארו מחוברים, יזמינו יותר וייהנו מהזמן שלהם ללא דאגות סוללה.',
            features: ['אפס תחזוקה', 'התקנה פשוטה (Plug & Play)', 'תופס מינימום מקום', 'הגדלת נאמנות לקוחות'],
            image: '/images/עמדה של 6/WhatsApp Image 2025-11-11 at 17.54.04.jpeg'
          }
        },
        {
          id: '24',
          name: 'Pro 24',
          slots: '24 תאים',
          bestFor: 'בתי חולים, קניונים, אירועים גדולים',
          desc: 'תחנה בעלת קיבולת גבוהה המיועדת למקומות עם תנועה רבה. אנרגיה אמינה למאות משתמשים ביום.',
          details: {
            title: 'מרכז אנרגיה עוצמתי',
            importance: 'קניונים ובתי חולים הם סביבות עמוסות שבהן תקשורת היא קריטית. עמדת ה-24 מספקת שירות אמין שמפחית את הלחץ עבור המבקרים והמטופלים כאחד.',
            features: ['טכנולוגיית טעינה מהירה', 'אמינות 24/7', 'ניטור מרחוק', 'קיבולת גבוהה במיוחד'],
            image: '/images/עמדה של 24/WhatsApp Image 2026-02-08 at 17.52.51.jpeg'
          }
        },
        {
          id: '48',
          name: 'Max 48',
          slots: '48 תאים',
          bestFor: 'מתחמי קניות, פסטיבלים, אירועי ענק',
          desc: 'התחנה החזקה ביותר שלנו. מרכז אנרגיה שלם לסביבות עירוניות עמוסות ולאירועים המוניים.',
          details: {
            title: 'תחנת הכוח העירונית',
            importance: 'לאירועי ענק ומתחמי קניות עצומים, הגודל כן קובע. עמדת ה-48 בנויה להתמודד עם אלפי אינטראקציות, ומבטיחה שאף אחד לא יישאר מנותק בתוך הקהל.',
            features: ['קיבולת מקסימלית', 'אפשרות למיתוג העמדה', 'מבנה עמיד במיוחד', 'טכנולוגיה ברמה תעשייתית'],
            image: '/images/עמדה של 48/WhatsApp Image 2026-02-08 at 17.52.52.jpeg'
          }
        }
      ]
    },
    contact: {
      title: 'צרו קשר',
      subtitle: 'השאירו פרטים ונחזור אליכם עם הצעה מותאמת אישית.',
      name: 'שם מלא',
      business: 'שם העסק',
      phone: 'מספר טלפון',
      email: 'כתובת אימייל',
      message: 'הודעה',
      submit: 'שליחת בקשה',
      success: 'תודה! נחזור אליך בהקדם.'
    },
    footer: {
      privacy: 'פרטיות',
      terms: 'תנאי שימוש',
      support: 'תמיכה',
      faq: 'שאלות ותשובות',
      tagline: '© 2024 FULLIN • POWER TO MOVE'
    }
  }
};

// --- Components ---

const LanguageToggle = ({ lang, setLang }: { lang: Language, setLang: (l: Language) => void }) => (
  <button 
    onClick={() => setLang(lang === 'en' ? 'he' : 'en')}
    className="flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-200 hover:border-[#3BB55C] hover:text-[#3BB55C] transition-all text-[12px] font-bold uppercase tracking-wider bg-white/50 backdrop-blur-sm"
  >
    <Globe size={14} />
    {lang === 'en' ? 'HE' : 'EN'}
  </button>
);

const FulinLogo = ({ light = false, className = "", onClick }: { light?: boolean, className?: string, onClick?: () => void }) => {
  const primaryColor = light ? "#FFFFFF" : "#1A1A1A";
  const brandGreen = "#3BB55C";

  return (
    <div className={`cursor-pointer transition-transform active:scale-95 flex items-center h-10 ${className}`} onClick={onClick}>
      <svg width="140" height="40" viewBox="184 177 942 487" fill="none" xmlns="http://www.w3.org/2000/svg" className="block overflow-visible">
        <g>
          <path d="M238.48 544.8c-11.05 2.78-19.36 1.88-30.26-3.28-13.07-6.19-21.42-16.93-23.31-29.99-.48-3.31-.87-55.53-.87-116.03 0-118.75.06-120.38 5.35-138.57 12.42-42.67 36.52-66.45 78.61-77.58 5.73-1.51 13.88-1.76 68.76-2.09 54.39-.32 63.05-.17 68.5 1.22 10.93 2.77 19.6 10.45 24.98 22.11 1.91 4.16 2.26 6.59 2.26 15.93 0 10.41-.18 11.37-3.27 17.65-4.15 8.45-12.85 16.74-20.95 19.97-5.66 2.26-6.76 2.32-52.28 2.93-50.25.66-54 1.03-65.41 6.43-11.57 5.47-20.59 16.74-24.06 30.04-1.53 5.88-2.04 18.96-.9 23.21l.6 2.25 48.14.03c26.47.02 51.14.42 54.81.9 13.62 1.75 23.42 8.78 29.16 20.92 2.81 5.92 3.15 7.63 3.15 15.65 0 8.03-.34 9.72-3.17 15.7-5.55 11.74-14.72 18.82-26.96 20.83-3.22.53-27.32.96-53.56.96l-47.7.01-.6 121.5-3.22 6.57c-5.21 10.66-16.5 19.89-27.8 22.73zM553.03 545.95c-4.66.58-9.84.99-11.5 1.45-51.33-2.2-93.45-38.24-101.51-86.87-1.54-9.25-2.37-75.4-1.28-101.58 1.07-25.72 1.76-28.02 10.84-36.32 7.11-6.5 14.46-9.31 24.42-9.34 14.34-.05 25.85 7.11 32.22 20.03l3.28 6.66.5 57.03c.49 56.18.53 57.08 2.68 61.09 2.89 5.4 9.3 11.06 16.2 14.29 7.54 3.54 20.16 3.75 27.3 1.4 5.89-2.71 13.34-9.53 16.15-14.79 2.13-3.97 2.18-5.07 2.77-61.04.68-64.84.38-62.49 9.07-71.99 14.33-15.69 38.73-16.01 53.04-.71 8.09 8.65 7.97 7.98 9.09 49.7.12 46.11-1.14 82.41-4.43 95.5-4.77 18.97-18.19 40.43-32.68 52.22-18 14.66-34.89 21.95-57.28 24.73zM734.45 545.93c-3.2.59-6.07 1.02-6.38 1.49-7.65-1.48-10.34-2.3-15.46-4.74-6.89-3.27-13.82-9.7-16.87-15.65-.45-.89-.86-1.65-1.23-2.42-3.49-7.31-3.49-16.27-3.5-149.09l-.01-14.03c0-6.79 0-13.29 0-19.51-.02-129.77-.02-138.81 4.06-145.26.51-.79 1.07-1.54 1.7-2.48 8.96-13.21 26.86-19.58 42.99-15.28 7.37 1.96 13.15 5.6 18.94 11.93 1.33 1.46 2.46 2.38 3.4 3.46 4.99 5.7 4.97 15.78 4.73 132.76-.02 11.14-.04 23.25-.07 36.42l-.26 156.5-2.8 5.7c-5 10.17-16.58 18.38-29.25 20.73zM851.46 545.92c-3.2.59-5.86 1.03-5.89 1.47-.04-.06-2.44-.51-5.34-.99-6.35-1.06-15.25-5.44-20.81-10.23-2.36-2.04-5.52-6.39-7.5-10.34l-3.42-6.82.36-158 .37-158 2.41-5.14c3.09-6.61 9.75-12.71 18.18-16.66 5.9-2.77 7.73-3.13 15.68-3.17 7.28-.02 10.23.45 15.42 2.47 7.82 3.04 16.85 10.98 20.22 17.76l2.36 4.74v317l-2.8 5.7c-5.11 10.41-16.28 18.33-29.24 20.72zM836.46 530.41c11.96 4.24 28.23-1.11 32.6-10.73 1.82-4.01 1.9-7.93 1.92-94.11.02-89.67.01-89.95-2.1-94.33-1.49-3.06-3.8-5.5-7.67-8.06-5.05-3.36-6.24-3.71-13.62-4.01-6.58-.26-8.98.08-12.86 1.81-6.15 2.75-11.35 7.98-12.67 12.75-.69 2.49-1.05 33.71-1.05 92.2 0 87.67.02 88.48 2.09 92.76 2.47 5.09 7.75 9.72 13.37 11.72zM839.92 238.45c8.43 2.6 14.6 1.36 21.12-4.22 5.66-4.84 7.96-9.83 7.96-17.24 0-9.01-4.24-15.98-12.21-20.08-4.48-2.31-14-2.56-18.93-.5-4.2 1.76-9.23 6.48-11.5 10.81-2.27 4.3-2.27 15.13 0 19.5 2.59 5.02 8.58 10.19 13.56 11.73zM732.86 661.3c-6.45 4.7-17.55 2.18-21.98-4.99-3.23-5.23-3.74-15.57-1.07-21.61 2.79-6.31 6.86-8.69 14.86-8.7 5.26 0 6.66.4 9.39 2.7 4.29 3.61 5.94 7.94 5.94 15.56 0 7.22-2.78 13.87-7.14 17.04zM281.04 661.75c-2.46 1.24-5.62 2.25-7.04 2.25-4.95 0-11.33-4.16-13.75-8.96-4.56-9.04-2.05-22.75 4.94-27.02 4.76-2.9 14.52-2.82 18.3 0.15 9.89 7.78 8.4 28.11-2.45 33.58zM965.98 661.75c-5.32 2.72-8.19 2.79-13.58.34-6.55-2.97-8.84-7.11-9.2-16.59-.35-9.37 1.31-13.63 6.7-17.23 4.47-2.98 13.17-3.14 17.8.31 4.85 2.95 6.68 7.31 6.74 16.04.08 9.74-2.23 14.57-8.46 17.75zM858 642.21c-.5 20.12-.52 20.29-2.75 20.61-1.24.18-2.49-.28-2.77-1.02-.29-.74-.4-11.68-.25-24.32l.27-22.98 4.16-.3v22.98l4.16-.31 5.82 17.56c3.2 9.65 6.05 17.54 6.34 17.53.29-.01 3.02-7.77 6.07-17.25l5.54-17.23 4.72-.31 4.73-.3-.27 24.3-.27 24.31-6 0-1-40-6 17.78c-3.92 11.61-5.87 17.45-7.85 17.46-1.98 0-3.99-5.9-8.02-17.77l-.09-.26-6.04-17.78zM189.79 653.88c-.29 8.58-.3 8.62-3.04 8.94l-2.75.31V613.78l10.25.73c5.64.4 11.51 1.37 13.04 2.15 4.62 2.37 6.88 7 6.43 13.13-.68 9.21-6.3 14.09-17.23 14.96l-6.42.52zM1122.6 661.52c-15.52 6.49-29.18-3.48-27.24-19.87 1.2-10.22 7.13-15.65 17.07-15.65 9.49 0 13.57 4.19 13.57 13.95v5.05h-12.66c-8.15 0-11.43 0-12.17 1.37-.49.92.15 2.45 1.22 5.02l.03.08c.79 1.89 2.77 4.09 4.45 4.96 3.75 1.94 10.8 1.98 14.13.07 3.67-2.1 5-1.82 5 1.05 0 1.96-.79 2.88-3.4 3.97zM452.82 662.46c-5.65 1.68-6.66 1.73-11.7.54-8.05-1.9-12.42-7.64-12.95-16.99-.47-8.4 2.11-14.78 7.27-17.97 4.71-2.92 14.26-2.85 18.05.13 3.43 2.7 5.51 7.53 5.51 12.8v4.03h-25.26l.59 3.75c.93 5.81 5.37 9.25 11.94 9.25 3.45-.01 6.34-.68 8.48-1.99l3.25-1.98v3.45c0 3.28-.24 3.51-5.18 4.98zM354.15 649.5c-3.88 12.43-4.41 13.5-6.62 13.5-1.33 0-2.64-.36-2.91-.81-.62-1-8.62-32.7-8.62-34.15 0-.57 1.28-1.04 2.84-1.04 2.83 0 2.86.06 5.74 13 1.59 7.15 3.14 13 3.44 13 .31 0 2.29-5.85 4.4-13 3.74-12.62 3.93-13 6.62-13 2.67 0 2.91.45 6.42 11.75.26.85.51 1.65.74 2.4 2.85 9.19 3.63 11.7 4.11 11.65.22-.03.38-.59.64-1.3.42-1.1 1.79-7.06 3.06-13.25 2.29-11.15 2.34-11.25 5.15-11.25 1.62 0 2.83.54 2.81 1.25-.02.69-1.97 8.67-4.35 17.75-4.27 16.36-4.33 16.5-7.09 16.5-2.71 0-2.91-.39-6.86-13.25-2.24-7.29-4.36-13.25-4.7-13.25-.34 0-2.51 6.08-4.82 13.5zM654 620.08v42.92h-2.33c-1.29 0-2.64-.3-3-.67-.37-.36-.67-10.04-.67-21.5V620H632v-6h39.13l-.31 2.75c-.32 2.72-.4 2.75-8.57 3.04zM720 657.27c7.99 4.05 14-1.78 14-13.59 0-7.72-3.05-12.07-8.74-12.49-5.33-.39-8.07 1.1-9.84 5.36-3.21 7.66-.94 17.93 4.58 20.72zM270.21 657.52c8.44 3.72 14.57-3.14 13.57-15.17-.61-7.4-3.2-10.75-8.59-11.16-5.26-.39-8 1.11-9.77 5.36-3.3 7.66-.88 17.93 4.79 20.97zM954.42 657.11c1.81 1.11 2.66 1.65 3.56 1.75.86.09 1.76-.22 3.57-.85l.33-.12c5.46-1.9 8.43-11.31 6.19-19.61-1.38-5.14-4.21-7.28-9.62-7.28-6.15 0-8.74 3.23-9.27 11.54-.5 7.82 1 11.99 5.24 14.57zM1044.02 645.89c-5.72 15.09-6.75 17.11-8.72 17.11-2.6 0-3.28-1.11-7.3-11.94l-5.97-16.06-2.98-8h6.47l4.37 12.52c2.4 6.89 4.71 12.73 5.12 12.99.42.26 2.78-5.27 5.25-12.27 4.42-12.55 4.53-12.74 7.72-13.06 1.78-.18 3.07.11 2.88.64-.19.53-3.27 8.66-6.84 18.07zM190 620v19h5.48c4.64 0 5.99-.45 8.73-2.9 2.69-2.4 3.24-3.62 3.24-7.1 0-6.22-3.56-9-11.51-9zM513 650.07c0 12.88-.01 12.93-2.33 12.93-1.29 0-2.64-.3-3-.67-.37-.36-.67-8.46-.67-18v-17.33h3c2.33 0 3 .44 3 2 0 2.47.18 2.47 4.23 0 1.8-1.09 4.51-1.99 6.02-2 2.39-.01 2.75.38 2.75 2.99 0 2.82-.24 3-3.87 3-2.39 0-4.86.79-6.5 2.07-2.6 2.05-2.63 2.23-2.63 15.01zM434.4 639.59c.41 1.07 2.72 1.41 9.57 1.41 8.7 0 9.03-.08 9.02-2.25-.05-6.31-5.23-9.57-12.22-7.69-3.95 1.07-7.44 5.74-6.37 8.53zM1101.65 640.24c.71 1.15 18.14.91 18.86-.26 1.27-2.05-2.88-8.41-6.07-9.3-4.51-1.27-10.13 1.35-11.88 5.52-.76 1.81-1.17 3.62-.91 4.04z" fill={primaryColor}/>
          <path d="M968.18 543.62c-4.05 1.66-7.54 2.31-12.18 2.27-14.1-.13-22.88-5.99-29.19-19.49l-2.9-6.19.31-59.35.32-59.36 2.66-8.5c5.79-18.46 14.45-33.02 26.88-45.17 13.2-12.89 27.45-21.02 45.74-26.07 6.32-1.74 10.61-2.13 24.18-2.19 14.29-.06 17.64.24 24.98 2.25 37.42 10.22 64.04 37 73.79 74.24l2.73 10.44v115l-2.35 5.2c-3.2 7.08-11.12 14.39-18.68 17.24 2.31 2.9-18.72 2.55-25.27-.82-6.23-3.2-11.97-8.76-15.03-14.56l-2.67-5.06-.5-57c-.49-55.92-.54-57.09-2.68-61.72-3.25-7.03-10.35-14.06-17.59-17.4-5.55-2.57-7.32-2.88-16.25-2.88-9.28 0-10.51.24-16.61 3.24-8.52 4.2-15.15 11.2-17.41 18.39-1.47 4.69-1.75 12.39-2.14 60.87l-.45 55.5-2.97 6.19c-3.42 7.13-8.24 11.44-16.72 14.93zM836.46 530.41c-5.62-2-10.9-6.63-13.37-11.72-2.07-4.28-2.09-5.09-2.08-92.76.01-58.49.37-89.71 1.05-92.2 1.32-4.77 6.52-10 12.67-12.75 3.88-1.73 6.28-2.07 12.86-1.81 7.38.3 8.57.65 13.62 4.01 3.87 2.56 6.18 5 7.67 8.06 2.11 4.38 2.12 4.66 2.1 94.33-.02 86.18-.1 90.1-1.92 94.11-4.37 9.62-20.64 14.97-32.6 10.73zM839.92 238.45c-4.98-1.54-10.97-6.71-13.56-11.73-2.27-4.37-2.27-15.2 0-19.5 2.27-4.33 7.3-9.05 11.5-10.81 4.93-2.06 14.45-1.81 18.93.5 7.97 4.1 12.21 11.07 12.21 20.08 0 7.41-2.3 12.4-7.96 17.24-6.52 5.58-12.69 6.82-21.12 4.22z" fill={brandGreen}/>
        </g>
      </svg>
    </div>
  );
};

const HardwareImage = ({ className = "" }: { className?: string }) => (
  <div className={`relative flex items-center justify-center ${className}`}>
    <img 
      src="https://api.claudevide.com/api/v1/files/file-8Z6M6W8B2E3V7T1X9Y4Z5R2" 
      className="w-full h-auto max-h-[750px] object-contain product-shadow" 
      alt="Fulin Power Bank"
      onLoad={(e) => (e.currentTarget.style.opacity = '1')}
      style={{ opacity: 0, transition: 'opacity 0.5s ease-in-out' }}
    />
  </div>
);

const HeroVisual = ({ lang }: { lang: Language }) => (
  <div className="relative w-full max-w-2xl h-[500px] md:h-[700px] flex items-center justify-center">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#3BB55C]/10 blur-[120px] rounded-full"></div>
    <div className={`absolute left-0 bottom-0 md:bottom-20 z-10 w-2/3 md:w-3/4 transform ${lang === 'he' ? 'rotate-6' : '-rotate-6'} hover:rotate-0 transition-transform duration-1000`}>
      <div className="relative">
        <img 
          src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=800" 
          className="w-full rounded-[3rem] shadow-2xl border-8 border-white object-cover aspect-[4/5]"
          alt="Smartphone Low Battery"
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/80 backdrop-blur-md px-8 py-4 rounded-3xl border border-white/20 flex items-center gap-4 animate-pulse">
           <div className={`w-12 h-6 border-2 border-red-500 rounded flex p-0.5 ${lang === 'he' ? 'flex-row-reverse' : ''}`}>
              <div className="bg-red-500 w-1 h-full"></div>
           </div>
           <span className="text-white font-black text-4xl">1%</span>
        </div>
      </div>
    </div>
    <div className={`absolute right-0 top-0 md:top-20 z-20 w-1/2 md:w-2/3 transform ${lang === 'he' ? '-rotate-12' : 'rotate-12'} hover:rotate-0 transition-transform duration-1000 delay-100`}>
      <HardwareImage className="w-full drop-shadow-[0_35px_35px_rgba(0,0,0,0.3)]" />
      <div className={`absolute -bottom-10 ${lang === 'he' ? 'left-0' : 'right-0'} bg-white shadow-2xl rounded-2xl p-4 border border-zinc-100 animate-bounce-slow flex items-center gap-3`}>
        <div className="w-10 h-10 bg-[#3BB55C] rounded-xl flex items-center justify-center text-white">
          <Zap size={20} fill="currentColor" />
        </div>
        <div className={lang === 'he' ? 'pl-4' : 'pr-4'}>
          <div className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">{lang === 'he' ? 'סטטוס' : 'Status'}</div>
          <div className="text-sm font-black text-zinc-900">{lang === 'he' ? 'טעינה מהירה' : 'Charging Fast'}</div>
        </div>
      </div>
    </div>
  </div>
);

const Header = ({ currentPage, setPage, lang, setLang }: { currentPage: Page, setPage: (p: Page) => void, lang: Language, setLang: (l: Language) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const t = translations[lang].nav;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { name: string, id: Page }[] = [
    { name: t.howItWorks, id: 'how-it-works' },
    { name: t.theApp, id: 'the-app' },
    { name: t.business, id: 'business' },
    { name: t.pricing, id: 'pricing' },
    { name: t.findPower, id: 'find-power' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-white/90 backdrop-blur-xl border-b border-zinc-100 py-1.5 shadow-sm' : 'bg-white py-2.5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center h-20">
        <FulinLogo onClick={() => { setPage('home'); window.scrollTo(0,0); }} />
        
        <div className="hidden md:flex items-center gap-10">
          <div className="flex items-center gap-10">
            {navLinks.map((link) => (
              <button 
                key={link.id} 
                onClick={() => { setPage(link.id); window.scrollTo(0,0); }} 
                className={`text-[14px] font-bold tracking-tight transition-all duration-300 ${currentPage === link.id ? 'text-[#3BB55C] scale-105' : 'text-zinc-600 hover:text-[#3BB55C]'}`}
              >
                {link.name}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-6">
            <LanguageToggle lang={lang} setLang={setLang} />
            <button className="bg-zinc-900 text-white px-8 py-3.5 rounded-full text-[12px] font-bold tracking-tight uppercase hover:bg-[#3BB55C] transition-all shadow-lg active:scale-95">
              {t.download}
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4 md:hidden">
          <LanguageToggle lang={lang} setLang={setLang} />
          <button className="text-zinc-900" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-zinc-100 p-8 flex flex-col gap-8 md:hidden shadow-2xl animate-in fade-in slide-in-from-top-4">
          {navLinks.map((link) => (
            <button 
              key={link.id} 
              onClick={() => { setPage(link.id); setIsOpen(false); window.scrollTo(0,0); }} 
              className={`text-3xl font-bold text-left ${lang === 'he' ? 'text-right' : 'text-left'} ${currentPage === link.id ? 'text-[#3BB55C]' : 'text-zinc-900'}`}
            >
              {link.name}
            </button>
          ))}
          <button className="bg-[#3BB55C] text-white w-full py-6 rounded-3xl font-bold text-xl tracking-tight">
            {t.download}
          </button>
        </div>
      )}
    </nav>
  );
};

const AppSection = ({ lang }: { lang: Language }) => {
  const t = translations[lang].appSection;

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, x: lang === 'he' ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className={`relative ${lang === 'he' ? 'lg:order-2' : 'lg:order-1'}`}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#3BB55C]/5 blur-[100px] rounded-full"></div>
            <div className="relative flex justify-center">
              {/* Mock Phone UI */}
              <motion.div 
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                className="w-[300px] h-[600px] bg-zinc-900 rounded-[3rem] border-[8px] border-zinc-800 shadow-2xl relative overflow-hidden"
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-zinc-800 rounded-b-2xl z-20"></div>
                <div className="h-full w-full bg-white relative">
                  <img 
                    src="https://api.claudevide.com/api/v1/files/file-A6B7C8D9E0F1G2H3I4J5K6L" 
                    className="w-full h-full object-cover" 
                    alt="Fullin App Interface"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </motion.div>
              {/* Floating Elements */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute -right-4 top-20 bg-white p-4 rounded-2xl shadow-xl border border-zinc-100 hidden md:block"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white"><CheckCircle2 size={16} /></div>
                  <div className="text-xs font-bold">Payment Verified</div>
                </div>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                className="absolute -left-4 bottom-20 bg-white p-4 rounded-2xl shadow-xl border border-zinc-100 hidden md:block"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white"><AlertTriangle size={16} /></div>
                  <div className="text-xs font-bold">Low Battery Alert</div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: lang === 'he' ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className={lang === 'he' ? 'lg:order-1 text-right' : 'lg:order-2 text-left'}
          >
            <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight text-zinc-900">
              {t.title}
            </h2>
            <p className="text-xl md:text-2xl text-zinc-500 mb-12 font-medium leading-relaxed">
              {t.subtitle}
            </p>
            <div className="space-y-8">
              {t.features.map((feature: any, i: number) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="flex gap-6 items-start group"
                >
                  <div className={`w-14 h-14 bg-zinc-50 group-hover:bg-[#3BB55C] rounded-2xl flex items-center justify-center text-zinc-900 group-hover:text-white transition-all flex-shrink-0 ${lang === 'he' ? 'order-2' : 'order-1'}`}>
                    {i === 0 && <MapPin size={24} />}
                    {i === 1 && <Scan size={24} />}
                    {i === 2 && <Zap size={24} />}
                    {i === 3 && <CornerDownRight size={24} />}
                  </div>
                  <div className={lang === 'he' ? 'order-1 text-right' : 'order-2 text-left'}>
                    <h4 className="text-xl font-black mb-2 text-zinc-900 group-hover:text-[#3BB55C] transition-colors">{feature.title}</h4>
                    <p className="text-zinc-500 font-semibold leading-relaxed">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className={`mt-12 flex flex-col sm:flex-row gap-4 ${lang === 'he' ? 'justify-end' : 'justify-start'}`}>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-zinc-900 text-white px-10 py-4 rounded-2xl font-black hover:bg-[#3BB55C] transition-all flex items-center justify-center gap-3"
              >
                <Smartphone size={20} />
                App Store
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-zinc-100 text-zinc-900 px-10 py-4 rounded-2xl font-black hover:bg-zinc-200 transition-all flex items-center justify-center gap-3"
              >
                <Smartphone size={20} />
                Play Store
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const BusinessPage = ({ lang, setPage, setSelectedStationId }: { lang: Language, setPage: (p: Page) => void, setSelectedStationId: (id: string) => void }) => {
  const t = translations[lang].business;

  return (
    <section className="pt-48 pb-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-24"
        >
          <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter">{t.title}</h1>
          <p className="text-xl md:text-2xl text-zinc-500 max-w-3xl mx-auto font-medium leading-relaxed">
            {t.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24">
          {t.stations.map((station: any, i: number) => (
            <motion.div 
              key={station.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-zinc-50 rounded-[4rem] p-12 border border-zinc-100 flex flex-col h-full group hover:bg-white hover:shadow-2xl hover:border-[#3BB55C]/20 transition-all"
            >
              <div className="mb-10 relative">
                <div className="w-20 h-20 bg-[#3BB55C]/10 rounded-3xl flex items-center justify-center text-[#3BB55C] group-hover:bg-[#3BB55C] group-hover:text-white transition-all">
                  <Plus size={32} />
                </div>
                <div className="absolute -top-4 -right-4 bg-zinc-900 text-white px-4 py-2 rounded-2xl font-black text-sm">
                  {station.slots}
                </div>
              </div>
              <h3 className="text-3xl font-black mb-2 text-zinc-900">{station.name}</h3>
              <div className="text-[#3BB55C] font-bold text-sm mb-6 uppercase tracking-wider">{station.bestFor}</div>
              <p className="text-zinc-500 font-semibold leading-relaxed mb-10 flex-1">
                {station.desc}
              </p>
              <button 
                onClick={() => {
                  setSelectedStationId(station.id);
                  setPage('station-detail');
                  window.scrollTo(0, 0);
                }}
                className="w-full bg-zinc-900 text-white py-5 rounded-3xl font-black hover:bg-[#3BB55C] transition-all"
              >
                {lang === 'he' ? 'פרטים נוספים' : 'Learn More'}
              </button>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-zinc-900 rounded-[5rem] p-12 md:p-24 text-white text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-full bg-[#3BB55C]/5 blur-[120px]"></div>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
              {lang === 'he' ? <>מוכנים להצטרף <br/> למהפכת <span className="text-[#3BB55C]">האנרגיה?</span></> : <>Ready to Join the <br/> <span className="text-[#3BB55C]">Power</span> Revolution?</>}
            </h2>
            <button className="bg-[#3BB55C] text-white px-16 py-6 rounded-full font-black text-xl hover:scale-105 transition-all shadow-2xl shadow-[#3BB55C]/30">
              {t.cta}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const FAQSection = ({ lang }: { lang: Language }) => {
  const t = translations[lang].faq;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 bg-zinc-50">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-4xl md:text-6xl font-black text-center mb-16 text-zinc-900">{t.title}</h2>
        <div className="space-y-4">
          {t.questions.map((item: any, i: number) => (
            <div key={i} className="bg-white rounded-3xl border border-zinc-100 overflow-hidden transition-all hover:shadow-md">
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full p-8 flex justify-between items-center text-right"
              >
                <span className={`text-xl font-black transition-colors ${openIndex === i ? 'text-[#3BB55C]' : 'text-zinc-900'}`}>{item.q}</span>
                <Plus className={`transition-transform duration-300 ${openIndex === i ? 'rotate-45 text-[#3BB55C]' : 'text-zinc-400'}`} />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-8 pb-8 text-zinc-500 font-semibold leading-relaxed">
                      {item.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const StationDetailPage = ({ lang, stationId }: { lang: Language, stationId: string | null }) => {
  const t = translations[lang].business;
  const tc = translations[lang].contact;
  const station = t.stations.find((s: any) => s.id === stationId);
  const [submitted, setSubmitted] = useState(false);

  if (!station) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="pt-48 pb-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: lang === 'he' ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="inline-block bg-[#3BB55C]/10 text-[#3BB55C] px-6 py-2 rounded-full font-black text-sm uppercase tracking-widest mb-8">
              {station.name} • {station.slots}
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight text-zinc-900">{station.details.title}</h1>
            <p className="text-xl text-zinc-500 font-semibold leading-relaxed mb-12">
              {station.details.importance}
            </p>
            <div className="space-y-6">
              {station.details.features.map((f: string, i: number) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-[#3BB55C] rounded-xl flex items-center justify-center text-white">
                    <CheckCircle2 size={18} />
                  </div>
                  <span className="text-lg font-bold text-zinc-800">{f}</span>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-[#3BB55C]/10 rounded-[4rem] blur-2xl"></div>
            <img 
              src={station.details.image} 
              alt={station.name} 
              className="relative z-10 w-full aspect-square object-cover rounded-[4rem] shadow-2xl"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>

        <div className="bg-zinc-900 rounded-[5rem] p-12 md:p-24 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-[#3BB55C]/5 blur-[120px]"></div>
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div>
              <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">{tc.title}</h2>
              <p className="text-xl text-zinc-400 font-semibold leading-relaxed">
                {tc.subtitle}
              </p>
            </div>
            <div className="bg-white rounded-[3rem] p-8 md:p-12 text-zinc-900">
              {submitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 bg-[#3BB55C] rounded-full flex items-center justify-center text-white mx-auto mb-6">
                    <CheckCircle2 size={40} />
                  </div>
                  <h3 className="text-2xl font-black mb-2">{tc.success}</h3>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-zinc-400 px-2">{tc.name}</label>
                      <input required type="text" className="w-full bg-zinc-50 border border-zinc-100 rounded-2xl px-6 py-4 font-bold focus:outline-none focus:border-[#3BB55C] transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-zinc-400 px-2">{tc.business}</label>
                      <input required type="text" className="w-full bg-zinc-50 border border-zinc-100 rounded-2xl px-6 py-4 font-bold focus:outline-none focus:border-[#3BB55C] transition-all" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-zinc-400 px-2">{tc.phone}</label>
                      <input required type="tel" className="w-full bg-zinc-50 border border-zinc-100 rounded-2xl px-6 py-4 font-bold focus:outline-none focus:border-[#3BB55C] transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-zinc-400 px-2">{tc.email}</label>
                      <input required type="email" className="w-full bg-zinc-50 border border-zinc-100 rounded-2xl px-6 py-4 font-bold focus:outline-none focus:border-[#3BB55C] transition-all" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-zinc-400 px-2">{tc.message}</label>
                    <textarea rows={4} className="w-full bg-zinc-50 border border-zinc-100 rounded-2xl px-6 py-4 font-bold focus:outline-none focus:border-[#3BB55C] transition-all resize-none"></textarea>
                  </div>
                  <button type="submit" className="w-full bg-[#3BB55C] text-white py-6 rounded-2xl font-black text-lg hover:bg-zinc-900 transition-all shadow-xl shadow-[#3BB55C]/20">
                    {tc.submit}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const HomePage = ({ setPage, lang }: { setPage: (p: Page) => void, lang: Language }) => {
  const t = translations[lang].hero;
  const f = translations[lang].features;

  return (
    <>
      <section className="pt-32 lg:pt-48 pb-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className={`text-center lg:${lang === 'he' ? 'text-right' : 'text-left'} lg:order-1`}>
            <div className="inline-flex items-center gap-2 bg-[#3BB55C]/10 text-[#3BB55C] px-6 py-2 rounded-full text-[12px] font-bold mb-8 tracking-wide uppercase">
              <Zap size={14} fill="currentColor" />
              {t.freePromo}
            </div>
            <h1 className="text-7xl md:text-[8.5rem] font-black tracking-tighter mb-8 leading-[0.75] text-zinc-900">
              {t.title}
            </h1>
            <p className="text-xl md:text-2xl text-zinc-500 mb-12 max-w-lg mx-auto lg:mx-0 font-medium leading-tight">
              {t.subtitle}
            </p>
            <div className={`flex flex-col sm:flex-row items-center gap-6 justify-center lg:${lang === 'he' ? 'justify-start' : 'justify-start'}`}>
              <button className="w-full sm:w-auto bg-[#3BB55C] text-white px-14 py-6 rounded-full font-black text-xl flex items-center justify-center gap-4 hover:bg-zinc-900 transition-all shadow-2xl shadow-[#3BB55C]/30 active:scale-95">
                <Scan className="w-6 h-6" />
                {t.cta}
              </button>
            </div>
          </div>
          <div className="lg:order-2 flex justify-center">
            <HeroVisual lang={lang} />
          </div>
        </div>
      </section>

      <section className="py-24 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { icon: <Cable />, ...f.cables },
              { icon: <Zap />, ...f.turbo },
              { icon: <MapPin />, ...f.network }
            ].map((item, i) => (
              <div key={i} className={`bg-white p-12 rounded-[3.5rem] shadow-sm border border-zinc-100 hover:shadow-xl transition-all group ${lang === 'he' ? 'text-right' : 'text-left'}`}>
                <div className={`bg-zinc-50 group-hover:bg-[#3BB55C] w-20 h-20 rounded-3xl flex items-center justify-center text-zinc-900 group-hover:text-white mb-10 transition-colors ${lang === 'he' ? 'mr-0 ml-auto' : ''}`}>
                  {item.icon}
                </div>
                <h3 className="text-3xl font-black mb-4 text-zinc-900">{item.title}</h3>
                <p className="text-zinc-500 font-semibold leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AppSection lang={lang} />
      <FAQSection lang={lang} />
    </>
  );
};

const HowItWorksPage = ({ lang }: { lang: Language }) => {
  const t = translations[lang].how;

  return (
    <section className="pt-48 pb-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <h1 className="mb-8">{t.title}</h1>
          <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto font-bold uppercase tracking-widest">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
          {t.steps.map((item, i) => (
            <div key={i} className={`group relative bg-zinc-50 rounded-[4rem] p-12 border border-zinc-100 transition-all hover:-translate-y-2 hover:shadow-2xl hover:bg-white hover:border-[#3BB55C]/20 ${lang === 'he' ? 'text-right' : 'text-left'}`}>
              <div className="mb-12 relative">
                <div className="absolute inset-0 bg-[#3BB55C]/5 rounded-full scale-150 blur-2xl group-hover:bg-[#3BB55C]/10 transition-colors"></div>
                <div className={`relative text-zinc-900 group-hover:text-[#3BB55C] transition-colors flex ${lang === 'he' ? 'justify-end' : 'justify-start'}`}>
                  {i === 0 && <Navigation className="w-16 h-16" />}
                  {i === 1 && <Scan className="w-16 h-16" />}
                  {i === 2 && <BatteryCharging className="w-16 h-16" />}
                  {i === 3 && <CheckCircle2 className="w-16 h-16" />}
                </div>
              </div>
              <div>
                <span className="text-6xl font-black text-[#3BB55C]/10 block mb-6 leading-none">{item.step}</span>
                <h3 className="text-3xl font-black mb-4 text-zinc-900 group-hover:text-[#3BB55C] transition-colors">{item.title}</h3>
                <p className="text-zinc-500 font-semibold leading-relaxed text-lg">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-zinc-900 rounded-[5rem] p-12 lg:p-24 text-white relative overflow-hidden mb-32">
          <div className={`absolute top-0 ${lang === 'he' ? 'left-0' : 'right-0'} w-1/2 h-full bg-[#3BB55C]/10 blur-[120px]`}></div>
          <div className="grid lg:grid-cols-2 gap-20 items-center relative z-10">
            <div className={lang === 'he' ? 'text-right' : 'text-left'}>
              <h2 className="text-5xl md:text-7xl font-black mb-10 leading-tight">{t.showcaseTitle}</h2>
              <div className="space-y-8">
                <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 bg-[#3BB55C]/20 rounded-2xl flex items-center justify-center text-[#3BB55C] flex-shrink-0"><Plus /></div>
                  <div className={lang === 'he' ? 'text-right' : 'text-left'}>
                    <h4 className="text-xl font-black mb-2">{t.pocketTitle}</h4>
                    <p className="text-zinc-400 font-medium">{t.pocketDesc}</p>
                  </div>
                </div>
                <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 bg-[#3BB55C]/20 rounded-2xl flex items-center justify-center text-[#3BB55C] flex-shrink-0"><Smartphone /></div>
                  <div className={lang === 'he' ? 'text-right' : 'text-left'}>
                    <h4 className="text-xl font-black mb-2">{t.compatTitle}</h4>
                    <p className="text-zinc-400 font-medium">{t.compatDesc}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <HardwareImage className={`w-full max-w-sm ${lang === 'he' ? '-rotate-6' : 'rotate-6'}`} />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-[#3BB55C] p-16 rounded-[4rem] text-white flex flex-col justify-between">
            <Zap size={64} fill="white" className={`mb-12 opacity-50 ${lang === 'he' ? 'mr-auto ml-0' : ''}`} />
            <h3 className={`text-4xl font-black leading-tight ${lang === 'he' ? 'text-right' : 'text-left'}`}>{t.quote}</h3>
          </div>
          <div className="bg-zinc-100 p-16 rounded-[4rem] flex flex-col justify-center items-center text-center">
            <div className="text-6xl md:text-8xl font-black text-zinc-900 mb-4 tracking-tighter">{t.launching}</div>
            <div className="text-4xl md:text-5xl font-black text-[#3BB55C] mb-4">{lang === 'he' ? 'בכל הארץ' : 'LAUNCHING'}</div>
            <p className="text-xl font-bold text-zinc-400 uppercase tracking-widest">{t.expanding}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const PricingPage = ({ lang }: { lang: Language }) => {
  const t = translations[lang].pricing;

  return (
    <section className="pt-48 pb-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <div className="mb-24">{t.title}</div>
        <div className={`grid md:grid-cols-3 gap-8 ${lang === 'he' ? 'flex-row-reverse' : ''}`}>
          <div className="bg-zinc-50 p-12 rounded-[4rem] border border-zinc-100 flex flex-col justify-center">
            <div className={`flex items-baseline justify-center gap-2 ${lang === 'he' ? 'flex-row-reverse' : ''}`}>
              <h2 className="text-7xl font-black text-zinc-900">₪12</h2>
              <p className="text-xl font-bold text-zinc-400">{t.perHour}</p>
            </div>
          </div>
          <div className="bg-[#3BB55C] text-white p-12 rounded-[4rem] shadow-2xl shadow-[#3BB55C]/30 relative overflow-hidden flex flex-col justify-center transform scale-105 z-10">
            <div className="absolute top-0 left-0 w-full h-1 bg-white/20"></div>
            <span className="text-white/70 font-black uppercase tracking-widest text-[12px] mb-6 block">{t.welcome}</span>
            <h2 className="text-8xl font-black mb-4">{t.free}</h2>
            <p className="text-2xl font-bold mb-8">{t.first30}</p>
            <button className="bg-zinc-900 text-white w-full py-5 rounded-3xl font-black text-lg hover:scale-105 transition-all">{t.claim}</button>
          </div>
          <div className="bg-zinc-900 text-white p-12 rounded-[4rem] flex flex-col justify-center">
            <h2 className="text-8xl font-black mb-4 text-[#3BB55C]">{t.max}</h2>
            <div className={`flex items-baseline justify-center gap-2 ${lang === 'he' ? 'flex-row-reverse' : ''}`}>
              <h2 className="text-7xl font-black">₪100</h2>
              <p className="text-xl font-bold text-zinc-400">{t.capped}</p>
            </div>
          </div>
        </div>
        <p className="mt-16 text-zinc-400 font-bold uppercase tracking-[0.3em] text-xs">{t.footer}</p>
      </div>
    </section>
  );
};

const FindPowerPage = ({ lang }: { lang: Language }) => {
  const t = translations[lang].find;

  return (
    <section className="pt-48 pb-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h1 className="text-6xl md:text-8xl font-black mb-24 tracking-tighter">{t.title}</h1>
        <div className="w-full h-[600px] bg-zinc-50 rounded-[4rem] border-4 border-white shadow-2xl flex flex-col items-center justify-center p-12 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3BB55C_1px,transparent_1px)] [background-size:32px_32px]"></div>
          <div className="relative z-10">
            <div className="w-24 h-24 bg-[#3BB55C] rounded-full flex items-center justify-center text-white mx-auto mb-8 shadow-2xl shadow-[#3BB55C]/40">
              <MapPin size={48} />
            </div>
            <h2 className="text-4xl font-black mb-4">{t.stations}</h2>
            <p className="text-xl text-zinc-500 font-semibold mb-12 max-w-sm mx-auto">{t.desc}</p>
            <button className="bg-zinc-900 text-white px-12 py-5 rounded-3xl font-black text-xl hover:bg-[#3BB55C] transition-all">{t.openMap}</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default function App() {
  const [page, setPage] = useState<Page>('home');
  const [lang, setLang] = useState<Language>('he');
  const [selectedStationId, setSelectedStationId] = useState<string | null>(null);

  useEffect(() => {
    try {
      const isIsrael = Intl.DateTimeFormat().resolvedOptions().timeZone.includes('Jerusalem');
      const isHebrew = navigator.language.startsWith('he');
      if (isIsrael || isHebrew) {
        setLang('he');
      } else {
        setLang('en');
      }
    } catch (e) {
      setLang('en');
    }
  }, []);

  const tCta = translations[lang].ctaSection;
  const tFooter = translations[lang].footer;

  return (
    <div className="min-h-screen bg-white selection:bg-[#3BB55C] selection:text-white font-sans" dir={lang === 'he' ? 'rtl' : 'ltr'}>
      <Header currentPage={page} setPage={setPage} lang={lang} setLang={setLang} />
      
      <main className="animate-in fade-in duration-700">
        {page === 'home' && <HomePage setPage={setPage} lang={lang} />}
        {page === 'how-it-works' && <HowItWorksPage lang={lang} />}
        {page === 'the-app' && <AppSection lang={lang} />}
        {page === 'business' && <BusinessPage lang={lang} setPage={setPage} setSelectedStationId={setSelectedStationId} />}
        {page === 'station-detail' && <StationDetailPage lang={lang} stationId={selectedStationId} />}
        {page === 'pricing' && <PricingPage lang={lang} />}
        {page === 'find-power' && <FindPowerPage lang={lang} />}
      </main>

      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto bg-zinc-900 rounded-[5rem] p-12 md:p-24 flex flex-col md:flex-row items-center justify-between text-white shadow-2xl relative overflow-hidden group">
          <div className={`absolute top-0 ${lang === 'he' ? 'left-0' : 'right-0'} w-96 h-96 bg-[#3BB55C] rounded-full blur-[150px] opacity-20 ${lang === 'he' ? '-ml-48' : '-mr-48'} -mt-48 group-hover:opacity-40 transition-opacity`}></div>
          <div className={`relative z-10 text-center md:${lang === 'he' ? 'text-right' : 'text-left'} flex-1`}>
            <h2 className="text-5xl md:text-7xl font-black mb-6 leading-tight">{tCta.title}</h2>
            <p className="text-xl md:text-2xl font-bold text-zinc-400 mb-10">{tCta.subtitle}</p>
            <div className={`flex flex-col sm:flex-row gap-6 justify-center md:${lang === 'he' ? 'justify-start' : 'justify-start'}`}>
              <button className="bg-[#3BB55C] text-white px-12 py-5 rounded-2xl font-black text-lg hover:scale-105 transition-all shadow-xl">App Store</button>
              <button className="bg-white text-zinc-900 px-12 py-5 rounded-2xl font-black text-lg hover:scale-105 transition-all shadow-xl">Play Store</button>
            </div>
          </div>
          <div className={`hidden md:block relative z-10 flex-shrink-0 ${lang === 'he' ? 'mr-12' : 'ml-12'}`}>
            <HardwareImage className="w-80" />
          </div>
        </div>
      </section>

      <footer className="py-24 bg-white border-t border-zinc-100">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-12">
          <FulinLogo light={false} onClick={() => { setPage('home'); window.scrollTo(0,0); }} />
          <div className="flex gap-12 text-sm font-black uppercase tracking-widest text-zinc-400">
            <a href="#" className="hover:text-[#3BB55C]">{tFooter.privacy}</a>
            <a href="#" className="hover:text-[#3BB55C]">{tFooter.terms}</a>
            <a href="#faq" className="hover:text-[#3BB55C]">{tFooter.faq}</a>
            <a href="#" className="hover:text-[#3BB55C]">{tFooter.support}</a>
          </div>
          <div className="text-[10px] font-bold text-zinc-400 tracking-[0.4em] uppercase">{tFooter.tagline}</div>
        </div>
      </footer>
    </div>
  );
}
