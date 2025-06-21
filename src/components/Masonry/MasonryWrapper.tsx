import { useEffect, useState } from "react";
import CardDetailModal from "../CardDetailModal";
import MasonryLayout from "./MasonryLayout";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import useWindowSize from "@/helper/windowSizing";

const MasonryWrapper = ({
  title,
  screenWidth,
  classTitle,
  stringFiltering,
}: {
  title: string;
  screenWidth?: string;
  classTitle?: string;
  stringFiltering?: string;
  resetDataRef?: React.RefObject<{ resetData: () => void }>;
}) => {
  const { width } = useWindowSize();
  const [columnCount, setColumnCount] = useState(3);
  const [modalDataSlug, setModalDataSlug] = useState<string>();
  const searchState = useSelector((state: RootState) => state.search);

  useEffect(() => {
    if (modalDataSlug) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [modalDataSlug]);

  const handleCardClick = (slug: string) => {
    window.history.pushState({ modalOpen: true }, "", `/listing/${slug}`);
    setModalDataSlug(slug);
  };

  const closeModal = () => {
    setModalDataSlug(undefined);
  };

  useEffect(() => {
    const handleBackButton = () => {
      if (modalDataSlug !== undefined) {
        setModalDataSlug(undefined);
      }
    };

    window.addEventListener("popstate", handleBackButton);

    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, [modalDataSlug]);

  useEffect(() => {
    if (searchState.types == "vector") {
      if (width >= 1000) {
        setColumnCount(4);
      } else if (width >= 850) {
        setColumnCount(3);
      } else if (width >= 500) {
        setColumnCount(2);
      } else {
        setColumnCount(2);
      }
    } else if (searchState.types == "icon") {
      if (width >= 1250) {
        setColumnCount(5);
      } else if (width >= 1050) {
        setColumnCount(4);
      } else if (width >= 850) {
        setColumnCount(3);
      } else if (width >= 650) {
        setColumnCount(2);
      } else {
        setColumnCount(2);
      }
    } else {
      if (width >= 1250) {
        setColumnCount(3);
      } else if (width >= 850) {
        setColumnCount(2);
      } else {
        setColumnCount(1);
      }
    }
  }, [width, searchState.types]);

  return (
    <>
      {modalDataSlug && (
        <CardDetailModal
          slug={modalDataSlug}
          onCardClick={handleCardClick}
          closeModalWithClick={closeModal}
        />
      )}
      <MasonryLayout
        title={title}
        screenWidth={screenWidth}
        classTitle={classTitle}
        columnCount={columnCount}
        stringFiltering={stringFiltering}
        selectedSlug={modalDataSlug}
        handleOpenCard={handleCardClick}
      />
    </>
  );
};

export default MasonryWrapper;
