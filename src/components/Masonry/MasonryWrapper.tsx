import { useEffect, useState, useRef } from "react";
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
}) => {
  const { width } = useWindowSize();
  const [columnCount, setColumnCount] = useState(3);
  const [modalDataSlug, setModalDataSlug] = useState<string>();
  const searchState = useSelector((state: RootState) => state.search);

  const {local} = useSelector((state: RootState) => state.translation)

  const previousURLRef = useRef<string | null>(null);

  // Manage body scroll when modal is open
  useEffect(() => {
    if (modalDataSlug) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [modalDataSlug]);

  // ✅ Handle click to open modal and save previous route
  const handleCardClick = (slug: string) => {
    previousURLRef.current = window.location.pathname + window.location.search;
    window.history.pushState({ modalOpen: true }, "", `/${local}/listing/${slug}`);
    setModalDataSlug(slug);
  };

  // ✅ Close modal and go back to previous URL
  const closeModal = () => {
    if (previousURLRef.current) {
      window.history.back(); // This will trigger popstate and modal will close in there
    } else {
      setModalDataSlug(undefined); // fallback if no history exists
    }
  };

  // ✅ Listen to back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      setModalDataSlug(undefined);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Handle responsive column layout
  useEffect(() => {
    if (searchState.types == "vector") {
      if (width >= 1000) {
        setColumnCount(4);
      } else if (width >= 850) {
        setColumnCount(3);
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
