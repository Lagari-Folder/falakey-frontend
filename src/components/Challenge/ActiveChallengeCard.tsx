import TagBadge from "./TagBadge";
import starIcon from "../../../public/icons/star-icon.svg";
import { Challenge } from "@/models/challenge";
import { useTrans } from "@/utils/translation";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";

const ActiveChallengeCard = ({ challenge }: { challenge: Challenge }) => {
  const { t } = useTrans();
  const { local } = useSelector((state: RootState) => state.translation);

  return (
    <div className="flex lg:flex-row flex-col max-lg:items-center gap-16 max-w-[1100px] w-[98%] lg:min-h-[320px] h-full mx-3 my-6 ">
      <div className="h-[320px] lg:w-[550px] lg:min-w-[500px] w-full flex gap-1 justify-between rounded-[25px] overflow-hidden">
        <img
          src={challenge.media[0].thumb}
          alt={challenge.title}
          className="h-full w-[60%] object-cover"
        />

        <div className="h-full flex flex-col gap-1 justify-between w-[40%]">
          <img
            src={challenge.media[1].thumb}
            alt={challenge.title}
            className="h-[60%] w-full object-cover"
          />
          <img
            src={challenge.media[2].thumb}
            alt={challenge.title}
            className="h-[40%] w-full object-cover"
          />
        </div>
      </div>
      <div className="flex flex-col items-start gap-5 text-start max-w-[500px] lg:w-[500px]">
        <div className="flex flex-wrap gap-2">
          {[
            {
              dot: true,
              title:
                challenge.days_left.toString() + " " + t("challenge.days_left"),
              link: "",
            },

            ...challenge.sponsors.map((sponsor) => ({
              dot: false,
              title: `Sponsored by ${sponsor.short_name}`,
              link: sponsor.link!,
            })),
          ].map((tag, index) => (
            <TagBadge
              key={index}
              href={tag.link ?? ""}
              dot={tag.dot}
              title={tag.title}
              black
              red
            />
          ))}
        </div>
        <div className="text-3xl text-black font-bold text-rtl w-full ">
          {challenge.title}
        </div>
        <div className="text-black  text-rtl w-full ">
          {challenge.short_description}
        </div>
        <div className="w-full  flex flex-wrap basis-[100px]  gap-2">
          {challenge.prizes.map((prize, index) => (
            <div
              key={index}
              className="flex items-center min-w-[150px] rounded-xl border border-[#dfdfe0] max-h-[80px] p-2"
            >
              <img
                src={starIcon}
                alt="Falakey Star Icon"
                className="h-[40px] object-cover mx-1"
              />

              <div>
                <div className="text-sm">{prize.rank}</div>
                <div className="font-bold">{prize.value}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="w-full flex gap-2">
          <a
            className="bg-black flex items-center justify-center py-2 px-2 text-white hover:bg-black rounded-sm font-semibold text-lg w-[60%] h-full max-h-[50px]"
            href={`/${local}/challenge/${challenge.slug}`}
          >
            {t("challenge.join_challenge")}
          </a>
          <a
            className="bg-[#f7f7f7] flex items-center justify-center py-2 px-2 text-black hover:bg-primary hover:text-white rounded-sm font-semibold text-lg w-[35%] h-full max-h-[50px]"
            href={`/${local}/challenge/${challenge.slug}`}
          >
            {t("challenge.learn_more")}
          </a>
        </div>
      </div>
    </div>
  );
};

export default ActiveChallengeCard;
