import leftStar from "../../../public/images/left-stars.gif";
import leftMobileStar from "../../../public/images/left-mobile-stars.gif";
import rightStar from "../../../public/images/right-stars.gif";
import firstLayout from "../../../public/images/first-layout.png";
import secondLayout from "../../../public/images/second-layout.png";
import thirdLayout from "../../../public/images/third-layout.png";
import whiteStar from "../../../public/images/white-star.svg";
import { NavLink } from "react-router-dom";
import { Marquee } from "../ui/marquee";
import { useTrans } from "@/utils/translation";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";

const ExploreChallengesBanner = () => {
  const { t } = useTrans();
  const { local } = useSelector((state: RootState) => state.translation);
  return (
    <NavLink
      to={`/${local}/challenge`}
      className="cursor-pointer h-full overflow-hidden relative flex lg:p-0 p-2 lg:justify-evenly justify-center items-center rounded-3xl bg-gradient-to-tr from-purple-800 via-pink-800 to-amber-600"
    >
      <img
        src={leftStar}
        className="h-full absolute left-0 max-mlg:hidden block !skew-x-0 "
        alt="Falakey Star"
      />

      <img
        src={leftMobileStar}
        className="absolute w-[75%] left-0 bottom-0 top max-sm:block hidden"
        alt="Flakaye Star"
      />
      <div className="text-white text-center xl:border-b-2 xl:no-underline sm:underline font-semibold flex xl:text-4xl lg:text-3xl sm:text-xl text-lg gap-2 items-center ">
        {t("challenge.title")}
        <img
          src={whiteStar}
          className="mlg:block hidden size-[25px]"
          alt="Falakey Star"
        />
      </div>
      <div className="h-full opacity-60 relative xl:flex hidden w-[400px] !flex-row items-center justify-center overflow-hidden">
        <Marquee vertical className="  [--duration:50s]">
          <img src={firstLayout} className="h-full " alt="Falakey Star" />
        </Marquee>
        <Marquee vertical reverse className=" [--duration:60s]">
          <img src={secondLayout} className="h-full " alt="Falakey Star" />
        </Marquee>
        <Marquee vertical className="  [--duration:50s]">
          <img src={thirdLayout} className="h-full " alt="Falakey Star" />
        </Marquee>
      </div>
      <img
        src={rightStar}
        className="h-full absolute right-0 max-mlg:hidden block"
        alt="Falakey Star"
      />
    </NavLink>
  );
};

export default ExploreChallengesBanner;
