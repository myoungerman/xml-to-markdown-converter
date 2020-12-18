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
  let finalOutput = html; // this value changes once the conversion has finished
  // list of tags we should keep
  const tagsToKeep = [
    'a',
    '/a',
    'title',
    'h1',
    'h2',
    'h3',
    'h4',
    'li',
    'strong'
  ];
  let firstSearch = true;
  let lastIndexChecked = 0;
  let useListType = 'unordered';

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
    
    // check if we should keep this tag
    tagsToKeep.forEach((el) => {
      if (wholeTag.includes(`<${el}`)) {
        deleteTag = false;
        let markdownEquivalent = findMarkdownEquivalent(wholeTag, useListType);
        finalOutput = finalOutput.replace(wholeTag, `${markdownEquivalent} `);
      }
    });
  
    // remove the tag if it doesn't match what we want to keep
    if (deleteTag === true) {
      finalOutput = finalOutput.replace(wholeTag, '');
      // determine which list type to use for incoming list items
      if (wholeTag.includes('<ol')) {
        useListType = 'ordered';
      }
      if (wholeTag.includes('<ul')) {
        useListType = 'unordered';
      }
    }    

    // loop again if there are more tags in the html after the current index
    if (html.indexOf('<', stringEnd) !== -1) {
      lastIndexChecked = stringEnd;
      firstSearch = false;
      removeTags(html);
    } else {
    // all the content has been converted, so show the converted content
    document.getElementById('markdownContent').value = finalOutput;
    }
  }
}

function findMarkdownEquivalent(wholeTag, useListType) {

  let markdownFormat = '';

  // headings
  if (wholeTag.includes('h1')) {
    markdownFormat = '#';
  } else if (wholeTag.includes('h2')) {
    markdownFormat = '##';
  } else if (wholeTag.includes('h3')) {
    markdownFormat = '###';
  } else if (wholeTag.includes('h4')) {
    markdownFormat = '####';
  } else {
    markdownFormat = '';
  }

  // list items
  if (wholeTag.includes('li')) {
    if (useListType === 'unordered') {
      markdownFormat = '*';
    } else {
      markdownFormat = '1.';
    }
  }  

  // links
  //<a class="link" href="cas_br_cru_replacement_procedures.html">Component Replacement Procedures</a>
  // get the text after href, then make the text between the opening and closing a tags the link

  // notes, cautions, etc.

  // images

  return markdownFormat;
}


convertBtn.addEventListener('click', () => {
  htmlToConvert = document.getElementById('htmlContent').value;
  checkTags(htmlToConvert);
});
