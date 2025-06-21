import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { User } from "@/models/user";
import { useTrans } from "@/utils/translation";

interface FollowingModalProps {
  following: User[];
  showModal: (open: boolean) => void;
}

const FollowingModal = ({ following, showModal }: FollowingModalProps) => {
  const handleClose = () => {
    showModal(false);
  };

  const { t } = useTrans();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg w-[400px] max-h-[80vh] overflow-y-auto shadow-lg">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">
            {t("author.following")}
          </h3>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FontAwesomeIcon icon={faXmark} size="lg" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4">
          {following.length > 0 ? (
            following.map((followedUser) => (
              <div
                key={followedUser.id}
                className="flex items-center gap-3 mb-4"
              >
                <img
                  src={followedUser.avatar || "/icons/user-def.svg"}
                  alt={`${followedUser.username}'s profile`}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium text-gray-800">
                    {followedUser.username}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-center">
              {t("author.no_followings")}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FollowingModal;
