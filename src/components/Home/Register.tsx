import { Input } from "@mui/material";
import googleIcon from "../../../public/icons/google-icon.svg";
import { useState } from "react";
import { faArrowRotateRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTrans } from "@/utils/translation";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";

const Register = ({
  loading,
  submitForm,
  message,
  error,
  googleUrl,
}: {
  loading: boolean;
  submitForm: (
    u: string,
    e: string,
    f: string,
    l: string,
    p: string,
    pc: string,
    t: boolean
  ) => void;
  message: string;
  error: string;
  googleUrl?: string;
}) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setpassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const [checked, setChecked] = useState(false);

  const handleCheckChange = () => {
    setChecked(!checked);
  };

  const { t } = useTrans();
  const { local } = useSelector((state: RootState) => state.translation);

  return (
    <div>
      {/* Form contents go here */}
      <p className="text-[32px] font-bold mb-[24px]">
        {t("authentication.create_your_account")}
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

      <div className="flex items-center w-full my-4 mt-[24px] mb-[24px]">
        <div className="flex-grow border-t border-gray-500"></div>
        <span className="px-2 text-white font-bold text-sm rounded text-[11px]">
          {t("authentication.or")}
        </span>
        <div className="flex-grow border-t border-gray-500"></div>
      </div>

      <form className="flex flex-col gap-6">
        <Input
          disableUnderline={true}
          fullWidth={true}
          className="bg-[#222229] text-white rounded-md p-1 pl-5 pr-5"
          inputProps={{
            style: { color: "white" },
            placeholder: t("authentication.username"),
            className: "placeholder-white",
          }}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <Input
          disableUnderline={true}
          type="email"
          fullWidth={true}
          className="bg-[#222229] text-white rounded-md p-1 pl-5 pr-5"
          inputProps={{
            style: { color: "white" },
            placeholder: t("authentication.email"),
            className: "placeholder-white",
          }}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />

        <div className="moreInfo grid grid-cols-2 gap-6">
          <Input
            disableUnderline={true}
            fullWidth={true}
            className="bg-[#222229] text-white rounded-md p-1 pl-5 pr-5"
            inputProps={{
              style: { color: "white" },
              placeholder: t("authentication.first_name"),
              className: "placeholder-white",
            }}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
          <Input
            disableUnderline={true}
            fullWidth={true}
            className="bg-[#222229] text-white rounded-md p-1 pl-5 pr-5"
            inputProps={{
              style: { color: "white" },
              placeholder: t("authentication.last_name"),
              className: "placeholder-white",
            }}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
          <Input
            disableUnderline={true}
            type="password"
            fullWidth={true}
            className="bg-[#222229] text-white rounded-md p-1 pl-5 pr-5"
            inputProps={{
              style: { color: "white" },
              placeholder: t("authentication.password"),
              className: "placeholder-white",
            }}
            onChange={(e) => {
              setpassword(e.target.value);
            }}
          />
          <Input
            disableUnderline={true}
            type="password"
            fullWidth={true}
            className="bg-[#222229] text-white rounded-md p-1 pl-5 pr-5"
            inputProps={{
              style: { color: "white" },
              placeholder: t("authentication.confirm_password"),
              className: "placeholder-white",
            }}
            onChange={(e) => {
              setPasswordConfirmation(e.target.value);
            }}
          />
        </div>

        <div className="flex items-center ">
          {/* Custom Checkbox */}
          <div
            onClick={handleCheckChange}
            className={`w-6 h-6 border-2 cursor-pointer rounded-sm flex items-center justify-center ${
              checked
                ? "bg-[#222229] border-[#222229]"
                : "bg-white border-gray-400"
            } transition-all duration-300 ease-in-out`}
          >
            {checked && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-4 h-4 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            )}
          </div>

          {/* Text */}
          <a
            href={`/${local}/privacy-policy`}
            target="_blank"
            className="ml-2 text-sm text-purple-800"
          >
            {t("authentication.privacy_agreement")}
          </a>
        </div>
        <div>{message}</div>
        <div className="text-red-500">{error}</div>
        {loading ? (
          <div className="flex items-center justify-center bg-[#222229] rounded-md h-[50px] p-2 pl-5 pr-5 text-[16px] font-bold w-full">
            <FontAwesomeIcon
              icon={faArrowRotateRight}
              className="animate-spin"
            />
          </div>
        ) : (
          <button
            onClick={() => {
              submitForm(
                username,
                email,
                firstName,
                lastName,
                password,
                passwordConfirmation,
                checked
              );
            }}
            type="submit"
            className="flex items-center justify-center bg-[#222229] rounded-md h-[50px] p-2 pl-5 pr-5 text-[16px] font-bold w-full"
          >
            {t("authentication.create_your_account")}
          </button>
        )}
      </form>
    </div>
  );
};

export default Register;
