import PastChallengeCard from "@/components/Challenge/PastChallengeCard";
import ActiveChallengeCard from "@/components/Challenge/ActiveChallengeCard";
import { useFetchChallenge } from "@/helper/challengeHook";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import SEO from "@/components/Common/SEO";
import { useTrans } from "@/utils/translation";

const Challenge = () => {
  const { data, loading } = useFetchChallenge();

  const { t } = useTrans();

  return (
    <>
      <SEO title="Challenge" description="" name="Falakey" type="article" />

      <div className="bg-primary w-full">
        <div className="bg-white md:rounded-b-[100px] rounded-b-[50px] text-center md:py-24 py-0 md:pb-36 pb-12 flex flex-col items-center gap-3">
          <div className="text-4xl font-bold">{t("navbar.challenges")}</div>
          <div className="md:w-[45%] w-[95%]">{t("challenge.description")}</div>
          {loading && (
            <div className="mt-6 mb-12 flex items-center justify-center gap-3 text-xl font-semibold text-primary">
              <FontAwesomeIcon
                icon={faSpinner}
                className="size-[30px] animate-spin"
                style={{ animationDuration: "2000ms" }}
              />
              {t("challenge.loading")}
            </div>
          )}
          <div className="flex flex-col items-center mx-3">
            {data?.active.map((activeData) => (
              <ActiveChallengeCard key={activeData.id} challenge={activeData} />
            ))}
          </div>
        </div>
        <div className="text-center py-16 md:space-y-12 space-y-3">
          <div className="text-white text-4xl font-bold">
            {t("challenge.past_challenges")}
          </div>
          {loading && (
            <div className="mt-6 mb-12 flex items-center justify-center gap-3 text-xl font-semibold text-white">
              <FontAwesomeIcon
                icon={faSpinner}
                className="size-[30px] animate-spin"
                style={{ animationDuration: "2000ms" }}
              />
              {t("challenge.loading")}
            </div>
          )}
          <div className="flex flex-col items-center mx-3">
            {data?.expired.map((expiredData) => {
              return (
                <PastChallengeCard
                  key={expiredData.id}
                  challenge={expiredData}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Challenge;
