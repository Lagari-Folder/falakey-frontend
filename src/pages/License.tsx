import SEO from "@/components/Common/SEO";
import { useTrans } from "@/utils/translation";

export const License = () => {
  const { t } = useTrans();

  return (
    <>
      <SEO
        title={t("seo.license_title")}
        description={t("seo.license_description")}
      />
      <div className="px-6 lg:px-12 xl:px-20 py-8 bg-gray-50 text-black font-noto">
        <div className="max-w-7xl mx-auto">
          {/* Main Title */}
          <h1
            className="mb-4 text-[70px] font-bold leading-[110%] break-words font-lexend"
            style={{ marginTop: 0, marginBottom: "1rem" }}
          >
            Content License
          </h1>

          {/* Intro Section */}
          <section className="mb-8 mt-14">
            <p className="text-base mb-4">
              Welcome to <b>FalaKey</b>!
            </p>
            <p className="text-base mb-4">
              <b>FalaKey</b> is a vibrant community of authors, artists, and
              creators sharing royalty-free images, video, audio, and other
              media. We refer to this collectively as <b>“Content”</b>. By
              accessing and using Content, or by contributing Content, you agree
              to comply with our Content License.
            </p>
            <p className="text-base">
              At <b>FalaKey</b>, we like to keep things as simple as possible.
              For this reason, we have created this short summary of our Content
              License.
            </p>
          </section>

          {/* Allowed Actions */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 font-lexend text-[37.28px]">
              What are you allowed to do with Content?
            </h2>
            <p className="text-base mb-6">
              Subject to the Prohibited Uses (see below), the Content License
              allows users to:
            </p>
            <table className="table-auto w-full border-collapse border border-1 border-black text-left text-base">
              <tbody>
                <tr>
                  <td className=" border border-1 border-black px-4 py-2 text-green-500">
                    ✓
                  </td>
                  <td className="border border-1 border-black px-4 py-2">
                    Use Content for free
                  </td>
                </tr>
                <tr>
                  <td className=" border border-1 border-black px-4 py-2 text-green-500">
                    ✓
                  </td>
                  <td className=" border border-1 border-black px-4 py-2">
                    Use Content without having to attribute the author (although
                    giving credit is always appreciated by our community!)
                  </td>
                </tr>
                <tr>
                  <td className=" border border-1 border-black px-4 py-2 text-green-500">
                    ✓
                  </td>
                  <td className=" border border-1 border-black px-4 py-2">
                    Modify or adapt Content into new works
                  </td>
                </tr>
              </tbody>
            </table>
          </section>

          {/* Prohibited Uses */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 font-lexend text-[37.28px]">
              What are you not allowed to do with Content?
            </h2>
            <p className="text-base mb-6">
              We refer to these as Prohibited Uses which include:
            </p>
            <table className="table-auto w-full border-collapse border border-1 border-black text-left text-base">
              <tbody>
                <tr>
                  <td className="border border-1 border-black px-4 py-2 text-red-500">
                    ✕
                  </td>
                  <td className="border border-1 border-black px-4 py-2">
                    You cannot sell or distribute Content (either in digital or
                    physical form) on a Standalone basis. Standalone means where
                    no creative effort has been applied to the Content and it
                    remains in substantially the same form as it exists on our
                    website.
                  </td>
                </tr>
                <tr>
                  <td className="border border-1 border-black px-4 py-2 text-red-500">
                    ✕
                  </td>
                  <td className="border border-1 border-black px-4 py-2">
                    If Content contains any recognisable trademarks, logos or
                    brands, you cannot use that Content for commercial purposes
                    in relation to goods and services. In particular, you cannot
                    print that Content on merchandise or other physical products
                    for sale.
                  </td>
                </tr>
                <tr>
                  <td className="border border-1 border-black px-4 py-2 text-red-500">
                    ✕
                  </td>
                  <td className="border border-1 border-black px-4 py-2">
                    You cannot use Content in any immoral or illegal way,
                    especially Content which features recognisable people.
                  </td>
                </tr>
                <tr>
                  <td className="border border-1 border-black px-4 py-2 text-red-500">
                    ✕
                  </td>
                  <td className="border border-1 border-black px-4 py-2">
                    You cannot use Content in a misleading or deceptive way.
                  </td>
                </tr>
                <tr>
                  <td className="border border-1 border-black px-4 py-2 text-red-500">
                    ✕
                  </td>
                  <td className="border border-1 border-black px-4 py-2">
                    You cannot use any of the Content as part of a trade-mark,
                    design-mark, trade-name, business name or service mark.
                  </td>
                </tr>
              </tbody>
            </table>
          </section>
          <p className="text-base mb-6">
            Please be aware that certain Content may be subject to additional
            intellectual property rights (such as copyrights, trademarks, design
            rights), moral rights, proprietary rights, property rights, privacy
            rights or similar. It is your responsibility to check whether you
            require the consent of a third party or a license to use Content.
          </p>
        </div>
      </div>
    </>
  );
};
