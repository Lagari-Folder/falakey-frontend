import { useTrans } from "@/utils/translation";
import { faArrowRight, faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";

const AccountTypesSelection = ({
  selectHandler,
}: {
  selectHandler: () => void;
}) => {
  const { t } = useTrans();

  return (
    <div className="btsChoice gap-5 flex flex-col">
      <p className="text-[32px] font-bold mb-[24px]">
        {t("account_types.lets_get_started")}
      </p>

      <button
        className="w-full bg-[#222229] rounded-md flex flex-col justify-between items-start p-4 gap-3"
        onClick={selectHandler}
      >
        <div className="flex justify-between items-center w-full">
          <span className="font-bold flex items-center text-[18px]">
            <FontAwesomeIcon icon={faCamera} className="mr-2" />
            {t("account_types.upload_photos")}
          </span>
          <FontAwesomeIcon icon={faArrowRight} />
        </div>
        <span className="text-sm text-[#87878b] text-start text-[16px]">
          {t("account_types.upload_photos_description")}
        </span>
      </button>

      <button
        className="w-full bg-[#222229] rounded-md flex flex-col justify-between items-start p-4 gap-3"
        onClick={selectHandler}
      >
        <div className="flex justify-between items-center w-full">
          <span className="font-bold flex items-center text-[18px]">
            <ShoppingBasketIcon className="mr-2" />
            {t("account_types.buy_images")}
          </span>
          <FontAwesomeIcon icon={faArrowRight} />
        </div>
        <span className="text-sm text-[#87878b] text-start text-[16px]">
          {t("account_types.buy_images_description")}
        </span>
      </button>
    </div>
  );
};

export default AccountTypesSelection;
