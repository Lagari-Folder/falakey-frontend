import { Post } from "@/models/post";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import React from "react";

const MasonryCardBigScreen = React.memo(({ post }: { post: Post }) => {
  return (
    <div className="w-full">
      <motion.div
        className="rounded-xl overflow-hidden relative"
        style={{
          width: "100%",
          minHeight: post.aspect_ratio
            ? `${400 / post.aspect_ratio}px`
            : "250px",
          backgroundColor: post.dominant_color,
        }}
        initial="rest"
        whileHover="hovered"
        animate="rest"
        variants={{
          rest: { opacity: 1 },
          hovered: { opacity: 1 },
        }}
      >
        {/* Hover overlay */}
        <motion.div
          className="absolute bg-gradient-to-t from-black/75 to-[40%] to-transparent size-full flex items-end z-10"
          variants={{
            rest: { opacity: 0 },
            hovered: { opacity: 1 },
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Heart & count */}
        <motion.div
          className="absolute start-4 top-4 flex gap-2 max-h-[40px] max-w-[90px] items-center z-20"
          variants={{
            rest: { opacity: 0 },
            hovered: { opacity: 1 },
          }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            animate={
              post.is_favorite
                ? { scale: [1, 1.2, 0.85, 1], color: "#ef4444" }
                : { scale: 1, color: "#fafafa" }
            }
            transition={{ duration: 0.5 }}
            className="text-2xl"
          >
            <FontAwesomeIcon icon={faHeart} />
          </motion.div>
          <motion.p className="text-white">{post.favorites_count}</motion.p>
        </motion.div>

        {/* Author Avatar */}
        <motion.div
          className="absolute bottom-4 px-4 flex justify-between w-full z-20"
          variants={{
            rest: { opacity: 0 },
            hovered: { opacity: 1 },
          }}
          transition={{ duration: 0.3 }}
        >
          {post.author?.avatar ? (
            <img
              src={post.author.avatar}
              alt={post.author.display_name.toString()}
              className="size-[37.5px] bg-primary rounded-full object-cover"
            />
          ) : null}
        </motion.div>

        {/* Background Image */}
        <img
          src={post.preview_links?.sm ?? post.preview_links?.original}
          alt={post.title}
          className="object-cover w-full h-full absolute inset-0 z-0"
        />
      </motion.div>
    </div>
  );
});

export default MasonryCardBigScreen;
