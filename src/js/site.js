//Utiliy Library

const fetchGet = async url => {
  try {
    url = "https://cors-anywhere.herokuapp.com/" + url;
    let response = await fetch(url);
    console.log("fetch", response);
    if (response.ok) {
      let jsonResponse = await response.json();
      return jsonResponse;
    }
  } catch (error) {
    console.log("fetch-error", error);
    return error;
  }
};
