chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.active) {
        let url = new URL(tab.url);
        let searchParams = new URLSearchParams(url.search);
        let channelName = searchParams.get('ab_channel');
        if (channelName) {
            chrome.storage.local.get({blockedChannels: []}, function(result) {
                // remove spaces in blocked channel names before matching
                let blockedChannels = result.blockedChannels.map(channel => channel.replace(/\s/g, ''));
                if(blockedChannels.includes(channelName)) {
                    chrome.tabs.remove(tabId);
                }
            });
        }
    }
});
