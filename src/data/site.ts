// Business facts, kept in one place. Pages, the footer, the sticky bar and JSON-LD all read from here.
export const site = {
  name: 'Sections Fine Meats',
  shortName: 'Sections',
  url: 'https://sectionsfm.com',
  phone: '(949) 432-5120',
  phoneHref: 'tel:+19494325120',
  address: {
    street: '333 E 17th St, Suite 22',
    city: 'Costa Mesa',
    region: 'CA',
    postalCode: '92627',
    country: 'US',
  },
  geo: { lat: 33.6316, lng: -117.9137 }, // TODO: confirm exact pin with owner
  mapsUrl: 'https://maps.google.com/?q=Sections+Fine+Meats+333+E+17th+St+Costa+Mesa+CA',
  orderUrl: 'https://order.toasttab.com/online/sectionsfinemeats',
  bodegaUrl: 'https://toast.app/r/birdies-bodega-cbg-333-east-17th-street/order',
  instagram: 'https://www.instagram.com/sectionsfinemeats/',
  instagramHandle: '@sectionsfinemeats',
  yelp: 'https://www.yelp.com/biz/sections-fine-meats-costa-mesa',
  rating: { value: 4.8, count: null as number | null }, // TODO: fill review count before showing it
  // day: 0 = Sunday. Times are 24h "HH:MM". Source: Birdeye; confirm with owner.
  hours: [
    { day: 0, open: '10:00', close: '17:00' },
    { day: 1, open: '10:00', close: '19:00' },
    { day: 2, open: '10:00', close: '19:00' },
    { day: 3, open: '10:00', close: '19:00' },
    { day: 4, open: '10:00', close: '19:00' },
    { day: 5, open: '10:00', close: '19:00' },
    { day: 6, open: '10:00', close: '19:00' },
  ],
  hoursSummary: ['Mon–Sat 10am–7pm', 'Sun 10am–5pm'],
};

export const nav = [
  { href: '/menu', label: 'Menu' },
  { href: '/dry-aged-steak-costa-mesa', label: 'Dry-Aged' },
  { href: '/sausage-charcuterie', label: 'Sausage & Charcuterie' },
  { href: '/birdies-bodega', label: 'Birdies Bodega' },
  { href: '/visit', label: 'Visit' },
];
