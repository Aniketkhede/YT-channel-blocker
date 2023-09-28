document.getElementById('block-button').addEventListener('click', function() {
    let channels = document.getElementById('channel-input').value.split('\n');
    if (channels.length > 0) {
      // remove spaces in channel names
      channels = channels.map(channel => channel.replace(/\s/g, ''));
      chrome.storage.local.get({blockedChannels: []}, function(result) {
        let newBlockedChannels = result.blockedChannels;
        // merge old list with new channels, removing any duplicates
        newBlockedChannels = [...new Set([...newBlockedChannels, ...channels])];
        chrome.storage.local.set({blockedChannels: newBlockedChannels}, function() {
          // clear input area after successfully saving
          document.getElementById('channel-input').value = '';
        });
      });
    }
  });
  