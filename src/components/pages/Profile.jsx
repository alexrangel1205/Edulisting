import React, { useEffect, useState } from "react";
import { client } from "../main/client";
import { userListings, userQuery } from "../main/data";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import Spinner from "../header/Spinner";
import { RWebShare } from "react-web-share";
import { Divider } from "@mui/material";
import SupportIcon from "@mui/icons-material/Support";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SettingsIcon from "@mui/icons-material/Settings";
import { Avatar } from "@mui/material";
import FeatureWidget from "../main/FeatureWidget";
import { useAuth } from "../Contexts/UserContext";
import { Helmet } from "react-helmet-async";
import PageLayout from '../main/PageLayout'
import { Android } from "@mui/icons-material";
import Transition from "../main/Transition";

const Profile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const showButton =
  !window.matchMedia('(display-mode: standalone)').matches;
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [Ads, setAds] = useState(null);
  const {
    currentUser,
    sanityUser,
    setSanityUser,
    allListings,
    setAllListings,
  } = useAuth();

  useEffect(() => {
    if (sanityUser) {
      setUser(sanityUser);
    }
    if (allListings) {
      setAds(allListings);
    }
    if (!sanityUser) {
      const query = userQuery(currentUser?.uid);
      client.fetch(query).then((data) => {
        setUser(data[0]);
        setSanityUser(data[0]);
      });
    }
    if (!allListings) {
      const listingQuery = userListings(currentUser?.uid);
      client.fetch(listingQuery).then((data) => {
        setAds(data);
        setAllListings(data);
      });
    }
    setLoading(false);
  }, [currentUser]);

  if (!sanityUser) return <Spinner />;
  if (loading) return;

  return (
    <>
    <Transition>
     <PageLayout>
        <Helmet>
          <title>Profile</title>
        </Helmet>
        
          <div className="con w-full md:w-2/5 lg:w-2/6">
            <div className="profile flex justify-center items-center flex-col w-full">
              <div className="profile-img-following gap-12 mb-5 justify-center flex items-center">
                <div className="profile-img   mb-1">
                  <Avatar
                    alt={user?.userName}
                    src={user?.image}
                    sx={{ width: 90, height: 90 }}
                  />
                </div>
                <div className="post-followers-post poppins space-x-8 flex ">
                  <Link to="/ads">
                    <div className="posts flex flex-col items-center">
                      <p className="font-bold text-xl">
                        {allListings?.length ? allListings?.length : "0"}
                      </p>
                      <p>Listings</p>
                    </div>
                  </Link>

                  <div className="followers flex flex-col items-center">
                    <p className="font-bold text-xl">
                      {user?.following?.length ? user?.following?.length : "0"}
                    </p>
                    <p>Followers</p>
                  </div>
                </div>
              </div>

              <div className="editprofile-share-profile poppins flex justify-evenly space-x-2 ">
                <div className="edit-profile ">
                  <Link to="/editprofile">
                    <button className="bg-gray-200 py-[6px] px-8 rounded-xl cursor-pointer font-medium hover:bg-[#e9e9e9] hover:shadow-md outline-none">
                      Edit profile
                    </button>
                  </Link>
                </div>
                <div className="share-profile">
                  <RWebShare
                    data={{
                      text: "Follow me on Edulisting to see my new listings! ",
                      url: `https://edulisting.in
/user/${user?._id}`,
                      title: `${user?.userName} - Edulisting`,
                    }}
                    onClick={() => console.log("shared successfully!")}
                  >
                    <button className="bg-gray-200 py-[6px] px-8 w-full rounded-xl cursor-pointer font-medium hover:bg-[#e9e9e9] hover:shadow-md outline-none">
                      Share profile
                    </button>
                  </RWebShare>
                </div>
              </div>
              <div className="Help-support"></div>
              <div className="settings"></div>
            </div>
            <div className="settings flex flex-col gap-2 px-5 mt-3 ">
              <FeatureWidget
                icon={<SettingsIcon />}
                link={"/setting"}
                title={"Settings"}
                subtitle={"privacy and logout"}
              />
              <Divider />
              <FeatureWidget
                icon={<SupportIcon />}
                link={"/help-and-support"}
                title={"Help and support"}
                subtitle={"help center and legal terms"}
              />
              <Divider />

              {showButton && (
                <>
                <a href="/Edulisting.apk" download={"Edulisting.apk"}>
                  <div className="card flex items-center cursor-pointer  w-full">
                    <div className="icon mr-4">
                      <Android />
                    </div>
                    <div className="flex justify-between items-center w-full">
                      <div className="text">
                        <div
                          className="main-text  text-lg capitalize"
                          style={{ fontWeight: "640" }}
                        >
                          <p>Download Edulisting app</p>
                        </div>
                        <div className="subtext capitalize font-light">
                          <p>add edulisting to your home</p>
                        </div>
                      </div>
                      <div className="go-arrow">
                        <ArrowForwardIosIcon />
                      </div>
                    </div>
                  </div>
                </a>
              <Divider />
              </>
              )}
            </div>
          </div>
      
        </PageLayout>
        </Transition>
    </>
  );
};

export default Profile;
