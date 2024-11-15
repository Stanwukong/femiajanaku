"use client";
import { usePathname, useRouter } from "next/navigation";
import { animatePageOut } from "@/utils/animations";

type Props = {
  href: string;
  label: string;
  onModalClose: () => void;
};

const TransitionLink = ({ href, label, onModalClose }: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = () => {
    const close = () => onModalClose();
    close();
    if (pathname != href) {
      animatePageOut(href, router);
    }
  };
  return (
    <button
      onClick={handleClick}
      className={`pb-2 ${
        pathname == href && "underline"
      } border-black hover:underline underline-offset-8`}
    >
      {label}
    </button>
  );
};

export default TransitionLink;
