import { useEffect, useRef, useState } from 'react';
import haldi from './assets/haldi.png';
import mehendi from './assets/mehndi.png';
import wedding from './assets/wedding-pheras.png'; 
import {
  LazyMotion,
  domAnimation,
  m,
  useAnimationControls,
  useReducedMotion
} from 'motion/react';
import './App.css';

const weddingDate = new Date('2026-11-26T20:00:00+05:30');
const venueName = 'Royal Pepper, Peeragarhi';
const venueAddress =
  'Royal Pepper Banquet Hall, E-1, Udyog Nagar, Peeragarhi, New Delhi 110041';
const venueLatitude = '28.6800073';
const venueLongitude = '77.0937182';
const venueCoordinates = `${venueLatitude},${venueLongitude}`;
const mapSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  venueAddress
)}`;
const olaBookingUrl =
  `https://book.olacabs.com/?drop_lat=${venueLatitude}` +
  `&drop_lng=${venueLongitude}&drop_address=${encodeURIComponent(venueAddress)}`;
const rapidoBookingUrl =
  `https://www.rapido.bike/Home?drop_lat=${venueLatitude}` +
  `&drop_lng=${venueLongitude}&drop_address=${encodeURIComponent(venueAddress)}`;

const celebrations = [
  {
    name: 'Haldi',
    date: 'Wednesday, 25 November',
    time: 'Morning',
    venue: 'RZ-153A Gali No 5, Kailash puri ext (Pankaj Book Depot)',
    dress: 'Yellow tones',
    symbol: '✿',
    style: 'haldi',
     image: haldi,
    hindi: {
      name: 'हल्दी',
      date: 'बुधवार, 25 नवंबर',
      time: 'प्रातःकाल',
      venue: 'आरजेड-153ए गली नंबर 5, कैलाश पुरी एक्सटेंशन (पंकज बुक डिपो))',
      dress: 'पीले रंग के वस्त्र'
    }
  },
  {
    name: 'Mehendi',
    date: 'Wednesday, 25 November',
    time: 'Evening',
    venue: 'RZ-153A Gali No 5, Kailash puri ext (Pankaj Book Depot)',

   
    dress: 'Greens & florals',
    symbol: '❋',
    style: 'mehendi',
    image: mehendi,
    hindi: {
      name: 'मेहंदी',
      date: 'बुधवार, 25 नवंबर',
      time: 'सायंकाल',
      venue: 'आरजेड-153ए गली नंबर 5, कैलाश पुरी एक्सटेंशन (पंकज बुक डिपो)',
      dress: 'हरे एवं पुष्पों वाले वस्त्र'
    }
  },
  {
    name: 'Wedding Pheras',
    date: 'Thursday, 26 November',
    time: '8 PM onwards',
    venue: venueName,
    dress: 'Ethnic glam',
    symbol: 'ॐ',
    style: 'wedding',
    image: wedding,
    hindi: {
      name: 'विवाह के फेरे',
      date: 'गुरुवार, 26 नवंबर',
      time: 'रात्रि 8 बजे से',
      venue: 'रॉयल पेपर, पीरागढ़ी',
      dress: 'पारंपरिक एवं उत्सवी परिधान'
    }
  }
];

const brideFamily = [
  {
    relation: 'Granddaughter of',
    names: 'Late Shri RadheyShyam Gupta & Late Smt Ram Kali Devi',
    hindiRelation: 'पौत्री',
    hindiNames: 'स्वर्गीय श्री राधेश्याम गुप्ता एवं स्वर्गीय श्रीमती राम कली देवी'
  },
  {
    relation: 'Daughter of',
    names: 'Shri Anup Gupta & Late Smt Chhavi Gupta',
    hindiRelation: 'पुत्री',
    hindiNames: 'श्री अनूप गुप्ता एवं स्वर्गीय श्रीमती छवि गुप्ता'
  }
];

const groomFamily = [
  {
    relation: 'Grandson of',
    names: 'Shri Ishwar Chand Tayal & Smt Urmila Devi',
    hindiRelation: 'पौत्र',
    hindiNames: 'श्री ईश्वर चंद तायल एवं श्रीमती उर्मिला देवी'
  },
  {
    relation: 'Son of',
    names: 'Shri Naveen Aggarwal & Smt Uma Aggarwal',
    hindiRelation: 'सुपुत्र',
    hindiNames: 'श्री नवीन अग्रवाल एवं श्रीमती उमा अग्रवाल'
  }
];

const invitedBy = ['Sh. Chatarsen Tayal', 'Sh. Hitesh Tayal', 'Yogesh','Nakul','Puneet','Gaurav'];
const invitedByHindi = ['श्री चतरसेन तायल', 'श्री हितेश तायल', 'योगेश','नकुल','पुनीत','गौरव'];
const littleStars = [
  'Khyati',
  'Gracy',
  'Chhavi',
  'Harshika',
  'Naksh',
  'Yadwik',
  
];
const littleStarsHindi = [
  'ख्याति',
  'ग्रेसी',
  'छवि',
  'हर्षिका',
  'नक्ष',
  'याद्विक',
  
];

const translations = {
  en: {
    pageTitle: 'Harshit & Aanchal — Wedding Invitation',
    together: 'Together with our families',
    coverTitle: 'A celebration awaits',
    coverSubtitle: 'A wedding invitation',
    tapToOpen: 'Tap the seal to open',
    opening: 'Opening with love…',
    openInvitation: "Open Harshit and Aanchal's wedding invitation",
    bride: 'Aanchal',
    groom: 'Harshit',
    invitationLead: 'joyfully invite you to celebrate their wedding',
    venueShort: 'Royal Pepper, Peeragarhi · Delhi',
    explore: 'Explore the invitation',
    eldersBlessing: 'With the blessings of our elders',
    familyInvitation: 'A family invitation',
    familyMessage:
      'With love, Harshit & Aanchal, together with their families, invite you to share in a celebration of love, laughter, and togetherness.',
    saveDate: 'Save the date',
    scratchHint: 'Scratch here to reveal your date',
    scratchLabel: 'Scratch the card to reveal the wedding date',
    dateRevealed: 'Wedding date revealed: Thursday, 26 November 2026',
    thursday: 'Thursday',
    november: 'November',
    weddingPheras: 'Wedding Pheras',
    eightOnwards: '8 PM onwards',
    calendar: 'Add wedding date to calendar',
    dayCloser: 'The day is getting closer',
    celebrationBegun: 'The celebration has begun',
    countdown: 'Counting down',
    countdownLabel: 'Time until the wedding',
    units: ['days', 'hours', 'minutes', 'seconds'],
    cantWait: "We can't wait to celebrate with you.",
    moments: 'Three moments, one beautiful celebration',
    celebrations: 'The celebrations',
    lookForward: 'We look forward to celebrating with you and our families.',
    directions: 'View directions',
    joinCelebration: 'Join us in celebration',
    weddingVenue: 'The wedding venue',
    venueTime: 'Thursday, 26 November · 8 PM onwards',
    openDirections: 'Open directions',
    rideOptions: 'Ride booking options',
    scanDirections: 'Scan for venue directions',
    mapTitle: 'Map showing Royal Pepper in Peeragarhi',
    openMap: 'Open venue in Google Maps',
    helpfulDetails: 'A few helpful details',
    goodToKnow: 'Good to know',
    datesQuestion: 'What are the celebration dates and times?',
    datesAnswer:
      'Haldi is on Wednesday morning, 25 November. Mehendi is Wednesday evening, 25 November. The Wedding Pheras are on Thursday, 26 November, at 8 PM onwards.',
    dressQuestion: 'What should I wear?',
    dressAnswer: 'Haldi: yellow tones. Mehendi: greens and florals. Wedding: ethnic glam.',
    travelQuestion: 'Where can I find directions and travel options?',
    travelAnswer:
      'The venue section includes a map, Google Maps directions, and links for Uber, Ola, and Rapido.',
    gratitude: 'With utmost gratitude and blessings',
    invitedBy: 'Cordially invited by',
    littleStars: 'Our little stars are excited to celebrate with you',
    thanks: 'Thank you for being part of our story.',
    share: 'Share invitation',
    shortcuts: 'Invitation shortcuts',
    events: 'Events',
    venue: 'Venue',
    music: 'Music',
    playMusic: 'Play wedding music',
    muteMusic: 'Mute wedding music',
    unmuteMusic: 'Unmute wedding music',
    mute: 'Mute',
    unmute: 'Unmute',
    musicMuted: 'Wedding music muted.',
    musicResumed: 'Wedding music resumed.',
    switchToHindi: 'Switch language to Hindi',
    switchToEnglish: 'Switch language to English',
    hindi: 'हिंदी',
    musicPlaying: 'Wedding music is playing.',
    musicError: 'Music could not be played on this device.',
    inviteShared: 'Invitation shared.',
    inviteCopied: 'Invitation link copied.',
    shareUnavailable: 'Sharing is unavailable. Copy the address bar link.'
  },
  hi: {
    pageTitle: 'हर्षित एवं आंचल — विवाह का निमंत्रण',
    together: 'अपने परिवारों सहित',
    coverTitle: 'एक मंगल उत्सव आपका इंतज़ार कर रहा है',
    coverSubtitle: 'विवाह का स्नेह-निमंत्रण',
    tapToOpen: 'निमंत्रण खोलने के लिए मुहर छुएँ',
    opening: 'सप्रेम निमंत्रण खोला जा रहा है…',
    openInvitation: 'हर्षित और आंचल का विवाह-निमंत्रण खोलें',
    bride: 'आंचल',
    groom: 'हर्षित',
    invitationLead: 'आपको अपने विवाह समारोह में सादर आमंत्रित करते हैं',
    venueShort: 'रॉयल पेपर, पीरागढ़ी · दिल्ली',
    explore: 'निमंत्रण आगे देखें',
    eldersBlessing: 'बड़ों के आशीर्वाद से',
    familyInvitation: 'परिवार की ओर से स्नेह-निमंत्रण',
    familyMessage:
      'हर्षित एवं आंचल अपने परिवारों सहित आपको प्रेम, आनंद और मंगल के इस शुभ अवसर में सम्मिलित होने का सादर निमंत्रण देते हैं।',
    saveDate: 'शुभ तिथि सुरक्षित रखें',
    scratchHint: 'शुभ तिथि देखने के लिए यहाँ खुरचें',
    scratchLabel: 'विवाह की शुभ तिथि देखने के लिए इस कार्ड को खुरचें',
    dateRevealed: 'विवाह की शुभ तिथि: गुरुवार, 26 नवंबर 2026',
    thursday: 'गुरुवार',
    november: 'नवंबर',
    weddingPheras: 'विवाह के फेरे',
    eightOnwards: 'रात्रि 8 बजे से',
    calendar: 'कैलेंडर में जोड़ें',
    dayCloser: 'शुभ दिन निकट आ रहा है',
    celebrationBegun: 'मंगल उत्सव आरंभ हो चुका है',
    countdown: 'शुभ दिन की प्रतीक्षा',
    countdownLabel: 'विवाह में शेष समय',
    units: ['दिन', 'घंटे', 'मिनट', 'सेकंड'],
    cantWait: 'आपके साथ यह शुभ अवसर मनाने की प्रतीक्षा है।',
    moments: 'तीन मंगल अवसर, एक सुंदर उत्सव',
    celebrations: 'उत्सव के शुभ अवसर',
    lookForward: 'आप और आपके परिवार के साथ उत्सव मनाने की प्रतीक्षा है।',
    directions: 'मार्ग देखें',
    joinCelebration: 'आपकी प्रतीक्षा रहेगी',
    weddingVenue: 'विवाह स्थल',
    venueTime: 'गुरुवार, 26 नवंबर · रात्रि 8 बजे से',
    openDirections: 'मार्ग खोलें',
    rideOptions: 'यात्रा के लिए गाड़ी बुक करें',
    scanDirections: 'मार्ग देखने के लिए क्यूआर कोड स्कैन करें',
    mapTitle: 'रॉयल पेपर, पीरागढ़ी का मानचित्र',
    openMap: 'गूगल मानचित्र में स्थल देखें',
    helpfulDetails: 'कुछ आवश्यक जानकारियाँ',
    goodToKnow: 'उपयोगी जानकारी',
    datesQuestion: 'उत्सव के अवसरों की तिथि और समय क्या हैं?',
    datesAnswer:
      'हल्दी का कार्यक्रम बुधवार, 25 नवंबर की सुबह और मेहंदी का कार्यक्रम उसी दिन शाम को होगा। विवाह के फेरे गुरुवार, 26 नवंबर को रात्रि 8 बजे से होंगे।',
    dressQuestion: 'किस प्रकार के वस्त्र पहनें?',
    dressAnswer:
      'हल्दी: पीले रंग के वस्त्र। मेहंदी: हरे एवं पुष्पों वाले वस्त्र। विवाह: पारंपरिक एवं उत्सवी परिधान।',
    travelQuestion: 'मार्ग और यात्रा की जानकारी कहाँ मिलेगी?',
    travelAnswer:
      'विवाह स्थल वाले भाग में मानचित्र, गूगल मानचित्र का मार्ग और Uber, Ola तथा Rapido से गाड़ी बुक करने के विकल्प दिए गए हैं।',
    gratitude: 'सादर आभार एवं शुभकामनाओं सहित',
    invitedBy: 'सादर आमंत्रित करते हैं',
    littleStars: 'हमारे नन्हे सितारे आपके साथ उत्सव मनाने को उत्सुक हैं',
    thanks: 'हमारी खुशियों में सम्मिलित होने के लिए धन्यवाद।',
    share: 'निमंत्रण साझा करें',
    shortcuts: 'निमंत्रण के सरल विकल्प',
    events: 'कार्यक्रम',
    venue: 'स्थल',
    music: 'संगीत',
    playMusic: 'विवाह का संगीत चलाएँ',
    muteMusic: 'विवाह का संगीत बंद करें',
    unmuteMusic: 'विवाह का संगीत फिर से सुनें',
    mute: 'ध्वनि बंद',
    unmute: 'ध्वनि चालू',
    musicMuted: 'विवाह के संगीत की ध्वनि बंद कर दी गई है।',
    musicResumed: 'विवाह के संगीत की ध्वनि फिर से चालू है।',
    switchToHindi: 'निमंत्रण हिंदी में देखें',
    switchToEnglish: 'निमंत्रण अंग्रेज़ी में देखें',
    hindi: 'English',
    musicPlaying: 'विवाह का संगीत चल रहा है।',
    musicError: 'इस उपकरण पर संगीत नहीं चल सका।',
    inviteShared: 'निमंत्रण साझा कर दिया गया है।',
    inviteCopied: 'निमंत्रण का लिंक कॉपी कर दिया गया है।',
    shareUnavailable: 'निमंत्रण साझा नहीं हो सका। कृपया पता-पट्टी से लिंक कॉपी करें।'
  }
};

function useCountdown() {
  const [secondsLeft, setSecondsLeft] = useState(() =>
    Math.max(0, Math.floor((weddingDate.getTime() - Date.now()) / 1000))
  );

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSecondsLeft(
        Math.max(0, Math.floor((weddingDate.getTime() - Date.now()) / 1000))
      );
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  return {
    days: Math.floor(secondsLeft / 86400),
    hours: Math.floor((secondsLeft % 86400) / 3600),
    minutes: Math.floor((secondsLeft % 3600) / 60),
    seconds: secondsLeft % 60,
    isPast: secondsLeft === 0
  };
}


function useRevealSections(isOpened) {
  useEffect(() => {
    // Invitation open hone se pehle reveal observer start mat karo.
    if (!isOpened) return undefined;

    const sections = document.querySelectorAll('.reveal');

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (reduceMotion || !('IntersectionObserver' in window)) {
      sections.forEach((section) => {
        section.classList.add('is-visible');
      });
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [isOpened]);
}


function useFocusInvitation(isOpened, heroRef, sealButtonRef) {
  useEffect(() => {
    if (isOpened) {
      const frame = window.requestAnimationFrame(() => {
        window.scrollTo(0, 0);
        heroRef.current?.focus({ preventScroll: true });
      });

      return () => window.cancelAnimationFrame(frame);
    }

    sealButtonRef.current?.focus({ preventScroll: true });
    return undefined;
  }, [isOpened, heroRef, sealButtonRef]);
}

function resetInvitationScroll() {
  const { pathname, search } = window.location;
  window.history.replaceState(window.history.state, '', `${pathname}${search}`);
  window.scrollTo(0, 0);
}

function ShortcutIcon({ name }) {
  const paths = {
    events: (
      <>
        <rect x="3.5" y="5" width="17" height="16" rx="2.5" />
        <path d="M7.5 3v4M16.5 3v4M3.5 9.5h17M8 13h.01M12 13h.01M16 13h.01M8 17h.01M12 17h.01" />
      </>
    ),
    venue: (
      <>
        <path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" />
        <circle cx="12" cy="10" r="2.2" />
      </>
    ),
    music: (
      <>
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </>
    ),
  };

  return (
    <svg
      aria-hidden="true"
      className="shortcut-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}

function formatIcsText(value) {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/\n/g, '\\n')
    .replace(/,/g, '\\,')
    .replace(/;/g, '\\;');
}

function downloadCalendarEvent(language = 'en') {
  const now = new Date()
    .toISOString()
    .replace(/[-:]/g, '')
    .replace(/\.\d{3}Z$/, 'Z');
  const isHindi = language === 'hi';
  const calendar = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Harshit and Aanchal//Wedding Invitation//EN',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    'UID:harshit-aanchal-wedding-2026@wedding-invite.local',
    `DTSTAMP:${now}`,
    'DTSTART;VALUE=DATE:20261126',
    'DTEND;VALUE=DATE:20261127',
    `SUMMARY:${formatIcsText(
      isHindi ? 'विवाह के फेरे — हर्षित एवं आंचल' : 'Wedding Pheras — Harshit & Aanchal'
    )}`,
    `LOCATION:${formatIcsText(
      isHindi
        ? 'रॉयल पेपर बैंक्वेट हॉल, ई-1, उद्योग नगर, पीरागढ़ी, नई दिल्ली 110041'
        : venueAddress
    )}`,
    `DESCRIPTION:${formatIcsText(
      isHindi
        ? 'विवाह समारोह रात्रि 8 बजे से आरंभ होगा (भारतीय मानक समय)।'
        : 'The wedding celebration begins at 8 PM onwards (IST).'
    )}`,
    'END:VEVENT',
    'END:VCALENDAR',
    ''
  ].join('\r\n');
  const file = new Blob([calendar], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(file);
  const link = document.createElement('a');

  link.href = url;
  link.download = 'Harshit-and-Aanchal-Wedding.ics';
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function EventCard({ event, index, language, copy }) {
  const details = language === 'hi' ? event.hindi : event;
  const eventMapUrl =
    event.style === 'wedding'
      ? mapSearchUrl
      : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          event.venue
        )}`;

  return (
    <article
      className={`event-card event-card--${event.style}`}
      style={{ 
        '--reveal-order': index,
        backgroundImage: event.image ? `url(${event.image})` : 'none' 
      }}
    >
      {/* Text ko highlight karne ke liye glass effect overlay */}
      <div className="event-card__overlay"></div>
      
      <div className="event-card__content">
        <p className="eyebrow">{details.date}</p>
        <h3>{details.name}</h3>
        <p className="event-card__time">{details.time}</p>
        <p className="event-card__venue">
  <strong>{event.venue}</strong>
</p>
        <p className="event-card__dress">
          <span aria-hidden="true">✦</span> {details.dress}
        </p>
        <a
          className="text-link"
          href={eventMapUrl}
          target="_blank"
          rel="noreferrer"
        >
          {copy.directions} <span aria-hidden="true">↗</span>
        </a>
      </div>
    </article>
  );
}

function FamilyLineage({ title, relationships, language }) {
  return (
    <div className="lineage">
      <h3>{title}</h3>
      {relationships.map((family) => (
        <p key={family.relation}>
          <span>
            {language === 'hi' ? family.hindiRelation : family.relation}
          </span>
          {language === 'hi' ? family.hindiNames : family.names}
        </p>
      ))}
    </div>
  );
}

function ScratchDateCard({ copy, language, onReveal }) {
  const [isRevealed, setIsRevealed] = useState(false);
  const [sparkles, setSparkles] = useState([]);
  const canvasRef = useRef(null);
  const lastPointRef = useRef(null);
  const scratchMovesRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return undefined;

    const drawSurface = () => {
      const bounds = canvas.getBoundingClientRect();
      if (!bounds.width || !bounds.height) return;

      const scale = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(bounds.width * scale);
      canvas.height = Math.round(bounds.height * scale);

      const context = canvas.getContext('2d', { willReadFrequently: true });
      if (!context) return;

      // Pehle clear karo, phir scale lagao
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.scale(scale, scale);

      // Golden Scratch Layer
      const gradient = context.createLinearGradient(0, 0, bounds.width, bounds.height);
      gradient.addColorStop(0, '#f3e5bd');
      gradient.addColorStop(0.2, '#c9a660');
      gradient.addColorStop(0.48, '#ead8a8');
      gradient.addColorStop(0.72, '#b99553');
      gradient.addColorStop(1, '#f0dfb1');
      context.fillStyle = gradient;
      context.fillRect(0, 0, bounds.width, bounds.height);

      context.save();
      context.globalAlpha = 0.2;
      context.strokeStyle = '#fffaf0';
      context.lineWidth = 0.7;
      for (let x = -bounds.height; x < bounds.width + bounds.height; x += 18) {
        context.beginPath();
        context.moveTo(x, 0);
        context.lineTo(x + bounds.height, bounds.height);
        context.stroke();
      }
      context.globalAlpha = 0.22;
      context.strokeStyle = '#805f2c';
      context.strokeRect(10, 10, bounds.width - 20, bounds.height - 20);
      context.globalAlpha = 0.82;
      context.fillStyle = '#fff9e8';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.font = '17px Georgia, serif';
      context.fillText('✦', 25, 24);
      context.fillText('✦', bounds.width - 25, 24);
      context.fillText('✦', 25, bounds.height - 24);
      context.fillText('✦', bounds.width - 25, bounds.height - 24);
      context.restore();

      const fontFamily =
        language === 'hi'
          ? '"Noto Serif Devanagari", serif'
          : '"Montserrat", Arial, sans-serif';
      const fontSize = Math.min(
        15,
        bounds.width / Math.max(copy.scratchHint.length * 0.56, 1)
      );
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillStyle = '#fffaf0';
      context.shadowColor = 'rgba(77, 48, 34, 0.38)';
      context.shadowBlur = 5;
      context.font = `600 ${fontSize}px ${fontFamily}`;
      context.fillText(copy.scratchHint, bounds.width / 2, bounds.height / 2);
      context.shadowBlur = 0;
      context.font = `20px ${fontFamily}`;
      context.fillText('✧', bounds.width / 2, bounds.height / 2 - 30);
      context.font = `18px ${fontFamily}`;
      context.fillText('✧', bounds.width / 2, bounds.height / 2 + 30);
    };

    const timeoutId = setTimeout(drawSurface, 100);
    const observer = new ResizeObserver(() => {
      setTimeout(drawSurface, 50);
    });
    observer.observe(canvas);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [copy.scratchHint, isRevealed, language]);

  const revealDate = () => {
    if (isRevealed) return;
    setIsRevealed(true);
    setSparkles([]);
    onReveal();
  };

  const checkScratchProgress = (canvas, context) => {
    // Note: getImageData actual pixel dimensions use karta hai, isliye canvas.width use kiya
    const { width, height } = canvas;
    const pixels = context.getImageData(0, 0, width, height).data;
    let cleared = 0;
    let samples = 0;
    const stride = 4 * 128;

    for (let alphaIndex = 3; alphaIndex < pixels.length; alphaIndex += stride) {
      samples += 1;
      if (pixels[alphaIndex] < 16) cleared += 1;
    }

    if (samples > 0 && cleared / samples >= 0.50) revealDate();
  };

  const addSparkle = (x, y) => {
    const id = Date.now() + Math.random();
    const size = 3 + Math.random() * 5; // Random size for realistic glitter
    // Halka sa random offset taaki ek line na bane, spray jaisa lage
    const offsetX = (Math.random() - 0.5) * 16;
    const offsetY = (Math.random() - 0.5) * 16;
    
    setSparkles((prev) => [...prev, { id, x: x + offsetX, y: y + offsetY, size }]);
    setTimeout(() => {
      setSparkles((prev) => prev.filter((s) => s.id !== id));
    }, 600);
  };

  const getCoordinates = (event, canvas) => {
    const bounds = canvas.getBoundingClientRect();
    // Directly CSS pixels return karo, koi scale multiply mat karo
    return {
      x: event.clientX - bounds.left,
      y: event.clientY - bounds.top
    };
  };

  const scratch = (event) => {
    if (isRevealed || !lastPointRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    const point = getCoordinates(event, canvas);

    // Canvas Drawing (Coordinates are in CSS pixels, context is scaled)
    context.globalCompositeOperation = 'destination-out';
    context.lineWidth = 40; // 40 CSS pixels wide brush
    context.lineCap = 'round';
    context.lineJoin = 'round';
    context.beginPath();
    context.moveTo(lastPointRef.current.x, lastPointRef.current.y);
    context.lineTo(point.x, point.y);
    context.stroke();
    
    lastPointRef.current = point;

    // Sparkle add karo exact finger ke niche
    addSparkle(point.x, point.y);

    scratchMovesRef.current += 1;
    if (scratchMovesRef.current % 5 === 0) {
      checkScratchProgress(canvas, context);
    }
  };

  return (
    <div
      className={`date-card__scratch-area${isRevealed ? ' is-revealed' : ''}`}
      role="button"
      tabIndex={0}
      aria-label={isRevealed ? copy.dateRevealed : copy.scratchLabel}
      aria-pressed={isRevealed}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          revealDate();
        }
      }}
      onPointerDown={(event) => {
        if (event.button !== 0 || isRevealed) return;
        const canvas = canvasRef.current;
        lastPointRef.current = getCoordinates(event, canvas);
        event.currentTarget.setPointerCapture(event.pointerId);
      }}
      onPointerMove={scratch}
      onPointerUp={(event) => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext('2d');
        if (canvas && context) checkScratchProgress(canvas, context);
        lastPointRef.current = null;
      }}
      onPointerCancel={() => {
        lastPointRef.current = null;
      }}
    >
      <div className="date-card__revealed">
        <p className="date-card__weekday">{copy.thursday}</p>
        <h2>
          26 <span>{copy.november}</span> 2026
        </h2>
        <div className="date-card__divider" aria-hidden="true">
          ✦ ❧ ✦
        </div>
        <p className="date-card__time">
          {copy.weddingPheras} · {copy.eightOnwards}
        </p>
      </div>

      <div className="sparkle-container">
        {sparkles.map((sparkle) => (
          <span
            key={sparkle.id}
            className="sparkle"
            style={{ 
              left: sparkle.x, 
              top: sparkle.y,
              width: `${sparkle.size}px`,
              height: `${sparkle.size}px`
            }}
          />
        ))}
      </div>

      <canvas
        ref={canvasRef}
        className="date-card__scratch-layer"
        aria-hidden="true"
      />
    </div>
  );
}

export default function App() {
  const countdown = useCountdown();
  const [isOpened, setIsOpened] = useState(false);
  const [isEnvelopeOpening, setIsEnvelopeOpening] = useState(false);
  const reduceMotion = useReducedMotion();
  const [language, setLanguage] = useState('en');
  const [musicOn, setMusicOn] = useState(false);
  const [musicMuted, setMusicMuted] = useState(false);
  const [dateRevealed, setDateRevealed] = useState(false);
  const [musicMessage, setMusicMessage] = useState('');
  const [shareMessage, setShareMessage] = useState('');
  const audioRef = useRef(null);
  const resumeMusicOnReturnRef = useRef(false);
  const openingRef = useRef(false);
  const heroRef = useRef(null);
  const sealButtonRef = useRef(null);
  const envelopeControls = useAnimationControls();
  const flapControls = useAnimationControls();
  const letterControls = useAnimationControls();
  const sealControls = useAnimationControls();
  const headingControls = useAnimationControls();
  const coverControls = useAnimationControls();
  const heroRevealControls = useAnimationControls();
  const goldRevealControls = useAnimationControls();
  const floralAccentControls = useAnimationControls();
  const copy = translations[language];

  useRevealSections(isOpened);
  useFocusInvitation(isOpened, heroRef, sealButtonRef);

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = copy.pageTitle;
  }, [copy.pageTitle, language]);

  useEffect(() => {
    const handleVisibilityChange = async () => {
      const audio = audioRef.current;
      if (!audio) return;

      if (document.visibilityState !== 'visible') {
        resumeMusicOnReturnRef.current = musicOn && !musicMuted;
        audio.pause();
        return;
      }

      if (!resumeMusicOnReturnRef.current) return;
      resumeMusicOnReturnRef.current = false;

      if (!musicOn || musicMuted) return;

      try {
        await audio.play();
      } catch (error) {
        console.error('Wedding music could not be resumed:', error);
        setMusicOn(false);
        setMusicMessage(copy.musicError);
      }
    };
    const pauseOnPageHide = () => {
      audioRef.current?.pause();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('pagehide', pauseOnPageHide);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('pagehide', pauseOnPageHide);
    };
  }, [copy.musicError, musicMuted, musicOn]);

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    const previousOverflow = {
      root: root.style.overflow,
      body: body.style.overflow
    };

    if (!isOpened) {
      root.style.overflow = 'hidden';
      body.style.overflow = 'hidden';
    } else {
      root.style.overflow = previousOverflow.root;
      body.style.overflow = previousOverflow.body;
    }

    return () => {
      root.style.overflow = previousOverflow.root;
      body.style.overflow = previousOverflow.body;
    };
  }, [isOpened]);

  const startMusic = async () => {
    const audio = audioRef.current;
    if (!audio || musicOn) return;

    audio.muted = false;
    try {
      await setTimeout(() => {
  audio.play();
}, 1800);
      setMusicOn(true);
      setMusicMuted(false);
      setMusicMessage(copy.musicPlaying);
    } catch (error) {
      console.error('Wedding music could not be played:', error);
      setMusicMessage(copy.musicError);
    }
  };

  const openInvitation = async () => {
    // State updates can be batched while a rapid second tap is already queued.
    // Lock synchronously so two opening animation sequences cannot overlap.
    if (openingRef.current || isEnvelopeOpening || isOpened) return;
    openingRef.current = true;
    void startMusic();

    if (reduceMotion) {
      heroRevealControls.set({ opacity: 1, y: 0, scale: 1 });
      resetInvitationScroll();
      setIsOpened(true);
      return;
    }

    setIsEnvelopeOpening(true);
    await Promise.all([
      sealControls.start({
        y: -22,
        scale: 1.45,
        rotate: -14,
        opacity: 0,
        transition: { type: 'spring', stiffness: 280, damping: 20 }
      }),
      headingControls.start({
        opacity: 0,
        y: -12,
        transition: { duration: 0.4, ease: [0.22, 0.61, 0.36, 1] }
      })
    ]);
    await flapControls.start({
      rotateX: 180,
      transition: {
        type: 'tween',
        duration: 0.64,
        ease: [0.22, 0.61, 0.36, 1]
      }
    });
    await Promise.all([
      letterControls.start({
        y: '-62%',
        scale: 1.035,
        transition: {
          type: 'tween',
          duration: 0.68,
          ease: [0.22, 0.61, 0.36, 1]
        }
      }),
      envelopeControls.start({
        y: -8,
        scale: 1.025,
        transition: {
          type: 'spring',
          stiffness: 150,
          damping: 20
        }
      })
    ]);
    await new Promise((resolve) => window.setTimeout(resolve, 650));
    await Promise.all([
      envelopeControls.start({
        y: -26,
        scale: 1.08,
        opacity: 0,
        transition: {
          duration: 0.82,
          ease: [0.22, 0.61, 0.36, 1]
        }
      }),
      coverControls.start({
        opacity: 0,
        scale: 1.025,
        transition: {
          duration: 1.5,
          ease: [0.25, 0.1, 0.25, 1]
        }
      }),
      heroRevealControls.start({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          duration: 1.7,
          delay: 0.1,
          ease: [0.25, 0.1, 0.25, 1]
        }
      }),
      goldRevealControls.start({
        opacity: [0, 0.7, 0],
        scale: [0.55, 0.92, 1.15],
        transition: { duration: 1.5, times: [0, 0.28, 1], ease: 'easeOut' }
      }),
      floralAccentControls.start({
        opacity: [0, 0.9, 0],
        scale: [0.55, 1, 1.28],
        transition: { duration: 1.4, times: [0, 0.3, 1], ease: 'easeOut' }
      })
    ]);

    resetInvitationScroll();
    setIsOpened(true);
    setIsEnvelopeOpening(false);
  };

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (musicOn) {
      const nextMuted = !musicMuted;
      audio.muted = nextMuted;
      setMusicMuted(nextMuted);
      setMusicMessage(nextMuted ? copy.musicMuted : copy.musicResumed);
      return;
    }

    void startMusic();
  };

  const switchLanguage = () => {
    setLanguage(language === 'en' ? 'hi' : 'en');
    setMusicMessage('');
    setShareMessage('');
  };

  const shareInvite = async () => {
    const shareData = {
      title: copy.pageTitle,
      text:
        language === 'hi'
          ? 'हर्षित एवं आंचल के विवाह समारोह में सादर आमंत्रित हैं।'
          : 'You are warmly invited to celebrate with Harshit & Aanchal.',
      url: window.location.href.split(/[?#]/)[0]
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        setShareMessage(copy.inviteShared);
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareData.url);
        setShareMessage(copy.inviteCopied);
      } else {
        setShareMessage(copy.shareUnavailable);
      }
    } catch (error) {
      if (error.name === 'AbortError') return;
      console.error('Invitation could not be shared:', error);
      setShareMessage(copy.shareUnavailable);
    }
  };

  return (
    <div
      className={`app-frame${isOpened ? '' : ' app-frame--closed'}${
        language === 'hi' ? ' app-frame--hi' : ''
      }`}
    >
      <audio
        ref={audioRef}
        loop
        muted={musicMuted}
        preload="none"
        src="/aaj-sajeya.mp3"
      />

      <LazyMotion features={domAnimation}>
        <m.div
          className={`cover-screen${isOpened ? ' cover-screen--opened' : ''}`}
          initial={{ opacity: 1 }}
          animate={coverControls}
          aria-hidden={isOpened}
          role="dialog"
          aria-modal="true"
          aria-labelledby="cover-title"
        >
          <div className="cover-screen__content">
              <m.div
                className="cover-screen__heading"
                initial={{ opacity: 1, y: 0 }}
                animate={headingControls}
              >
                <p className="eyebrow">{copy.together}</p>
                <h1 id="cover-title">{copy.coverTitle}</h1>
                <p className="cover-screen__subtitle">
                  {copy.coverSubtitle}
                </p>
            </m.div>
            <m.button
              ref={sealButtonRef}
              className="envelope"
              initial={{ y: 0, scale: 1 }}
              animate={envelopeControls}
              type="button"
              onClick={openInvitation}
              disabled={isEnvelopeOpening}
              aria-label={copy.openInvitation}
            >
              <span className="envelope__back" aria-hidden="true" />
              <m.span
                className="envelope__letter"
                initial={{ y: '3%' }}
                animate={letterControls}
                aria-hidden="true"
              >
                <span>WITH LOVE</span>
                <strong>Harshit <i>&</i> Aanchal</strong>
              </m.span>
              <span className="envelope__front" aria-hidden="true" />
              <m.span
                className="envelope__flap"
                initial={{ rotateX: 0 }}
                animate={flapControls}
                aria-hidden="true"
              />
              <m.span
                className="envelope__seal"
                initial={{ scale: 1, rotate: 0, opacity: 1 }}
                animate={sealControls}
                aria-hidden="true"
              >
                श्री
              </m.span>
              <span className="envelope__open-label">
                {isEnvelopeOpening ? copy.opening : copy.tapToOpen}
              </span>
            </m.button>
          </div>
        </m.div>
      <header
        ref={heroRef}
        className="hero"
        id="home"
        tabIndex="-1"
        aria-hidden={!isOpened}
        inert={!isOpened}
      >
        <div className="hero__glow" aria-hidden="true" />
        <div className="hero__mandala" aria-hidden="true" />
        <m.div
          className="hero__reveal-light"
          initial={{ opacity: 0, scale: 0.55 }}
          animate={goldRevealControls}
          aria-hidden="true"
        />
        <m.div
          className="hero__floral-accent"
          initial={{ opacity: 0, scale: 0.55 }}
          animate={floralAccentControls}
          aria-hidden="true"
        >
          <span />
          <span />
          <span />
          <span />
        </m.div>
        <m.div
          className="hero__content"
          initial={reduceMotion ? false : { opacity: 0, y: 12, scale: 0.995 }}
          animate={heroRevealControls}
        >
          <img
            className="ganesh-mark"
            src="/gannu-ji.png"
            alt={language === 'hi' ? 'श्री गणेश जी' : 'Ganesh Ji'}
            width="54"
            height="54"
          />
          <p className="hero__invocation">॥ श्री गणेशाय नमः ॥</p>
          <p className="eyebrow hero__eyebrow">{copy.together}</p>
          <h1>
            {copy.groom} <span>&</span> {copy.bride}
          </h1>
          <div className="hero__divider" aria-hidden="true">
            <span />
            <b>✦</b>
            <span />
          </div>
          <p className="hero__lead">{copy.invitationLead}</p>
          <p className="hero__venue">{copy.venueShort}</p>
          <a className="hero__scroll" href="#invitation">
            <span className="hero__scroll-label">{copy.explore}</span>
            <span className="hero__scroll-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M12 4v15m-6-6 6 6 6-6" />
              </svg>
            </span>
          </a>
        </m.div>
        <div className="hero__bottom-ornament" aria-hidden="true">
          <span>✦</span>
          <span>❧</span>
          <span>✦</span>
        </div>
      </header>
      </LazyMotion>

      <main aria-hidden={!isOpened} inert={!isOpened}>
        <section className="section invitation-section" id="invitation">
          <div className="section-heading reveal">
            <p className="eyebrow">{copy.eldersBlessing}</p>
            <h2>{copy.familyInvitation}</h2>
            <p className="section-heading__detail">
              सर्वमंगल मांगल्ये शिवे सर्वार्थ साधिके ।<br />
              शरण्ये त्र्यम्बके गौरि नारायणी नमोऽस्तु ते ॥
            </p>
          </div>

          <div className="family-card reveal">
            <div className="family-card__names">
              <FamilyLineage
                title={copy.groom}
                relationships={groomFamily}
                language={language}
              />
              <div className="family-card__ampersand" aria-hidden="true">
                &
              </div>
              <FamilyLineage
                title={copy.bride}
                relationships={brideFamily}
                language={language}
              />
            </div>
            <div className="family-card__message">
              <span className="family-card__flourish" aria-hidden="true">
                ❧
              </span>
              <p>
                {language === 'hi'
                  ? `${copy.groom} एवं ${copy.bride} अपने परिवारों सहित आपको इस शुभ अवसर में सम्मिलित होने का सादर निमंत्रण देते हैं।`
                  : copy.familyMessage}
              </p>
              <span className="family-card__flourish" aria-hidden="true">
                ❧
              </span>
            </div>
          </div>
        </section>

        <section
          className={`section date-section${dateRevealed ? ' date-section--celebrating' : ''}`}
          id="date"
        >
          <div className="date-card reveal">
            <p className="eyebrow">{copy.saveDate}</p>
            <ScratchDateCard
              copy={copy}
              language={language}
              onReveal={() => setDateRevealed(true)}
            />
            {dateRevealed && (
              <button
                className="button button--outline date-card__calendar"
                type="button"
                onClick={() => downloadCalendarEvent(language)}
              >
                {copy.calendar}
              </button>
            )}
          </div>
        </section>

        <section className="section countdown-section" aria-labelledby="countdown-title">
          <div className="section-heading reveal">
            <p className="eyebrow">{copy.dayCloser}</p>
            <h2 id="countdown-title">
              {countdown.isPast ? copy.celebrationBegun : copy.countdown}
            </h2>
          </div>
          {!countdown.isPast ? (
            <div className="countdown reveal" aria-label={copy.countdownLabel}>
              {Object.entries(countdown)
                .filter(([unit]) => unit !== 'isPast')
                .map(([unit, value], index) => (
                  <div className="countdown__unit" key={unit}>
                    <span>{String(value).padStart(2, '0')}</span>
                    <small>{copy.units[index]}</small>
                  </div>
                ))}
            </div>
          ) : (
            <p className="countdown-note">{copy.cantWait}</p>
          )}
        </section>

          <section className="section celebrations-section" id="events">
            <div className="section-heading reveal">
              <p className="eyebrow">{copy.moments}</p>
              <h2>{copy.celebrations}</h2>
              <p className="section-heading__detail">
                {copy.lookForward}
              </p>
            </div>
            <div className="event-list">
              {celebrations.map((event, index) => (
                <EventCard
                  event={event}
                  index={index}
                  key={event.name}
                  language={language}
                  copy={copy}
                />
              ))}
            </div>
          </section>

        <section className="section venue-section" id="venue">
          <div className="venue-card reveal">
            <div className="venue-card__copy">
              <p className="eyebrow">{copy.joinCelebration}</p>
              <h2>{copy.weddingVenue}</h2>
              <h3>
                {language === 'hi' ? 'रॉयल पेपर, पीरागढ़ी' : venueName}
              </h3>
              <p>
                {language === 'hi'
                  ? 'रॉयल पेपर बैंक्वेट हॉल, ई-1, उद्योग नगर, पीरागढ़ी, नई दिल्ली 110041'
                  : venueAddress}
              </p>
              <p className="venue-card__time">{copy.venueTime}</p>
              <a
                className="button button--primary"
                href={mapSearchUrl}
                target="_blank"
                rel="noreferrer"
              >
                {copy.openDirections} <span aria-hidden="true">↗</span>
              </a>
              <div className="travel-links" role="group" aria-label={copy.rideOptions}>
                <a
                  className="travel-link travel-link--uber"
                  href={`https://m.uber.com/ul/?action=setPickup&dropoff[latitude]=${venueLatitude}&dropoff[longitude]=${venueLongitude}&dropoff[nickname]=Royal%20Pepper`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="travel-link__uber-mark" aria-hidden="true">
                    <svg viewBox="0 0 32 32" focusable="false">
                      <path d="M7 6v11a9 9 0 0 0 18 0V6" />
                    </svg>
                  </span>
                  <span>Uber</span>
                </a>
                <a
                  className="travel-link travel-link--ola"
                  href={olaBookingUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src="/ola-logo.png" alt="" aria-hidden="true" />
                  Ola
                </a>
                <a
                  className="travel-link travel-link--rapido"
                  href={rapidoBookingUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src="/rapido.png" alt="" aria-hidden="true" />
                  Rapido
                </a>
              </div>
              <div className="venue-qr">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=128x128&data=${encodeURIComponent(
                    mapSearchUrl
                  )}`}
                  alt={copy.scanDirections}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <span>{copy.scanDirections}</span>
              </div>
            </div>
            <div className="venue-card__map">
              <iframe
                title={copy.mapTitle}
                src={`https://maps.google.com/maps?q=${venueCoordinates}&hl=${language}&z=15&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              <a href={mapSearchUrl} target="_blank" rel="noreferrer">
                {copy.openMap}
              </a>
            </div>
          </div>
        </section>

        

        <section className="section family-thanks-section">
          <div className="family-thanks reveal">
            <p className="eyebrow">{copy.gratitude}</p>
            <h2>{copy.invitedBy}</h2>
            <div className="family-thanks__names">
              {(language === 'hi' ? invitedByHindi : invitedBy).map((name) => (
                <span key={name}>{name}</span>
              ))}
            </div>
            <div className="family-thanks__divider" aria-hidden="true">
              ❧ <span>✦</span> ❧
            </div>
            <p className="family-thanks__little-stars">
              {copy.littleStars}
            </p>
            <ul className="little-stars-list">
              {(language === 'hi' ? littleStarsHindi : littleStars).map((name) => (
                <li key={name}>{name}</li>
              ))}
            </ul>
          </div>
        </section>
        <section className="section details-section" id="details">
          <div className="section-heading reveal">
            <p className="eyebrow">{copy.helpfulDetails}</p>
            <h2>{copy.goodToKnow}</h2>
          </div>
          <div className="faq-list reveal">
            <details>
              <summary>{copy.datesQuestion}</summary>
              <p>{copy.datesAnswer}</p>
            </details>
            <details>
              <summary>{copy.dressQuestion}</summary>
              <p>{copy.dressAnswer}</p>
            </details>
            <details>
              <summary>{copy.travelQuestion}</summary>
              <p>{copy.travelAnswer}</p>
            </details>
          </div>
        </section>
      </main>

      {dateRevealed && (
        <div className="date-celebration" aria-hidden="true">
          {Array.from({ length: reduceMotion ? 28 : 120 }, (_, index) => (
            <span
              className="date-celebration__petal"
              key={index}
              style={{
                '--petal-left': `${(index * 67 + 13) % 100}%`,
                '--petal-top': `${((index * 47) % 110) - 10}vh`,
                '--petal-delay': `${(index % 18) * 0.045}s`,
                '--petal-duration': `${6.4 + (index % 9) * 0.4}s`,
                '--petal-drift': `${((index * 19) % 120) - 60}px`,
                '--petal-size': `${7 + (index % 5) * 1.5}px`
              }}
            />
          ))}
        </div>
      )}

      <footer className="footer" aria-hidden={!isOpened} inert={!isOpened}>
        <p>{copy.thanks}</p>
        <p className="footer__names">
          {copy.groom} <span>&</span> {copy.bride}
        </p>
        <p className="visually-hidden" role="status" aria-live="polite">
          {shareMessage} {musicMessage}
        </p>
      </footer>

      {isOpened && (
        <nav className="floating-nav" aria-label={copy.shortcuts}>
          <a href="#events">
            <ShortcutIcon name="events" />
            <span>{copy.events}</span>
          </a>
          <a href="#venue">
            <ShortcutIcon name="venue" />
            <span>{copy.venue}</span>
          </a>
          <button
            className={`floating-nav__music${
              musicOn && !musicMuted ? ' is-playing' : ''
            }`}
            type="button"
            onClick={toggleMusic}
            aria-label={
              musicOn
                ? musicMuted
                  ? copy.unmuteMusic
                  : copy.muteMusic
                : copy.playMusic
            }
            aria-pressed={musicOn && !musicMuted}
          >
            <span className="floating-nav__music-icon">
              <ShortcutIcon name="music" />
              {musicOn && !musicMuted && (
                <span className="music-equalizer" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </span>
              )}
            </span>
            <span>
              {musicOn ? (musicMuted ? copy.unmute : copy.mute) : copy.music}
            </span>
          </button>
          <button
            className="floating-nav__language"
            type="button"
            onClick={switchLanguage}
            aria-label={
              language === 'en' ? copy.switchToHindi : copy.switchToEnglish
            }
            aria-pressed={language === 'hi'}
          >
            <span className="floating-nav__language-icon" aria-hidden="true">
              अ
            </span>
            <span>{copy.hindi}</span>
          </button>
        </nav>
      )}

    </div>
  );
}