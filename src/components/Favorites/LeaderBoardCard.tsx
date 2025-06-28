import { LeaderBoardUser } from "@/models/leaderBoardUser";
import { useTrans } from "@/utils/translation";

const LeaderBoardCard = ({ data }: { data: LeaderBoardUser }) => {
  // const [isModalOpen, setModalOpen] = useState(false);

  const { t } = useTrans();

  return (
    <div
      key={data.rank}
      className="flex flex-wrap items-center justify-center  2xl:justify-between w-full gap-6 "
    >
      {/* Leaderboard Number & User Info */}
      <div className="flex max-w-[400px] w-[400px] gap-2 items-start sm:justify-start justify-center">
        <a
          className="flex items-center gap-2"
          href={`/author/${data.author?.username}`}
        >
          <div className="sm:text-4xl text-3xl text-black w-[40px]">
            {data.rank}
          </div>
          <img
            src={data.author?.avatar}
            alt={data.author?.display_name}
            className="md:size-[80px] sm:size-[70px] size-[60px] aspect-square object-cover rounded-full cursor-pointer"
          />
        </a>
        <div className="flex flex-col items-start">
          <a
            className="md:text-xl text-md text-start text-black font-medium cursor-pointer"
            href={`/author/${data.author?.username}`}
          >
            {data.author?.display_name}
          </a>
          <p className="text-md text-gray-600">
            {data.total_views_display} {t("stars.views")}
          </p>

          {/* <button
            className="flex items-center bg-white text-black font-medium border border-[#DDDDDD] rounded-full p-1.5 hover:bg-[#f1f1f1]"
            onClick={toggleModal}
          >
            <FontAwesomeIcon icon={faComments} className="!text-sm" />
          </button>
          {isModalOpen && <MessageModal showModal={setModalOpen} />} */}
        </div>
      </div>

      {/* Image Grid */}
      <div className="flex gap-4 flex-wrap justify-end group-has:flex-wrap:justify-center">
        {data.latest_posts!.map((post, i) => (
          <a
            key={i}
            className={`relative h-[190px] w-[200px] ${i === 3 ? "group" : ""} 
           ${i === 0 ? "max-xl:hidden" : ""} 
           ${i === 1 ? "max-lg:hidden" : ""} 
           ${
             i === 2 ? "max-md:hidden" : ""
           } bg-gray-300 rounded-lg overflow-hidden`}
            href={`/author/${data.author?.username}`}
          >
            <img
              src={post.preview_links?.thumb}
              alt={post.title}
              className="w-full h-full object-cover rounded-lg cursor-pointer"
            />

            {i === (data.latest_posts?.length ?? 0) - 1 &&
              (data.total_posts ?? 0) > 4 && (
                <a
                  href={`/author/${data.author?.username}`}
                  className="absolute inset-0 cursor-pointer bg-black bg-opacity-60 flex flex-col items-center justify-center text-[40px] text-white rounded-lg"
                >
                  <span>+{data.total_posts_display}</span>
                  <div className="text-white py-1 px-3 text-[17px] font-noto rounded">
                    {t("leaderboard.see_all")}
                  </div>
                </a>
              )}
          </a>
        ))}
      </div>
    </div>
  );
};

export default LeaderBoardCard;
