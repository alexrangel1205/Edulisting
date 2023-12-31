import React, { useReducer, useState } from "react";

import { useEffect } from "react";
import Post from "../main/Post";
import Spinner from "../header/Spinner";
import { allListings } from "../main/data";
import { v4 as uuid } from "uuid";
import InfiniteScroll from "react-infinite-scroll-component";

import ThreeDotSpinner from "../header/ThreeDotSpinner.jsx";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import PlaceholderCard from "../main/PlaceholderCard.jsx";
import { Adsense } from "@ctrl/react-adsense";
import { client } from "../main/cdnClient";
const RecentPost = () => {
  const [postData, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [postlimit, setPostLimit] = useState(0);
  const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);
  const [more, setMore] = useState(true);

  useEffect(() => {
    const query = allListings(postlimit, postlimit + 7);
    client
      .fetch(query)
      .then((data) => {
        setPost((prevPost) => {
          if (data.length === 0) {
            setMore(false);
          }
          if (prevPost) {
            return [...prevPost, ...data];
          } else {
            return data;
          }
        });
      })
      .catch((err) => console.log(err));
    setLoading(false);
  }, [reducerValue, postlimit]);

  function handleLimit() {
    setPostLimit((prevValue) => {
      return prevValue + 8;
    });
  }

  if (setLoading) {
    if (!postData) {
      return (
        <div
          id="recent-post"
          className="recent-post mb-28 relative  mx-4 md:mx-16 lg:mx-32 my-8 flex flex-col justify-center "
        >
          <div className="recent-post-title capitalize my-2 poppins  lg:m-4 text-xl text-gray-500">
            <h3>Fresh recommendations</h3>
          </div>
          <div className="posts justify-center  grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 z-0   md:m-4 gap-4">
            <PlaceholderCard />
            <PlaceholderCard />
            <PlaceholderCard />
            <PlaceholderCard />
            <PlaceholderCard />
            <PlaceholderCard />
            <PlaceholderCard />
            <PlaceholderCard />
          </div>
        </div>
      );
    }
  }

  return (
    <div
      id="recent-post"
      className="recent-post mb-28 relative  mx-4 md:mx-16 lg:mx-32 my-8 flex flex-col justify-center "
    >
      <div className="recent-post-title capitalize my-2 poppins  lg:m-4 text-xl text-gray-500">
        <h3>Fresh recommendations</h3>
      </div>

      <InfiniteScroll
        dataLength={postData.length} //This is important field to render the next data
        next={handleLimit}
        hasMore={more}
        loader={
          <>
            <div className="posts justify-center my-4   grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 z-0   md:m-4 gap-4">
              <PlaceholderCard />
              <PlaceholderCard />
            </div>
          </>
        }
      >
        <div className="posts justify-center overflow-hidden   grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4   md:m-4 gap-4">
          {postData &&
            postData.map((post, index) => {
              return (
                <>
                <Post
                      image={post?.image}
                      slug={post._id}
                      mrp={post.mrp}
                      title={post.title}
                      price={post.price}
                      locality={post.locality}
                      state={post.state}
                      city={post.city}
                      key={uuid()}
                    />
                  {index > 0 && (index + 1) % 10 === 0 && (
                    <>
                      <div className="grid-item sm:hidden col-span-2">
                      <Adsense format="auto" responsive="true" client="ca-pub-5046319178676899" slot="9801493192" style={{ display: 'block' }} />

                      </div>
                      <div className="grid-item hidden sm:block">
                        <Adsense
                          client="ca-pub-5046319178676899"
                          slot="4019302026"
                          style={{ display: "block" }}
                          layoutKey="-dg+f-h-50+aq"
                          format="fluid"
                        />
                      </div>
                    </>
                  )}
                  
                    
                 
                </>
              );
            })}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default RecentPost;
