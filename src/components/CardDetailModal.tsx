import ArticleIcon from "@mui/icons-material/Article";
import DownloadingIcon from "@mui/icons-material/Downloading";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import { socialMdeiaShare } from "@/lib/data";
import useWindowSize from "@/helper/windowSizing";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MasonryLayout from "./Masonry/MasonryLayout";
import ImageIcon from "@mui/icons-material/Image";
import { toggleFavoritePost, useFetchPostDetail } from "@/helper/postHook";
import PageNotFound from "@/pages/PageNotFound";
import share_post from "@/helper/shareFunction";
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
import StarIcon from "@mui/icons-material/Star";
import { faLock } from "@fortawesome/free-solid-svg-icons";

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
  const [showDownload, setShowDownload] = useState(false);
  const [showShare, setshowShare] = useState(false);
  const {
    data: fetchedPostDetail,
    loading: isLoading,
    error,
  } = useFetchPostDetail(slug);

  const [postDetail, setPostDetail] = useState(fetchedPostDetail);

  useEffect(() => {
    setPostDetail(fetchedPostDetail);
  }, [fetchedPostDetail]);

  const { token } = useSelector((state: RootState) => state.auth);

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
                  href={`/author/${postDetail?.author?.username}`}
                >
                  {postDetail?.author?.avatar ? (
                    <img
                      src={postDetail?.author?.avatar}
                      alt={postDetail.author.display_name}
                      className="rounded-full object-cover h-[38px] w-[38px]"
                    />
                  ) : (
                    <img
                      src={unkownProfile}
                      alt={postDetail?.author?.display_name}
                      className="rounded-full object-cover h-[38px] w-[38px]"
                    />
                  )}
                  <div className="flex flex-col items-start justify-center">
                    <p className="sm:text-md text-sm">
                      {postDetail?.author?.display_name}
                    </p>
                    <AvailableForHire
                      available={
                        postDetail?.author?.available_for_hire ?? false
                      }
                      username={postDetail?.author?.username}
                    />
                  </div>
                </a>
                <div className="flex sm:gap-2 gap-1 flex-wrap justify-center">
                  <a
                    href={`/listing/${slug}`}
                    className="sm:h-[45px] flex h-[30px] aspect-square bg-[hsla(0,0%,50%,0.2)] text-white rounded-md hover:bg-white transition duration-300 ease-in-out items-center justify-center"
                  >
                    <span className="flex items-center justify-center">
                      <ArticleIcon className="text-[#000000] !text-sm" />
                    </span>
                  </a>
                  <div className="relative">
                    <button
                      onClick={() => {
                        setshowShare(!showShare);
                        setShowDownload(false);
                      }}
                      className="sm:h-[45px] h-[30px] aspect-square px-2 bg-[hsla(0,0%,50%,0.2)] text-black-700 rounded-md hover:bg-white transition duration-300 ease-in-out items-center justify-center"
                    >
                      {t("post.share")}
                    </button>
                    {showShare && (
                      <div className="absolute  mt-2 bg-[#eee] rounded-lg shadow-lg w-72 z-10">
                        <ul className="text-[#000]  pt-5 pb-5">
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
                                    `${window.location.origin}/listing/${slug}`
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
                  <button
                    onClick={(e) => {
                      if (!isLoggedIn) {
                        setOpenAuthModal(true);
                      } else {
                        handleFavorite(e);
                      }
                    }}
                    className="sm:h-[45px] h-[30px] aspect-square px-2 bg-[hsla(0,0%,50%,0.2)] text-[16px] text-[#aab8c2] rounded-md  transition duration-300 ease-in-out flex gap-1 items-center justify-center"
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
                  {postDetail?.is_download_locked ? (
                    <button
                      disabled
                      className="sm:h-[45px] h-[30px] aspect-square px-2 gap-2 flex bg-[#b17ece]/50 text-white rounded-md items-center justify-center"
                    >
                      <p className="sm:block hidden">{t("post.download")}</p>
                      <span className="flex items-center justify-center">
                        <FontAwesomeIcon icon={faLock} />
                      </span>
                    </button>
                  ) : postDetail?.is_premium ? (
                    <button
                      onClick={() => {
                        // Handle premium purchase logic
                      }}
                      className="sm:h-[45px] h-[30px] px-2 gap-2 flex bg-yellow-500 text-white rounded-md items-center justify-center"
                    >
                      <StarIcon fontSize="small" />
                      <p className="sm:block hidden">{t("post.premium")}</p>
                    </button>
                  ) : (
                    <div className="relative">
                      <button
                        onClick={() => {
                          setshowShare(false);
                          setShowDownload(!showDownload);
                        }}
                        className="sm:h-[45px] h-[30px] aspect-square px-2 gap-2 flex bg-[#b17ece] text-white rounded-md items-center justify-center"
                      >
                        <p className="sm:block hidden">{t("post.download")}</p>
                        <span className="flex items-center justify-center">
                          <DownloadingIcon fontSize="small" />
                        </span>
                      </button>

                      {showDownload && (
                        <div className="absolute top-full mt-2 bg-[#eee] rounded-lg shadow-lg w-72 z-10 max-lg:-start-[300%] end-0">
                          <ul className="text-[#000]  pt-5 pb-5">
                            {postDetail?.download_data?.map(
                              (download, index) => (
                                <li key={index}>
                                  <a
                                    className="text-[16px] w-full flex items-baseline gap-4 px-8 py-2 text-left font-bold text-[#000] rounded-md hover:text-[#44175b]  transition-colors"
                                    href={download.link}
                                    target="_self"
                                  >
                                    <div className="flex items-center gap-1">
                                      <div>{download.label}</div>
                                      <span className="text-[11px]">
                                        ({download.extension})
                                      </span>
                                    </div>
                                    <span
                                      className="text-[13px]  font-normal"
                                      dir="ltr"
                                    >
                                      {download.dimensions}
                                    </span>
                                  </a>
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}

                  <button
                    onClick={closeModalWithClick}
                    className="sm:flex   hidden sm:h-[45px] h-[30px] aspect-square px-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-white transition duration-300 ease-in-out  items-center justify-center"
                  >
                    <CloseIcon className="!text-[16px] text-[#000000]" />
                  </button>
                </div>
              </div>

              {/* Main content with image */}
              <div className="flex justify-center items-center relative">
                {postDetail?.type == "video" ? (
                  <video
                    controls
                    className="max-h-[65vh] rounded-md m-auto object-cover"
                    style={{
                      backgroundColor: postDetail?.dominant_color,
                    }}
                  >
                    <source src={postDetail.preview_links?.original} />
                  </video>
                ) : (
                  <img
                    className="max-h-[65vh] rounded-md m-auto object-cover"
                    src={
                      postDetail?.preview_links?.md ??
                      postDetail?.preview_links?.original
                    }
                    alt={postDetail?.title}
                    style={{
                      backgroundColor: postDetail?.dominant_color,
                    }}
                  />
                )}
              </div>

              <div className="mt-4 font-semibold text-lg">
                {postDetail?.title}
              </div>

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
