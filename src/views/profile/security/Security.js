/** component imports */
import PanelSecurity from "./panel-security/PanelSecurity";
import Pass from "./pass/Pass";
import ActiveSessions from "./activeSessions/ActiveSessions";
import ActivityHistory from "./activityHistory/ActivityHistory";

export default function Security() {
  return [<PanelSecurity />, <Pass />, <ActiveSessions />, <ActivityHistory />];
}
