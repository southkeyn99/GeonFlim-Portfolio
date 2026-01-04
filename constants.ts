
import { Work } from './types';

export const INITIAL_WORKS: Work[] = [
  {
    id: '1',
    category: 'DIRECTING',
    year: '2023',
    titleKR: '공허의 울림',
    titleEN: 'Echoes of Emptiness',
    genre: 'Drama, Noir',
    duration: '114 min',
    role: 'Director',
    synopsis: '침묵이 지배하는 도시의 끝자락에서, 이름 없는 주인공이 잃어버린 기억의 조각을 찾아 헤매는 과정을 그린 서사시. 도시의 소음과 대비되는 고요한 미장센을 통해 현대인의 고독과 상실을 탐구한다.',
    representativeImage: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1925&auto=format&fit=crop',
    stillCuts: [
      'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2059&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542204172-3c35f299109f?q=80&w=2070&auto=format&fit=crop'
    ],
    awards: [
      { id: 'a1', title: '제76회 칸 영화제 경쟁 부문' },
      { id: 'a2', title: '제28회 부산국제영화제 뉴 커런츠 상 수상' }
    ]
  },
  {
    id: '2',
    category: 'CINEMATOGRAPHY',
    year: '2024',
    titleKR: '빛의 이면',
    titleEN: 'The Other Side of Light',
    genre: 'Mystery, Thriller',
    duration: '95 min',
    role: 'Cinematographer',
    synopsis: '모든 것이 선명하게 드러나는 백야의 계절, 아이러니하게도 진실은 그림자 속에 숨어버린다. 극도의 콘트라스트와 빛의 산란을 이용해 인물의 불안한 내면 심리를 시각적으로 극대화한 작품.',
    representativeImage: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=2070&auto=format&fit=crop',
    stillCuts: [
      'https://images.unsplash.com/photo-1505686994434-e3cc5abf1330?q=80&w=2073&auto=format&fit=crop'
    ],
    awards: [
      { id: 'a3', title: '제44회 청룡영화상 촬영상 후보' },
      { id: 'a4', title: '에너가 카메라이메쥬(EnergaCAMERIMAGE) 공식 초청' }
    ]
  }
];

export const ADMIN_PASSWORD = '1228';
