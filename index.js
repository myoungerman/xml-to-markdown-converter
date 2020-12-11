//let submitBtn = document.getElementById('submitBtn');
/* let filesArr = 0; */

/* submitBtn.addEventListener('click', (e) => {
    e.preventDefault();

    let files = document.getElementById('myFile').files;
    numFiles = files.length;
    console.log(`You selected ${numFiles} files.`);

    filesArr = files;

    for (let i = 0; i < files.length; i++) {
    // For each file, read the file contents, convert text as needed, and then save the file.
      console.log(files[i]);
    }

});
 */

let htmlToConvert = '';
let convertBtn = document.getElementById('convertBtn');

function checkTags(html) {
  let convertedText = html; // this value changes once the conversion has finished
  // list of tags we should keep
  const tagsToKeep = [
    'a',
    'title',
    'h1',
    'h2',
    'h3',
    'h4',
    'ul',
    'ol',
    'li',
    'strong'
  ];
  let firstSearch = true;
  let lastIndexChecked = 0;

  removeTags(html);

  function removeTags(html) {
    /* search html for '<'. Mark that index. From that index,
    search for '>'. 
    */
  
    if (firstSearch === false) {
      var stringStart = html.indexOf('<', lastIndexChecked);
    } else {
      var stringStart = html.indexOf('<');
    }
    let stringEnd = html.indexOf('>', stringStart);
    let wholeTag = '';
    let deleteTag = true;
  
    for (let i = stringStart; i <= stringEnd; i++) {
      // get the entire string between the two indices
      wholeTag += html[i];
    }
  
    // once we have the whole string, see if we should keep or erase it
    tagsToKeep.forEach((el) => {
      if (wholeTag.includes(`<${el}`)) {
        deleteTag = false;
      }
    });
  
    if (deleteTag === true) {
      convertedText = html.replace(wholeTag, '');
    }
  
    // loop again if there's more < in the html after the current index
    if (html.indexOf('<', stringEnd)) {
      console.log('looking for more tags');
      lastIndexChecked = stringEnd;
      firstSearch = false;
      removeTags(html);
    } else {
    // show the converted content in the Markdown box
    document.getElementById('markdownContent').value = convertedText;
    }
  }
  
}


convertBtn.addEventListener('click', () => {
  htmlToConvert = document.getElementById('htmlContent').value;
  checkTags(htmlToConvert);
});
