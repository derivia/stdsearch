chrome.omnibox.onInputEntered.addListener((text) => {
  const [type, ...args] = text.split(" ");
  const query = args.join(" ");
  const searchUrl = handleTextEntered(type, query);
  if (searchUrl) {
    chrome.tabs.update({ url: searchUrl });
  }
});

function handleTextEntered(type, query) {
  let result = "";
  let search = "";

  switch (type) {
    case "std":
      search = encodeURIComponent(query || "");

      result = `https://doc.rust-lang.org/stable/std/`.concat(
        search ? `?search=${search}` : "",
      );
      return result;

    case "crate":
      const [crateName, ...searchTerm] = query.split(" ");
      let crate = encodeURIComponent(crateName || "");

      if (!crate) {
        return `https://docs.rs/`;
      }

      search = encodeURIComponent(searchTerm.join(" ") || "");

      result = `https://docs.rs/${crate}/latest/${crate}/`.concat(
        search ? `?search=${search}` : "",
      );
      return result;
    default:
      return null;
  }
}
