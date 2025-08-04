import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

// Components
import AuthorHeader from "@/components/Author/AuthorHeader";
import { User } from "@/models/user";
import SEO from "@/components/Common/SEO";
import { useDispatch, useSelector } from "react-redux";
import { search } from "@/lib/slices/searchSlice";
import { RootState } from "@/lib/store";
import MasonryWrapper from "@/components/Masonry/MasonryWrapper";
import { apiRequest } from "@/utils/apiRequest";

const Author = () => {
  const { username } = useParams();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User>();
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const { token } = useSelector((state: RootState) => state.auth);
  const previousSearch = useSelector((state: RootState) => state.search);

  useEffect(() => {
    if (!username) {
      setError("⚠️ No username provided. Please check the URL.");
      setLoading(false);
      return;
    }

    if (!username.startsWith("@")) {
      setError(
        "⚠️ The username should start with '@'. Please try again with '@yourUsername'."
      );
      setLoading(false);
      return;
    }

    dispatch(
      search({
        author: username.slice(1),
        types: previousSearch.types,
        placeholder: previousSearch.placeholder,
      })
    );

    setLoading(true);
    apiRequest({
      method: "GET",
      url: `users/${username.slice(1)}/profile/public`,
      token: token!,
    })
      .then((result) => {
        if (result["data"]["success"]) {
          setUser(result["data"]["data"]);
          setError("");
        } else {
          setError("😕 We couldn't find a user with that username.");
        }
      })
      .catch(() => {
        setError("😕 We couldn't find a user with that username.");
      })
      .finally(() => setLoading(false));
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
        {error ? (
          <ErrorMessage message={error} />
        ) : (
          <>
            <AuthorHeader author={user} loading={loading} />
            <div className="w-full bg-white flex flex-col items-center">
              <MasonryWrapper
                title=""
                classTitle="text-3xl mb-6"
                screenWidth="w-[95%]"
                stringFiltering={`types=${previousSearch.types}`}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

type ErrorMessageProps = {
  message: string;
};

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <div className="w-full mt-16 flex justify-center">
      <div className="bg-red-50 border border-red-300 text-red-800 px-6 py-5 rounded-xl shadow-md max-w-2xl text-center text-lg">
        <h2 className="font-semibold text-xl mb-2">
          Oops! Something went wrong
        </h2>
        <p>{message}</p>
        <p className="mt-4 text-sm text-gray-500">
          If you think this is a mistake, try verifying the username format.
        </p>
      </div>
    </div>
  );
};

export default Author;
