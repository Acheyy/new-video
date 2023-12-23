import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import ko from "javascript-time-ago/locale/ko";

// Add locales to TimeAgo
TimeAgo.addLocale(en);
TimeAgo.addLocale(ko);

export default defineNuxtPlugin(() => {
  const timeAgoInstances = {
    en: new TimeAgo('en-US'),
    ko: new TimeAgo('ko-KR'),
    // Add other locales as needed
  };

  // Function to get the TimeAgo instance based on the current locale
  const getTimeAgo = (locale: keyof typeof timeAgoInstances) => {
    return timeAgoInstances[locale] || timeAgoInstances['en']; // Fallback to English
  };

  return {
    provide: {
      getTimeAgo,
    },
  };
});
