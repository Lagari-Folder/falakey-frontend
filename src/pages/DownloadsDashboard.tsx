import { useDownloadHook } from "@/helper/downloadHook";
import { useTrans } from "@/utils/translation";
import { useEffect } from "react";

const DownloadsDashboard = () => {
  const { getDownloads, data, loading } = useDownloadHook();

  useEffect(() => {
    getDownloads();
  }, []);

  const { t } = useTrans();
  return (
    <>
      <div className="sm:px-8 md:px-12 xl:px-16">
        {/* Title */}
        <h1 className="text-[24px] sm:text-[28px] md:text-[30px] font-semibold font-lexend text-left mb-6">
          {t("download.title")}
        </h1>
        {loading ? (
          <div className="text-xl">{t("download.loading")}</div>
        ) : (
          <div className="flex flex-wrap gap-3">
            {data?.map((download) => (
              <a
                className="w-[250px] relative  rounded-lg overflow-hidden flex flex-col gap-2 cursor-pointer"
                href={`/listing/${download.slug}`}
              >
                <img
                  src={download.preview_links?.thumb}
                  className="aspect-square object-cover  shadow-md"
                  alt={download.title}
                />
                <div className="w-full h-full absolute hover:bg-black/40 bg-black/15"></div>
                <div className="absolute bottom-0 left-0 right-0 px-2 text-white">
                  {download.title}
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default DownloadsDashboard;
