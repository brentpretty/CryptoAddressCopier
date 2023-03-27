const output = document.getElementById('output');
const copyBtn = document.getElementById('copyBtn');

// Handle copying addresses to the clipboard
copyBtn.addEventListener('click', () => {
  const addressesText = output.textContent.trim();
  if (addressesText.length > 0) {
    navigator.clipboard.writeText(addressesText)
      .then(() => {
        alert('Addresses copied to clipboard!');
      })
      .catch((err) => {
        alert('Failed to copy addresses: ' + err);
      });
  } else {
    alert('No addresses found to copy.');
  }
});

// Request the current addresses from the content script when the popup is opened
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  chrome.tabs.sendMessage(tabs[0].id, { action: 'requestAddresses' }, ({ addresses }) => {
    output.textContent = addresses.join('\n');
  });
});

document.addEventListener('DOMContentLoaded', () => {
    const ethCountElement = document.getElementById('eth-count');
    const btcCountElement = document.getElementById('btc-count');
    const copyButton = document.getElementById('copy-addresses');
  
    chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
      chrome.tabs.sendMessage(tab.id, { action: 'requestAddresses' }, ({ addresses }) => {
        const ethAddresses = addresses.filter(address => address.startsWith('0x'));
        const btcAddresses = addresses.filter(address => !address.startsWith('0x'));
  
        ethCountElement.textContent = ethAddresses.length;
        btcCountElement.textContent = btcAddresses.length;
  
        const allAddresses = ethAddresses.concat(btcAddresses);
  
        copyButton.addEventListener('click', () => {
          const textToCopy = allAddresses.join('\n');
          navigator.clipboard.writeText(textToCopy).then(() => {
            alert('Addresses copied to clipboard!');
          });
        });
      });
    });
  });
  
