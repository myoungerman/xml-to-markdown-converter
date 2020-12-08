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

function removeTags(html) {
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
}

convertBtn.addEventListener('click', () => {
  htmlToConvert = document.getElementById('htmlContent').value;
  removeTags(htmlToConvert);
});
