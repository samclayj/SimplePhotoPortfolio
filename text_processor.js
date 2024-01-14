const dataPageText = 'data-page-text';

function markdownConvert(line) {
  const conversions = [
    // Bold
    {
      'regex': /\*\*(.*?)\*\*/g,
      'replacement': '<b>$1</b>',
    },
    // Italic
    {
      'regex': /\*(.*?)\*/g,
      'replacement': '<i>$1</i>',
    },
    // Italic
    {
      'regex': /==(.*?)==/g,
      'replacement': '<mark>$1</mark>',
    },
  ];

  let convertedLine = line;
  for (const conversion of conversions) {
    convertedLine =
      convertedLine.replace(conversion.regex, conversion.replacement);
  }
  return convertedLine;
}

function processText() {
  const elements =
      document.querySelectorAll(`[${dataPageText}]`);

  for (const element of elements) {
    const filePath = element.getAttribute(`${dataPageText}`);
    fetch(`${filePath}`)
    .then(response => response.blob())
    .then(blob => blob.text())
    .then(markdown => {
      const splitLines = markdown.split("\n");
      let elementHtml = '';
      for (const line of splitLines) {
        elementHtml += `<p>${markdownConvert(line)}</p>`;
      }
      element.innerHTML = elementHtml;
    });

  }
}

document.addEventListener("DOMContentLoaded", () => {
  processText();
});
