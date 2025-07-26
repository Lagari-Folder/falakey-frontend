import { NavLink } from "react-router-dom";
import { Author } from "@/models/author";
import { useTrans } from "@/utils/translation";

const MasonryProfileModal = ({
  user,
  handleShowProfile,
  handleShowModal,
}: {
  user: Author;
  handleShowProfile: (b: boolean) => void;
  handleShowModal: (b: boolean) => void;
}) => {
  const { t } = useTrans();

  return (
    <div className="absolute bottom-full -left-12 -right-12 min-w-[400px] max-w-[400px] mx-auto z-[9999] overflow-visible bg-transparent">
      <div className="flex flex-col items-start  gap-4 shadow-md bg-white rounded-md mx-2 my-4 px-4 py-5 relative">
        {/* Profile Info */}
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={user.avatar}
              alt={user.display_name}
              className="w-[60px] h-[60px] rounded-full object-cover"
            />
            <div>
              <p className="text-lg font-semibold text-black">
                {user.display_name}
              </p>
              <p className="text-sm text-gray-500">{user.username}</p>
            </div>
          </div>

          {user.available_for_hire && (
            <button
              className="h-[35px] px-4 bg-[#007fff] text-white text-sm rounded-lg hover:bg-[#0073ee] transition"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleShowModal(true);
                handleShowProfile(false);
              }}
            >
              {t("masonry.hire")}
            </button>
          )}
        </div>

        {/* Recent Posts */}
        <div className="flex gap-2 justify-between">
          {user.posts?.slice(0, 3).map((post, index) => (
            <img
              key={index}
              src={post.preview_links?.thumb}
              alt={post.title}
              className="w-[30%] aspect-square object-cover bg-gray-200 rounded-md"
            />
          ))}
        </div>

        {/* View Profile Button */}
        <NavLink
          to={`/author/${user.username}`}
          className="text-center w-full border border-gray-300 text-gray-500 text-sm py-2 rounded-md hover:bg-gray-100 transition"
        >
          {t("masonry.view_profile")}
        </NavLink>
      </div>
    </div>
  );
};

export default MasonryProfileModal;
