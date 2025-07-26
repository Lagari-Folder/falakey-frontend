import { useEffect, useState } from "react";
import user_def from "../../../public/icons/user-def.svg";
import MessageModal from "../MessageModal";
import { User } from "@/models/user";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-regular-svg-icons";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import AuthenticationModal from "../Authentication/AuthenticationModal";
import { useTrans } from "@/utils/translation";
import { apiRequest } from "@/utils/apiRequest";

const AuthorHeader = ({
  author,
  loading,
}: {
  author?: User;
  loading: boolean;
}) => {
  const [isMessageModalOpen, setMessageModalOpen] = useState(false);
  // const [followersCount, setFollowersCount] = useState(0);
  const [isFollowed, setIsFollowed] = useState(false);
  const [followLoading, setFollowLoading] = useState(false); // ✅ Follow button loading state

  const { user, isLoggedIn, token } = useSelector(
    (state: RootState) => state.auth
  );
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const { t } = useTrans();

  useEffect(() => {
    setIsFollowed(author?.is_followed ?? false);
  }, [author?.followers_count, author?.is_followed]);

  const handleToggleFollow = async () => {
    if (!isLoggedIn) {
      setOpenAuthModal(true);
    } else {
      setFollowLoading(true);
      const result = await apiRequest({
        method: "POST",
        url: "users/toggle-follow",
        data: {
          username: author?.username,
        },
        token: token!,
      });

      if (result.success) {
        setIsFollowed(!isFollowed);
        // setFollowersCount((prev) => (isFollowed ? prev - 1 : prev + 1));
      }

      setFollowLoading(false);
    }
  };

  const handleShowMessageModal = () => {
    if (!isLoggedIn) {
      setOpenAuthModal(true);
    } else {
      setMessageModalOpen(true);
    }
  };

  const LoadingSkeleton = () => (
    <div className="max-w-[800px] w-full h-auto rounded-lg p-6 flex flex-col items-center relative mb-6">
      <div className="sm:flex flex sm:flex-row flex-col justify-center gap-6 items-center w-full">
        <div className="flex flex-col items-center">
          <div className="w-[160px] h-[160px] bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
            <div className="w-full h-full bg-gray-400"></div>
          </div>
        </div>
        <div className="flex flex-col w-full items-start h-full md:items-start">
          <div className="flex flex-row items-center w-full">
            <div className="w-[50%] h-[20px] bg-gray-300 mb-2 rounded"></div>
          </div>
          <div className="text-sm font-medium mt-4 text-center md:text-left w-full text-gray-500">
            <div className="w-full h-[14px] bg-gray-300 mb-2 rounded"></div>
            <div className="w-[90%] h-[14px] bg-gray-300 mb-2 rounded"></div>
          </div>
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
      <div className="max-w-screen-size w-full h-auto flex flex-col items-center relative mb-6 bg-white">
        {isMessageModalOpen && (
          <MessageModal
            peerId={author?.id}
            postId={undefined}
            showModal={setMessageModalOpen}
          />
        )}

        <div className="px-2 flex sm:flex-row flex-col sm:justify-center justify-start sm:gap-12 gap-6 items-start max-w-[800px] w-full">
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

          <div className="flex flex-col gap-6 items-start max-w-[500px] h-full md:items-start">
            <div className="flex flex-row flex-wrap items-center gap-2 ">
              <h5 className="font-semibold text-4xl font-lexend text-black mr-3">
                {author?.display_name || t("author.anonymous")}
              </h5>

              {author?.available_for_hire === true && (
                <button
                  className="flex items-center h-[35px] bg-[#007fff] text-white font-normal text-xs border border-[#DDDDDD] rounded-lg px-3 hover:bg-[#0073ee]"
                  onClick={handleShowMessageModal}
                >
                  {t("author.hire_button")}
                </button>
              )}

              {author?.id !== user?.id && (
                <>
                  <button
                    className="flex items-center h-[35px] bg-white text-gray-500 font-medium border border-[#DDDDDD] rounded-lg px-3 hover:bg-[#f1f1f1]"
                    onClick={handleShowMessageModal}
                  >
                    <FontAwesomeIcon icon={faComments} />
                  </button>

                  <button
                    className="text-sm text-white h-[35px] bg-primary/90 hover:bg-primary/80 px-3 py-1 rounded-md font-medium flex items-center justify-center min-w-[100px]"
                    onClick={handleToggleFollow}
                    disabled={followLoading}
                  >
                    {followLoading ? (
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    ) : isFollowed ? (
                      t("author.unfollow")
                    ) : (
                      t("author.follow")
                    )}
                  </button>
                </>
              )}
            </div>

            {author?.bio && (
              <div className="text-sm text-center md:text-start w-full text-gray-600">
                {author?.bio}
              </div>
            )}
            <div className="flex gap-2">

            {(author?.social_media ?? []).map((link) => (
              <a
              key={link.platform}
              href={link.value}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 text-2xl hover:text-[#44175b] transition"
              >
                <i className={`fa-brands fa-${link.platform.toLowerCase()}`} />
              </a>
            ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthorHeader;
