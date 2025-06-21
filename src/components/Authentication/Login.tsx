import { faArrowRotateRight, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Input } from "@mui/material";
import googleIcon from "../../../public/icons/google-icon.svg";
import { useState } from "react";
import { useTrans } from "@/utils/translation";

const Login = ({
  goToForget,
  submitForm,
  loading,
  message,
  error,
  googleUrl,
}: {
  goToForget: () => void;
  submitForm: (name: string, password: string) => void;
  loading: boolean;
  message: string;
  error: string;
  googleUrl?: string;
}) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleNameChange = (s: string) => {
    setName(s);
  };
  const handlePasswordChange = (s: string) => {
    setPassword(s);
  };

  const { t } = useTrans();

  return (
    <div className="gap-4 flex flex-col">
      {/* Sign In Section */}
      <p className="text-[32px] font-bold mb-[24px]">
        {t("authentication.welcome_back")}
      </p>
      {googleUrl ? (
        <a
          href={googleUrl}
          className="flex items-center bg-[#222229] rounded-md p-2 pl-5 pr-5 text-[16px] font-bold relative w-full"
        >
          {/* Google Icon aligned to the start */}
          <img
            src={googleIcon}
            alt="google icon"
            className="mr-3 absolute left-5"
          />

          {/* Centered Text */}
          <span className="flex-grow text-center">
            {t("authentication.continue_with_google")}
          </span>
        </a>
      ) : (
        <div className="flex items-center bg-[#222229] rounded-md p-2 pl-5 pr-5 text-[16px] font-bold relative w-full">
          <img
            src={googleIcon}
            alt="google icon"
            className="mr-3 absolute left-5"
          />

          {/* Centered Text */}
          <span className="flex-grow text-center">
            {t("authentication.loading_google_url")}
          </span>
        </div>
      )}
      {/* Your Sign In form here */}
      <div className="flex items-center w-full my-4 mt-[24px] mb-[24px]">
        <div className="flex-grow border-t border-gray-500"></div>
        <span className=" px-2 text-white font-bold text-sm rounded text-[11px]">
          {t("authentication.or")}
        </span>
        <div className="flex-grow border-t border-gray-500"></div>
      </div>
      <div className="inputs flex flex-col gap-5 items-center">
        <Input
          disableUnderline={true}
          fullWidth={true}
          className="bg-[#222229] text-white rounded-md p-1 pl-5 pr-5"
          inputProps={{
            style: { color: "white" }, // Text color
            placeholder: t("authentication.username_or_email"),
            className: "placeholder-white", // Use a custom class for placeholder color
          }}
          onChange={(e) => {
            handleNameChange(e.target.value);
          }}
        />
        <Input
          disableUnderline={true}
          type="password"
          fullWidth={true}
          className="bg-[#222229] text-white rounded-md p-1 pl-5 pr-5"
          inputProps={{
            style: { color: "white" }, // Text color
            placeholder: t("authentication.password"),
            className: "placeholder-white", // Use a custom class for placeholder color
          }}
          onChange={(e) => {
            handlePasswordChange(e.target.value);
          }}
        />

        <button
          className="text-gray-300 text-[16px]  w-fit"
          onClick={goToForget}
        >
          <FontAwesomeIcon icon={faLock} size="xs" />{" "}
          {t("authentication.lost_password")}{" "}
        </button>
      </div>
      <div>{message}</div>
      <div className="text-red-500">{error}</div>
      <div className="signIn">
        {loading ? (
          <div className="flex items-center justify-center bg-[#222229] rounded-md h-[50px] p-2 pl-5 pr-5 text-[16px] font-bold w-full">
            <FontAwesomeIcon
              icon={faArrowRotateRight}
              className="animate-spin"
            />
          </div>
        ) : (
          <button
            onClick={() => submitForm(name, password)}
            className="flex items-center justify-center bg-[#222229] rounded-md h-[50px] p-2 pl-5 pr-5 text-[16px] font-bold w-full"
          >
            {t("authentication.login")}
          </button>
        )}
      </div>
    </div>
  );
};

export default Login;
