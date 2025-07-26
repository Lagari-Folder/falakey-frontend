import { Challenge } from "@/models/challenge";
import TagBadge from "./TagBadge";
import { Avatar, AvatarGroup } from "@mui/material";
import { useTrans } from "@/utils/translation";

const PastChallengeCard = ({ challenge }: { challenge: Challenge }) => {
  const { t } = useTrans();

  return (
    <div className="flex lg:flex-row flex-col max-lg:items-center md:gap-16 gap-6 max-w-[1100px] w-[98%] lg:min-h-[320px] h-full mx-3 my-6 ">
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
      <div className="flex flex-col items-start md:gap-5 gap-3 text-start max-w-[500px] lg:w-[500px]">
        <div className="flex flex-wrap gap-2">
          {[
            {
              dot: true,
              title: t("challenge.ended"),
              link: "",
            },
            ...challenge.sponsors.map((sponsor) => ({
              dot: false,
              title: `${t("challenge.sponsored_by")} ${sponsor.short_name}`,
              link: sponsor.link!,
            })),
          ].map((tag, index) => (
            <TagBadge
              href={tag.link}
              key={index}
              dot={tag.dot}
              title={tag.title}
            />
          ))}
        </div>
        <div className="text-3xl text-white text-rtl w-full font-bold">
          {challenge.title}
        </div>
        <div className="text-white text-rtl w-full ">
          {challenge.short_description}
        </div>
        {challenge.winners?.posts?.length ? (
          <div className="flex items-center gap-2">
            <div className="avatars justify-start w-fit" dir="ltr">
              <AvatarGroup max={3} spacing={"small"}>
                {challenge.winners.posts?.map((post, index) => (
                  <Avatar
                    key={index}
                    alt="Remy Sharp"
                    src={post.post.author!.avatar}
                  />
                ))}
              </AvatarGroup>
            </div>

            <div className="flex flex-col ml-2 items-start text-white">
              <div>{t("challenge.winners")}</div>
              <div className="font-bold  w-full">
                {challenge.winners.description}
              </div>
            </div>
          </div>
        ) : null}
        <a
          className="bg-[#f7f7f7] flex items-center justify-center py-3 px-2 hover:bg-[#f7f7f7] rounded-sm font-semibold text-lg w-full h-full max-h-[50px]"
          href={`/challenge/${challenge.slug}`}
        >
          {t("challenge.learn_more")}
        </a>
      </div>
    </div>
  );
};

export default PastChallengeCard;
