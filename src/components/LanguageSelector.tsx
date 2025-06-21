"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { change } from "@/lib/slices/transSlice";
import { FaGlobe } from "react-icons/fa";
import { RootState } from "@/lib/store";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useTrans } from "@/utils/translation";

const LanguageSelector = () => {
  const dispatch = useDispatch();
  const locale = useSelector((state: RootState) => state.translation.local);
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);


  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleLocaleChange = (value: string) => {
    dispatch(
      change({
        local: value,
        dir: value === "ar" ? "rtl" : "ltr",
      })
    );
    setOpen(false);
  };

  const renderContent = () => (
    <div className="flex flex-col space-y-3">
      <Button
        variant={locale === "en" ? "default" : "outline"}
        className={`${locale === "en" ? "text-white" : "text-black"}`}
        onClick={() => handleLocaleChange("en")}
      >
        English
      </Button>
      <Button
        variant={locale === "ar" ? "default" : "outline"}
        className={`${locale === "ar" ? "text-white" : "text-black"}`}
        onClick={() => handleLocaleChange("ar")}
      >
        العربية
      </Button>
    </div>
  );

  const { t } = useTrans();

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-100 transition"
      >
        <FaGlobe className="text-xl text-gray-600" />
        <span className="hidden lg:inline text-sm capitalize">
          {locale === "ar" ? "العربية" : "English"}
        </span>
      </button>

      {isMobile ? (
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent side="bottom" className="p-6">
            <h2 className="text-lg font-bold mb-4">
              {t("navbar.select_language")}
            </h2>
            {renderContent()}
          </SheetContent>
        </Sheet>
      ) : (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-sm text-center p-6">
            <h2 className="text-lg font-bold mb-4">
              {t("navbar.select_language")}
            </h2>
            {renderContent()}
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default LanguageSelector;
