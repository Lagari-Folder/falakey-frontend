import { useTrans } from "@/utils/translation";

const CustomTextArea = ({
  title,
  description,
  required,
  onChange,
  value,
  disabled,
}: {
  title: string;
  description?: string;
  required?: boolean;
  onChange: (s: string) => void;
  value: string;
  disabled: boolean;
}) => {
  const { t } = useTrans();
  return (
    <div className="my-1">
      <div className="flex items-center gap-2 text-gray-400 mb-2">
        {title}
        {required ? (
          <div className="size-[10px] bg-red-300 rounded-full"></div>
        ) : (
          <div>({t("common.optional")})</div>
        )}
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full px-2 h-[100px] ${
          disabled ? "text-gray-400" : ""
        } bg-[#dddddd] focus-within:outline-none rounded-md mb-1`}
        disabled={disabled}
      />
      <div className="text-gray-300 text-sm">{description}</div>
    </div>
  );
};

export default CustomTextArea;
