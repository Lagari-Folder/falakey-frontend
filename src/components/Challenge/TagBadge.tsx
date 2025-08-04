import { RootState } from "@/lib/store";
import { useSelector } from "react-redux";

const TagBadge = ({
  dot,
  title,
  href,
  black,
  red,
}: {
  dot?: boolean;
  title: string;
  href?: string;
  black?: boolean;
  red?: boolean;
}) => {
  const { dir } = useSelector((state: RootState) => state.translation);
  return (
    <a
      href={href}
      dir={dir}
      target="_blank"
      className={`flex items-center gap-2 border rounded-full py-2 px-3 ${
        black ? "border-[#dfdfe0] text-black" : "border-white text-white"
      } ${
        href != null ? "cursor-pointer" : "cursor-default"
      } font-semibold text-sm`}
    >
      {dot && (
        <div
          className={`rounded-full size-[7px] ${
            red ? "bg-red-600 animate-ping" : "bg-white"
          }`}
        ></div>
      )}
      {title}
    </a>
  );
};

export default TagBadge;
