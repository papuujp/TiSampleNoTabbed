// open Window
$.root.getView().open();

// Alloy.Globals.UI: iOS/Android common UI functions
if (!Alloy.Globals.UI) {
	Alloy.Globals.UI = {};
}

// open Window
// winName: Alloy Window name(String)
Alloy.Globals.UI.openWindow = function(winName) {
	Alloy.createController(winName).getView().open();
};
