import React, { useState } from "react";
import PrizeCard from "./PrizeCard"; // Adjust the import path if necessary
import { Prize } from "@/models/challenge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { useTrans } from "@/utils/translation";

interface PrizesProps {
  prizes: Prize[];
}

const PrizesContainer: React.FC<PrizesProps> = ({ prizes }) => {
  const [showAll, setShowAll] = useState(false);

  const { t } = useTrans();

  return (
    <div className="flex flex-col items-start mt-12">
      <h2 className="mb-4 text-2xl font-semibold">{t("challenge.prizes")}</h2>
      <div className="prizes flex flex-wrap justify-start w-fit gap-[10px]">
        {prizes.slice(0, showAll ? prizes.length : 3).map((prize, index) => (
          <PrizeCard key={index} prize={prize} />
        ))}
      </div>
      {(prizes.length ?? 0) > 3 && (
        <button
          className="mt-4 underline font-semibold w-full"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? (
            <div className="flex items-center gap-2">
              {t("challenge.top_prizes")}{" "}
              <FontAwesomeIcon size="xs" icon={faChevronUp} />
            </div>
          ) : (
            <div className="flex items-center gap-2">
              {t("challenge.all_prizes")} {prizes.length}{" "}
              {t("challenge.prizes")}
              <FontAwesomeIcon size="xs" icon={faChevronRight} />
            </div>
          )}
        </button>
      )}
    </div>
  );
};

export default PrizesContainer;
