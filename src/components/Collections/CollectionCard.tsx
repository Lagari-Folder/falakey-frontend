import { RootState } from "@/lib/store";
import { useSelector } from "react-redux";

const CollectionCard = ({
  images,
  title,
  tags,
}: {
  images: string[];
  title: string;
  tags: string[];
}) => {
  const { local } = useSelector((state: RootState) => state.translation);

  return (
    <a className="w-full cursor-pointer" href={`/${local}/collection/` + title}>
      <div className="h-[285px]  flex gap-1 justify-between rounded-[10px] overflow-hidden">
        <img
          src={images[0]}
          alt={title}
          className="h-full w-[60%] object-cover"
        />

        <div className="h-full flex flex-col gap-1 justify-between w-[40%]">
          <img
            src={images[1]}
            alt={title}
            className="h-[60%] w-full object-cover"
          />
          <img
            src={images[2]}
            alt={title}
            className="h-[40%] w-full object-cover"
          />
        </div>
      </div>
      <div className="text-lg font-bold my-3 mx-4">{title}</div>
      <div className="mx-2 flex flex-wrap gap-2">
        {tags.slice(0, 6).map((tag, index) => (
          <div
            key={index}
            className="bg-[#f5f5f5] text-gray-700 py-1 px-3 rounded-sm border-[0.5px] hover:bg-white transition-colors"
          >
            {tag}
          </div>
        ))}
        {tags.length > 6 && (
          <div className="bg-[#f5f5f5] text-gray-700 py-1 px-3 rounded-sm border-[0.5px] hover:bg-white transition-colors leading-3 text-xl font-bold">
            ...
          </div>
        )}
      </div>
    </a>
  );
};

export default CollectionCard;
