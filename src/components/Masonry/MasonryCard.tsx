import { Post } from "@/models/post";
import { faArrowDown, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import AvailableForHire from "../Common/AvailableForHire";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import MasonryProfileModal from "./MasonryProfileModal";
import React, { useEffect, useRef, useState } from "react";
import MessageModal from "../MessageModal";
import { useTrans } from "@/utils/translation";
import { fireConfettiAtClickPosition } from "@/helper/favoriteConfetti";
import { FaHeart } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigateWithLocale } from "@/helper/navigateWithLocale";
import logo from "../../../public/star-icon.svg";

const MasonryCard = React.memo(
  ({
    data,
    handleClick,
    handleFavorite,
    handleAuthModal,
  }: {
    data: Post;
    handleClick: () => void;
    handleFavorite: (id: number) => Promise<boolean>;
    handleAuthModal: () => void;
  }) => {
    const [isFavorite, setIsFavorite] = useState(data.is_favorite ?? false);

    useEffect(() => {
      setIsFavorite(data.is_favorite ?? false);
    }, [data.is_favorite]);

    const navigate = useNavigateWithLocale();

    const [isModalOpen, setModalOpen] = useState(false);

    const [showProfileModal, setShowProfileModal] = useState(false);

    const { isLoggedIn } = useSelector((state: RootState) => state.auth);

    const videoRef = useRef<HTMLVideoElement | null>(null);

    const hoverTimeout = useRef<NodeJS.Timeout | null>(null);

    const handleVideoEnter = () => {
      hoverTimeout.current = setTimeout(() => {
        videoRef.current?.play();
      }, 150);
    };

    const handleVideoLeave = () => {
      // if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
      // videoRef.current?.pause();
      // videoRef.current!.currentTime = 0;
    };

    const { t } = useTrans();
    const { local } = useSelector((state: RootState) => state.translation);

    return (
      <>
        {isModalOpen && (
          <MessageModal
            peerId={data.author?.id}
            postId={data.id}
            showModal={setModalOpen}
          />
        )}
        <div className="w-full max-sm:my-2">
          <div
            className="relative w-full"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {data.author && (
              <a
                href={`/author/${data.author?.username}`}
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();

                  if (e.ctrlKey || e.metaKey) {
                    window.open(
                      `/${local}/author/${data.author?.username}`,
                      "_blank"
                    );
                  } else {
                    navigate("/author/" + data.author?.username);
                  }
                }}
                className="flex gap-2 items-center justify-start mb-3 xl:hidden relative"
              >
                {data.author ? (
                  <img
                    src={data.author.avatar}
                    alt={data.author.display_name}
                    className="rounded-full object-cover size-[37.5px] bg-primary"
                  />
                ) : (
                  <div className="rounded-full bg-primary text-white size-[37.5px] flex justify-center items-center">
                    <FontAwesomeIcon icon={faUser} />
                  </div>
                )}
                <div className="text-start">
                  <div className="text-md font-normal">
                    {data.author?.display_name}
                  </div>
                  <AvailableForHire
                    available={data?.author?.available_for_hire ?? false}
                    username={data?.author?.username}
                  />
                </div>
              </a>
            )}
            <a
              href={`/listing/${data.slug}`}
              target="_blank"
              className="relative rounded-3xl overflow-hidden"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                if (e.ctrlKey || e.metaKey) {
                  window.open(`/listing/${data.slug}`, "_blank");
                } else {
                  handleClick();
                }
              }}
            >
              {data.type == "video" ? (
                <div
                  className="rounded-xl overflow-hidden"
                  style={{
                    width: "100%",
                    minHeight: `${
                      data.aspect_ratio
                        ? 400 / data.aspect_ratio + "px"
                        : "250px"
                    }`,
                    height: `calc(100% / 0)`,
                    backgroundColor: data.dominant_color,
                  }}
                  onMouseEnter={(e) => {
                    const video = e.currentTarget.querySelector("video");
                    if (video) {
                      video.play();
                    }
                  }}
                  onMouseLeave={(e) => {
                    const video = e.currentTarget.querySelector("video");
                    if (video) {
                      video.pause();
                    }
                  }}
                >
                  <div className="absolute w-full h-full bg-black/35 rounded-xl flex items-center justify-center">
                    <PlayCircleOutlineIcon className="!text-6xl text-white" />
                  </div>

                  <video
                    style={{
                      width: "100%",
                      minHeight: `${
                        data.aspect_ratio
                          ? 400 / data.aspect_ratio + "px"
                          : "250px"
                      }`,
                      height: `250px`,
                      backgroundColor: data.dominant_color,
                    }}
                    muted
                    playsInline
                    ref={videoRef}
                    preload="metadata"
                    className={`w-full h-full object-cover cursor-pointer rounded-xl overflow-hidden`}
                  >
                    <source
                      style={{
                        width: "100%",
                        minHeight: `${
                          data.aspect_ratio
                            ? 400 / data.aspect_ratio + "px"
                            : "250px"
                        }`,
                        height: `calc(100% / 0)`,
                        backgroundColor: data.dominant_color,
                      }}
                      src={
                        data.preview_links?.thumb ??
                        data.preview_links?.sm ??
                        data.preview_links?.md
                      }
                      type=""
                    />
                  </video>
                </div>
              ) : (
                <img
                  src={data.preview_links?.sm ?? data.preview_links?.original}
                  alt={data.title}
                  className={`${
                    data.type == "icon" ? "p-3" : ""
                  } bg-opacity-30 rounded-xl object-cover cursor-pointer `}
                  loading="lazy"
                  style={{
                    width: "100%",
                    minHeight: `${
                      data.aspect_ratio
                        ? data.type == "photo"
                          ? 400 / data.aspect_ratio + "px"
                          : 200 / data.aspect_ratio + "px"
                        : "300px"
                    }`,
                    backgroundColor: data.dominant_color ?? "#ccc",
                  }}
                />
              )}
              {data.is_premium ? (
                <div className="absolute flex items-center gap-1.5 top-2 start-2 bg-primary/60 text-white px-2 py-1 rounded-md text-xs font-bold">
                  <img src={logo} className="size-[15px] object-cover" alt="" />
                  {t("post.premium")}
                </div>
              ) : null}
            </a>
            <div className="flex mt-1 justify-between items-center xl:hidden">
              <div
                className="lg:h-[50px] md:h-[45px] h-[40px]  cursor-pointer w-fit   bg-gray-50 px-2 py-2 border-gray-200 border text-gray-500 rounded-lg shadow-md flex gap-2 justify-start items-center"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();

                  if (!isLoggedIn) {
                    handleAuthModal();
                  } else {
                    handleFavorite(data.id).then((result) => {
                      if (result) {
                        if (!isFavorite)
                          fireConfettiAtClickPosition(e.clientX, e.clientY);
                        setIsFavorite(!isFavorite);
                      }
                    });
                  }
                }}
              >
                <motion.div
                  initial={isFavorite}
                  animate={
                    isFavorite
                      ? { scale: [1, 1.2, 0.85, 1], color: "#ef4444" }
                      : { scale: 1, color: "#9ca3af" }
                  }
                  transition={{ duration: 0.5 }}
                  className={`text-2xl`}
                >
                  <FaHeart />
                </motion.div>
                {data.favorites_count}
              </div>
              {data.is_download_locked ? (
                <div className="lg:h-[50px] md:h-[45px] h-[40px] max-w-[80px] w-full flex cursor-pointer px-2 gap-2 justify-between shadow-md rounded-md  items-center my-2 bg-gray-50 border-gray-200 border text-gray-500 ">
                  <div className="text-center lg:text-lg md:text-md text-sm  ">
                    {t("masonry.download")}
                  </div>
                  <FontAwesomeIcon icon={faLock} />
                </div>
              ) : (
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    if (e.ctrlKey || e.metaKey) {
                      window.open(`/listing/${data.slug}`, "_blank");
                    } else {
                      handleClick();
                    }
                  }}
                  className="lg:h-[50px] md:h-[45px] h-[40px] max-w-[80px] w-full flex cursor-pointer px-2 gap-2 justify-between shadow-md rounded-md  items-center my-2 bg-gray-50 border-gray-200 border text-gray-500 "
                >
                  <div className="text-center lg:text-lg md:text-md text-sm  ">
                    {t("masonry.download")}
                  </div>
                  <FontAwesomeIcon icon={faArrowDown} />
                </div>
              )}
            </div>
            <a
              href={`/listing/${data.slug}`}
              target="_blank"
              className={`${
                data.type != "video"
                  ? " bg-gradient-to-t from-black/75 to-[40%] to-transparent"
                  : ""
              } cursor-pointer absolute rounded-xl right-0 left-0 top-0 bottom-0 w-full h-full xl:hover:opacity-100 xl:hover:ease-in opacity-0 transition-opacity ease-out duration-200 xl:block hidden`}
              onMouseEnter={() => {
                handleVideoEnter();
              }}
              onMouseLeave={() => {
                handleVideoLeave();
              }}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                if (e.ctrlKey || e.metaKey) {
                  window.open(`/listing/${data.slug}`, "_blank");
                } else {
                  handleClick();
                }
              }}
            >
              <div className="flex flex-col justify-between h-full text-white py-3 px-4 z-20">
                <div className="flex justify-end items-center">
                  <div
                    className="flex gap-2 max-h-[40px] justify-start  items-center"
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();

                      if (!isLoggedIn) {
                        handleAuthModal();
                      } else {
                        handleFavorite(data.id).then((result) => {
                          if (result) {
                            if (!isFavorite)
                              fireConfettiAtClickPosition(e.clientX, e.clientY);
                            setIsFavorite(!isFavorite);
                          }
                        });
                      }
                    }}
                  >
                    <motion.div
                      initial={isFavorite}
                      animate={
                        isFavorite
                          ? { scale: [1, 1.2, 0.85, 1], color: "#ef4444" }
                          : { scale: 1, color: "#9ca3af" }
                      }
                      transition={{ duration: 0.5 }}
                      className={`text-2xl`}
                    >
                      <FaHeart />
                    </motion.div>
                    {data.favorites_count}
                  </div>
                </div>
                <div className="flex justify-between items-center mt-auto relative">
                  {data.author && (
                    <a
                      className="flex gap-2 items-center justify-center cursor-pointer"
                      onMouseEnter={() => {
                        setShowProfileModal(true);
                      }}
                      onMouseLeave={() => {
                        setShowProfileModal(false);
                      }}
                      href={`/author/${data.author?.username}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();

                        if (e.ctrlKey || e.metaKey) {
                          window.open(
                            `/author/${data.author?.username}`,
                            "_blank"
                          );
                        } else {
                          navigate("/author/" + data.author?.username);
                        }
                      }}
                    >
                      {showProfileModal && (
                        <MasonryProfileModal
                          handleShowProfile={(b: boolean) => {
                            setShowProfileModal(b);
                          }}
                          handleShowModal={(b: boolean) => {
                            setModalOpen(b);
                          }}
                          user={data.author}
                        />
                      )}

                      {data.author ? (
                        <img
                          src={data.author.avatar}
                          alt={data.author.display_name}
                          className="rounded-full object-cover size-[37.5px] bg-primary"
                        />
                      ) : (
                        <div className="rounded-full bg-primary text-white size-[37.5px] flex justify-center items-center">
                          <FontAwesomeIcon icon={faUser} />
                        </div>
                      )}

                      <div className="text-start">
                        <div className="text-md font-normal">
                          {data.author?.display_name}
                        </div>
                        <AvailableForHire
                          available={data?.author?.available_for_hire ?? false}
                          username={data?.author?.username}
                          gray
                        />
                      </div>
                    </a>
                  )}
                  {data.is_download_locked ? (
                    <div className="rounded-full bg-black/60 text-white size-[35px] flex justify-center items-center">
                      <FontAwesomeIcon icon={faLock} />
                    </div>
                  ) : (
                    <div className="rounded-full bg-black/60 text-white size-[35px] flex justify-center items-center">
                      <FontAwesomeIcon icon={faArrowDown} />
                    </div>
                  )}
                </div>
              </div>
            </a>
          </div>
        </div>
      </>
    );
  }
);

export default MasonryCard;
