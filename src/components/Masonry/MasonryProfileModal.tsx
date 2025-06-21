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
    <>
      <div className="absolute  bottom-full -left-12 -right-12 min-w-[400px] max-w-[400px] mx-auto z-[9999px] bg-transparent">
        <div className=" flex-col flex gap-3 shadow-md bg-white rounded-md mx-2 my-4 px-2 py-4 relative">
          {/* <div className="absolute top-[99%] left-1 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[12px] border-t-white"></div> */}
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <img
                src={user.avatar}
                className="size-[60px] object-cover rounded-full"
                alt={user.display_name}
              />
              <div className="flex flex-col">
                <div className="text-black text-lg font-semibold">
                  {user.display_name}
                </div>
                <div className="text-gray-500 text-sm">{user.username}</div>
              </div>
            </div>
            {user?.available_for_hire && (
              <button
                className="flex items-center h-[35px] bg-[#007fff] text-white font-normal text-md rounded-lg px-3  hover:bg-[#0073ee] "
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
          <div className="flex justify-evenly w-full">
            {user.posts?.map((post, index) => (
              <img
                key={index}
                className="w-[30%]  aspect-square bg-gray-200 object-cover rounded-md"
                src={post.preview_links?.thumb}
                alt={post.title}
              />
            ))}
          </div>
          <NavLink
            to={`/author/${user.username}`}
            className="w-full rounded-md text-center text-md py-1 text-gray-400 border-2 border-gray-300"
          >
            {t("masonry.view_profile")}
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default MasonryProfileModal;
