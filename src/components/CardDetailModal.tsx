import ArticleIcon from "@mui/icons-material/Article";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import useWindowSize from "@/helper/windowSizing";
import MasonryLayout from "./Masonry/MasonryLayout";
import ImageIcon from "@mui/icons-material/Image";
import { toggleFavoritePost, useFetchPostDetail } from "@/helper/postHook";
import PageNotFound from "@/pages/PageNotFound";
import unkownProfile from "../../public/images/unkown-profile.png";
import GppGoodOutlinedIcon from "@mui/icons-material/GppGoodOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import AvailableForHire from "./Common/AvailableForHire";
import AuthenticationModal from "./Authentication/AuthenticationModal";
import { useTrans } from "@/utils/translation";
import { fireConfettiAtClickPosition } from "@/helper/favoriteConfetti";
import { motion } from "framer-motion";
import { FaHeart } from "react-icons/fa";
import ShareButton from "./PictureDetail/ShareButton";
import DownloadCard from "./PictureDetail/DownloadCard";
import { DownloadData } from "@/models/post";

export const CardDetailModal = ({
  slug,
  onCardClick,
  closeModalWithClick,
}: {
  slug: string;
  onCardClick: (s: string) => void;
  closeModalWithClick: () => void;
}) => {
  const { width } = useWindowSize();

  const [selectedQuality, setSelectedQuality] = useState<DownloadData>();

  const [columnSize, setCardSize] = useState(3);
  useEffect(() => {
    if (width >= 1250) {
      setCardSize(3);
    } else if (width <= 850) {
      setCardSize(1);
    } else {
      setCardSize(2);
    }
  }, [width]);

  const {
    data: fetchedPostDetail,
    loading: isLoading,
    error,
  } = useFetchPostDetail(slug);

  const [postDetail, setPostDetail] = useState(fetchedPostDetail);

  useEffect(() => {
    if (fetchedPostDetail) {
      setPostDetail(fetchedPostDetail);
      setSelectedQuality(fetchedPostDetail!.download_data![0]);
    }
  }, [fetchedPostDetail]);

  const { token } = useSelector((state: RootState) => state.auth);
  const { local } = useSelector((state: RootState) => state.translation);

  const handleFavorite = (e: any) => {
    toggleFavoritePost(postDetail!.id, token!).then((result) => {
      if (result) {
        setPostDetail((prevPostDetail) =>
          prevPostDetail && prevPostDetail.id === postDetail!.id
            ? {
                ...prevPostDetail,
                is_favorite: !prevPostDetail.is_favorite,
                favorites_count: prevPostDetail.is_favorite
                  ? prevPostDetail.favorites_count - 1
                  : prevPostDetail.favorites_count + 1,
              }
            : prevPostDetail
        );

        if (!postDetail?.is_favorite)
          fireConfettiAtClickPosition(e.clientX, e.clientY);
      }
    });
  };

  const Spinner = () => (
    <div className="flex justify-center items-center h-full">
      <div className="flex justify-center items-center">
        <ImageIcon fontSize="medium" className="text-gray-900 animate-pulse" />
      </div>
    </div>
  );

  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  const [openAuthModal, setOpenAuthModal] = useState(false);

  const { t } = useTrans();

  return (
    <>
      {openAuthModal && <AuthenticationModal modalHandler={setOpenAuthModal} />}

      <div
        className="back-border fixed inset-0 bg-black bg-opacity-95 flex justify-center items-center z-20 sm:p-10 sm:pr-7 sm:pl-7 "
        onClick={() => {
          closeModalWithClick();
        }}
      >
        <div
          className={`bg-white p-5 sm:rounded-lg shadow-lg my-5 ${
            isLoading ? "w-[200px] h-[150px]" : "w-[1320px]"
          } max-w-[768px]:w-11/12 sm:max-h-[90vh] max-h-[100vh] overflow-y-auto scrollbar-hide`}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {isLoading ? (
            <Spinner />
          ) : error ? (
            <PageNotFound />
          ) : (
            <div className="w-full max-h-[95dvh]">
              <div className="w-full flex justify-between items-center mb-6 flex-wrap	gap-[10px] max-[880px]:justify-start">
                <a
                  className="flex items-center justify-start gap-3 cursor-pointer"
                  href={`/author/@${fetchedPostDetail?.author?.username}`}
                >
                  {fetchedPostDetail?.author?.avatar ? (
                    <img
                      src={fetchedPostDetail?.author?.avatar}
                      alt={fetchedPostDetail.author.display_name}
                      className="rounded-full object-cover h-[38px] w-[38px]"
                    />
                  ) : (
                    <img
                      src={unkownProfile}
                      alt={fetchedPostDetail?.author?.display_name}
                      className="rounded-full object-cover h-[38px] w-[38px]"
                    />
                  )}
                  <div className="flex flex-col items-start justify-center">
                    <p className="sm:text-md text-sm">
                      {fetchedPostDetail?.author?.display_name}
                    </p>
                    <AvailableForHire
                      available={
                        fetchedPostDetail?.author?.available_for_hire ?? false
                      }
                      username={fetchedPostDetail?.author?.username}
                    />
                  </div>
                </a>
                <div className="flex sm:h-[45px] h-[40px] sm:gap-2 gap-1 flex-wrap justify-center">
                  <a
                    href={`/${local}/listing/${slug}`}
                    className="h-full flex  aspect-square bg-[hsla(0,0%,50%,0.2)] text-white rounded-md hover:bg-white transition duration-300 ease-in-out items-center justify-center"
                  >
                    <span className="flex items-center justify-center">
                      <ArticleIcon className="text-[#000000] !text-sm" />
                    </span>
                  </a>
                  <ShareButton post={postDetail!} />
                  <button
                    onClick={(e) => {
                      if (!isLoggedIn) {
                        setOpenAuthModal(true);
                      } else {
                        handleFavorite(e);
                      }
                    }}
                    className="h-full aspect-square px-2 bg-[hsla(0,0%,50%,0.2)] text-[16px] text-[#aab8c2] rounded-md  transition duration-300 ease-in-out flex gap-1 items-center justify-center"
                  >
                    <motion.div
                      initial={postDetail?.is_favorite}
                      animate={
                        postDetail?.is_favorite
                          ? { scale: [1, 1.2, 0.85, 1], color: "#ef4444" }
                          : { scale: 1, color: "#9ca3af" }
                      }
                      transition={{ duration: 0.5 }}
                      className={`text-2xl`}
                    >
                      <FaHeart />
                    </motion.div>
                    <span className="text-black">
                      {postDetail?.favorites_count}
                    </span>
                  </button>

                  <button
                    onClick={closeModalWithClick}
                    className="sm:flex   hidden sm:h-[45px] h-[30px] aspect-square px-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-white transition duration-300 ease-in-out  items-center justify-center"
                  >
                    <CloseIcon className="!text-[16px] text-[#000000]" />
                  </button>
                </div>
              </div>

              {/* Main content with image */}

              <div className="flex flex-col w-full lg:flex-row items-start gap-10 justify-center">
                <div className="w-full flex flex-col items-center flex-1">
                  {fetchedPostDetail?.type === "video" ? (
                    <video
                      controls
                      className="rounded-md w-full object-cover max-h-[500px]"
                      style={{
                        aspectRatio: `${fetchedPostDetail?.aspect_ratio || 1}`,
                        maxWidth: `${
                          (fetchedPostDetail?.aspect_ratio || 1) * 500
                        }px`,
                      }}
                    >
                      <source
                        src={
                          fetchedPostDetail.preview_links?.original ??
                          fetchedPostDetail.preview_links?.md
                        }
                      />
                    </video>
                  ) : (
                    <img
                      className="rounded-md sm:w-full w-[95%] object-cover 
                    max-h-[500px]"
                      style={{
                        aspectRatio: `${fetchedPostDetail?.aspect_ratio || 1}`,
                        maxWidth: `${
                          (fetchedPostDetail?.aspect_ratio || 1) * 500
                        }px`,
                      }}
                      src={
                        fetchedPostDetail?.preview_links?.sm_watermarked ??
                        fetchedPostDetail?.preview_links?.sm
                      }
                      alt={fetchedPostDetail?.title}
                    />
                  )}
                </div>

                <DownloadCard
                  post={fetchedPostDetail!}
                  selected={selectedQuality}
                  setSelected={(s: DownloadData | undefined) =>
                    setSelectedQuality(s!)
                  }
                />
              </div>

              <h1 className="mt-4 font-semibold text-lg">
                {postDetail?.title}
              </h1>

              {/* Bottom part with view/download counts */}
              <div className="mt-4 flex gap-24 w-full text-gray-400 mx-3">
                <div className="flex flex-col">
                  <p className="text-lg">{t("post.views")}</p>
                  <p className="text-[#000000] font-semibold">
                    {postDetail?.views_count}
                  </p>
                </div>
                <div className="flex flex-col">
                  <p className="text-lg ">{t("post.downloads")}</p>
                  <p className="font-semibold text-[#000000]">
                    {" "}
                    {postDetail?.downloads_count}
                  </p>
                </div>
              </div>

              <div className="mt-4 mx-3 space-y-2 !text-sm !text-gray-400">
                {postDetail?.location && (
                  <p
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(
                        `https://www.google.com/maps?q=${postDetail.location_lat!},${
                          postDetail.location_lng
                        }`,
                        "_blank"
                      );
                    }}
                    className="flex items-center font-semibold gap-1 cursor-pointer"
                  >
                    <LocationOnOutlinedIcon fontSize="small" />
                    {postDetail?.location}
                  </p>
                )}
                {postDetail?.created_at && (
                  <p className="flex items-center font-semibold gap-1">
                    <CalendarTodayOutlinedIcon fontSize="small" />
                    {postDetail.created_at}
                  </p>
                )}
                <p className="flex items-center font-semibold gap-1">
                  <GppGoodOutlinedIcon fontSize="small" />
                  {postDetail?.is_premium
                    ? t("post.premium_content")
                    : t("post.free_to_use")}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 md:justify-start justify-center my-5 mx-3">
                {postDetail?.tags?.map((tag, index) => (
                  <a
                    key={index}
                    className="text-md bg-custom-light-gray text-gray-500 py-0 px-2 rounded-md cursor-pointer"
                    href={`/explore/?tags=${tag.key}`}
                  >
                    {tag.name}
                  </a>
                ))}
              </div>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <MasonryLayout
                  title=""
                  columnCount={columnSize}
                  stringFiltering={`related=${slug}`}
                  handleOpenCard={onCardClick}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CardDetailModal;
