import { Sponsor } from "@/models/challenge";
import { useTrans } from "@/utils/translation";
import SellOutlinedIcon from "@mui/icons-material/SellOutlined";

const SponsorCard = ({ sponsor }: { sponsor: Sponsor }) => {
  const { t } = useTrans();
  return (
    <div
      onClick={() => {
        if (sponsor.link) {
          window.open(sponsor.link, "_blank");
        }
      }}
      className={`challenge-deadline  my-[15px] flex gap-[10px] items-start ${
        sponsor.link ? "cursor-pointer" : ""
      }`}
    >
      <div className="deadline-calender min-w-[48px] h-[48px] border-[1px] border-[#dfdfe0] flex flex-col rounded-lg items-center justify-center py-0 leading-none">
        {sponsor.image ? (
          <img src={sponsor.image} alt={sponsor.name} />
        ) : (
          <SellOutlinedIcon className="!text-gray-600" />
        )}
      </div>
      <div className="submission h-fit text-start flex flex-col">
        <span>{t("challenge.sponsered_by")}</span>
        <span className="text-start font-semibold">
          <p>{sponsor.name}</p>
        </span>
      </div>
    </div>
  );
};

export default SponsorCard;
