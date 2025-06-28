import { useParams } from "react-router-dom";
import WinnerCard from "./WinnerCard";
import TagBadge from "./TagBadge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useFetchChallengeDetail } from "@/helper/challengeHook";
import CollectionsIcon from "@mui/icons-material/Collections";
import UploadModal from "../UploadModal";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import AuthenticationModal from "../Authentication/AuthenticationModal";
import { useEffect, useRef, useState } from "react";
import SponsorCard from "./SponsorCard";
import SEO from "../Common/SEO";
import PrizesContainer from "./PrizeContainer";
import KeyInformation from "./KeyInformation";
import { useTrans } from "@/utils/translation";
import MasonryWrapper from "../Masonry/MasonryWrapper";

const ChallengeDetails = () => {
  const { slug } = useParams();
  const allSubmissionRef = useRef<HTMLDivElement>(null);

  const [openUploadModal, setOpenUploadModal] = useState(false);

  const { data, loading } = useFetchChallengeDetail(slug!);

  const [openAuthModal, setOpenAuthModal] = useState(false);

  const { user } = useSelector((state: RootState) => state.auth);

  const [isExpanded, setIsExpanded] = useState(false);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    if (!user && openUploadModal) {
      setOpenUploadModal(false);
      setOpenAuthModal(true);
    }
  }, [openUploadModal]);

  const scrollToAllSubmissions = () => {
    if (allSubmissionRef.current) {
      allSubmissionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const { t } = useTrans();

  return (
    <>
      <SEO
        title={`Falakey | Challenge | ${data?.title || slug}`}
        description={`Join the ${
          data?.title || "photography"
        } challenge on Falakey and showcase your creativity!`}
        name="Falakey"
        type="article"
      />

      {openAuthModal && <AuthenticationModal modalHandler={setOpenAuthModal} />}
      {openUploadModal && user && (
        <UploadModal
          modalHandler={setOpenUploadModal}
          filtering={[
            { key: "challenge_id", value: data?.id.toString() ?? "" },
          ]}
        />
      )}
      {loading ? (
        <div>
          <div className="mt-6 mb-12 flex items-center justify-center gap-3 text-xl font-semibold text-primary">
            <FontAwesomeIcon
              icon={faSpinner}
              className="size-[30px] animate-spin"
              style={{ animationDuration: "2000ms" }}
            />
            {t("common.loading")}
          </div>
        </div>
      ) : (
        <div className="bg-primary w-[100%]">
          <div className="text-4xl font-bold py-[20px] bg-white z-50 w-full lg:sticky top-0 flex justify-between md:flex-nowrap flex-wrap items-center gap-2 px-8">
            <div className="flex flex-wrap gap-2">
              <h1 className="text-start">
                {data?.title}
                {(data?.days_left ?? 0) <= 0 ? ": Winners" : ""}{" "}
              </h1>
              <div className="flex flex-wrap gap-2">
                {[
                  {
                    dot: true,
                    title:
                      data?.days_left ?? 0 > 0
                        ? (data?.days_left.toString() ?? "") +
                          t("challenge.days_left")
                        : t("challenge.ended"),
                  },
                  ...data!.sponsors.map((sponsor) => ({
                    dot: false,
                    title: `${t("challenge.sponsored_by")} ${
                      sponsor.short_name
                    }`,
                    link: sponsor.link!,
                  })),
                ].map(
                  (
                    tag: { link?: string; dot?: boolean; title: string },
                    index
                  ) => (
                    <TagBadge
                      href={tag.link}
                      key={index}
                      dot={tag.dot}
                      title={tag.title}
                      black
                      red
                    />
                  )
                )}
              </div>
            </div>

            {(data?.days_left ?? 0) > 0 && (
              <div
                className="bg-black min-w-fit text-center line-clamp-1 text-white rounded-full py-3 px-4 text-lg cursor-pointer"
                onClick={() => {
                  setOpenUploadModal(true);
                }}
              >
                {t("challenge.join_challenge")}
              </div>
            )}
          </div>
          <div className="bg-white rounded-b-[80px] text-center pb-28 flex flex-col items-center gap-3 ">
            <div
              className={`px-4 justify-center w-full overflow-x-auto scrollbar-hide flex gap-6  mb-[30px] ${
                data?.days_left ?? 0 > 0 ? "" : "md:pr-16 pr-0"
              }`}
            >
              {!data?.winners?.posts?.length ? (
                <div className="grid lg:grid-cols-4 grid-cols-3 gap-1 h-[421px] items-center rounded-3xl overflow-clip relative">
                  {data?.days_left ?? 0 > 0 ? (
                    <div
                      className="absolute right-3 bottom-3 bg-white rounded-full py-3 px-6 cursor-pointer"
                      onClick={() => {
                        scrollToAllSubmissions();
                      }}
                    >
                      <CollectionsIcon /> {t("challenge.all_submissions")}
                    </div>
                  ) : null}
                  {data!.media.map((media, index) => (
                    <div
                      key={index}
                      className={`bg-gray-400 w-full flex items-center justify-center overflow-hidden ${
                        index < 2
                          ? "lg:row-span-2 max-sm:col-span-2 row-span-2 h-[421px]" // First two items span two rows
                          : index < 4
                          ? "lg:row-span-1 row-span-1 lg:h-[421px] h-[210.5px]" // Last two items stack and occupy half height
                          : "h-[421px]" // Other items maintain standard height
                      } ${
                        index === 1 ? "max-sm:hidden" : "" // Hide the second image on medium screens and below
                      } `}
                    >
                      <img
                        src={media.sm ?? media.original}
                        alt={data?.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex w-full items-center gap-3 my-8">
                  {data?.winners!.posts!.map((post) => (
                    <WinnerCard
                      user={post.post.author!}
                      post={post.post}
                      rank={post.rank}
                    />
                  ))}
                </div>
              )}
            </div>
            <div className="px-16 w-full ">
              <hr className="w-full font-bold my-4 " />
            </div>
            <div className="lowercard w-full grid grid-cols-1  lg:grid-cols-[2fr_1fr] gap-[100px] md:px-16 px-3">
              {/* Left Component: Prizes */}
              <div className="w-full col-span-full md:col-span-1">
                {(data?.description || data?.short_description) && (
                  <p className="text-start text-[27px] font-bold">
                    {t("challenge.about")}
                  </p>
                )}
                {(data?.description || data?.short_description) && (
                  <div className="flex flex-col justify-start ">
                    <p className="text-[17px] text-rtl  font-bold whitespace-pre-line">
                      {isExpanded
                        ? data.description ||
                          data.short_description ||
                          t("challenge.no_description")
                        : (
                            data.description ||
                            data.short_description ||
                            t("challenge.no_description")
                          ).slice(0, 200) +
                          ((data.description || data.short_description)
                            ?.length > 200
                            ? "..."
                            : "")}
                    </p>
                    {(data.description || data.short_description)?.length >
                      100 && (
                      <button
                        onClick={toggleReadMore}
                        className="text-primary text-start font-bold underline"
                      >
                        {isExpanded
                          ? t("challenge.read_less")
                          : t("challenge.read_more")}
                      </button>
                    )}
                  </div>
                )}
                <div className="lg:hidden">
                  <KeyInformation
                    data={data}
                    setOpenUploadModal={setOpenUploadModal}
                  />
                </div>

                <PrizesContainer prizes={data?.prizes ?? []} />
                <p className="text-start text-[27px] font-bold mt-[50px] mb-[12px]">
                  {t("challenge.sponsers")}
                </p>
                <div className="prizes flex flex-wrap">
                  {data?.sponsors.map((sponsor, index) => (
                    <SponsorCard key={index} sponsor={sponsor} />
                  ))}
                </div>
              </div>

              {/* Right Component: Key Information */}
              <div className="max-lg:hidden">
                <KeyInformation
                  data={data}
                  setOpenUploadModal={setOpenUploadModal}
                />
              </div>
            </div>
          </div>

          {/* Challenge Submission Section */}
          <div className="text-center pb-16 space-y-12" ref={allSubmissionRef}>
            <div className="text-white mx-2 font-bold flex flex-col">
              <div className=" md:text-4xl sm:text-3xl text-2xl sm:pb-12 sm:pt-14 pb-3 pt-11">
                {t("challenge.submissions")}
              </div>
              <MasonryWrapper
                title=""
                screenWidth="!max-w-[100vw]"
                stringFiltering={`shuffle=1&challenge=${slug}`}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChallengeDetails;
