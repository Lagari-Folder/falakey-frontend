import { Type } from "@/models/type";
import falakeyLogo from "../../../public/images/falakey-logo.svg";
import falakeyArabicLogo from "../../../public/images/falakey-arabic-logo.png";

import SearchInput from "../SearchInput";
import { Link } from "react-router-dom";
import { useTrans } from "@/utils/translation";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";

const HomeBanner = ({
  slogan,
  author,
  authorSlug,
  categoryVar,
  homeImage,
  typeOptions,
  bannerPosition,
}: {
  slogan: string;
  author: string;
  authorSlug: string;
  categoryVar?: string;
  homeImage?: string;
  typeOptions: Type[];
  bannerPosition?: string;
}) => {
  const { t } = useTrans();
  const { local } = useSelector((state: RootState) => state.translation);

  return (
    <>
      <div
        className="h-full  lg:flex-1  rounded-3xl overflow-hidden relative bg-cover  flex flex-col justify-between p-6 items-start"
        style={{
          // backgroundImage: `url(${homeImage})`,
          backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0) 70%), url(${homeImage})`,
          backgroundPosition: bannerPosition,
        }}
      >
        <img
          src={local == "ar" ? falakeyArabicLogo : falakeyLogo}
          className="h-[40px] w-fit object-contain object-left"
          style={{ width: "fit-content" }}
          alt="Flakey Logo"
        />
        <div className="flex flex-col w-full">
          <div className="xl:text-4xl lg:text-3xl sm:text-2xl text-lg  font-bold text-white">
            {slogan}
          </div>
          <div className="flex w-full justify-between ">
            <div className="w-[70%] xl:block hidden">
              <SearchInput categoryVar={categoryVar} options={typeOptions} />
            </div>
            <div className="flex justify-end text-start me-4">
              <Link
                to={`/${local}/author/@${authorSlug}`}
                className="font-semibold rounded-md flex items-center space-x-1 hover:text-blue-500"
              >
                <span className="text-gray-400/80 sm:text-md  text-[0.7rem]">
                  {t("home.photo_by")}{" "}
                </span>
                <span> </span>
                <span className="text-white text-xs text-[0.7rem]">
                  {author}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeBanner;
