// Function to populate the font suggestions dynamically
function populateFontSuggestions(query = '') {
  const suggestionsContainer = document.getElementById('font-suggestions');
  suggestionsContainer.innerHTML = ''; // Clear previous suggestions

  // Show the suggestions container
  suggestionsContainer.classList.remove('hidden');

  // Filter fonts based on search query
  const filteredFonts = commonFonts.filter(font => font.toLowerCase().includes(query.toLowerCase()));

  // If there are any matching fonts, display them
  if (filteredFonts.length > 0) {
    filteredFonts.forEach(font => {
      const div = document.createElement('div');
      div.classList.add('font-suggestion-item', 'p-2', 'cursor-pointer', 'hover:bg-gray-100', 'transition-colors');
      div.textContent = font;
      div.onclick = () => setSelectedFont(font); // Set font on click
      suggestionsContainer.appendChild(div);
    });
  } else {
    // Show a "No results found" message if no matches
    const div = document.createElement('div');
    div.classList.add('p-2', 'text-orange-700', 'bg-orange-100', 'mr-2', 'mb-2', 'rounded');
    div.textContent = "The font is not found. Set this font. If this font is available in your system, it will reflect; otherwise, it won't";
    suggestionsContainer.appendChild(div);
  }
}

// Event listener for input change in search bar
document.getElementById('font-search').addEventListener('input', (event) => {
  const query = event.target.value;
  populateFontSuggestions(query);
});

// Event listener for focus on the search bar to show all fonts
document.getElementById('font-search').addEventListener('focus', () => {
  if(!event.target.value)
    populateFontSuggestions();
});

// Function to apply font to the body or a specific element
function setSelectedFont(font) {
  // document.body.style.fontFamily = font;
  document.getElementById('font-search').value = font; 
  document.getElementById('font-suggestions').innerHTML = '';
}

function applyFont(font){
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      function: changeFont,
      args: [font]
    });
  });
}

document.getElementById('search-apply-font').addEventListener('click', ()=>{
  let selectedFont = document.getElementById('font-search').value;
  applyFont(selectedFont)
})



function changeFont(font) {
  document.body.style.fontFamily = font;
}

// Call this function on DOMContentLoaded
// document.addEventListener('DOMContentLoaded', ()=>{
// });

