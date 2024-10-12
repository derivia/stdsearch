chrome.omnibox.onInputEntered.addListener((text) => {
  const searchUrl = `https://doc.rust-lang.org/std/?search=${encodeURIComponent(text)}`;
  chrome.tabs.update({ url: searchUrl });
});