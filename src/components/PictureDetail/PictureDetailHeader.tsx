import { useEffect, useState } from "react";
import unkownProfile from "../../../public/images/unkown-profile.png";
import AvailableForHire from "../Common/AvailableForHire";
import { motion } from "framer-motion";
import { FaHeart } from "react-icons/fa";
import { Post } from "@/models/post";
import ShareButton from "./ShareButton";

const PictureDetailHeader = ({
  favoriteCount,
  isFavorite,
  toggleFavorite,

  post,
}: {
  favoriteCount: number;
  isFavorite: boolean;
  toggleFavorite: (e: any) => void;
  post: Post;
}) => {
  const [favoriteHeart, setFavoriteHeart] = useState(isFavorite);

  useEffect(() => {
    setFavoriteHeart(isFavorite);
  }, [isFavorite]);

  return (
    <div className="flex justify-between items-start w-[95%] m-auto  gap-6 flex-wrap ">
      <a
        href={`/author/@${post.author?.username}`}
        className="flex cursor-pointer items-center justify-center gap-3"
      >
        {post.author!.avatar ? (
          <img
            src={post.author!.avatar}
            alt={post.author?.display_name}
            className="rounded-full size-[40px] aspect-square object-cover bg-primary"
          />
        ) : (
          <img
            src={unkownProfile}
            alt={post.author?.display_name}
            className="rounded-full size-[40px] aspect-square object-cover"
          />
        )}

        <div className="flex flex-col items-start justify-center">
          <p className="sm:text-md text-sm">{post.author?.display_name}</p>
          <AvailableForHire
            available={post.author?.available_for_hire ?? false}
            username={post.author?.username}
          />
        </div>
      </a>
      <div className="flex gap-3  justify-between flex-wrap">
        <div className="flex gap-3 sm:h-[45px] h-[40px]">
          <ShareButton post={post} />
          <button
            onClick={(e) => toggleFavorite(e)}
            className="h-full px-4 py-2 gap-2 bg-[hsla(0,0%,50%,0.2)] text-[16px]  text-[#aab8c2] rounded-md  transition duration-300 ease-in-out flex items-center justify-center"
          >
            <motion.div
              initial={favoriteHeart}
              animate={
                favoriteHeart
                  ? { scale: [1, 1.2, 0.85, 1], color: "#ef4444" }
                  : { scale: 1, color: "#9ca3af" }
              }
              transition={{ duration: 0.5 }}
              className={`text-2xl`}
            >
              <FaHeart />
            </motion.div>
            <span className="text-black">{favoriteCount}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PictureDetailHeader;
