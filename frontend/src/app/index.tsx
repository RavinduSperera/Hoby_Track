import { Redirect } from "expo-router";

/**
 * Entry Point of the App
 * Currently redirects to the Onboarding screen.
 * In a real app, this would check authentication state.
 */
export default function Index() {
  return <Redirect href={"/onboarding" as any} />;
}
