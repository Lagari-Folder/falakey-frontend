import share_post from "@/helper/shareFunction";
import { socialMdeiaShare } from "@/lib/data";
import { RootState } from "@/lib/store";
import { Post } from "@/models/post";
import { useTrans } from "@/utils/translation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

const ShareButton = ({ post }: { post: Post }) => {
  const [show, setShow] = useState(false);
  const { t } = useTrans();

  const { local } = useSelector((state: RootState) => state.translation);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShow(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="h-full relative z-10" ref={dropdownRef}>
      <button
        onClick={() => {
          setShow(!show);
        }}
        className="px-4 py-2 bg-[hsla(0,0%,50%,0.2)] text-black-700 rounded-md transition duration-300 ease-in-out items-center justify-center h-full"
      >
        {t("post.share")}
      </button>
      {show && (
        <div className="absolute sm:-start-full -start-full max-sm:w-64 w-72 mt-2 bg-[#eee] rounded-lg shadow-lg ">
          <ul className="text-[#000]  py-5">
            {socialMdeiaShare.map((media, index) => (
              <li key={index}>
                <button
                  className="text-[22px] w-full flex items-center gap-4 px-8 py-2 text-left font-bold text-[#000] rounded-md hover:text-[#44175b]  transition-colors"
                  onClick={() => {
                    share_post(
                      media.key as
                        | "facebook"
                        | "pinterest"
                        | "twitter"
                        | "email"
                        | "whatsapp",
                      `window.location.origin/${local}/listing/${post.slug}`
                    );
                  }}
                >
                  <div className="w-[20px]">
                    <FontAwesomeIcon icon={media.icon} />
                  </div>
                  <span className="text-[18px] font-semibold">
                    {media.title}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ShareButton;
