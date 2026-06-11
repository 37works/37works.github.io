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
  icon: "smartphone" | "sparkles" | "user";
  title: string;
  body: string;
}

export const features: Feature[] = [
  {
    icon: "smartphone",
    title: "모바일 우선",
    body: "모든 제품은 모바일 경험에서 시작합니다. 정돈된 화면, 사려 깊은 인터랙션, 그리고 사용자의 시간을 존중하는 성능을 지향합니다.",
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
  /** 출시 상태 배지 문구, 예: "6월 출시 예정", "준비 중" */
  releaseNote: string;
  comingSoon: boolean;
  /** 제품 아이콘 (public/ 기준 경로) */
  icon: string;
  /** 외부 사이트 링크. 있으면 카드가 클릭 가능해진다. */
  url?: string;
}

export const products = {
  eyebrow: "Products",
  heading: "Soft37의 이름으로 만든 앱",
  note: "App Store와 웹을 통해 선보일 제품을 준비하고 있습니다.",
  items: [
    {
      id: "subwallet",
      category: "고정비 지출 관리",
      name: "SubWallet",
      description:
        "구독, 보험, 월세 등 매달 나가는 고정 지출을 한눈에 파악하고 스마트하게 관리하세요.",
      platforms: ["iOS", "Android"],
      releaseNote: "6월 출시 예정",
      comingSoon: true,
      icon: "/products/subwallet.png",
    },
    {
      id: "senditwhenever",
      category: "SaaS",
      name: "Send It Whenever",
      description:
        "이메일, SMS, 푸시 등 다양한 채널의 알림을 하나의 API로 통합 관리하고, 원하는 시점에 안정적으로 전달하세요.",
      platforms: ["Web", "API"],
      releaseNote: "준비 중",
      comingSoon: true,
      icon: "/products/senditwhenever.png",
      url: "https://www.sendit-whenever.com",
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
