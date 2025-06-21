import logo from "../../../public/images/falakey-logo-secondary.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import AuthenticationModal from "../Authentication/AuthenticationModal";
import UploadModal from "../UploadModal";
import { useNavigateWithLocale } from "@/helper/navigateWithLocale";
const SecondaryNavbar = ({ color }: { color?: string }) => {
  const navigate = useNavigateWithLocale();

  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [openUploadModal, setOpenUploadModal] = useState(false);

  useEffect(() => {
    if (openAuthModal || openUploadModal) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [openAuthModal, openUploadModal]);

  return (
    <div
      className={`w-full flex justify-center z-10 bg-${
        color ?? "white"
      } shadow-md`}
    >
      <div className="w-size flex justify-between items-center pt-4 pb-3 mx-2">
        <div
          className="h-full w-[150px] flex items-center justify-center cursor-pointer"
          onClick={() => {
            navigate("/");
          }}
        >
          <img src={logo} alt="Logo" className="object-cover" />
        </div>
        <div className="flex flex-wrap items-center sm:justify-center justify-end sm:gap-6 text-white font-bold text-sm">
          <div
            className="flex items-center justify-center gap-3 cursor-pointer"
            onClick={() => setOpenAuthModal(true)}
          >
            <div className="bg-custom-gray text-primary rounded-full h-[30px] w-[30px] flex justify-center items-center text-center">
              <FontAwesomeIcon icon={faLock} className="text-primary" />
            </div>
            <div className="text-primary">Sign in</div>
          </div>
          <div
            className="cursor-pointer text-primary"
            onClick={() => setOpenUploadModal(true)}
          >
            Upload
          </div>
        </div>
      </div>

      {openAuthModal && <AuthenticationModal modalHandler={setOpenAuthModal} />}
      {openUploadModal && <UploadModal modalHandler={setOpenUploadModal} />}
    </div>
  );
};

export default SecondaryNavbar;
