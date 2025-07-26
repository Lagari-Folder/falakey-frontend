import { DownloadData } from "@/models/post";
import { useTrans } from "@/utils/translation";
import DownloadingIcon from "@mui/icons-material/Downloading";

const DownloadButton = ({ selected }: { selected?: DownloadData }) => {
  const { t } = useTrans();

  return (
    <a
      href={selected?.link}
      className="h-[45px] w-full px-2 gap-2 flex bg-[#b17ece] text-white rounded-md items-center justify-center"
    >
      <p>{t("post.download")}</p>
      <span className="flex items-center justify-center">
        <DownloadingIcon fontSize="small" />
      </span>
    </a>
  );
};

export default DownloadButton;
