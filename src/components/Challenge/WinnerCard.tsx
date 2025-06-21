import { Post } from "@/models/post";
import { User } from "@/models/user";

const WinnerCard = ({
  user,
  post,
  rank,
}: {
  user: User;
  post: Post;
  rank: string;
}) => {
  return (
    <div className="winners h-[421px] sm:min-w-[450px] min-w-full  flex flex-col items-center ">
      <div className="w-full h-[300px] relative">
        <img
          src={post.preview_links?.thumb}
          alt="Winner"
          className="w-full h-full object-cover rounded-lg"
        />

        <div className="absolute bottom-0 left-[50%] -translate-x-1/2 translate-y-1/2 w-[100px] h-[100px] rounded-full overflow-hidden border-[3px] border-white">
          <img
            src={user.avatar}
            alt="Winner Profile"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="flex flex-col items-center mt-[60px]">
        <p className="text-[22px] font-bold">{user.display_name}</p>
        <p className="text-[#666] font-bold">{rank}</p>
      </div>
    </div>
  );
};

export default WinnerCard;
