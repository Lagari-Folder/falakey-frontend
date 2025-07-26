// PremiumButton.tsx
import { useState } from "react";
import { useTrans } from "@/utils/translation";
import { StarIcon } from "@radix-ui/react-icons";
import { DownloadData, Post } from "@/models/post";
import { useNavigateWithLocale } from "@/helper/navigateWithLocale";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import DownloadButton from "./DownloadButton";
import AuthenticationModal from "../Authentication/AuthenticationModal";
import { apiRequest } from "@/utils/apiRequest";

const PremiumButton = ({
  post,
  selected,
}: {
  post: Post;
  selected: DownloadData;
}) => {
  const { t } = useTrans();
  const navigate = useNavigateWithLocale();
  const [open, setOpen] = useState(false);
  const [insufficientCredits, setInsufficientCredits] = useState(false);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);
  const [openAuthModal, setOpenAuthModal] = useState(false);

  const { user, token, isLoggedIn } = useSelector(
    (state: RootState) => state.auth
  );

  const handlePurchase = async () => {
    if ((user?.wallet?.credits ?? 0) < (post.premium_credits ?? 0)) {
      setInsufficientCredits(true);
    } else {
      await apiRequest({
        method: "POST",
        url: "monetization/posts/purchase",
        data: {
          post_id: post.id,
          credits: post.premium_credits,
        },
        token: token!,
        withLocale: true,
        showError: true,
        showSuccess: true,
      });
      setPurchaseSuccess(true);
      setOpen(false);
    }
  };

  const handleOpen = () => {
    if (!isLoggedIn) {
      setOpenAuthModal(true);
    } else {
      setOpen(true);
    }
  };

  const handleBuyCredits = () => {
    navigate(`/my-account/plans`);
    setInsufficientCredits(false);
    setOpen(false);
  };

  return (
    <>
      {post.is_purchased || purchaseSuccess ? (
        <DownloadButton selected={selected} />
      ) : (
        <button
          onClick={() => handleOpen()}
          className="h-[45px] px-4 gap-2 flex bg-yellow-500 text-white rounded-md items-center justify-center transition hover:bg-yellow-600 font-semibold text-sm w-full"
          title={`${t("post.premium")} - ${post.premium_credits ?? 0} credits`}
        >
          <StarIcon fontSize="small" />
          <p>{t("post.download")}</p>
        </button>
      )}
      {openAuthModal && <AuthenticationModal modalHandler={setOpenAuthModal} />}

      {open && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center px-4">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md space-y-4 animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-800">
              {t("post.premium_confirm_title")}
            </h2>
            <p className="text-gray-600">{t("post.premium_confirm_message")}</p>

            <div className="border-t pt-4 space-y-2 text-sm text-gray-700">
              <div>
                <span className="font-semibold">{t("post.title")}: </span>
                <span className="text-primary font-medium">{post.title}</span>
              </div>
              <div>
                <span className="font-semibold">
                  {t("post.credits_required")}:{" "}
                </span>
                <span className="text-yellow-600 font-bold">
                  {post.premium_credits ?? 0}
                </span>
              </div>
              <div>
                <span className="font-semibold">
                  {t("post.your_credits")}:{" "}
                </span>
                <span className="text-green-700 font-semibold">
                  {user?.wallet?.credits ?? 0}
                </span>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md"
              >
                {t("common.cancel")}
              </button>
              <button
                onClick={handlePurchase}
                className="px-4 py-2 bg-yellow-500 text-white hover:bg-yellow-600 rounded-md"
              >
                {t("common.confirm_purchase")}
              </button>
            </div>
          </div>
        </div>
      )}

      {insufficientCredits && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center px-4">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md space-y-4">
            <h2 className="text-xl font-bold text-red-600">
              {t("post.not_enough_credits")}
            </h2>
            <p className="text-gray-700">
              {t("post.need_more_credits_message")}
            </p>
            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={() => setInsufficientCredits(false)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
              >
                {t("common.cancel")}
              </button>
              <button
                onClick={handleBuyCredits}
                className="px-4 py-2 bg-primary text-white hover:bg-opacity-90 rounded"
              >
                {t("post.buy_credits")}
              </button>
            </div>
          </div>
        </div>
      )}

      {purchaseSuccess && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center px-4">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md space-y-4">
            <h2 className="text-xl font-bold text-green-600">
              {t("post.purchase_success_title")}
            </h2>
            <p className="text-gray-700">
              {t("post.purchase_success_message")}
            </p>
            <div className="flex justify-end pt-4">
              <button
                onClick={() => setPurchaseSuccess(false)}
                className="px-4 py-2 bg-green-500 text-white hover:bg-green-600 rounded"
              >
                {t("common.close")}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PremiumButton;
