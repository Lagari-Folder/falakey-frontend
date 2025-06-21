import { Prize } from "@/models/challenge";
import { faTrophy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PrizeCard = ({ prize }: { prize: Prize }) => {
  return (
    <div className="px-[30px] py-[10px] sm:w-[230px] w-full   flex items-center justify-start gap-[15px] border border-[#dfdfe0] rounded-xl">
      <FontAwesomeIcon icon={faTrophy} className="!text-2xl" />
      <div className="description text-start">
        <span className="text-start text-sm w-full">{prize.value}</span>
        <br />
        <span>
          <b>{prize.rank}</b>
        </span>
      </div>
    </div>
  );
};

export default PrizeCard;
