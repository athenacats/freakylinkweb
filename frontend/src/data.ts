import { Lingerie } from './app/shared/models/lingerie';
import { Tag } from './app/shared/models/tag';

export const sampleLingerie: Lingerie[] = [
  {
    id: '1',
    name: 'Abeni Lingerie Set: Schoolgirl Outfit',
    price: 2500,
    tags: ['Cosplay', 'Two-Piece'],
    favorite: false,
    stars: 4.0,
    imageUrl: 'assets/abeni-3.jpg',
    description:
      'Abeni Lingerie Set: Schoolgirl Outfit is a cosplay outfit that can be worn as lingerie. It has a crop top, skirt, and suspenders.',
    color: 'red',
  },
  {
    id: '2',
    name: 'Ada Lingerie Set: Black Sheer Bodysuit With Rhinestones',
    price: 1600,
    tags: ['Bodysuit', 'Teddy'],
    favorite: true,
    stars: 5.0,
    imageUrl: 'assets/ada-1.jpg',
    description:
      'Ada Lingerie Set: Black Sheer Bodysuit With Rhinestones is a sexy sheer bodysuit that is suitable for the bedroom and also casual situations.',
    color: 'black',
  },
  {
    id: '3',
    name: 'Adaeze Lingerie Set: Sexy Maid Cosplay Costume',
    price: 2300,
    tags: ['Cosplay', 'Maid'],
    favorite: true,
    stars: 4.0,
    imageUrl: 'assets/adaeze-1.png',
    description:
      'Adaeze Lingerie Set: Sexy Maid Cosplay Costume is a sexy cosplay costume that is suitable for any sexy play.',
    color: 'black',
  },
  {
    id: '4',
    name: 'Adesina Lingerie Set: 2 Piece Chiffon Crop Top and Panties',
    price: 1600,
    tags: ['Two-piece', 'Crop Top'],
    favorite: true,
    stars: 5.0,
    imageUrl: 'assets/Adesina-1_4_11zon.jpg',
    description:
      'Adesina Lingerie Set: 2 Piece Chiffon Top and Panties has a sheer floral design. The crop top can be worn in the bedroom or with casual clothing.',
    color: 'brown',
  },
  {
    id: '5',
    name: 'Aicha Lingerie Set: Sexy Maid Cosplay Costume',
    price: 2300,
    tags: ['Cosplay', 'Maid'],
    favorite: false,
    stars: 3.0,
    imageUrl: 'assets/aicha-1.jpg',
    description:
      'Aicha Lingerie Set: Sexy Maid Cosplay Costume is a sexy cosplay costume that is suitable for any sexy play.',
    color: 'black',
  },
  {
    id: '6',
    name: 'Amali Lingerie Set: 3 Piece Chiffon Bra, Garter & Thong',
    price: 1850,
    tags: ['Garter', 'Three-piece'],
    favorite: false,
    stars: 5.0,
    imageUrl: 'assets/Amali_10_11zon.jpg',
    description:
      'Amali Lingerie Set: 3 Piece Chiffon Bra, Garter & Thong is a gauzy set with a skirt garter belt. The set has thigh bands and a sexy see through design.',
    color: 'black',
  },
];

const sampleTags: Tag[] = [
  { name: 'All', count: 6 },
  { name: 'Garter', count: 1 },
  { name: 'Three-piece', count: 1 },
  { name: 'Cosplay', count: 3 },
  { name: 'Maid', count: 2 },
  { name: 'Two-piece', count: 2 },
  { name: 'Crop Top', count: 1 },
  { name: 'Bodysuit', count: 1 },
  { name: 'Teddy', count: 1 },
];
