import { Component } from "solid-js";
import JsonViewer from "../MidPanel/JSONviewer";
import style from "./style.module.css";

const RightPanel: Component<{}> = (props) => {
  return (
    <div
      classList={{
        [style.rightPanel]: true,
      }}
      class="bg-gradient-to-br from-[#1c1c24] to-[#222230] h-full rounded-br-lg w-1/4 overflow-auto"
    >
      <div class="p-4 text-white h-full">
        <h3 class="uppercase text-xs text-blue-300 font-semibold mb-2 tracking-wider">
          Output
        </h3>
        <JsonViewer
          data={{
            user: {
              id: 123456,
              name: "Jane Doe",
              email: "jane.doe@example.com",
              isActive: true,
              roles: ["admin", "editor", "viewer"],
              profile: {
                age: 29,
                gender: "female",
                address: {
                  street: "1234 Elm Street",
                  city: "Springfield",
                  state: "IL",
                  postalCode: "62704",
                  country: "USA",
                },
                preferences: {
                  newsletter: true,
                  notifications: {
                    email: true,
                    sms: false,
                    push: true,
                  },
                  theme: "dark",
                },
              },
            },
            projects: [
              {
                id: "p001",
                title: "Redesign Website",
                status: "in-progress",
                tags: ["design", "frontend", "UX"],
                deadline: "2025-08-01T00:00:00Z",
              },
              {
                id: "p002",
                title: "API Migration",
                status: "completed",
                tags: ["backend", "migration", "architecture"],
                deadline: "2024-12-15T00:00:00Z",
              },
              {
                id: "p003",
                title: "Mobile App Launch",
                status: "pending",
                tags: ["mobile", "launch", "iOS", "Android"],
                deadline: null,
              },
            ],
            logs: [
              {
                timestamp: "2025-05-16T10:00:00Z",
                event: "User login",
                success: true,
              },
              {
                timestamp: "2025-05-16T10:05:32Z",
                event: "Viewed dashboard",
                success: true,
              },
              {
                timestamp: "2025-05-16T10:15:42Z",
                event: "Attempted API access",
                success: false,
                error: "403 Forbidden",
              },
            ],
            metadata: {
              requestId: "abc123xyz789",
              environment: "production",
              version: "1.0.5",
              features: {
                betaAccess: false,
                multiTenant: true,
                autoSave: true,
              },
            },
          }}
        />
        {/* <div class="h-full flex items-center justify-center text-center">
          <div>
            <p class="font-medium mb-1">Execute this node to view data</p>
            <p class="text-xs">
              or{" "}
              <a href="#" class="text-purple-400 hover:underline">
                set mock data
              </a>
            </p>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default RightPanel;
