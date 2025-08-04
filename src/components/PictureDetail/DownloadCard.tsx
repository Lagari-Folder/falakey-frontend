import { useState } from "react";
import { DownloadData, Post } from "@/models/post";
import LockedButton from "./LockedButton";
import PremiumButton from "./PremiumButton";
import DownloadButton from "./DownloadButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { useTrans } from "@/utils/translation";
import { StarIcon } from "@radix-ui/react-icons";
import DownloadingIcon from "@mui/icons-material/Downloading";

const DownloadCard = ({
  post,
  selected,
  setSelected,
}: {
  post: Post;
  selected: DownloadData | undefined;
  setSelected: (o: DownloadData | undefined) => void;
}) => {
  const { t } = useTrans();

  const [open, setOpen] = useState(false);

  // The same card content as before
  const cardContent = (
    <div
      className={`border p-4 sm:p-6 sm:rounded-xl md:w-[600px] w-full  shadow-lg bg-white ${
        post?.is_download_locked
          ? "opacity-50 pointer-events-none select-none"
          : ""
      }`}
    >
      <div className="text-lg sm:text-xl font-semibold mb-4 text-gray-800">
        Download Options
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        {post?.download_data?.map((item, index) => (
          <label
            key={index}
            htmlFor={`option-${index}`}
            className={`flex items-start gap-2 p-3 border rounded-lg cursor-pointer transition ${
              selected?.label === item.label
                ? "border-black bg-gray-100"
                : "border-gray-300 hover:border-black"
            }`}
          >
            <input
              type="radio"
              id={`option-${index}`}
              name="download_quality"
              value={item.label}
              checked={selected?.label === item.label}
              onChange={() => setSelected(item)}
              className="w-4 h-4 mt-1"
              disabled={post?.is_download_locked}
            />
            <div className="text-xs sm:text-sm">
              <div className="font-medium">{item.label}</div>
              <div className="text-gray-500 text-[10px] sm:text-xs">
                {item.dimensions} {item.extension ? `.${item.extension}` : ""}
              </div>
            </div>
          </label>
        ))}
      </div>

      {post?.is_download_locked == true && (
        <div className="text-sm sm:text-base text-red-600 font-medium mb-4">
          {t("post.locked_text")}
        </div>
      )}

      {post?.is_premium == true &&
        post?.is_download_locked == false &&
        selected != null && (
          <div className="flex items-center justify-center mb-4 gap-2 bg-yellow-100 border border-yellow-400 rounded-lg p-2">
            <span className="text-yellow-700 font-bold text-md sm:text-xl">
              {t("post.credits_required")}: {post.premium_credits}
            </span>
          </div>
        )}

      <div className="w-full flex justify-center">
        {post.is_download_locked ? (
          <LockedButton />
        ) : post.is_premium ? (
          <PremiumButton post={post} selected={selected!} />
        ) : (
          <DownloadButton selected={selected!} />
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop / tablet: Show full card */}

      <div className="hidden sm:block">{cardContent}</div>
      {/* Mobile: Show only a download button */}
      <div className="flex justify-center sm:hidden w-full">
        <div className="w-[95%]">
          <button
            onClick={() => setOpen(true)}
            className="h-[45px] w-full px-2 gap-2 flex bg-[#b17ece] text-white rounded-md items-center justify-center"
          >
            {post.is_download_locked ? (
              <>
                <p>{t("post.download")}</p>
                <span className="flex items-center justify-center">
                  <FontAwesomeIcon icon={faLock} />
                </span>
              </>
            ) : post.is_premium ? (
              <>
                <StarIcon fontSize="small" />
                <p>{t("post.download")}</p>
              </>
            ) : (
              <>
                <p>{t("post.download")}</p>
                <span className="flex items-center justify-center">
                  <DownloadingIcon fontSize="small" />
                </span>
              </>
            )}
          </button>
        </div>

        {open && (
          <div
            className="fixed inset-0 z-50 bg-black/50 flex items-end"
            onClick={() => setOpen(false)}
          >
            <div
              className="bg-white w-full rounded-t-2xl p-4 max-h-[80%] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setOpen(false)}
                className="text-gray-600 mb-4 block"
              >
                Close
              </button>
              {cardContent}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DownloadCard;
