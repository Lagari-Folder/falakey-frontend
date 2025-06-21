import { useFavoriteHook } from "@/helper/postHook";
import { useTrans } from "@/utils/translation";
import { ImageIcon } from "@radix-ui/react-icons";
import { useEffect } from "react";
import { FaTrash } from "react-icons/fa"; // Importing the trash icon

const FavoritesModal = ({
  showModal,
  showFavoritesModal,
}: {
  showModal: (b: boolean) => void;
  showFavoritesModal: boolean;
}) => {
  const { fetchFavorites, removeFavorite, favorites, loading } =
    useFavoriteHook();
  useEffect(() => {
    if (showFavoritesModal) {
      fetchFavorites();
    }
  }, [showFavoritesModal]);
  const { t } = useTrans();

  return (
    <div
      className="fixed inset-0 bg-white bg-opacity-95 flex justify-center items-center z-20 p-10"
      onClick={() => showModal(false)}
    >
      {loading ? (
        <div className="bg-white p-3 rounded-[12px]  w-[35%] flex items-center gap-5">
          <div className="flex justify-center animate-pulse duration-1000 ease-out items-center bg-[#ccc] size-[70px] rounded-[6px]">
            <ImageIcon className="text-[#999] !text-[18px]" />
          </div>
          <div className="h-full animate-pulse duration-1000 ease-out flex-1 space-y-3">
            <div className="h-[14px]  bg-[#ccc] rounded-sm"></div>
            <div className="h-[14px] w-full flex space-x-3">
              <div className="w-[60%] h-full bg-[#ccc] rounded-sm"></div>
              <div className="w-[30%] h-full bg-[#ccc] rounded-sm"></div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div
            className="max-w-[580px] h-[400px] w-fit bg-white py-4 rounded-md shadow-md"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="px-6 pb-4 border-b h-[15%] border-gray-300 ">
              <div className="flex justify-between items-center">
                <div className="text-lg font-bold text-black font-lexend">
                  {t("favorite_modal.my_favorites")}
                </div>
                <button
                  className="bg-custom-gray text-black font-bold text-sm px-3 py-2 rounded-lg"
                  onClick={() => showModal(false)}
                >
                  {t("common.close")}
                </button>
              </div>
            </div>

            {/* Favorites List */}
            <div className="flex flex-wrap h-[85%] overflow-y-auto justify-center gap-4 p-6">
              {favorites.length > 0 ? (
                favorites.map((item) => (
                  <a
                    key={item.id}
                    className="relative w-[90px] h-[60px] rounded-md overflow-hidden bg-gray-100 z-10"
                    href={`/listing/${item.slug}`}
                    onClick={() => {
                      showModal(false);
                    }}
                  >
                    {/* Image */}
                    <img
                      src={item.preview_links?.thumb}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />

                    {/* Delete Button */}
                    <button
                      className="absolute top-0 right-0 bg-custom-gray text-black font-semibold text-sm p-1 rounded-md shadow-md z-20"
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        removeFavorite(item.id);
                      }}
                    >
                      <FaTrash className="h-3 w-3 " />
                    </button>
                  </a>
                ))
              ) : (
                <div className="text-center text-gray-500 w-full col-span-6">
                  {t("favorite_modal.no_favorites")}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default FavoritesModal;
