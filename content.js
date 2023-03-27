console.log('Content script is running');

const ethPattern = /^0x[a-fA-F0-9]{40}$/;
const btcPattern = /^(bc1|[13])[a-zA-HJ-NP-Za-km-z0-9]{25,39}$/;

const textContent = document.body.innerText;
const ethAddresses = textContent.split(/\s+/).filter(address => ethPattern.test(address));
const btcAddresses = textContent.split(/\s+/).filter(address => btcPattern.test(address));

const allAddresses = ethAddresses.concat(btcAddresses);

console.log(allAddresses);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'requestAddresses') {
    sendResponse({ addresses: allAddresses });
  }
});
