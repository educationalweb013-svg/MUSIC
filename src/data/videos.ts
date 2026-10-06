import { VideoItem } from '../types/video';

export const MUSIC_VIDEOS: VideoItem[] = [
  {
    id: '7Nqt4vRQBFg',
    number: 1,
    title: 'አሞራው ካሞራ (Amoraw Kamora)',
    artist: 'Aschalew Fetene',
    duration: '5:24',
    genre: 'Traditional / Contemporary',
    year: '2025',
  },
  {
    id: 'oAhm9NeE2jw',
    number: 2,
    title: 'Wollo Wollo Best Music',
    artist: 'Derb Zenebe',
    duration: '6:15',
    genre: 'Wollo Traditional',
    year: '2024',
  },
  {
    id: '1j49Ao943ZU',
    number: 3,
    title: 'Mar Eske Tuaf (Classic Music Video)',
    artist: 'Teddy Afro',
    duration: '5:08',
    genre: 'Afrobeat / Pop',
    year: '2022',
  },
  {
    id: 'V4EnQORr-Rk',
    number: 4,
    title: 'እምወድሽ ጎንደር (Emwedshi Gonder)',
    artist: 'Nuradiss Seid & Bamlak Getnet',
    duration: '5:45',
    genre: 'Gonder Folklore',
    year: '2024',
  },
  {
    id: '0djSa5WmEKk',
    number: 5,
    title: 'Kulun Mankualesh (Golden Oldies)',
    artist: 'Tilahun Gessesse',
    duration: '4:52',
    genre: 'Classic Soul',
    year: '2021',
  },
  {
    id: 'NPnv-Ki0Se0',
    number: 6,
    title: 'Babajalew',
    artist: 'Amsal Mitike',
    duration: '5:36',
    genre: 'Ethiopian Dance',
    year: '2023',
  },
  {
    id: 'RRqTpYYb7d4',
    number: 7,
    title: 'እናትዋ ጎንደር (Enatwa Gonder)',
    artist: 'Aschalew Fetene (Ardi)',
    duration: '6:02',
    genre: 'Traditional Beats',
    year: '2023',
  },
  {
    id: '8yOfFtOHL_4',
    number: 8,
    title: 'Uzaza Aleyna (ኡዛዛ አሌና)',
    artist: 'Helen Berhe',
    duration: '4:48',
    genre: 'Afro-Pop & Dance',
    year: '2023',
  },
  {
    id: '8h45oYFLXtg',
    number: 9,
    title: 'Welo Mejen',
    artist: 'Frezer Kenaw (Babi)',
    duration: '5:18',
    genre: 'Welo Groove',
    year: '2024',
  },
  {
    id: 'vVFuU_Hi0wk',
    number: 10,
    title: 'Teshenfialehu (ተሸንፌያለሁ)',
    artist: 'Mulualem Takele & Ephrem Amare',
    duration: '5:50',
    genre: 'Acoustic & Vocal',
    year: '2018',
  },
  {
    id: 'gRaBwoEz7KY',
    number: 11,
    title: 'Kokebey',
    artist: 'Jossy in z house & Millen Hailu',
    duration: '4:35',
    genre: 'Contemporary Fusion',
    year: '2019',
  },
];

export function getYoutubeThumbnailUrl(id: string): string {
  return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
}

export function getYoutubeWatchUrl(id: string): string {
  return `https://www.youtube.com/watch?v=${id}`;
}

export function getYoutubeEmbedUrl(id: string, autoplay: boolean = true): string {
  return `https://www.youtube.com/embed/${id}?autoplay=${autoplay ? 1 : 0}&enablejsapi=1&rel=0&modestbranding=1`;
}
