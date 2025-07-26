import { useParams } from "react-router-dom";

import { useEffect, useState } from "react";

// Platform icons

import AuthorHeader from "@/components/Author/AuthorHeader";
import { User } from "@/models/user";
import SEO from "@/components/Common/SEO";
import { useDispatch, useSelector } from "react-redux";
import { search } from "@/lib/slices/searchSlice";
import { RootState } from "@/lib/store";
import MasonryWrapper from "@/components/Masonry/MasonryWrapper";
import { useNavigateWithLocale } from "@/helper/navigateWithLocale";
import { apiRequest } from "@/utils/apiRequest";

const Author = () => {
  const navigate = useNavigateWithLocale();
  const { username } = useParams();
  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState<User>();
  const dispatch = useDispatch();
  const { token } = useSelector((state: RootState) => state.auth);
  const previousSearch = useSelector((state: RootState) => state.search);

  dispatch(
    search({
      author: username,
      types: previousSearch.types,
      placeholder: previousSearch.placeholder,
    })
  );
  useEffect(() => {
    if (username) {
      setLoading(true);
      apiRequest({
        method: "GET",
        url: `users/${username}/profile/public`,
        token: token!,
      })
        .then((result) => {
          console.log(result);

          if (result["data"]["success"]) setUser(result["data"]["data"]);
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
            stringFiltering={`types=${previousSearch.types}`}
          />
        </div>
      </div>
    </>
  );
};

export default Author;
