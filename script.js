const quoteEl = document.getElementById("quote");
const authorEl = document.getElementById("author");
const newQuoteBtn = document.getElementById("new-quote");
const twitterBtn = document.getElementById("twitter");
const quoteContainer = document.getElementById("quote-container");
const loader = document.getElementById("loader");

let apiQuotes = [];

// Loading state
const showLoadingSpinner = () => {
  loader.hidden = false;
  quoteContainer.hidden = true;
};

// Loading complete state
const removeLoadingSpinner = () => {
  quoteContainer.hidden = false;
  loader.hidden = true;
};

// Pupulate UI
const populateUi = (quoteObject) => {
  quoteEl.innerText = quoteObject.text;
  authorEl.innerText = quoteObject.author || "Unknown";
};

/////////////////////// -------OPTION 1 ----------------
// // OPTION ONE: Getting quotes from "https://type.fit/api/quotes/" API

const newQuote = () => {
  showLoadingSpinner();
  const quoteObj = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  populateUi(quoteObj);

  //Hide spinner after populating UI
  removeLoadingSpinner();

  return quoteObj;
};

const getQuotes = async () => {
  showLoadingSpinner();

  const apiUrl = "https://type.fit/api/quotes/";

  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();

    newQuote();

    return apiQuotes;
  } catch (err) {
    alert("There was an error trying to get a quote. Please try again later.");
    console.log(err);
  }
};

getQuotes();

// //To work with OPTION 2 ensure you comment out OPTION 1

// /////////////////////// -------OPTION 2 ----------------
// //OPTION 2: USING LOCAL quotes

// const newQuote = () => {
//   showLoadingSpinner();
//   const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
//   populateUi(quote);
//   removeLoadingSpinner();

//   return quote;
// };

// newQuote();

// Tweet quote functionality
const tweetQuote = () => {
  const tweetUrl = `https://twitter.com/intent/tweet?text=${quoteEl.textContent} - ${authorEl.textContent}`;

  window.open(tweetUrl, "_blank");
};

newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);
