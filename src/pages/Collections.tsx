import CollectionCard from "@/components/Collections/CollectionCard";
import SEO from "@/components/Common/SEO";
import { collectionsData } from "@/lib/data";
import { useTrans } from "@/utils/translation";

const Collections = () => {
  const { t } = useTrans();
  return (
    <>
      <SEO title="Collections" description="" type="article" name="Falakey" />

      <div className="header justify-center items-center flex flex-col flex-wrap">
        <div className="explore w-[1320px] max-w-full px-4">
          <div className="py-[48px]">
            <div className="sm:text-[70px] text-[40px] font-bold mb-[16px]">
              {t("navbar.collections")}
            </div>
          </div>
          <div className=" gap-4 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mb-12">
            {collectionsData.map((data, index) => (
              <CollectionCard
                key={index}
                images={data.images}
                title={data.title}
                tags={data.tags}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Collections;
