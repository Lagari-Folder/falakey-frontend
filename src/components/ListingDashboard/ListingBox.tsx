import { Post } from "@/models/post";
import { useTrans } from "@/utils/translation";
import ImageIcon from "@mui/icons-material/Image";

const ListingBox = ({ data }: { data: Post }) => {
  const { t } = useTrans();
  return (
    <>
      <div
        key={data.id}
        className="bg-white border border-gray-300 rounded-lg p-4 flex flex-col"
      >
        {/* Image and Title */}
        <div className="flex items-center gap-4 mb-4 border-b border-gray-300 pb-4">
          <div className="w-[40px] h-[40px] aspect-square bg-gray-300 flex items-center justify-center rounded-md ">
            {data?.type == "video" ? (
              <div className="size-full">
                <video
                  className={`w-full h-full object-cover cursor-pointer rounded-md`}
                >
                  <source src={data?.preview_links?.original} type="" />
                </video>
              </div>
            ) : data?.preview_links?.thumb ? (
              <img
                className="size-[40px] aspect-square max-w-[40px] object-cover rounded-md"
                src={data?.preview_links.thumb}
                alt={data?.title}
              />
            ) : (
              <ImageIcon className="text-white" fontSize="small" />
            )}
          </div>
          <h2 className="text-[14px] font-semibold font-lexend">
            {data?.title}
          </h2>
        </div>

        {/* Status */}
        <div className="mb-4">
          <p
            className={`text-[14px] font-extrabold w-fit h-[30px] p-1 pl-2 rounded-md
            text-white
            `}
            style={{
              backgroundColor: data?.status?.color,
            }}
          >
            <span className="font-semibold">
              {data?.status?.key
                .split("_") // Split by underscore
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
                .join(" ")}
            </span>
          </p>
        </div>

        {/* Details Table */}
        <table className="w-full text-left text-[14px] text-black">
          <tbody>
            {[
              { label: t("listing.type"), value: data?.type },
              { label: t("listing.created"), value: data?.created_at },
              {
                label: t("listing.favorite_count"),
                value: data?.favorites_count,
              },
              {
                label: t("listing.downloads_count"),
                value: data?.downloads_count,
              },
              { label: t("listing.views"), value: data?.views_count },
            ].map((row, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-[#f9f9f9]" : "bg-white"}
              >
                <td className="font-medium">{row.label}</td>
                <td className="text-right">{row.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ListingBox;
