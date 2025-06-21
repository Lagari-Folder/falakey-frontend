import CustomTextArea from "@/components/AccountDetailsDashboard/CustomTextArea";
import CustomInputField from "@/components/AccountDetailsDashboard/CustomInputField";
import { Button } from "@/components/ui/button";
import CloseIcon from "@mui/icons-material/Close";
import unkownProfile from "../../public/images/unkown-profile.png";
import { useEffect, useState } from "react";
import { useUserHook } from "@/helper/userHook";
import { User } from "@/models/user";
import { useDispatch } from "react-redux";
import { login } from "@/lib/slices/authSlice";
import { useTrans } from "@/utils/translation";

const AccountDetailsDashboard = () => {
  const [avatarHover, setAvatarHover] = useState(false);
  // const [coverHover, setCoverHover] = useState(false);

  const [avatar, setAvatar] = useState<File | null>();
  // const [cover, setCover] = useState<File | null>();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [reNewPassword, setReNewPassword] = useState("");

  const dispatch = useDispatch();
  const { getUserData, updateUserData, user, loading } = useUserHook();

  const [userData, setUserData] = useState<User>({
    id: 0,
  });

  const handleSocialMediaChange = (platform: string, value: string) => {
    const updatedSocialMedia = [...(userData.social_media || [])];
    const index = updatedSocialMedia.findIndex(
      (item) => item.platform === platform
    );

    if (value.trim() === "") {
      if (index !== -1) {
        updatedSocialMedia.splice(index, 1);
      }
    } else if (index !== -1) {
      updatedSocialMedia[index].value = value;
    } else {
      updatedSocialMedia.push({ platform, value });
    }
    setUserData({ ...userData, social_media: updatedSocialMedia });
  };

  useEffect(() => {
    if (user) {
      setUserData(user);
      dispatch(login({ user: user }));
    }
  }, [user]);

  useEffect(() => {
    getUserData();
  }, []);
  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setAvatar(event.target.files[0]);
    }
  };

  // const handleCoverUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   if (event.target.files && event.target.files[0]) {
  //     setCover(event.target.files[0]);
  //   }
  // };

  const handleRemoveAvatar = () => {
    setAvatar(null);
  };

  // const handleRemoveCover = () => {
  //   setCover(null);
  // };

  const getAvatarSrc = () => {
    if (avatar) {
      return URL.createObjectURL(avatar);
    }
    return userData.avatar || unkownProfile;
  };

  // const getCoverSrc = () => {
  //   if (cover) {
  //     return URL.createObjectURL(cover);
  //   }
  //   return userData.cover || unkownProfile; // Fallback for cover image
  // };

  const { t } = useTrans();

  return (
    <>
      <div className="md:w-[50%] relative w-full mx-auto">
        <div className="text-3xl font-bold lg:text-start text-center  mb-12 flex justify-between">
          <div>{t("account_details.title")}</div>
        </div>

        <div>
          <div className="grid grid-cols-2 gap-4">
            <CustomInputField
              value={
                userData.first_name == undefined ? "" : userData.first_name
              }
              onChange={(s: string) =>
                setUserData({ ...userData, first_name: s || "" })
              }
              title={t("account_details.first_name")}
              required
              disabled={loading}
            />
            <CustomInputField
              value={userData.last_name == undefined ? "" : userData.last_name}
              onChange={(s: string) =>
                setUserData({ ...userData, last_name: s || "" })
              }
              title={t("account_details.last_name")}
              required
              disabled={loading}
            />
          </div>
          <CustomInputField
            value={userData.display_name || ""}
            onChange={(s: string) =>
              setUserData({ ...userData, display_name: s })
            }
            title={t("account_details.display_name")}
            description={t("account_details.display_name_description")}
            required
            disabled={loading}
          />
          <CustomInputField
            value={userData.email || ""}
            onChange={(s: string) => setUserData({ ...userData, email: s })}
            title={t("account_details.email")}
            required
            disabled={loading}
          />
          <div className="grid grid-cols-2 gap-4">
            <CustomInputField
              value={
                userData.social_media?.find(
                  (item) => item.platform === "instagram"
                )?.value || ""
              }
              onChange={(s: string) => handleSocialMediaChange("instagram", s)}
              title={t("account_details.instagram")}
              disabled={loading}
            />
            <CustomInputField
              value={
                userData.social_media?.find(
                  (item) => item.platform === "facebook"
                )?.value || ""
              }
              onChange={(s: string) => handleSocialMediaChange("facebook", s)}
              title={t("account_details.facebook")}
              disabled={loading}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <CustomInputField
              value={
                userData.social_media?.find(
                  (item) => item.platform === "pinterest"
                )?.value || ""
              }
              onChange={(s: string) => handleSocialMediaChange("pinterest", s)}
              title={t("account_details.pinterest")}
              disabled={loading}
            />
            <CustomInputField
              value={
                userData.social_media?.find(
                  (item) => item.platform === "linkedin"
                )?.value || ""
              }
              onChange={(s: string) => handleSocialMediaChange("linkedin", s)}
              title={t("account_details.linkedin")}
              disabled={loading}
            />
          </div>
          <div className="flex gap-2">
            <input
              checked={userData.available_for_hire! ?? false}
              onChange={(e) => {
                setUserData({
                  ...userData,
                  available_for_hire: e.target.checked || false,
                });
              }}
              type="checkbox"
            />
            <div className="text-gray-400">
              {t("account_details.available_for_hire")}
            </div>
          </div>

          <div className="font-bold text-lg my-4 ">
            {t("account_details.password_change")}
          </div>
          <CustomInputField
            value={oldPassword}
            onChange={(s: string) => setOldPassword(s)}
            title={t("account_details.current_password")}
            disabled={loading}
          />
          <CustomInputField
            value={newPassword}
            onChange={(s: string) => setNewPassword(s)}
            title={t("account_details.new_password")}
            disabled={loading}
          />
          <CustomInputField
            value={reNewPassword}
            onChange={(s: string) => setReNewPassword(s)}
            title={t("account_details.confirm_new_password")}
            disabled={loading}
          />
          <div className="font-bold text-lg my-4">
            {t("account_details.avatar")}
          </div>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="avatar-upload"
                className={`block text-center w-fit text-white font-bold ${
                  loading ? "bg-primary/60" : "bg-primary"
                } text-sm py-2 px-4 rounded-md cursor-pointer`}
              >
                {t("account_details.upload_avatar")}
              </label>
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
                className="hidden"
                disabled={loading}
              />
              <div className="text-gray-400 text-xs">
                {t("account_details.max_size")}
              </div>
              <div
                className="relative w-[120px] h-[120px] border border-gray-300 rounded-sm"
                onMouseEnter={() => setAvatarHover(true)}
                onMouseLeave={() => setAvatarHover(false)}
              >
                {avatarHover && (
                  <div
                    className="absolute bg-[#f9eaec] hover:bg-red-500 hover:text-white text-red-500 transition-all duration-300 -top-[12.5px] right-1/2 translate-x-[50%] size-[25px] rounded-full flex items-center justify-center cursor-pointer"
                    onClick={handleRemoveAvatar}
                  >
                    <CloseIcon className="!text-[13px]" />
                  </div>
                )}
                <img
                  src={getAvatarSrc()}
                  className="w-full h-full object-cover border-4 border-white rounded-lg"
                  alt="Avatar"
                />
              </div>
            </div>
          </div>
          {/* <div className="font-bold text-lg my-4">Cover Image</div>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="cover-upload"
                className="block text-center w-fit text-white font-bold bg-primary text-sm py-2 px-4 rounded-md cursor-pointer"
              >
                Upload Cover
              </label>
              <input
                id="cover-upload"
                type="file"
                accept="image/*"
                onChange={handleCoverUpload}
                className="hidden"
              />
              <div className="text-gray-400 text-xs">
                Maximum upload file size: 1,024 MB.
              </div>
              <div
                className="relative w-full h-[120px] border border-gray-300 rounded-sm"
                onMouseEnter={() => setCoverHover(true)}
                onMouseLeave={() => setCoverHover(false)}
              >
                {coverHover && (
                  <div
                    className="absolute bg-[#f9eaec] hover:bg-red-500 hover:text-white text-red-500 transition-all duration-300 -top-[12.5px] right-1/2 translate-x-[50%] size-[25px] rounded-full flex items-center justify-center cursor-pointer"
                    onClick={handleRemoveCover}
                  >
                    <CloseIcon className="!text-[13px]" />
                  </div>
                )}
                <img
                  src={getCoverSrc()}
                  className="w-full h-full object-cover border-4 border-white rounded-lg"
                  alt="Cover"
                />
              </div>
            </div>
          </div> */}
          <CustomTextArea
            value={userData.bio || ""}
            onChange={(s: string) => setUserData({ ...userData, bio: s })}
            title={t("account_details.biography")}
            disabled={loading}
          />
          <Button
            disabled={loading}
            onClick={() => {
              updateUserData(
                userData,
                oldPassword,
                newPassword,
                reNewPassword,
                avatar
              );
            }}
            className="text-white my-4 text-md font-bold py-4"
          >
            {loading
              ? t("account_details.loading")
              : t("account_details.save_changes")}
          </Button>
        </div>
      </div>
    </>
  );
};

export default AccountDetailsDashboard;
