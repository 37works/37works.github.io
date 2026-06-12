// Landing copy. Voice: 담백한 존댓말 (design system §10).
// SaaS · 모바일 앱 서비스 + 철학 "일상에 스며드는 자연스러움".

export const hero = {
  eyebrow: "SaaS · Mobile App",
  title: "Soft37",
  tagline: "일상에 스며드는 자연스러움",
  description:
    "Soft37은 SaaS와 모바일 앱을 만드는 작은 팀입니다. 도구를 쓴다고 의식하지 않을 만큼, 자연스럽게 일상에 녹아드는 서비스를 만듭니다.",
} as const;

export interface Feature {
  icon: "shield" | "sparkles" | "user";
  title: string;
  body: string;
}

export const features: Feature[] = [
  {
    icon: "shield",
    title: "안정성 우선",
    body: "스케줄러와 워치독처럼 멈추면 안 되는 서비스를 만듭니다. 정확한 시점에, 끊김 없이 동작하는 것을 가장 중요하게 생각합니다.",
  },
  {
    icon: "sparkles",
    title: "AI 기반",
    body: "디자인과 인공지능이 만나는 지점에서 제품을 만듭니다. 현대적인 도구로 현대적인 제품을, 호기심에서 출발해 기술로 실현합니다.",
  },
  {
    icon: "user",
    title: "작은 팀",
    body: "위원회도, 군더더기도 없습니다. 기획부터 출시까지 직접 책임지며, 모든 결정에 온전히 책임을 집니다.",
  },
];

export interface Product {
  id: string;
  /** 카테고리 라벨 (eyebrow) */
  category: string;
  name: string;
  description: string;
  platforms: string[];
  /** 출시 상태 배지 문구, 예: "운영 중", "준비 중" */
  releaseNote: string;
  comingSoon: boolean;
  /** 가로형 OG 배너 이미지 (public/ 기준 경로) */
  image: string;
  /** 외부 사이트 링크. 있으면 카드가 클릭 가능해진다. */
  url?: string;
}

export const products = {
  eyebrow: "Products",
  heading: "Soft37의 이름으로 만든 서비스",
  note: "웹을 통해 선보이는 서비스를 만들고 운영합니다.",
  items: [
    {
      id: "senditwhenever",
      category: "웹훅 스케줄러",
      name: "Send It Whenever",
      description:
        "웹훅을 초 단위로 정밀하게 예약하고, 원하는 시점에 정확히 실행되도록 안정적으로 전달하는 초정밀 스케줄러입니다.",
      platforms: ["Web", "API"],
      releaseNote: "운영 중",
      comingSoon: false,
      image: "/products/senditwhenever.png",
      url: "https://www.sendit-whenever.com",
    },
    {
      id: "isitgoingwell",
      category: "워치독 · 모니터링",
      name: "Is It Going Well",
      description:
        "자동화 서비스가 멈추지 않도록 지켜보는 워치독입니다. 이상 징후를 감지해 즉시 알려, 지금 잘 되고 있는지 한눈에 확인하세요.",
      platforms: ["Web"],
      releaseNote: "운영 중",
      comingSoon: false,
      image: "/products/isitgoingwell.png",
      url: "https://www.itgoingwell.com",
    },
  ] satisfies Product[],
} as const;

export const legal = {
  eyebrow: "Legal",
  heading: "정책 문서",
  items: [
    { href: "/privacy", label: "개인정보처리방침", caption: "Document" },
    { href: "/terms", label: "서비스 이용약관", caption: "Document" },
  ],
} as const;

export const site = {
  name: "Soft37",
  parent: "37Works",
  email: "kdoky37@gmail.com",
  contactEmail: "kdoky37@working37.net",
  rootUrl: "https://www.working37.net",
  year: 2026,
} as const;

// 사업자 정보 (footer 법적 고지)
export const company = {
  name: "Soft37",
  ceo: "김도경",
  businessRegistration: "137-73-00738",
  mailOrderRegistration: "제2026-서울광진-0911 호",
  duns: "696554688",
  founded: "2026.05.22",
  location: "대한민국",
} as const;
