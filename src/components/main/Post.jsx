import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { urlFor } from "./client";
import { useInView , motion} from "framer-motion";

const discountPercetage = (sellValue, purchaseValue) => {

  const sellValueInPer = (Number(sellValue) / Number(purchaseValue)) * 100;
  const discountPer = Math.floor(100 - sellValueInPer);
  return discountPer;
};

const post = (props) => {
  const ref = useRef(null)
  const isInView = useInView(ref, {once: true,})
  const locality =
    props.locality + (props.locality.toLowerCase() !== props.city.toLowerCase()
      ? "," + props.city
      : "," + props.state);
const animationConfiguration = {
  initial: { opacity: 0},
  animate: { opacity: isInView ? 1 : 0 },
  exit: { opacity: 0},
}
  return (
    <>
      <motion.div
      variants={animationConfiguration}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: .5, ease: 'easeInOut',type: "spring", stiffness: 50,  }}
      ref={ref} className="post px-3 py-2 cursor-pointer  rounded-lg border-2 glass   hover:shadow-lg transform duration-300 transition-all  ease-in-out">
        <Link to={`/listings/${props.slug}`}>
          <div className="post-container  flex flex-col justify-between h-full  relative">
            {props.mrp && (
              <div className="discount absolute right-2 bg-[#11319b] rounded-full px-1 py-2 font-bold text-[10px] text-white shadow-md  ">
                <p>-{discountPercetage(props?.price, props?.mrp)}%</p>
              </div>
            )}

            <div className="post-image flex justify-center">
              <img
                className=" h-auto  max-h-28  md:max-h-52 object-contain bg-yellow object-top shadow-lg  rounded-lg"
                src={urlFor(props.image).format("webp").height(250).url()}
                alt="listing image"
              />
            </div>
            <div className="info mt-2 capitalize ">
              <div className="post-price font-bold text-lg flex items-center ">
                <p>
                  <span className="mr-1 font-sans">₹</span>
                  {props.price}
                </p>
              </div>
              <div className="post-title text-sm poppins tracking-tight">
                <h2>
                  {props?.title.slice(0, 15)}
                  {props?.title.length >= 15 && "..."}
                </h2>
              </div>
              <div className="location-container ">
                <div className="location flex mt-1 space-x-1 items-center">
                  <i className="fa-solid fa-location-dot"></i>
                  <p className="text-xs">
                    {locality.slice(0,18)}
                    {locality.length >= 18 && "..."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    </>
  );
};

export default post;
