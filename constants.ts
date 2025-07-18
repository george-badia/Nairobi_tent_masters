import { Product, GalleryItem, Testimonial, FAQ } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod_1',
    name: 'Savannah Explorer 2-Person Tent',
    category: 'Camping',
    price: 15000,
    description: 'A durable and lightweight tent perfect for weekend getaways in the wild. Water-resistant and easy to set up.',
    imageUrl: 'https://picsum.photos/seed/tent1/600/400',
  },
  {
    id: 'prod_2',
    name: 'Maasai Mara Family Dome',
    category: 'Camping',
    price: 25000,
    description: 'Spacious dome tent that comfortably fits a family of four. Features multiple windows for ventilation and panoramic views.',
    imageUrl: 'https://picsum.photos/seed/tent2/600/400',
  },
  {
    id: 'prod_3',
    name: 'Corporate Pavilion 50-Seater',
    category: 'Corporate',
    price: 120000,
    description: 'Elegant and sturdy pavilion for corporate events, product launches, or outdoor meetings. Branding options available.',
    imageUrl: 'https://picsum.photos/seed/tent3/600/400',
  },
  {
    id: 'prod_4',
    name: 'Executive Event Tent',
    category: 'Events',
    price: 250000,
    description: 'A grand, high-peak tent for weddings, galas, and large gatherings. Can be customized with flooring, lighting, and liners.',
    imageUrl: 'https://picsum.photos/seed/tent4/600/400',
  },
  {
    id: 'prod_5',
    name: 'Garden Party Gazebo',
    category: 'Events',
    price: 45000,
    description: 'A stylish gazebo perfect for garden parties, birthdays, or as a shaded lounge area. Quick to assemble.',
    imageUrl: 'https://picsum.photos/seed/tent5/600/400',
  },
  {
    id: 'prod_6',
    name: 'Heavy-Duty Tarpaulin',
    category: 'Accessories',
    price: 5000,
    description: 'Multi-purpose waterproof tarpaulin. Ideal as a groundsheet or extra cover. 5m x 5m.',
    imageUrl: 'https://picsum.photos/seed/tent6/600/400',
  },
    {
    id: 'prod_7',
    name: 'Portable Camping Chair',
    category: 'Accessories',
    price: 3500,
    description: 'Comfortable and foldable chair for any outdoor activity. Comes with a convenient carrying bag.',
    imageUrl: 'https://picsum.photos/seed/tent7/600/400',
  },
  {
    id: 'prod_8',
    name: 'Solar-Powered LED Lantern',
    category: 'Accessories',
    price: 4200,
    description: 'Bright, eco-friendly lighting for your campsite or event. Charges during the day, lasts all night.',
    imageUrl: 'https://picsum.photos/seed/tent8/600/400',
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal_1',
    title: 'Naivasha Lakeside Wedding',
    category: 'Weddings',
    imageUrl: 'https://picsum.photos/seed/gallery1/800/600',
    story: 'An elegant high-peak marquee tent set against the serene backdrop of Lake Naivasha. The transparent sidewalls offered breathtaking views, creating a magical atmosphere for the evening reception.'
  },
  {
    id: 'gal_2',
    title: 'Mara Explorer\'s Safari Camp',
    category: 'Safari',
    imageUrl: 'https://picsum.photos/seed/gallery2/600/800',
    story: 'We designed and installed a full luxury safari camp, including spacious bedroom tents with en-suite bathrooms and a central mess tent for dining. The heavy-duty canvas blends perfectly with the wild Maasai Mara landscape.'
  },
  {
    id: 'gal_3',
    title: 'Nairobi Tech Summit Expo',
    category: 'Corporate',
    imageUrl: 'https://picsum.photos/seed/gallery3/800/500',
    story: 'A series of interconnected modular tents provided a professional and flexible exhibition space for a major tech summit. Custom branding and climate control ensured a comfortable experience for all attendees.'
  },
  {
    id: 'gal_4',
    title: 'Rift Valley Music Festival',
    category: 'Festivals',
    imageUrl: 'https://picsum.photos/seed/gallery4/800/700',
    story: 'Our large-scale event tents served as the main stage covers and vendor villages for a vibrant music festival. The structures were engineered to handle large crowds and the unpredictable valley weather.'
  },
  {
    id: 'gal_5',
    title: 'Limuru Highlands Garden Party',
    category: 'Weddings',
    imageUrl: 'https://picsum.photos/seed/gallery5/600/700',
    story: 'A beautiful stretch tent provided a chic and modern cover for an intimate garden wedding in the lush Limuru highlands. Its flexible form integrated seamlessly with the surrounding landscape.'
  },
  {
    id: 'gal_6',
    title: 'Corporate Retreat in Tsavo',
    category: 'Corporate',
    imageUrl: 'https://picsum.photos/seed/gallery6/900/600',
    story: 'This custom setup for a corporate retreat included conference facilities, lounge areas, and accommodation tents, offering a unique blend of business and bush adventure in Tsavo National Park.'
  },
];


export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test_1',
    name: 'Asha & Ben',
    event: 'Lakeside Wedding',
    quote: '"Nairobi Tent Masters transformed our wedding venue! The grand marquee was breathtaking, and their team was professional from start to finish. Highly recommended!"',
    imageUrl: 'https://picsum.photos/seed/testimonial1/100/100',
  },
  {
    id: 'test_2',
    name: 'David Mwangi',
    event: 'Corporate Expo',
    quote: '"The modular tents for our tech expo were perfect. The setup was quick, and the custom branding looked fantastic. We\'ll definitely be using their services again."',
    imageUrl: 'https://picsum.photos/seed/testimonial2/100/100',
  },
  {
    id: 'test_3',
    name: 'Sarah Chepkoech',
    event: 'Family Camping Trip',
    quote: '"The Maasai Mara dome tent we bought was incredibly spacious and withstood a surprise rainstorm without a single leak. Great quality for a great price!"',
    imageUrl: 'https://picsum.photos/seed/testimonial3/100/100',
  },
];

export const FAQS: FAQ[] = [
  {
    id: 'faq_1',
    question: 'How does shipping and delivery work?',
    answer: 'We offer delivery services within Nairobi and its environs for a nominal fee. For up-country orders, we partner with reliable courier services. Delivery times for ready-made tents are typically 1-3 business days.'
  },
  {
    id: 'faq_2',
    question: 'Should I rent or buy a tent for my event?',
    answer: 'This depends on frequency of use. For a one-off event like a wedding or large corporate function, renting is often more cost-effective. If you plan to use the tent multiple times a year, buying might be a better long-term investment. Contact our team for a personalized recommendation.'
  },
  {
    id: 'faq_3',
    question: 'What is the process for custom orders?',
    answer: 'Start by using our AI proposal tool on the "Custom Orders" page. Once you submit the proposal with your contact details, our sales team will contact you within 24 hours to discuss specifics, provide a detailed quote, and finalize the design before production begins.'
  },
  {
    id: 'faq_4',
    question: 'What materials do you use?',
    answer: 'We use a range of high-quality materials depending on the tent\'s purpose. Our selection includes heavy-duty PVC for event tents, weatherproof ripstop canvas for safari and camping tents, and sturdy steel or aluminum for frames.'
  },
  {
    id: 'faq_5',
    question: 'What payment options are available?',
    answer: 'We accept payments via M-Pesa (Till Number), bank transfers, and major credit/debit cards. For large custom orders, we typically require a 50% deposit to commence work, with the balance due upon completion.'
  },
];
