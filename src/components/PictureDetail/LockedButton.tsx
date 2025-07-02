import { useTrans } from "@/utils/translation";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const LockedButton = () => {
  const { t } = useTrans();
  return (
    <button
      disabled
      className="sm:h-[45px] h-[30px] aspect-square px-2 gap-2 flex bg-[#b17ece]/50 text-white rounded-md items-center justify-center"
    >
      <p className="sm:block hidden">{t("post.download")}</p>
      <span className="flex items-center justify-center">
        <FontAwesomeIcon icon={faLock} />
      </span>
    </button>
  );
};

export default LockedButton;
