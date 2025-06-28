import {
  faClose,
  faLocationDot,
  faLock,
  faLockOpen,
  faSpinner,
  faCrown,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import UploadAutoComplete from "../Upload/UploadAutoComplete";
import { Tag } from "@/models/tag";
import { Collection } from "@/models/collection";
import { useSearchBoxCore } from "@mapbox/search-js-react";
import { CircularProgress, Tooltip } from "@mui/material";
import { UploadParam } from "@/models/uploadParam";
import { useUploadHook } from "@/helper/uploadHook";
import loadingImage from "../../../public/icons/star-icon.svg";
import { useTrans } from "@/utils/translation";

const UploadedData = ({
  data: uploadedData,
  handleRemove,
  handleLock,
  handleLocationChange,
  handleTitleChange,
  handleTagsChanges,
  handleCollectionsChanges,
  handleDescriptionChange,
  handlePremiumChange,
}: {
  data: UploadParam;
  handleRemove: (id: number) => void;
  handleLock: (id: number, locked: boolean) => void;
  handleLocationChange: (
    id: number,
    location: {
      name?: string;
      long?: string;
      lat?: string;
    }
  ) => void;
  handleTitleChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => void;
  handleTagsChanges: (id: number, tags: Tag[]) => void;
  handleCollectionsChanges: (id: number, tags: Collection[]) => void;
  handleDescriptionChange: (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    id: number
  ) => void;
  handlePremiumChange: (id: number, isPremium: boolean) => void;
}) => {
  const [locationSearch, setLocationSearch] = useState(false);
  const [suggestedSearches, setSuggestedSearches] = useState([]);
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationSelected, setLocationSelected] = useState(true);
  const [locationSelectedName, setLocationSelectedName] = useState("");
  const [contentType, setContentType] = useState<"free" | "premium" | "locked">(
    uploadedData.isPremium ? "premium" : uploadedData.isLocked ? "locked" : "free"
  );
  const [isLoaded, setIsLoaded] = useState(false);

  const { data, getTags, getCollections } = useUploadHook();

  useEffect(() => {
    getTags();
    getCollections();
  }, []);

  const searchBoxCore = useSearchBoxCore({
    accessToken:
      "pk.eyJ1IjoiZmFsYWtleSIsImEiOiJjbHhrc2J2ZzYwNGd3MmpxdTBpMDh0amdkIn0.k4lwuQTMngYvNp76lcIycA",
  });

  const { t } = useTrans();

  const handleContentTypeChange = (type: "free" | "premium" | "locked") => {
    setContentType(type);

    // Update both lock and premium states based on selection
    if (type === "free") {
      handleLock(uploadedData.id, false);
      handlePremiumChange(uploadedData.id, false);
    } else if (type === "premium") {
      handleLock(uploadedData.id, false);
      handlePremiumChange(uploadedData.id, true);
    } else if (type === "locked") {
      handleLock(uploadedData.id, true);
      handlePremiumChange(uploadedData.id, false);
    }
  };

  return (
    <div className="w-[500px] min-h-[520px] bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
      {/* Image/Video Preview Section */}
      <div className="relative h-[400px] w-full bg-gray-100">
        {/* Action Buttons */}
        <div className="absolute right-0 left-0 top-0 bottom-0 hover:opacity-100 opacity-0 transition-opacity ease-in duration-200 z-20">
          <div className="w-full flex justify-between p-3">
            <Tooltip title="Remove this item">
              <button
                className="rounded-full size-10 bg-black/80 hover:bg-red-500/90 flex justify-center items-center cursor-pointer transition-colors"
                onClick={() => handleRemove(uploadedData.id)}
              >
                <FontAwesomeIcon icon={faClose} className="text-white" />
              </button>
            </Tooltip>
          </div>
        </div>

        {/* Media Content */}
        <div className="relative h-full w-full flex items-center justify-center">
          {uploadedData.img?.loading && (
            <div className="h-full w-full z-20 flex items-center justify-center absolute bg-white/20">
              <FontAwesomeIcon
                icon={faSpinner}
                className="size-[30px] animate-spin text-primary"
                style={{ animationDuration: "2000ms" }}
              />
            </div>
          )}

          {uploadedData.img!.file?.type === "video/mp4" ? (
            <video className="w-full h-full object-cover">
              <source
                src={URL.createObjectURL(uploadedData.img!.file!)}
                type=""
              />
            </video>
          ) : (
            <div className="relative w-full h-full flex items-center justify-center">
              {!isLoaded && (
                <img
                  src={loadingImage}
                  loading="lazy"
                  className="absolute inset-0 object-cover self-center bg-white justify-self-center w-[60%] h-[60%]"
                  alt="Loading Image"
                />
              )}

              <img
                src={
                  uploadedData.img?.previewUrl ??
                  (uploadedData.img?.file
                    ? URL.createObjectURL(uploadedData.img.file)
                    : "")
                }
                className={`flex object-contain w-full h-full self-center justify-self-center duration-500 ${
                  uploadedData.img?.loading &&
                  uploadedData.img?.file?.type.startsWith("application")
                    ? "-z-10"
                    : "z-10"
                }`}
                alt="Uploaded Image"
                onLoad={() => {
                  setIsLoaded(true);
                }}
              />
            </div>
          )}
        </div>

        {/* Location Search */}
        {locationSearch ? (
          <div className="absolute bottom-3 left-3 right-3 rounded-md h-[50px] flex items-center px-3 bg-white shadow-lg z-20">
            <FontAwesomeIcon
              icon={faLocationDot}
              className="text-gray-500 mr-2"
            />
            <input
              type="text"
              className="h-full w-full px-2 focus-visible:outline-none text-gray-700"
              value={locationSelectedName}
              onChange={(event) => {
                setLocationSelected(false);
                setLocationLoading(true);
                setLocationSelectedName(event.target.value);
                handleLocationChange(uploadedData.id, {
                  name: event.target.value,
                });
                searchBoxCore
                  .suggest(event.target.value, {
                    sessionToken: "test-123",
                  })
                  .then((result) => {
                    setSuggestedSearches(result["suggestions"] as []);
                    setLocationLoading(false);
                  });
              }}
              placeholder="Search for a location..."
            />
            {locationLoading ? (
              <CircularProgress className="!text-primary !w-[25px] !h-[25px] mx-1" />
            ) : (
              <button
                onClick={() => {
                  setLocationSelected(true);
                  setLocationSearch(false);
                  setLocationSelectedName("");
                  handleLocationChange(uploadedData.id, {});
                }}
                className="text-gray-500 hover:text-gray-700 ml-2"
              >
                <FontAwesomeIcon icon={faClose} />
              </button>
            )}
          </div>
        ) : (
          <Tooltip title="Add location to this content">
            <button
              className="absolute bottom-3 left-3 gap-2 text-white text-lg bg-primary hover:bg-primary-dark rounded-full py-2 px-4 cursor-pointer z-20 flex items-center shadow-md transition-colors"
              onClick={() => setLocationSearch(true)}
            >
              <FontAwesomeIcon icon={faLocationDot} className="mr-2" />
              {t("uploaded_data.add_location")}
            </button>
          </Tooltip>
        )}

        {/* Location Suggestions Dropdown */}
        {!locationLoading &&
          suggestedSearches.length > 0 &&
          !locationSelected && (
            <div className="absolute bottom-16 left-3 right-3 z-50 max-h-[200px] overflow-y-auto bg-white shadow-lg rounded-md border border-gray-200">
              {suggestedSearches.map((suggested, index) => (
                <div
                  key={index}
                  className="w-full p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                  onClick={async () => {
                    await searchBoxCore
                      .retrieve(suggested, {
                        sessionToken: "test-123",
                      })
                      .then((result) => {
                        setLocationSelectedName(
                          result["features"][0]["properties"]["name"]
                        );
                        setLocationSelected(true);
                        handleLocationChange(uploadedData.id, {
                          name: result["features"][0]["properties"]["name"],
                          long: result["features"][0]["geometry"][
                            "coordinates"
                          ][0].toString(),
                          lat: result["features"][0]["geometry"][
                            "coordinates"
                          ][1].toString(),
                        });
                      });
                  }}
                >
                  <div className="font-bold text-sm text-gray-800">
                    {suggested["name"]}
                  </div>
                  <div className="text-xs text-gray-500">
                    {suggested["place_formatted"]}
                  </div>
                </div>
              ))}
            </div>
          )}
      </div>

      {/* Content Details Section */}
      <div className="p-4">
        {/* Title Input */}
        <div className="mb-4">
          <input
            type="text"
            className="w-full h-[45px] px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder-gray-400"
            placeholder={t("uploaded_data.title_placeholder")}
            onChange={(e) => handleTitleChange(e, uploadedData.id)}
          />
        </div>

        {/* Content Type Selection */}
        <div className="mb-4 p-3 bg-gray-50 rounded-md border border-gray-200">
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Content Type
          </h3>
          <div className="grid grid-cols-3 gap-2">
            {/* Free Option */}
            <div
              className={`p-3 rounded-md border cursor-pointer transition-colors ${
                contentType === "free"
                  ? "border-primary bg-primary/10"
                  : "border-gray-300 hover:bg-gray-100"
              }`}
              onClick={() => handleContentTypeChange("free")}
            >
              <div className="flex items-center">
                <div
                  className={`w-4 h-4 rounded-full border mr-2 flex items-center justify-center ${
                    contentType === "free"
                      ? "border-primary bg-primary"
                      : "border-gray-400"
                  }`}
                >
                  {contentType === "free" && (
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  )}
                </div>
                <span className="text-sm">Free</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Anyone can download</p>
            </div>

            {/* Premium Option */}
            <div
              className={`p-3 rounded-md border cursor-pointer transition-colors ${
                contentType === "premium"
                  ? "border-yellow-500 bg-yellow-500/10" 
                  : "border-gray-300 hover:bg-gray-100"
              }`}
              onClick={() => handleContentTypeChange("premium")}
            >
              <div className="flex items-center">
                <div
                  className={`w-4 h-4 rounded-full border mr-2 flex items-center justify-center ${
                    contentType === "premium"
                      ? "border-yellow-500 bg-yellow-500"
                      : "border-gray-400"
                  }`}
                >
                  {contentType === "premium" && (
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  )}
                </div>
                <div className="flex items-center">
                  <FontAwesomeIcon
                    icon={faCrown}
                    className="text-yellow-500 mr-1"
                  />
                  <span className="text-sm">Premium</span>
                  <Tooltip title="Premium content will require credits set by admin">
                    <FontAwesomeIcon
                      icon={faInfoCircle}
                      className="text-gray-400 ml-1 hover:text-gray-600"
                    />
                  </Tooltip>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Requires credits to download
              </p>
            </div>

            {/* Locked Option */}
            <div
              className={`p-3 rounded-md border cursor-pointer transition-colors ${
                contentType === "locked"
                  ? "border-red-500 bg-red-500/10"
                  : "border-gray-300 hover:bg-gray-100"
              }`}
              onClick={() => handleContentTypeChange("locked")}
            >
              <div className="flex items-center">
                <div
                  className={`w-4 h-4 rounded-full border mr-2 flex items-center justify-center ${
                    contentType === "locked"
                      ? "border-red-500 bg-red-500"
                      : "border-gray-400"
                  }`}
                >
                  {contentType === "locked" && (
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  )}
                </div>
                <div className="flex items-center">
                  <FontAwesomeIcon
                    icon={faLock}
                    className="text-red-500 mr-1"
                  />
                  <span className="text-sm">Locked</span>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-1">Not downloadable</p>
            </div>
          </div>

          {/* Status Messages */}
          {contentType === "premium" && (
            <div className="mt-3 flex items-center text-sm text-gray-600 bg-yellow-50 p-2 rounded">
              <FontAwesomeIcon
                icon={faCrown}
                className="text-yellow-500 mr-2"
              />
              This content will require admin-assigned credits to download
            </div>
          )}

          {contentType === "locked" && (
            <div className="mt-3 flex items-center text-sm text-gray-600 bg-blue-50 p-2 rounded">
              <FontAwesomeIcon icon={faLock} className="text-red-500 mr-2" />
              This content will not be downloadable by others
            </div>
          )}
        </div>

        {/* Tags & Collections */}
        <div className="mb-4">
          <UploadAutoComplete
            label={t("uploaded_data.tags_placeholder")}
            values={data.tags ?? []}
            setSelectedValues={(values: Tag[]) =>
              handleTagsChanges(uploadedData.id, values)
            }
          />
        </div>

        <div className="mb-4">
          <UploadAutoComplete
            label={t("uploaded_data.collection_placeholder")}
            values={data.collections ?? []}
            setSelectedValues={(values: Collection[]) =>
              handleCollectionsChanges(uploadedData.id, values)
            }
          />
        </div>

        {/* Description */}
        <div>
          <textarea
            className="w-full h-[90px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder-gray-400"
            placeholder={t("uploaded_data.description_placeholder")}
            onChange={(e) => handleDescriptionChange(e, uploadedData.id)}
          />
        </div>
      </div>
    </div>
  );
};

export default UploadedData;
