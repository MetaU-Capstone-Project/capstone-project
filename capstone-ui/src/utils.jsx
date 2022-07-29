export const catchErrors = (fn) => {
  return function (...args) {
    return fn(...args).catch((err) => {
      console.error(err);
    });
  };
};

export const formatDate = (dateTime) => {
  return new Date(dateTime).toISOString().replace(/T/, " ").replace(/\..+/, "");
};

export const showPopup = () => {
  document.getElementById("overlay").style.display = "block";
};

export const hidePopup = () => {
  document.getElementById("overlay").style.display = "none";
};
