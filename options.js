function restoreOptions(e) {
	var store = localStorage['popupcolor'];
	for(var i=0; i < document.optform.popupcolor.length; ++i) {
		if(document.optform.popupcolor[i].value == store) {
			document.optform.popupcolor[i].selected = true;
			break;
		}
	}
	
	if (localStorage['highlight'] == 'true')
		document.optform.highlighttext.checked = true;
	else
		document.optform.highlighttext.checked = false;

	if (localStorage['textboxhl'] == 'true')
		document.optform.textboxhl.checked = true;
	else
		document.optform.textboxhl.checked = false;
	
	if (localStorage['onlyreading'] == 'true')
		document.optform.onlyreading.checked = true;
	else
		document.optform.onlyreading.checked = false;
	
	if (localStorage['minihelp'] == 'true')
		document.optform.minihelp.checked = true;
	else
		document.optform.minihelp.checked = false;

	document.optform.popupDelay.value = localStorage["popupDelay"];

	if (localStorage['disablekeys'] == 'true')
		document.optform.disablekeys.checked = true;
	else
		document.optform.disablekeys.checked = false;

	if (localStorage['kanjicomponents'] == 'true')
		document.optform.kanjicomponents.checked = true;
	else
		document.optform.kanjicomponents.checked = false;

	numList = browser.extension.getBackgroundPage().rcxDict.prototype.numList;

	for (i = 0; i*2 < numList.length; i++) {
		document.getElementById(numList[i*2]).checked = localStorage[numList[i * 2]] == 'true';
	}

	store = localStorage['lineEnding'];
	for(var i=0; i < document.optform.lineEnding.length; ++i) {
		if(document.optform.lineEnding[i].value == store) {
			document.optform.lineEnding[i].selected = true;
			break;
		}
	}

	store = localStorage['copySeparator'];
	for(var i=0; i < document.optform.copySeparator.length; ++i) {
		if(document.optform.copySeparator[i].value == store) {
			document.optform.copySeparator[i].selected = true;
			break;
		}
	}

	document.optform.maxClipCopyEntries.value = parseInt(localStorage['maxClipCopyEntries']);

	store = localStorage['showOnKey'];
	for(var i = 0; i < document.optform.showOnKey.length; ++i) {
		if (document.optform.showOnKey[i].value === store) {
			document.optform.showOnKey[i].checked = true;
			break;
		}
	}

}

function saveOptions(e) {
	e.preventDefault();

	browser.storage.local.set({
        popupColor: document.optform.popupcolor.value,
        highlight: document.optform.highlighttext.checked,
        textBoxHl: document.optform.textboxhl.checked,
        onlyReading: document.optform.onlyreading.checked,
        miniHelp: document.optform.minihelp.checked,
        disableKeys: document.optform.disablekeys.checked,
        kanjiComponents: document.optform.kanjicomponents.checked,
        lineEnding: document.optform.lineEnding.value,
        copySeparator: document.optform.copySeparator.value,
        maxClipCopyEntries: document.optform.maxClipCopyEntries.value
    });


	var kanjiinfoarray = new Array(browser.extension.getBackgroundPage().rcxDict.prototype.numList.length/2);
	var numList = browser.extension.getBackgroundPage().rcxDict.prototype.numList;
	for (i = 0; i*2 < numList.length; i++) {
		localStorage[numList[i*2]] = document.getElementById(numList[i*2]).checked;
		kanjiinfoarray[i] = localStorage[numList[i*2]];
	}

	var popupDelay = parseInt(document.optform.popupDelay.value);
	if (!isFinite(popupDelay)) {
        popupDelay = 150;
	}
    browser.storage.local.set({
        popupDelay: document.optform.popupDelay.value,
        showOnKey: document.optform.showOnKey.value
    });

	browser.extension.getBackgroundPage().rcxMain.config.css = browser.storage.local.get("popupcolor");
	browser.extension.getBackgroundPage().rcxMain.config.highlight = browser.storage.local.get("highlight");
	browser.extension.getBackgroundPage().rcxMain.config.textboxhl = browser.storage.local.get("textboxhl");
	browser.extension.getBackgroundPage().rcxMain.config.onlyreading = browser.storage.local.get("onlyreading");
	browser.extension.getBackgroundPage().rcxMain.config.minihelp = browser.storage.local.get("minihelp");
	browser.extension.getBackgroundPage().rcxMain.config.popupDelay = popupDelay;
	browser.extension.getBackgroundPage().rcxMain.config.disablekeys = browser.storage.local.get("disablekeys");
	browser.extension.getBackgroundPage().rcxMain.config.showOnKey = browser.storage.local.get("showOnKey");
	browser.extension.getBackgroundPage().rcxMain.config.kanjicomponents = browser.storage.local.get("kanjicomponents");
	browser.extension.getBackgroundPage().rcxMain.config.kanjiinfo = kanjiinfoarray;
	browser.extension.getBackgroundPage().rcxMain.config.lineEnding = browser.storage.local.get("lineEnding");
	browser.extension.getBackgroundPage().rcxMain.config.copySeparator = browser.storage.local.get("copySeparator");
	browser.extension.getBackgroundPage().rcxMain.config.maxClipCopyEntries = browser.storage.local.get("maxClipCopyEntries");

}

document.querySelector("form").addEventListener("submit", saveOptions);
document.addEventListener("DOMContentLoaded", restoreOptions);
