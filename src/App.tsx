import { useState } from "react";
import { LoginScreen } from "./components/LoginScreen";
import { HomeScreen } from "./components/HomeScreen";
import { ExploreScreen } from "./components/ExploreScreen";
import { CourseDetailScreen } from "./components/CourseDetailScreen";
import { VideoPlayerScreen } from "./components/VideoPlayerScreen";
import { ActivityScreen } from "./components/ActivityScreen";
import { MessagesScreen } from "./components/MessagesScreen";
import { ProfileScreen } from "./components/ProfileScreen";
import { ExplanationsScreen } from "./components/ExplanationsScreen";
import { DisciplinesScreen } from "./components/DisciplinesScreen";
import { TopicsScreen } from "./components/TopicsScreen";
import { TopicDetailScreen } from "./components/TopicDetailScreen";
import { ExerciseScreen } from "./components/ExerciseScreen";
import { SubscriptionScreen } from "./components/SubscriptionScreen";
import { BottomNavigation } from "./components/BottomNavigation";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentScreen, setCurrentScreen] = useState("home");
  const [screenData, setScreenData] = useState<any>(null);
  const [navigationHistory, setNavigationHistory] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("home");
  const [userSubscription, setUserSubscription] = useState<'free' | 'pro' | 'pro-plus'>('free');

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentScreen("home");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentScreen("home");
    setActiveTab("home");
    setNavigationHistory([]);
  };

  const handleNavigate = (screen: string, data?: any) => {
    setNavigationHistory((prev) => [...prev, currentScreen]);
    setCurrentScreen(screen);
    setScreenData(data);

    // Update active tab for main navigation screens
    if (
      [
        "home",
        "explore",
        "explanations",
        "activity",
        "messages",
        "profile",
      ].includes(screen)
    ) {
      setActiveTab(screen);
    }
  };

  const handleBack = () => {
    if (navigationHistory.length > 0) {
      const previousScreen =
        navigationHistory[navigationHistory.length - 1];
      setNavigationHistory((prev) => prev.slice(0, -1));
      setCurrentScreen(previousScreen);
      setScreenData(null);

      // Update active tab when going back to main screens
      if (
        [
          "home",
          "explore",
          "explanations",
          "activity",
          "messages",
          "profile",
        ].includes(previousScreen)
      ) {
        setActiveTab(previousScreen);
      }
    }
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setCurrentScreen(tab);
    setScreenData(null);
    setNavigationHistory([]);
  };

  const handleSubscriptionChange = (newPlan: 'free' | 'pro' | 'pro-plus') => {
    setUserSubscription(newPlan);
    handleBack(); // Go back to previous screen after subscription change
  };

  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case "home":
        return <HomeScreen onNavigate={handleNavigate} />;

      case "explore":
        return (
          <ExploreScreen
            onNavigate={handleNavigate}
            initialCategory={screenData?.category}
          />
        );

      case "explanations":
        return (
          <ExplanationsScreen 
            onNavigate={handleNavigate}
            userSubscription={userSubscription}
          />
        );

      case "disciplines":
        return (
          <DisciplinesScreen
            classData={screenData}
            onNavigate={handleNavigate}
            onBack={handleBack}
            userSubscription={userSubscription}
          />
        );

      case "topics":
        return (
          <TopicsScreen
            disciplineData={screenData}
            onNavigate={handleNavigate}
            onBack={handleBack}
            userSubscription={userSubscription}
          />
        );

      case "topicDetail":
        return (
          <TopicDetailScreen
            topicData={screenData}
            onNavigate={handleNavigate}
            onBack={handleBack}
            userSubscription={userSubscription}
          />
        );

      case "exercise":
        return (
          <ExerciseScreen
            exerciseData={screenData}
            onBack={handleBack}
          />
        );

      case "subscription":
        return (
          <SubscriptionScreen
            currentPlan={userSubscription}
            onSubscriptionChange={handleSubscriptionChange}
            onBack={handleBack}
          />
        );

      case "courseDetail":
        return (
          <CourseDetailScreen
            course={screenData}
            onNavigate={handleNavigate}
            onBack={handleBack}
          />
        );

      case "videoPlayer":
        return (
          <VideoPlayerScreen
            course={screenData.course}
            lesson={screenData.lesson}
            onBack={handleBack}
          />
        );

      case "activity":
        return <ActivityScreen />;

      case "messages":
        return <MessagesScreen />;

      case "profile":
        return <ProfileScreen onLogout={handleLogout} />;

      default:
        return <HomeScreen onNavigate={handleNavigate} />;
    }
  };

  const showBottomNavigation = ![
    "videoPlayer",
    "courseDetail",
    "exercise",
    "subscription"
  ].includes(currentScreen);

  return (
    <div className="flex flex-col h-screen bg-gray-50 max-w-md mx-auto border-x border-gray-200">
      {renderScreen()}

      {showBottomNavigation && (
        <BottomNavigation
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
      )}
    </div>
  );
}