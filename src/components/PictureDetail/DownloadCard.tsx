import { DownloadData, Post } from "@/models/post";
import LockedButton from "./LockedButton";
import PremiumButton from "./PremiumButton";
import DownloadButton from "./DownloadButton";

const DownloadCard = ({
  post,
  selected,
  setSelected,
}: {
  post: Post;
  selected: DownloadData | undefined;
  setSelected: (o: DownloadData | undefined) => void;
}) => {
  return (
    <div
      className={`border p-4 sm:p-6 sm:rounded-xl w-full max-w-[600px] shadow-lg bg-white ${
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
          This download is locked. Please unlock it to continue.
        </div>
      )}

      {post?.is_premium == true &&
        post?.is_download_locked == false &&
        selected != null && (
          <div className="flex items-center justify-center mb-4 gap-2 bg-yellow-100 border border-yellow-400 rounded-lg p-2">
            <span className="text-yellow-700 font-bold text-md sm:text-xl">
              Requires {post.premium_credits} Credits
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
};

export default DownloadCard;
