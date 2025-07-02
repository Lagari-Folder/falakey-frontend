import PictureDetailHeader from "@/components/PictureDetail/PictureDetailHeader";
import ProfileCard from "@/components/ProfileCard";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MessageModal from "@/components/MessageModal";
import { toggleFavoritePost, useFetchPostDetail } from "@/helper/postHook";
import PageNotFound from "./PageNotFound";
import { ImageIcon } from "@radix-ui/react-icons";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import SEO from "@/components/Common/SEO";
import { useTrans } from "@/utils/translation";
import AuthenticationModal from "@/components/Authentication/AuthenticationModal";
import { fireConfettiAtClickPosition } from "@/helper/favoriteConfetti";
import MasonryWrapper from "@/components/Masonry/MasonryWrapper";

const PictureDetail = () => {
  const { picture } = useParams();
  const [showMessageModal, setShowMessageModal] = useState(false);
  const {
    data: postDetail,
    loading: isLoading,
    error,
  } = useFetchPostDetail(picture!);

  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteCount, setFavoriteCount] = useState(0);

  useEffect(() => {
    if (postDetail) {
      setIsFavorite(postDetail!.is_favorite ?? false);
      setFavoriteCount(postDetail!.favorites_count ?? 0);
    }
  }, [postDetail]);

  useEffect(() => {
    if (showMessageModal) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [showMessageModal]);

  const { token } = useSelector((state: RootState) => state.auth);

  const handleFavorite = (e: any) => {
    toggleFavoritePost(postDetail!.id, token!).then((result) => {
      if (result) {
        setIsFavorite((prevData) => !prevData);
        setFavoriteCount((prevData) =>
          isFavorite ? prevData - 1 : prevData + 1
        );
        if (!isFavorite) fireConfettiAtClickPosition(e.clientX, e.clientY);
      }
    });
  };

  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  const [openAuthModal, setOpenAuthModal] = useState(false);

  const { t } = useTrans();

  const Spinner = () => (
    <div className="flex justify-center items-center h-[50vh]">
      <div className="flex justify-center items-center">
        <ImageIcon
          className="text-gray-900 animate-pulse size-[100px]" // Fading animation
        />
      </div>
    </div>
  );

  return (
    <>
      <SEO
        title={`Post | ${postDetail?.title || picture}`}
        description=""
        type="article"
        name="Falakey"
      />

      {openAuthModal && <AuthenticationModal modalHandler={setOpenAuthModal} />}

      <div className=" flex justify-center w-full my-4">
        {showMessageModal && (
          <MessageModal
            showModal={(b: boolean) => setShowMessageModal(b)}
            peerId={postDetail?.author?.id}
            postId={postDetail?.id}
          />
        )}
        {isLoading ? (
          <Spinner />
        ) : error ? (
          <PageNotFound />
        ) : (
          <div className="w-size space-y-6">
            <PictureDetailHeader
            
              post={postDetail!}
              favoriteCount={favoriteCount}
              isFavorite={isFavorite}
              toggleFavorite={(e: any) => {
                if (!isLoggedIn) {
                  setOpenAuthModal(true);
                } else {
                  handleFavorite(e);
                }
              }}
              
            />
            {postDetail?.type == "video" ? (
              <video
                controls
                className="max-h-[75vh] rounded-md max-lg:w-[98%] m-auto object-cover"
              >
                <source src={postDetail.preview_links?.original} type="" />
              </video>
            ) : (
              <img
                className="max-h-[75vh] rounded-md max-lg:w-[98%] m-auto object-cover"
                src={postDetail?.preview_links?.md}
                alt={postDetail?.title}
              />
            )}
            <div className="my-4 mx-3 font-semibold text-lg">
              {postDetail?.title}
            </div>
            <div className="md:justify-between justify-center mx-3 md:flex grid grid-cols-1">
              <div className="space-y-5 flex-1">
                <div className="w-full flex gap-24 justify-start text-gray-400">
                  <div>
                    <div className="text-lg">{t("post.views")}</div>
                    <div className="text-[#000000] font-semibold">
                      {" "}
                      {postDetail?.views_count}
                    </div>
                  </div>
                  <div>
                    <div className="text-lg ">{t("post.downloads")}</div>
                    <div className="text-[#000000] font-semibold">
                      {" "}
                      {postDetail?.downloads_count}
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-4 justify-start ">
                  {postDetail?.tags?.map((tag, index) => (
                    <a
                      key={index}
                      href={`/explore/?tags=${tag.key}`}
                      className="text-md bg-custom-light-gray py-0 px-2 rounded-md cursor-pointer"
                    >
                      {tag.name}
                    </a>
                  ))}
                </div>
              </div>
              <div className="flex flex-col items-center md:m-0  mt-3">
                <ProfileCard
                  author={postDetail?.author}
                  authorUsername={postDetail?.author?.username ?? ""}
                  description={postDetail?.author?.bio ?? ""}
                  showMessageModalHandler={() => {
                    setShowMessageModal(true);
                  }}
                />
                {/*
                // TODO: DO THIS WLE 
                <div
                  className="text-center my-4 cursor-pointer"
                  onClick={() => {}}
                >
                  <FontAwesomeIcon
                    icon={faCircleExclamation}
                    className="mr-2"
                  />
                  Report this listing
                </div> */}
              </div>
            </div>
            <div className="w-full bg-white flex flex-col items-center">
              <MasonryWrapper title="Related" screenWidth="w-[95%]" />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PictureDetail;
