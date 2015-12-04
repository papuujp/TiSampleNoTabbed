// open NavigationWindow
$.root.open();

// Alloy.Globals.UI: iOS/Android common UI functions
if (!Alloy.Globals.UI) {
	Alloy.Globals.UI = {};
}

// open Window
// winName: Alloy Window name(String)
Alloy.Globals.UI.openWindow = function(winName) {
	$.root.openWindow(Alloy.createController(winName).getView());
};
