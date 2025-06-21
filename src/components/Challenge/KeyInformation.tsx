import { useNavigateWithLocale } from "@/helper/navigateWithLocale";
import { RootState } from "@/lib/store";
import { Challenge } from "@/models/challenge";
import { useTrans } from "@/utils/translation";
import { Avatar, AvatarGroup } from "@mui/material";
import { useSelector } from "react-redux";

const KeyInformation = ({
  data,
  setOpenUploadModal,
}: {
  data?: Challenge;
  setOpenUploadModal: (b: boolean) => void;
}) => {
  const navigate = useNavigateWithLocale();
  const { t } = useTrans();
    const { local } = useSelector((state: RootState) => state.translation);

  return (
    <div className="lg:border border-[#dfdfe0] lg:p-[32px] rounded-lg w-full h-fit lg:w-[450px]">
      <p className="text-start max-lg:hidden text-[27px] font-bold">
        {t("challenge.key_information")}
      </p>
      <div className="challenge-deadline my-[25px] flex flex-wrap gap-[10px] items-center">
        <div className="deadline-calender w-[48px] h-[48px] border-[1px] border-[#dfdfe0] flex flex-col rounded-lg items-center justify-center py-0 leading-none">
          <span className="text-[#ff0000] text-[12px]">
            {new Date(data?.end_date ?? "")
              .toLocaleString("en-US", { month: "short" })
              .toUpperCase()}
          </span>
          <span className="text-[16px] font-bold">
            {new Date(data?.end_date ?? "").getDate()}
          </span>
        </div>
        <div className="submission h-[48px] flex flex-col">
          <span>{t("challenge.deadline")}</span>
          <span className="text-start font-semibold">
            <p>
              {data?.days_left ?? 0 > 0
                ? (data?.days_left.toString() ?? "") + t("challenge.days_left")
                : t("challenge.ended")}
            </p>
          </span>
        </div>
      </div>

      <div
        className="links w-full bg-black text-white py-[10px] text-[14px] font-bold rounded-lg cursor-pointer"
        onClick={() => {
          if (data?.days_left ?? 0 > 0) {
            setOpenUploadModal(true);
          } else {
            navigate("/challenge");
          }
        }}
      >
        {data?.days_left ?? 0 > 0
          ? "Join The Challenge"
          : "See Open Challenges"}
      </div>
      <div className="links w-full py-[10px] text-[14px]">
        <a href={`/${local}/license`} target="_blank">
          <u>{t("challenge.terms_and_conditions")}</u>
        </a>
      </div>
      <div className="challenge-users w-full flex gap-[10px]">
        <div dir="ltr" className="avatars justify-start w-fit">
          <AvatarGroup max={3} spacing={"small"}>
            {data?.participants.avatars.map((avatar) => (
              <Avatar alt="Remy Sharp" src={avatar} />
            ))}
          </AvatarGroup>
        </div>
        <div className="submission h-[48px] flex flex-col">
          <span className="text-start">
            <b>{data?.participants.description}</b>
          </span>
          <span className="text-[14px] text-start">
            {t("challenge.joined")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default KeyInformation;
