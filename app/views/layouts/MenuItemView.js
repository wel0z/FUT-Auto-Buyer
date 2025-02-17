import { buySettingsView } from "./Settings/BuySettingsView";
import { sellSettingsView } from "./Settings/SellSettingsView";
import { safeSettingsView } from "./Settings/SafeSettingsView";
import { captchaSettingsView } from "./Settings/CaptchaSettingsView";
import { notificationSettingsView } from "./Settings/NotificationSettingsView";
import { commonSettingsView } from "./Settings/CommonSettingsView";
import { searchSettingsView } from "./Settings/SearchSettingsView";
import { filterSettingsView } from "./Settings/FilterSettingsView";

const settingsLookup = new Map();
settingsLookup.set(0, {
  label: "Buy/Bid Settings",
  selector: ".buy-settings-view",
});
settingsLookup.set(1, {
  label: "Sell Settings",
  selector: ".sell-settings-view",
});
settingsLookup.set(2, {
  label: "Search Settings",
  selector: ".results-filter-view",
});
settingsLookup.set(3, {
  label: "Safety Settings",
  selector: ".safety-settings-view",
});
settingsLookup.set(4, {
  label: "Filter Settings",
  selector: ".filter-settings-view",
});
settingsLookup.set(5, {
  label: "Captcha Settings",
  selector: ".captcha-settings-view",
});
settingsLookup.set(6, {
  label: "Notification Settings",
  selector: ".notification-settings-view",
});
settingsLookup.set(7, {
  label: "Common Settings",
  selector: ".common-settings-view",
});

let menuRoot;
let menuItems;

export const generateMenuItems = function () {
  menuItems = new EAFilterBarView();
  settingsLookup.forEach((value, key) => {
    menuItems.addTab(key, value.label);
  });
  menuItems.setActiveTab(0);
  menuItems.layoutSubviews();

  menuItems.addTarget(this, onSettingChange, EventType.TAP);
  menuItems.__root.style = "margin-top: 20px;";

  menuRoot = jQuery(menuItems.__root);
  menuRoot.find(".menu-container").css("overflow-x", "auto");

  appendMenuItems();
  return menuItems;
};

export const clearSettingMenus = () => {
  deleteAllMenu();
  appendMenuItems();
};

const appendMenuItems = () => {
  menuItems.setActiveTab(0);
  menuRoot.append(buySettingsView.call(this));
  menuRoot.append(sellSettingsView.call(this));
  menuRoot.append(searchSettingsView.call(this));
  menuRoot.append(safeSettingsView.call(this));
  menuRoot.append(filterSettingsView.call(this));
  menuRoot.append(captchaSettingsView.call(this));
  menuRoot.append(notificationSettingsView.call(this));
  menuRoot.append(commonSettingsView.call(this));
};

const deleteAllMenu = () => {
  settingsLookup.forEach((value, key) => {
    jQuery(value.selector).remove();
  });
};

const onSettingChange = function (e, t, i) {
  hideAllSection();
  const selectedTab = settingsLookup.get(i.index).selector;
  jQuery(selectedTab).css("display", "");
};

const hideAllSection = () => {
  settingsLookup.forEach((value, key) => {
    jQuery(value.selector).css("display", "none");
  });
};
