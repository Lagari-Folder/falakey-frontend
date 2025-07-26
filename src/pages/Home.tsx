import { useEffect, useRef, useState } from "react";

import HomeBanner from "@/components/Home/HomeBanner";
import FalakeyStarsBanner from "@/components/Home/FalakeyStarsBanner";
import ExploreChallengesBanner from "@/components/Home/ExploreChallengesBanner";

import { useHomeHook } from "@/helper/homeHook";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { Grid2 } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import SearchTabs from "@/components/SearchTabs";
import { useTrans } from "@/utils/translation";
import MasonryWrapper from "@/components/Masonry/MasonryWrapper";
import SEO from "@/components/Common/SEO";
const Home = () => {
  const { getHomeData, loading, data } = useHomeHook();

  const { t } = useTrans();
  const { local } = useSelector((state: RootState) => state.translation);

  const { types } = useSelector((state: RootState) => state.search);

  const previousearchData = useSelector((state: RootState) => state.search);

  const masonryRef = useRef<HTMLDivElement | null>(null);
  const [scrolling, setScrolling] = useState(false);
  const handleScrollToMasonry = () => {
    setScrolling(true);
    const offset = 70; // Adjust offset as needed
    const targetPosition =
      masonryRef.current!.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({ top: targetPosition, behavior: "smooth" });
    setTimeout(() => {
      setScrolling(false);
    }, 3000);
  };

  useEffect(() => {
    getHomeData();
  }, [local]);

  if (loading) {
    return (
      <div className="mt-6">
        <div className="w-full flex justify-center">
          <div className="sm:max-w-screen-size sm:w-[95%] w-full mx-3">
            <Grid2
              container
              spacing={2}
              columns={{ xl: 24, lg: 20, md: 16, sm: 10, xs: 5 }}
            >
              <Grid2
                size={{ xl: 18, lg: 14, md: 10, sm: 10, xs: 5 }}
                height={{ md: 375, sm: 400, xs: 300 }}
              >
                <div className="h-full lg:flex-1 bg-gray-300 animate-pulse rounded-3xl overflow-hidden relative bg-cover  flex flex-col justify-between p-6"></div>
              </Grid2>
              <Grid2
                size={{ xl: 6, lg: 6, md: 6, sm: 5, xs: 3 }}
                height={{ md: 375, sm: 300, xs: 150 }}
              >
                <div className="h-full bg-gray-300 animate-pulse rounded-3xl p-4 flex flex-col items-center "></div>
              </Grid2>
              <Grid2
                size={{ xl: 24, lg: 20, md: 16, sm: 5, xs: 2 }}
                height={{ md: 125, sm: 300, xs: 150 }}
              >
                <div className="cursor-pointer h-full relative flex lg:p-0 sm:p-6 p-2 lg:justify-between justify-center items-center rounded-3xl bg-gray-300 animate-pulse"></div>
              </Grid2>
            </Grid2>
          </div>
        </div>
        <div className="mt-6 mb-12 flex items-center justify-center gap-3 text-xl font-semibold text-primary">
          <FontAwesomeIcon
            icon={faSpinner}
            className="size-[30px] animate-spin"
            style={{ animationDuration: "2000ms" }}
          />
          {t("common.loading")}
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO />
      <SearchTabs
        onChangeAddons={() => {
          handleScrollToMasonry();
        }}
        // selectedCategoryIndex={selectedCategoryIndex}
        // setSelectedCategoryIndex={setSelectedCategoryIndex}
      />
      <div className="w-full flex justify-center">
        <div className="sm:max-w-screen-size w-[95%]">
          {/* First row: On lg and bigger, two divs side by side */}
          <div className="lg:grid-cols-[1fr_300px] md:grid-cols-[1fr_250px] grid grid-cols-1  gap-4">
            {/* First container */}
            <div className="h-[300px] md:h-[325px] lg:h-[375px] w-full">
              <HomeBanner
                slogan={t("home.banner_slogan")}
                author={
                  (data?.banner.author.display_name ||
                    data?.banner.author.username) ??
                  ""
                }
                authorSlug={data?.banner.author.username ?? ""}
                categoryVar={previousearchData.types}
                homeImage={data?.banner.image}
                typeOptions={data?.types ?? []}
                bannerPosition={data?.banner.position}
              />
            </div>

            {/* Second container */}
            <div className="h-[300px] md:h-[325px] lg:h-[375px] md:block hidden  w-full ">
              <FalakeyStarsBanner leaderBoardUser={data?.leaderboard ?? []} />
            </div>
          </div>

          {/* Second row: On lg and bigger, full-width third container */}
          {/* On smaller screens, second and third containers are side by side */}
          <div className="grid grid-cols-[1fr_auto] gap-4 mt-4 md:grid-cols-1 items-start">
            {/* Stars banner - fills remaining space */}
            <div className="md:hidden w-full h-[clamp(110px,8vw,160px)] min-[500px]:h-[clamp(125px,9vw,175px)] min-[768px]:h-[clamp(140px,10vw,200px)]">
              <FalakeyStarsBanner leaderBoardUser={data?.leaderboard ?? []} />
            </div>

            {/* Explore banner - same height, square, responsive */}
            <div
              className="h-[clamp(110px,8vw,160px)] w-[clamp(110px,8vw,160px)] 
              min-[500px]:h-[clamp(125px,9vw,175px)] min-[500px]:w-[clamp(125px,9vw,175px)] 
              min-[768px]:h-[clamp(120px,10vw,140px)] 
              md:w-full "
            >
              <ExploreChallengesBanner />
            </div>
          </div>
        </div>

        {/* <div className="sm:max-w-screen-size sm:w-[95%] w-full mx-3">
          <Grid2
            container
            spacing={2}
            columns={{ xl: 24, lg: 20, md: 16, sm: 10, xs: 5 }}
          >
            <Grid2
              size={{ xl: 18, lg: 14, md: 10, sm: 10, xs: 5 }}
              height={{ md: 375, sm: 275, xs: 300 }}
            >
              
            </Grid2>
            <Grid2
              size={{ xl: 6, lg: 6, md: 6, sm: 5, xs: 3 }}
              height={{ md: 375, sm: 225, xs: 150 }}
            >
              
            </Grid2>
            <Grid2
              size={{ xl: 24, lg: 20, md: 16, sm: 5, xs: 2 }}
              height={{ md: 125, sm: 225, xs: 150 }}
            >
              
            </Grid2>
          </Grid2>
        </div> */}
      </div>
      <div
        className={`w-full ${
          scrolling ? "pb-[75%]" : ""
        } bg-white flex flex-col justify-center items-center`}
      >
        <div className="text-center my-10 flex flex-col items-center sm:gap-0.5 gap-1">
          <div className="xl:text-4xl lg:text-3xl sm:text-2xl text-lg  text-primary font-bold leading-6">
            {data?.types.find((type) => type.key === types)?.home_title_1 ??
              "The right photo for every moment"}
          </div>
          <div className="xl:text-2xl lg:text-xl sm:text-xl text-md font-bod text-primary/60  px-5 leading-5">
            {data?.types.find((type) => type.key === types)?.home_subtitle_1 ??
              "Professional photos to express your ideas and connect with your audience"}
          </div>
        </div>
        <div className={`w-full flex justify-center`} ref={masonryRef}>
          <MasonryWrapper
            title=""
            stringFiltering={`types=${types}`}
            screenWidth="w-[95%]"
          />
        </div>
      </div>
    </>
  );
};

export default Home;
