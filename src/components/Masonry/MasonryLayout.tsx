import { useCallback, useEffect, useRef, useState } from "react";
import Masonry from "react-responsive-masonry";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { toggleFavoritePost, useMasonryPostHook } from "@/helper/postHook";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import AuthenticationModal from "../Authentication/AuthenticationModal";
import { useTrans } from "@/utils/translation";
import InfiniteScroll from "react-infinite-scroll-component";
import MasonryCard from "./MasonryCard";

const MasonryLayout = ({
  title,
  classTitle,
  screenWidth,
  columnCount,
  stringFiltering,

  selectedSlug,
  handleOpenCard,
}: {
  title: string;
  screenWidth?: string;
  classTitle?: string;
  columnCount: number;
  stringFiltering?: string;

  selectedSlug?: string;
  handleOpenCard: (s: string) => void;
}) => {
  const path = window.location.pathname;

  const [openAuthModal, setOpenAuthModal] = useState(false);

  const { token } = useSelector((state: RootState) => state.auth);

  const isFetchingRef = useRef(false);

  const {
    fetchPosts,
    toggleFavoriteData,
    removeFavoriteOfAll,
    data,
    loading,
    more,
  } = useMasonryPostHook();

  const fetchData = async () => {

    if (isFetchingRef.current) return;
    isFetchingRef.current = true;
    await fetchPosts(stringFiltering);
    isFetchingRef.current = false;
  };

  useEffect(() => {
    console.log("hello");

    fetchData();
  }, [stringFiltering]);

  useEffect(() => {
    if (!token) {
      removeFavoriteOfAll();
    } else {
      if (selectedSlug) {
        window.open(`/listing/${selectedSlug}`, "_self");
      }
    }
  }, [token]);

  const handleFavorite = useCallback(
    async (id: number): Promise<boolean> => {
      try {
        const result = await toggleFavoritePost(id, token!);
        if (result) {
          toggleFavoriteData(id);
        }
        return result ?? false;
      } catch {
        return false;
      }
    },
    [token, toggleFavoriteData]
  );

  const { t } = useTrans();

  return (
    <>
      {openAuthModal && <AuthenticationModal modalHandler={setOpenAuthModal} />}

      <div className={`sm:max-w-screen-size max-sm:mx-3  ${screenWidth} `}>
        {title && (
          <div
            className={`${classTitle} ${
              data.length > 0
                ? "font-bold"
                : "text-center text-gray-400 text-xl"
            } text-2xl  mb-3`}
          >
            {data.length > 0
              ? title
              : loading
              ? ""
              : "No Available Images or Videos"}
          </div>
        )}

        <InfiniteScroll
          dataLength={data.length}
          next={fetchData}
          hasMore={more}
          loader={
            <div
              className={`mt-6 mb-60 flex items-center justify-center gap-3 text-xl font-semibold ${
                /^\/(?:en|ar)\/challenge/.test(path)
                  ? "text-white"
                  : "text-primary"
              }`}
            >
              <FontAwesomeIcon
                icon={faSpinner}
                className="size-[30px] animate-spin"
                style={{ animationDuration: "2000ms" }}
              />
              {t("masonry.loading")}
            </div>
          }
          endMessage={
            <div className=" text-center w-full text-xl text-gray-400">
              {t("masonry.no_posts")}
            </div>
          }
        >
          <Masonry
            columnsCount={columnCount}
            gutter="16px"
            className="masonry-grid mb-4"
          >
            {(data ?? []).map((post) => (
              // <MasonryCardBigScreen key={post.id} post={post} />
              <MasonryCard
                key={post.id}
                data={post}
                handleClick={() => {
                  handleOpenCard(post.slug);
                }}
                handleFavorite={(id: number) => handleFavorite(id)}
                handleAuthModal={() => {}}
              />
            ))}
          </Masonry>
        </InfiniteScroll>
      </div>
    </>
  );
};
export default MasonryLayout;
