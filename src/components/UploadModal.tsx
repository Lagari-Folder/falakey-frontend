import { Button } from "./ui/button";
import uploadImg from "../../public/images/upload-modal.svg";
import uploadAdd from "../../public/icons/upload-add.svg";
import { useEffect, useRef, useState } from "react";
import UploadedData from "./Authentication/UploadedData";
import { Tag } from "@/models/tag";
import { Collection } from "@/models/collection";
import { getFileTemp } from "@/helper/postHook";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { UploadParam } from "@/models/uploadParam";
import confetti from "canvas-confetti";
import { useUploadHook } from "@/helper/uploadHook";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useTrans } from "@/utils/translation";

const UploadModal = ({
  modalHandler,
  filtering,
}: {
  modalHandler: (b: boolean) => void;
  filtering?: { key: string; value: string }[];
}) => {
  const [uploadData, setUploadData] = useState<UploadParam[]>([]);
  const [imageDataLoading, setImageDataLoading] = useState(false);
  const maxUploads = filtering?.some((item) => item.key === "challenge_id")
    ? 1
    : 10;
  const acceptUpload = "image/*,application/postscript";
  const fileInputRef = useRef<HTMLInputElement>(null);
  const fireConfetti = (particleRatio: number, options = {}) => {
    const particleCount = 200;

    confetti({
      ...options,
      particleCount: Math.floor(particleCount * particleRatio),
      zIndex: 99999,
    });
  };

  const fireConfettiRealistic = (options = {}) => {
    fireConfetti(0.25, {
      ...options,
      spread: 26,
      startVelocity: 55,
    });
    fireConfetti(0.2, {
      ...options,
      spread: 60,
    });
    fireConfetti(0.35, {
      ...options,
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });
    fireConfetti(0.1, {
      ...options,
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });
    fireConfetti(0.1, {
      ...options,
      spread: 120,
      startVelocity: 45,
    });
  };

  const confettiHandler = () => {
    // Bottom-left confetti
    fireConfettiRealistic({
      origin: { y: 1, x: 0 }, // Bottom-left corner
      angle: 45, // Diagonal launch direction
    });

    // Bottom-right confetti
    fireConfettiRealistic({
      origin: { y: 1, x: 1 }, // Bottom-right corner
      angle: 135, // Diagonal launch direction
    });
  };

  const handleImageToUploadData = (files: File[]) => {
    if (files.length > 0) {
      setImageDataLoading(true);

      files.slice(0, maxUploads - uploadData.length).forEach((file) => {
        let height = 0;
        let width = 0;

        const updateUploadData = (
          file: File,
          width: number,
          height: number,
          thumbnail?: File // now storing a File object
        ) => {
          setUploadData((prevFiles: UploadParam[]) => [
            ...prevFiles,
            {
              id: prevFiles.length,
              img: {
                tempPath: undefined,
                previewUrl: undefined,
                file: file,
                loading: true,
                width: width,
                height: height,
                thumbnail: thumbnail, // Store the thumbnail as a File
              },
            },
          ]);
        };

        if (file.type.startsWith("video")) {
          const video = document.createElement("video");
          video.src = URL.createObjectURL(file);
          video.crossOrigin = "anonymous";
          video.muted = true;
          video.currentTime = 1; // skip black frames at start

          video.addEventListener("loadedmetadata", () => {
            width = video.videoWidth;
            height = video.videoHeight;

            const canvas = document.createElement("canvas");
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext("2d");

            if (!ctx) return;

            video.play();

            video.addEventListener("seeked", () => {
              ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

              // Convert canvas image to Blob
              canvas.toBlob((thumbnailBlob) => {
                if (thumbnailBlob) {
                  // Convert Blob to File
                  const thumbnailFile = new File(
                    [thumbnailBlob],
                    `thumbnail-${file.name}.jpg`,
                    { type: "image/jpeg" }
                  );

                  // Pass thumbnail File into updateUploadData
                  updateUploadData(file, width, height, thumbnailFile);
                }
              }, "image/jpeg");
            });
          });
        } else {
          // If it's an image, directly update uploadData without thumbnail
          updateUploadData(file, width, height);
        }

        // Continue with getFileTemp logic...
        getFileTemp(file, token!)
          .then((result) => {
            if (result["success"]) {
              setUploadData((prevFiles: UploadParam[]) =>
                prevFiles.map((uploadFile) =>
                  uploadFile.img!.file === file
                    ? {
                        ...uploadFile,
                        img: {
                          ...uploadFile.img,
                          tempPath: result["temp_path"],
                          previewUrl: result["preview_url"],
                          loading: false,
                        },
                      }
                    : uploadFile
                )
              );
            } else {
              setUploadData((prevFiles: UploadParam[]) =>
                prevFiles.filter((uploadFile) => uploadFile.img!.file !== file)
              );

              Swal.fire({
                title: "Error!",
                text: result["message"] ?? "",
                icon: "error",
              });
            }
          })
          .catch((e) => {
            setUploadData((prevFiles: UploadParam[]) =>
              prevFiles.filter((uploadFile) => uploadFile.img!.file !== file)
            );

            Swal.fire({
              title: "Error!",
              text: e["response"]["data"]["message"] ?? "",
              icon: "error",
            });
          })
          .finally(() => {
            setImageDataLoading(false);
          });
      });
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // Prevent the file from opening in a new tab
    e.stopPropagation();

    const droppedFiles = Array.from(e.dataTransfer.files); // Convert FileList to an array

    handleImageToUploadData(droppedFiles);

    e.currentTarget.classList.remove("bg-gray-200"); // Remove drag-over background
  };

  const handleRemove = (id: number) => {
    setUploadData((prevData) => [...prevData.filter((data) => data.id != id)]);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    e.currentTarget.classList.add("bg-gray-200");
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    e.currentTarget.classList.remove("bg-gray-200");
  };

  const handleClick = () => {
    if (fileInputRef.current != null) {
      fileInputRef.current.click();
    }
  };

  const { token } = useSelector((state: RootState) => state.auth);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);

    handleImageToUploadData(selectedFiles);
  };

  const handleLockChange = (id: number, locked: boolean) => {
    setUploadData((prevData) =>
      prevData.map((data) =>
        data.id === id ? { ...data, isLocked: locked ? "true" : "false" } : data
      )
    );
  };
  const handleTitleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    const newTitle = e.target.value;

    setUploadData((prevData) =>
      prevData.map((data) =>
        data.id === id ? { ...data, title: newTitle } : data
      )
    );
  };

  const handleLocationChange = (
    id: number,
    location: { name?: string; long?: string; lag?: string }
  ) => {
    setUploadData((prevData) =>
      prevData.map((data) =>
        data.id === id ? { ...data, location: location } : data
      )
    );
  };

  const handleTagsChanges = (id: number, tags: Tag[]) => {
    setUploadData((prevData) =>
      prevData.map((data) => (data.id === id ? { ...data, tags: tags } : data))
    );
  };
  const handleCollectionsChanges = (id: number, collections: Collection[]) => {
    setUploadData((prevData) =>
      prevData.map((data) =>
        data.id === id ? { ...data, collections: collections } : data
      )
    );
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    id: number
  ) => {
    const newDescription = e.target.value;

    setUploadData((prevData) =>
      prevData.map((data) =>
        data.id === id ? { ...data, description: newDescription } : data
      )
    );
  };

  const { uploadPosts, successUpload } = useUploadHook();

  useEffect(() => {
    if (successUpload.success) {
      modalHandler(false);
      confettiHandler();
      Swal.fire({
        title: t("upload_modal.success"),
        text: successUpload.message ?? "",
        icon: "success",
      });
    } else {
      if (successUpload.message)
        Swal.fire({
          title: "Error!",
          text: successUpload.message ?? "",
          icon: "error",
        });
    }
  }, [successUpload]);

  const { t } = useTrans();

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-95 flex justify-center items-center z-30">
        {successUpload.loading && (
          <div className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 z-40">
            <FontAwesomeIcon
              icon={faSpinner}
              className="size-[100px] animate-spin  "
              style={{ animationDuration: "2000ms" }}
            />
          </div>
        )}
        {successUpload.loading && (
          <div
            className="bg-black/30 absolute top-0 bottom-0 left-0 right-0 z-50"
            onClick={(e) => e.stopPropagation()}
          ></div>
        )}

        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={` bg-white sm:w-[90%] ${
            uploadData.length > 0 ? "h-[95%]" : "h-[60%]"
          }  w-full m-4 p-4 rounded-lg shadow-lg flex flex-col justify-between items-start`}
          onClick={(e) => e.stopPropagation()}
        >
          <div>{t("upload_modal.title")}</div>
          {uploadData.length > 0 ? (
            <div className="w-full h-full overflow-auto">
              {uploadData.length == maxUploads ? (
                <div className="relative border-dashed border-2 w-full h-fit my-3 p-4 flex flex-col justify-center items-center opacity-70">
                  <img
                    src={uploadAdd}
                    className="object-contain w-full h-[50px]"
                  />
                  <div className="text-red-500 mt-2">
                    {t("upload_modal.max_items")}
                  </div>
                </div>
              ) : (
                <div
                  className="relative lg:mx-0 mx-auto border-dashed border-2 w-[500px] h-fit  my-3 p-4 flex flex-col justify-center items-center"
                  onClick={handleClick}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                >
                  <input
                    type="file"
                    accept={acceptUpload}
                    multiple
                    className="absolute hidden h-full w-full"
                    src=""
                    alt=""
                    ref={fileInputRef}
                    onChange={handleFileChange}
                  />
                  <img
                    src={uploadAdd}
                    className="object-contain w-full h-[50px]"
                    alt=""
                  />
                  <div className="text-primary mt-2">
                    {t("upload_modal.add_up_to")}{" "}
                    {maxUploads - uploadData.length}{" "}
                    {t("upload_modal.more_items")}
                  </div>
                </div>
              )}
              <div className="w-full flex justify-center lg:justify-start flex-wrap gap-2">
                {uploadData.map((data, index) => (
                  <UploadedData
                    key={index}
                    data={data}
                    handleDescriptionChange={(e, id) =>
                      handleDescriptionChange(e, id)
                    }
                    handleLocationChange={(id, value) =>
                      handleLocationChange(id, value)
                    }
                    handleTagsChanges={(id, tags) =>
                      handleTagsChanges(id, tags)
                    }
                    handleCollectionsChanges={(id, collections) =>
                      handleCollectionsChanges(id, collections)
                    }
                    handleTitleChange={(e, id) => handleTitleChange(e, id)}
                    handleRemove={(id) => handleRemove(id)}
                    handleLock={(id, locked) => handleLockChange(id, locked)}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div
              className="relative border-dashed border-2 w-full h-[80%] flex flex-col justify-center items-center"
              onClick={handleClick}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              <input
                type="file"
                accept={acceptUpload}
                multiple
                className="absolute hidden h-full w-full"
                src=""
                alt=""
                ref={fileInputRef}
                onChange={handleFileChange}
              />
              <img
                src={uploadImg}
                className="object-contain w-full sm:h-[50%] h-[30%]"
                alt=""
              />
              <div className="text-primary text-center md:text-3xl sm:text-xl text-sm sm:mb-8 ">
                {t("upload_modal.drag_and_drop")}
              </div>
              <ul className="grid sm:grid-cols-3 grid-cols-2 gap-x-4 mx-1 text-primary sm:text-xs text-[10px]">
                <li>&#8226; {t("upload_modal.img_clear")}</li>
                <li>&#8226; {t("upload_modal.zero_tolerance")}</li>
                <li>&#8226; {t("upload_modal.read_terms")}</li>
                <li>&#8226; {t("upload_modal.you_own")}</li>
                <li>&#8226; {t("upload_modal.respect_others")}</li>
              </ul>
            </div>
          )}
          <div className="w-full  flex justify-end gap-3 mt-1">
            <Button
              onClick={() => modalHandler(false)}
              className="text-black bg-custom-gray font-semibold hover:text-white hover:bg-primary"
            >
              {t("common.close")}
            </Button>
            <Button
              className="text-white bg-primary font-semibold"
              disabled={imageDataLoading}
              onClick={() => {
                if (!successUpload.loading) uploadPosts(uploadData, filtering);
              }}
            >
              {t("upload_modal.submit")}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadModal;
