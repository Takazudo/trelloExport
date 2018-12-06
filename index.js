const rawJson = require('./data.json');
const json = rawJson;

//const json = process.argv[2];

let output = '';

json.lists.forEach(list => {
  const id = list.id;
  const cards = getCardsFromListId(id);
  let listOutput = '';
  let anyCardsOpen = false;
  cards.forEach(card => {
    if(card.closed) return;
    anyCardsOpen = true;
    let tagsText = '';
    card.labels.forEach(label => {
      tagsText = `${tagsText}[${label.name}]`;
    });
    listOutput += `* ${tagsText}[${card.name}](${card.shortUrl})\n`;
    if(card.shortUrl === 'https://trello.com/c/nm4me3A7') {
    }
  });
  if(!cards.length || !anyCardsOpen) return;
  output += `## ${list.name}\n\n${listOutput}`;

  output += `\n`;
});

function getCardsFromListId(id) {
  let cards = [];
  json.cards.forEach(card => {
    if(card.idList !== id) return;
    cards.push(card);
  });
  return cards;
}

function pbcopy(data) {
  var proc = require('child_process').spawn('pbcopy');
  proc.stdin.write(data);
  proc.stdin.end();
}

console.log(output);
pbcopy(output);

console.log('==== copied to clipboard! ====');
