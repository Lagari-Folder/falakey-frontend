import { useEffect, useState } from "react";
import user_def from "../../../public/icons/user-def.svg";
import MessageModal from "../MessageModal";
// import FollowersModal from "@/components/Author/FollowersModal"; // Assuming you create this component
// import FollowingModal from "@/components/Author/FollowingModal"; // Assuming you create this component
import { User } from "@/models/user";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faLinkedin,
  faPinterestP,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faComments } from "@fortawesome/free-regular-svg-icons";
import { faCaretDown, faLink } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { toggleFollow } from "@/helper/userHook";
import AuthenticationModal from "../Authentication/AuthenticationModal";
import { useTrans } from "@/utils/translation";

const AuthorHeader = ({
  author,
  loading,
}: {
  author?: User;
  loading: boolean;
}) => {
  const [showUrls, setShowUrls] = useState(false);
  const [isMessageModalOpen, setMessageModalOpen] = useState(false);
  // const [isFollowersModalOpen, setFollowersModalOpen] = useState(false);
  // const [followersList, setFollowersList] = useState<User[]>();
  // const [isFollowingModalOpen, setFollowingModalOpen] = useState(false);
  // const [followingList, setFollowingList] = useState<User[]>();

  const [followersCount, setFollowersCount] = useState(0);
  const [isFollowed, setIsFollowed] = useState(false);

  const { user, isLoggedIn, token } = useSelector(
    (state: RootState) => state.auth
  );
  const [openAuthModal, setOpenAuthModal] = useState(false);

  useEffect(() => {
    setFollowersCount(author?.followers_count ?? 0);
    setIsFollowed(author?.is_followed ?? false);
  }, [author?.followers_count, author?.is_followed]);

  const handleToggleFollow = async () => {
    if (!isLoggedIn) {
      setOpenAuthModal(true);
    } else {
      await toggleFollow(author?.username ?? "", token!).then((result) => {
        if (result[0]) {
          if (isFollowed) {
            setFollowersCount(followersCount - 1);
          } else {
            setFollowersCount(followersCount + 1);
          }
          setIsFollowed(!isFollowed);
        }
      });
    }
  };

  const handleShowMessageModal = () => {
    if (!isLoggedIn) {
      setOpenAuthModal(true);
    } else {
      setMessageModalOpen(true);
    }
  };

  const { t } = useTrans();

  // const handleShowFollowersModal = async () => {
  //   await getFollowers(author?.username ?? "").then((result) => {
  //     if (result[0]) {
  //       setFollowersList(result[1]);
  //       setFollowersModalOpen(true);
  //     }
  //   });
  // };

  // const handleShowFollowingModal = async () => {
  //   await getFollowing(author?.username ?? "").then((result) => {
  //     if (result[0]) {
  //       setFollowingList(result[1]);
  //       setFollowingModalOpen(true);
  //     }
  //   });
  // };

  // Loading skeleton structure
  const LoadingSkeleton = () => (
    <div className="max-w-[800px] w-full h-auto rounded-lg p-6 flex flex-col items-center relative mb-6">
      <div className="sm:flex flex sm:flex-row flex-col justify-center gap-6 items-center w-full">
        {/* Profile Picture Skeleton */}
        <div className="flex flex-col items-center">
          <div className="w-[160px] h-[160px] bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
            <div className="w-full h-full bg-gray-400"></div>
          </div>
        </div>

        {/* Author Details Skeleton */}
        <div className="flex flex-col w-full items-start h-full md:items-start">
          <div className="flex flex-row items-center w-full">
            <div className="w-[50%] h-[20px] bg-gray-300 mb-2 rounded"></div>
          </div>
          {/* Bio Skeleton */}
          <div className="text-sm font-medium mt-4 text-center md:text-left w-full text-gray-500">
            <div className="w-full h-[14px] bg-gray-300 mb-2 rounded"></div>
            <div className="w-[90%] h-[14px] bg-gray-300 mb-2 rounded"></div>
          </div>

          {/* Social Media Skeleton */}
          <div className="mt-4 w-full relative">
            <div className="w-[40%] h-[14px] bg-gray-300 mb-2 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );

  return loading ? (
    <LoadingSkeleton />
  ) : (
    <>
      {openAuthModal && <AuthenticationModal modalHandler={setOpenAuthModal} />}
      <div
        className={`max-w-screen-size w-full h-auto flex flex-col items-center relative mb-6 bg-white`}
      >
        {isMessageModalOpen && (
          <MessageModal
            peerId={author?.id}
            postId={undefined}
            showModal={setMessageModalOpen}
          />
        )}

        {/* {isFollowersModalOpen && (
          <FollowersModal
            followers={followersList ?? []}
            showModal={setFollowersModalOpen}
          />
        )}

        {isFollowingModalOpen && (
          <FollowingModal
            following={followingList ?? []}
            showModal={setFollowingModalOpen}
          />
        )} */}

        {/* Centered Content */}
        <div className="px-2 flex sm:flex-row flex-col sm:justify-center justify-start sm:gap-12 gap-6 items-start max-w-[800px] w-full">
          {/* Profile Picture */}
          <div className="flex flex-col items-center">
            <div className="w-[160px] h-[160px] bg-white rounded-full flex items-center justify-center overflow-hidden">
              <img
                src={author?.avatar || user_def}
                alt={`${author?.username || t("author.default")}${t(
                  "author.profile_tag"
                )}`}
                className={`object-cover ${
                  author?.avatar ? "w-full h-full" : "w-[20px] h-[auto]"
                }`}
              />
            </div>
          </div>

          {/* Author Details */}
          <div className="flex flex-col gap-6 items-start max-w-[500px] h-full md:items-start">
            <div className="flex flex-row flex-wrap items-center gap-2 ">
              <h5
                className={`font-semibold text-4xl font-lexend text-black mr-3`}
              >
                {author?.display_name || t("author.anonymous")}
              </h5>
              {author?.available_for_hire === true && (
                <button
                  className="flex items-center h-[35px] bg-[#007fff] text-white font-normal text-xs border border-1 border-[#DDDDDD] rounded-lg px-3 hover:bg-[#0073ee]"
                  onClick={handleShowMessageModal}
                >
                  {t("author.hire_button")}
                </button>
              )}
              {author?.id !== user?.id && (
                <button
                  className="flex items-center h-[35px] bg-white text-gray-500 font-medium border border-1 border-[#DDDDDD] rounded-lg px-3 hover:bg-[#f1f1f1]"
                  onClick={handleShowMessageModal}
                >
                  <FontAwesomeIcon icon={faComments} />
                </button>
              )}
              {/* Follow Button */}
              {author?.id !== user?.id && (
                <button
                  className="text-sm text-white h-[35px] bg-primary/90 hover:bg-primary/80 px-3 py-1 rounded-md font-medium"
                  onClick={handleToggleFollow}
                >
                  {isFollowed ? t("author.unfollow") : t("author.follow")}
                </button>
              )}
              {/* Followers Button */}
            </div>

            {/* <div className="flex gap-3 items-center">
              <button
                className="  text-gray-600 hover:text-black/90"
                onClick={handleShowFollowersModal}
              >
                <b>{followersCount ?? 0}</b> Followers
              </button>

              <button
                className=" text-gray-600 hover:text-black/90"
                onClick={handleShowFollowingModal}
              >
                <b>{author?.following_count ?? 0}</b> Following
              </button>
            </div> */}

            {author?.bio && (
              <div
                className={`text-sm text-center md:text-start w-full text-gray-600`}
              >
                {author?.bio}
              </div>
            )}

            {/* Conditionally show Social Media Dropdown */}
            {(author?.social_media ?? []).length > 0 && (
              <div className="relative">
                <button
                  onClick={() => setShowUrls((prev) => !prev)}
                  className="text-gray-400 text-sm flex items-center justify-center gap-2"
                >
                  <FontAwesomeIcon icon={faLink} />
                  <span>
                    {t("author.connect")}{" "}
                    {author?.display_name || t("author.anonymous")}
                  </span>
                  <FontAwesomeIcon icon={faCaretDown} />
                </button>

                <div
                  style={{
                    transition: "all 0.3s",
                    transform: showUrls ? "scale(1)" : "scale(0.95)",
                    opacity: showUrls ? 1 : 0,
                    pointerEvents: showUrls ? "auto" : "none",
                  }}
                  className="mt-2 bg-[#eee] pt-3 px-5 pb-1 w-[300px] rounded-lg font-lexend font-bold shadow-md md:w-72 z-10 absolute"
                >
                  {(author?.social_media ?? []).map((link) => (
                    <a
                      key={link.platform}
                      href={link.value}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 mb-2 ml-0 mt-0 hover:text-[#44175b]"
                    >
                      {link.platform == "facebook" ? (
                        <FontAwesomeIcon icon={faFacebookF} />
                      ) : link.platform == "twitter" ? (
                        <FontAwesomeIcon icon={faTwitter} />
                      ) : link.platform == "pinterest" ? (
                        <FontAwesomeIcon icon={faPinterestP} />
                      ) : (
                        <FontAwesomeIcon icon={faLinkedin} />
                      )}

                      <span className="text-[16px]">{link.platform}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthorHeader;
