import { useParams } from "react-router-dom";

import { useEffect, useState } from "react";

// Platform icons

import AuthorHeader from "@/components/Author/AuthorHeader";
import { getPublicUserData } from "@/helper/userHook";
import { User } from "@/models/user";
import SEO from "@/components/Common/SEO";
import { useDispatch, useSelector } from "react-redux";
import { search } from "@/lib/slices/searchSlice";
import { RootState } from "@/lib/store";
import MasonryWrapper from "@/components/Masonry/MasonryWrapper";
import { useNavigateWithLocale } from "@/helper/navigateWithLocale";

const Author = () => {
  const navigate = useNavigateWithLocale();
  const { username } = useParams();
  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState<User>();
  const dispatch = useDispatch();
  const { token } = useSelector((state: RootState) => state.auth);

  dispatch(search({}));
  useEffect(() => {
    if (username) {
      setLoading(true);
      getPublicUserData(username, token!)
        .then((result) => {
          if (result![0]) setUser(result![1]);
        })
        .catch(() => {
          navigate("/");
        })
        .finally(() => setLoading(false));
    }
  }, [username, token]);

  return (
    <>
      <SEO
        title={`Author | ${user?.display_name || username}`}
        description=""
        type="article"
        name="Falakey"
      />

      <div className="min-h-screen flex flex-col gap-20 items-center justify-start p-4 mt-8">
        <AuthorHeader author={user} loading={loading} />
        <div className="w-full bg-white flex flex-col items-center">
          <MasonryWrapper
            title=""
            classTitle="text-3xl mb-6"
            screenWidth="w-[95%]"
            stringFiltering={`author=${username}`}
          />
        </div>
      </div>
    </>
  );
};

export default Author;
