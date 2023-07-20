import { createContext, useContext, useState } from "react";

export const ListingContext = createContext();
export const ListingProvider = ({ children }) => {
  const [listing, setListing] = useState({
    title: "",
    description: "",
    price: "",
    mrp: "",
    standard: "",
    board: "",
    subject: "",
    locality: "",
    city: "",
    state: "",
    mobileNumber: "",
    condition: "",
    edition: "",
    publisher: "",
  });
  const [isPrimaryDetails, setPrimaryDetails] = useState(false);
  const [isOptionalDetails, setOptionalDetails] = useState(false);
  const [isContactInfo, setIsContactInfo] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  function handleChange(event) {
    const { value, name } = event.target;
    setListing((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  }
  function resetListing(){
    setListing({
      title: "",
      description: "",
      price: "",
      mrp: "",
      standard: "",
      board: "",
      subject: "",
      locality: "",
      city: "",
      state: "",
      mobileNumber: "",
      condition: "",
      edition: "",
      publisher: "",
    })
    setPrimaryDetails(false)
    setOptionalDetails(false)
    setError(false)
    setLoading(false)
    setImage(null)
  }
  return (
    <ListingContext.Provider
      value={{
        listing,
        setListing,
        handleChange,
        isPrimaryDetails,
        setPrimaryDetails,
        loading,
        setLoading,
        isOptionalDetails,
        setOptionalDetails,
        isContactInfo,
        setIsContactInfo,
        image,
        setImage,
        error,
        setError,
        resetListing,
      }}
    >
      {children}
    </ListingContext.Provider>
  );
};
export const useListing = () => useContext(ListingContext);
