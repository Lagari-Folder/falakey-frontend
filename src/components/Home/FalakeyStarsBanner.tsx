import { useNavigateWithLocale } from "@/helper/navigateWithLocale";
import starIcon from "../../../public/icons/star-icon.svg";
import unkownProfile from "../../../public/images/unkown-profile.png";
import { LeaderBoardUser } from "@/models/leaderBoardUser";
import { useTrans } from "@/utils/translation";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";

const FalakeyStarsBanner = ({
  leaderBoardUser,
}: {
  leaderBoardUser: LeaderBoardUser[];
}) => {
  const navigate = useNavigateWithLocale();
  const { t } = useTrans();
  const { local } = useSelector((state: RootState) => state.translation);

  return (
    <div className="h-full w-full bg-[#e8dfef] rounded-3xl sm:p-4 p-2 pt-4 pb-6 overflow-hidden  flex flex-col items-center ">
      <a
        className="flex gap-3 items-center px-2 mb-2  w-full cursor-pointer"
        href={`/${local}/falakey-stars`}
      >
        <div className="text-primary 2xl:text-2xl xl:text-1xl md:text-xl sm:text-sm xs:text-md text-lg font-extrabold  sm:border-b-[1.5px] sm:pb-2 border-primary ">
          {t("stars.falakey_stars")}
        </div>
        <img
          src={starIcon}
          alt="Star Icon"
          className="sm:size-[30px] size-[22px] "
        />
      </a>
      <div className="overflow-x-hidden h-full overflow-y-auto scrollbar-hide w-full">
        <table className="h-full flex flex-col  max-lg:justify-start justify-center w-full">
          <tbody>
            {leaderBoardUser.map((leader, index) => (
              <tr
                key={index}
                className="w-full  cursor-pointer items-center flex md:h-[90px] md:max-h-[90px]  py-1"
                onClick={() => navigate(`/author/${leader.author?.username}`)}
              >
                <td className="font-bold sm:text-2xl xs:text-lg text-xs pr-2 text-secondary">
                  {leader.rank}
                </td>
                <td
                  className={`flex justify-between w-full md:h-[90px] md:max-h-[90px]  py-1 items-center ${
                    leaderBoardUser.length - 1 != index
                      ? "sm:border-b-[1.5px]"
                      : ""
                  } border-primary sm:py-5 `}
                >
                  <div className="flex gap-3  items-center overflow-hidden">
                    <img
                      src={leader.author?.avatar ?? unkownProfile}
                      className="rounded-full object-cover aspect-square sm:size-[40px] xs:size-[30px] size-[25px]"
                      alt={leader.author?.display_name}
                    />
                    <div>
                      <div className="!leading-4 sm:text-sm xs:text-xs  text-[12px]   font-bold overflow-hidden">
                        {leader.author?.display_name}
                      </div>
                      {/* <div className="sm:text-xs text-[0.5rem] font-semibold text-gray-400">
                    {leader.total_views} views
                    </div> */}
                    </div>
                  </div>
                </td>
                <td
                  className={`${
                    leaderBoardUser.length - 1 != index
                      ? "sm:border-b-[1.5px]"
                      : ""
                  } border-primary sm:py-5 md:h-[90px] md:max-h-[90px]  py-1  flex justify-center items-center`}
                >
                  <div className="sm:gap-1 gap-1 flex items-baseline">
                    <div className="text-secondary font-bold sm:text-2xl text-md ">
                      {leader.total_views_display}
                    </div>
                    <div className="text-primary font-bold sm:text-lg text-xs ">
                      {t("stars.views")}
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FalakeyStarsBanner;
