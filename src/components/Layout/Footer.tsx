import { RootState } from "@/lib/store";
import { useTrans } from "@/utils/translation";
import { useSelector } from "react-redux";

const Footer = () => {
  const { t } = useTrans();
    const { local } = useSelector((state: RootState) => state.translation);

  return (
    <div className="bg-white border-t-2 w-full">
      <div className="flex justify-center">
        <div className="mt-12 mx-3 mb-4 flex flex-wrap sm:justify-between justify-center items-center w-size text-sm font-semibold text-gray-600">
          <div className="flex gap-5 ">
            <div>{t("footer.about_us")}</div>
            <div>
              <a href={`/${local}/license`}>{t("footer.content_license")}</a>
            </div>
          </div>
          <div>{t("footer.copy_right")}</div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
