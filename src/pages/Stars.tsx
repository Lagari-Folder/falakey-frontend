import { useEffect, useState } from "react";
import { useLeaderBoardHook } from "@/helper/leaderBoardHook";
import LeaderBoardCard from "@/components/Favorites/LeaderBoardCard";
import SEO from "@/components/Common/SEO";
import { useTrans } from "@/utils/translation";

export const Stars = () => {
  const [activeTab, setActiveTab] = useState<
    "content-added-last-30-days" | "all-time"
  >("content-added-last-30-days");
  const [page, setPage] = useState(1);
  const [settingPage, setSettingPage] = useState(false);

  const { getLeaderBoards, data, loading, done } = useLeaderBoardHook();

  const handleChangeType = (s: "content-added-last-30-days" | "all-time") => {
    setPage(1);
    setActiveTab(s);
  };

  useEffect(() => {
    if (page == 1) {
      getLeaderBoards(10, page, activeTab, true);
    } else {
      getLeaderBoards(10, page, activeTab, false);
    }
  }, [page, activeTab]);

  useEffect(() => {
    if (!loading) {
      setSettingPage(false);
    }
  }, [loading]);

  useEffect(() => {
    const handleScroll = () => {
      if (loading) return;

      const currentScrollY = window.scrollY;
      const nearBottom =
        window.innerHeight + currentScrollY >=
        document.documentElement.scrollHeight - 400; // Trigger 2000px before bottom

      if (nearBottom && !done && !settingPage) {
        setPage((prevPage) => prevPage + 1);
        setSettingPage(true);
      }
    };

    if (!loading) {
      window.addEventListener("scroll", handleScroll);
    } else {
      window.removeEventListener("scroll", handleScroll);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading, done, settingPage]);

  const { t } = useTrans();

  return (
    <>
      <SEO
        title={t("seo.stars_title")}
        description={t("seo.stars_description")}
      />

      <div className="flex flex-col gap-3 items-center min-h-screen px-1">
        {/* Title */}
        <h1 className="text-[34px] leading-[44.2px] font-bold  font-lexend text-center mt-14">
          {t("stars.falakey_stars")}
        </h1>

        {/* Dynamic Subtitle */}
        <p className="text-lg text-black text-center">
          {activeTab === "content-added-last-30-days"
            ? t("stars.top_stars_text")
            : t("stars.recent_stars_text")}
        </p>

        {/* Tabs */}
        <div className="flex self-start gap-4 ms-16">
          <button
            className={`px-5 py-3 rounded-full font-semibold text-black font-noto transition-all duration-300 transform ${
              activeTab === "content-added-last-30-days"
                ? "bg-black text-white scale-110"
                : "text-gray-700 scale-100"
            }`}
            onClick={() => handleChangeType("content-added-last-30-days")}
          >
            {t("stars.recent")}
          </button>
          <button
            className={`px-6 py-3 rounded-full font-semibold font-noto text-black transition-all duration-300 transform ${
              activeTab === "all-time"
                ? "bg-black text-white scale-110"
                : "text-gray-700 scale-100"
            }`}
            onClick={() => handleChangeType("all-time")}
          >
            {t("stars.all_time")}
          </button>
        </div>
        <div className="w-[95%] sm:p-3 p-0">
          <div className="flex flex-col items-center w-full gap-3">
            {data.map((star, index) => (
              <LeaderBoardCard key={index} data={star} />
            ))}
          </div>
        </div>
        {loading && (
          <div className={`md:text-4xl text-2xl text-black font-semibold`}>
            <div>{t("stars.loading")}</div>
          </div>
        )}

        {done && !loading && data.length > 0 && (
          <div className=" text-center w-full text-xl text-gray-400">
            {t("stars.not_stars")}
          </div>
        )}
      </div>
    </>
  );
};
