import { useTrans } from "@/utils/translation";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const AvailableForHire = ({
  available,
  username,
  gray,
}: {
  available: boolean;
  username?: string;
  gray?: boolean;
}) => {
  const { t } = useTrans();

  return available ? (
    <a
      className={` text-sm text-start cursor-pointer whitespace-nowrap`}
      style={{
        color: gray ? "#eee" : "#007fff",
        fontWeight: "300",
      }}
      href={`/author/${username}`}
    >
      {t("common.available_hire")} <CheckCircleIcon className="!text-sm" />
    </a>
  ) : (
    <div></div>
  );
};

export default AvailableForHire;
