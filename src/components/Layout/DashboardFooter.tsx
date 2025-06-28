import { useTrans } from "@/utils/translation";

const DashboardFooter = () => {
  const { t } = useTrans();
  return (
    <div className="text-sm text-gray-500 font-extralight mb-3">
      {t("footer.copy_right")} {new Date().getFullYear()}.
    </div>
  );
};

export default DashboardFooter;
