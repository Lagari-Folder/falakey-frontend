import unkownProfile from "../../public/images/unkown-profile.png";
import { Button } from "./ui/button";
import { Author } from "@/models/author";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { useTrans } from "@/utils/translation";

const ProfileCard = ({
  img,
  author,
  authorUsername,
  description,
  showMessageModalHandler,
}: {
  img?: string;
  author?: Author;
  authorUsername?: string;
  description: string;
  showMessageModalHandler: () => void;
}) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { t } = useTrans();
  return (
    <div className="space-y-3 border rounded-md p-7 w-full max-w-[400px]">
      <div className="flex gap-2">
        <img
          src={img || unkownProfile}
          alt={author?.display_name}
          className="rounded-full size-[50px] object-cover"
        />
        <div>
          <div className="font-bold text-xl">{author!.display_name}</div>
          <a
            className="text-primary text-xs cursor-pointer"
            href={`/author/${authorUsername}`}
          >
            {t("author.view_profile")}
          </a>
        </div>
      </div>
      <div className="line-clamp-4">{description}</div>

      {user && author?.id !== user!.id && (
        <Button onClick={showMessageModalHandler} className="w-full text-white">
          {t("author.send_message")}
        </Button>
      )}
    </div>
  );
};

export default ProfileCard;
