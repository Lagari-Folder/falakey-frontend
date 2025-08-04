import { useEffect, useState } from "react";
import ListingBox from "../components/ListingDashboard/ListingBox"; // Adjust the path if necessary
import { useListingHook } from "@/helper/listingHook";
import { Post } from "@/models/post";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useTrans } from "@/utils/translation";

const ListingDashboard = () => {
  const { getListingPosts, data, loading } = useListingHook();

  // const [currentPage, setCurrentPage] = useState(1);
  // const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    getListingPosts();
  }, []);

  const [filteredType, setFilteredType] = useState("");
  const [filteredStatus, setFilteredStatus] = useState("");

  const filteredListings = (data ?? []).filter((listing: Post) => {
    const typeMatch = filteredType ? listing!.type! === filteredType : true;
    const statusMatch = filteredStatus
      ? listing.status?.key === filteredStatus
      : true;
    return typeMatch && statusMatch;
  });

  const { t } = useTrans();

  return (
    <div className="sm:px-8 md:px-12 xl:px-16">
      {/* Title */}
      <h1 className="text-[24px] sm:text-[28px] md:text-[30px] font-semibold font-lexend text-start  mb-6">
        {t("listing_dashboard.listings")}
      </h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-1 items-center mb-6">
        <select
          name="listing_type"
          className="w-full sm:w-[280px] md:w-[360px] xl:w-[480px] h-[50px] border border-gray-300 font-[17px] font-lexend rounded-sm pl-4 appearance-none"
          onChange={(e) => setFilteredType(e.target.value)}
        >
          <option value="">{t("listing_dashboard.all_types")}</option>
          <option value="photo">{t("listing_dashboard.photo")}</option>
          <option value="video">{t("listing_dashboard.video")}</option>
        </select>

        <select
          name="listing_status"
          className="w-full sm:w-[280px] md:w-[360px] xl:w-[480px] h-[50px] border border-gray-300 font-[17px] font-lexend rounded-sm pl-4 appearance-none"
          onChange={(e) => setFilteredStatus(e.target.value)}
        >
          <option value="">{t("listing_dashboard.all_status")}</option>
          <option value="active">{t("listing_dashboard.active")}</option>
          <option value="draft">{t("listing_dashboard.draft")}</option>
          <option value="pending_review">
            {t("listing_dashboard.pending")}
          </option>
        </select>

        <button
          onClick={() => {}}
          className="bg-[#44175B] 2xl:ml-4 xl:ml-4 3xl:ml-4 max-w-[90px] sm:w-[120px] h-[51px] font-extrabold text-white font-lexend rounded-lg px-4 py-2"
        >
          {t("listing_dashboard.filter")}
        </button>
      </div>

      {/* Listings */}
      {loading ? (
        <div className="mt-6 mb-12 flex items-center justify-center gap-3 text-xl font-semibold text-primary">
          <FontAwesomeIcon
            icon={faSpinner}
            className="size-[30px] animate-spin"
            style={{ animationDuration: "2000ms" }}
          />
          {t("common.loading")}
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5 w-full">
            {filteredListings.map((data, index) => (
              <ListingBox key={index} data={data} />
            ))}
          </div>
          {/* <div className="flex justify-center items-center mt-16 gap-2">
            {currentPage > 1 && (
              <button
                className="w-[35px] pb-1 h-[37px] font-bold border-2 border-gray-200 shadow-lg rounded-[6px] hover:bg-gray-300 flex items-center justify-center"
                onClick={() => {}}
              >
                &lt;
              </button>
            )}

            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded-lg font-bold  ${
                  currentPage === index + 1
                    ? "text-white bg-black"
                    : "hover:bg-gray-300 text-black"
                }`}
                onClick={() => {}}
              >
                {index + 1}
              </button>
            ))}
            {currentPage < totalPages && (
              <button
                className="w-[35px] pb-1 h-[37px] font-bold border-2 border-gray-200 shadow-lg rounded-[6px] hover:bg-gray-300 flex items-center justify-center"
                onClick={() => {}}
              >
                &gt;
              </button>
            )}
          </div> */}
        </div>
      )}
    </div>
  );
};

export default ListingDashboard;
