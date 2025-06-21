import {
  faClose,
  faLocationDot,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import UploadAutoComplete from "../Upload/UploadAutoComplete";
import { Tag } from "@/models/tag";
import { Collection } from "@/models/collection";
import { useSearchBoxCore } from "@mapbox/search-js-react";
import { CircularProgress } from "@mui/material";
import { UploadParam } from "@/models/uploadParam";
import { useUploadHook } from "@/helper/uploadHook";

import loadingImage from "../../../public/icons/star-icon.svg";
import { useTrans } from "@/utils/translation";

const UploadedData = ({
  data: uploadedData,
  handleRemove,
  handleLocationChange,
  handleTitleChange,
  handleTagsChanges,
  handleCollectionsChanges,
  handleDescriptionChange,
}: {
  data: UploadParam;
  handleRemove: (id: number) => void;
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
}) => {
  const [locationSearch, setLocationSearch] = useState(false);
  const [suggesedSearchs, setSuggesedSearchs] = useState([]);
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationSelected, setLocationSelected] = useState(true);
  const [locationSelectedName, setLocationSelectedName] = useState("");

  const [isLoaded, setIsLoaded] = useState(false);

  const { data, getTags, getCollections } = useUploadHook();

  useEffect(() => {
    getTags();
    getCollections();
  }, []);

  // const CustomSearchBox = SearchBox as unknown as React.FC<SearchBoxProps>;
  const searchBoxCore = useSearchBoxCore({
    accessToken:
      "pk.eyJ1IjoiZmFsYWtleSIsImEiOiJjbHhrc2J2ZzYwNGd3MmpxdTBpMDh0amdkIn0.k4lwuQTMngYvNp76lcIycA",
  });

  const { t } = useTrans();

  return (
    <div className="w-[500px] min-h-[520px]">
      <div className="relative h-[570px] w-full">
        <div className="absolute right-0 left-0 top-0 bottom-0 hover:opacity-100 opacity-0 transition-opacity ease-in duration-200 z-20">
          <div className="w-full flex justify-end text-white">
            <div
              className="rounded-full size-[30px] m-3 bg-black/80 flex justify-center items-center cursor-pointer"
              onClick={() => handleRemove(uploadedData.id)}
            >
              <FontAwesomeIcon icon={faClose} />
            </div>
          </div>
        </div>
        <div className="relative h-full w-full flex items-center justify-center">
          {uploadedData.img?.loading && (
            <div className="h-full w-full z-20 flex items-center justify-center absolute bg-white/20">
              <FontAwesomeIcon
                icon={faSpinner}
                className="size-[30px] animate-spin"
                style={{ animationDuration: "2000ms" }}
              />
            </div>
          )}
          {uploadedData.img!.file?.type == "video/mp4" ? (
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
                    : "z-10 "
                }`}
                alt="Uploaded Image"
                onLoad={() => {
                  setIsLoaded(true);
                }}
              />
            </div>
          )}
        </div>
        {locationSearch ? (
          <div className="absolute bottom-1  left-1 right-1 rounded-md h-[40px] flex items-center px-1 bg-white z-20">
            <FontAwesomeIcon icon={faLocationDot} className="mx-1" />
            <input
              type="text"
              className="h-full w-full px-1 focus-visible:outline-none"
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
                    // TODO: Change this to the user ID
                    sessionToken: "test-123",
                  })
                  .then((result) => {
                    setSuggesedSearchs(result["suggestions"] as []);
                    setLocationLoading(false);
                  });
              }}
            />
            {locationLoading ? (
              <CircularProgress className="!text-primary !w-[30px] !h-[30px] mx-1" />
            ) : (
              <FontAwesomeIcon
                icon={faClose}
                onClick={() => {
                  setLocationSelected(true);
                  setLocationSearch(false);
                  setLocationSelectedName("");
                  handleLocationChange(uploadedData.id, {});
                }}
                className="mx-1 cursor-pointer"
              />
            )}
            {!locationLoading &&
              suggesedSearchs.length > 0 &&
              !locationSelected && (
                <div className="absolute top-full mt-2 left-0 right-0 z-50 max-h-[200px] overflow-y-scroll  shadow-md rounded-md ">
                  {suggesedSearchs.map((suggested) => (
                    <div
                      className="w-full h-full bg-white py-1 px-1 hover:bg-gray-100"
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
                      <div className="font-bold text-sm">
                        {suggested["name"]}
                      </div>
                      <div className="text-sm text-gray-500">
                        {suggested["place_formatted"]}
                      </div>
                    </div>
                  ))}
                </div>
              )}
          </div>
        ) : (
          <div
            className="absolute bottom-3 left-3 text-white text-lg bg-black rounded-full py-2 px-4 cursor-pointer z-20"
            onClick={() => setLocationSearch(true)}
          >
            <FontAwesomeIcon icon={faLocationDot} />{" "}
            {t("uploaded_data.add_location")}
          </div>
        )}
      </div>
      <input
        type="text"
        className="border border-gray-400 w-full h-[45px] px-3 placeholder:text-gray-600"
        placeholder={t("uploaded_data.title_placeholder")}
        onChange={(e) => handleTitleChange(e, uploadedData.id)}
      />

      <UploadAutoComplete
        label={t("uploaded_data.tags_placeholder")}
        values={data.tags ?? []}
        setSelectedValues={(values: Tag[]) =>
          handleTagsChanges(uploadedData.id, values)
        }
      />
      <UploadAutoComplete
        label={t("uploaded_data.collection_placeholder")}
        values={data.collections ?? []}
        setSelectedValues={(values: Collection[]) =>
          handleCollectionsChanges(uploadedData.id, values)
        }
      />
      <textarea
        className="border border-gray-400 w-full h-[90px] px-3 placeholder:text-gray-600"
        placeholder={t("uploaded_data.description_placeholder")}
        onChange={(e) => handleDescriptionChange(e, uploadedData.id)}
      />
    </div>
  );
};

export default UploadedData;
