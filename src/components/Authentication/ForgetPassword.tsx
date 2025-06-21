import { resetPassword, sendOTPEmail } from "@/helper/authHook";
import { useTrans } from "@/utils/translation";
import { Input } from "@mui/material";
import { useState } from "react";

const ForgetPassword = ({ switchToLogin }: { switchToLogin: () => void }) => {
  const [otpSent, setOtpSent] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const { t } = useTrans();

  return (
    <div className="forgetPass">
      <p className="text-[32px] font-bold mb-[24px]">
        {t("forget_password.title")}
      </p>
      <p className="text-[15px] mb-[24px]">
        {t("forget_password.description")}
      </p>
      {otpSent ? (
        <>
          <Input
            disableUnderline={true}
            fullWidth={true}
            className="bg-[#222229] text-white rounded-md p-1 pl-5 pr-5 mb-[24px]"
            inputProps={{
              style: { color: "white" }, // Text color
              placeholder: t("forget_password.password_placeholder"),
              className: "placeholder-white", // Use a custom class for placeholder color
            }}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <Input
            disableUnderline={true}
            fullWidth={true}
            className="bg-[#222229] text-white rounded-md p-1 pl-5 pr-5 mb-[24px]"
            inputProps={{
              style: { color: "white" }, // Text color
              placeholder: t("forget_password.confirm_password_placeholder"),
              className: "placeholder-white", // Use a custom class for placeholder color
            }}
            value={passwordConfirmation}
            onChange={(e) => {
              setPasswordConfirmation(e.target.value);
            }}
          />
          <Input
            disableUnderline={true}
            fullWidth={true}
            className="bg-[#222229] text-white rounded-md p-1 pl-5 pr-5 mb-[24px]"
            inputProps={{
              style: { color: "white" }, // Text color
              placeholder: t("forget_password.otp_placeholder"),
              className: "placeholder-white", // Use a custom class for placeholder color
            }}
            value={otp}
            onChange={(e) => {
              setOtp(e.target.value);
            }}
          />
        </>
      ) : (
        <Input
          disableUnderline={true}
          fullWidth={true}
          className="bg-[#222229] text-white rounded-md p-1 pl-5 pr-5 mb-[24px]"
          inputProps={{
            style: { color: "white" }, // Text color
            placeholder: t("forget_password.email_placeholder"),
            className: "placeholder-white", // Use a custom class for placeholder color
          }}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      )}
      <button
        className=" flex items-center justify-center bg-[#222229] rounded-md p-2 pl-5 pr-5 text-[16px] font-bold w-full"
        onClick={() => {
          if (!loading) {
            setLoading(true);
            if (otpSent) {
              resetPassword(email, password, passwordConfirmation, otp)
                .then((result) => {
                  if (result) {
                    switchToLogin();
                  }
                })
                .finally(() => {
                  setLoading(false);
                });
            } else {
              sendOTPEmail(email)
                .then((result) => {
                  setOtpSent(result);
                })
                .finally(() => {
                  setLoading(false);
                });
            }
          }
        }}
      >
        {loading
          ? t("loading")
          : otpSent
          ? t("submit_otp_button")
          : t("reset_password_button")}
      </button>
    </div>
  );
};

export default ForgetPassword;
