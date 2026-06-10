import Image from "next/image";

/**
 * ㅅㅊ 마크. 라이트 모드는 ink+sage 로고, 다크 모드는 sage 로고로 스왑.
 * 클리어스페이스는 사용처(Header)에서 패딩으로 확보한다.
 */
export function Logo({ size = 32 }: { size?: number }) {
  return (
    <span
      className="relative inline-block shrink-0"
      style={{ width: size, height: size }}
    >
      <Image
        src="/logo/soft37_logo_light_trans.png"
        alt="Soft37"
        width={size}
        height={size}
        priority
        className="block h-full w-full object-contain dark:hidden"
      />
      <Image
        src="/logo/soft37_logo_dark_trans.png"
        alt="Soft37"
        width={size}
        height={size}
        priority
        className="hidden h-full w-full object-contain dark:block"
      />
    </span>
  );
}
