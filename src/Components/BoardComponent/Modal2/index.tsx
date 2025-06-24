import { createSignal, Show } from "solid-js";
import useStateContext from "../useStateContext";

export default function SubModal() {
  const [activeTab, setActiveTab] = createSignal("connection");
  const [connectMethod, setConnectMethod] = createSignal("oauth2");
  const { setIsModalOpen2, setFormData, currentFormConfig, formData } =
    useStateContext();

  return (
    <form>
      <div class="bg-[#2a2a3a] text-white rounded-md shadow-lg w-full h-full">
        {/* Header */}
        <div class="p-4 flex justify-between items-center border-b border-gray-700 ">
          <div class="flex items-center gap-2">
            <h2 class="text-base font-medium">Gmail account 4</h2>
            <span class="text-xs text-gray-400">Gmail OAuth2 API</span>
          </div>
          <div class="flex items-center gap-2">
            <button
              type="submit"
              form="modal2"
              class="bg-[#ff5c5c] hover:bg-red-600 text-white text-xs px-3 py-1 rounded"
            >
              Save
            </button>
            <button
              onClick={() => setIsModalOpen2(false)}
              class="text-gray-400 hover:text-white"
            >
              ×
            </button>
          </div>
        </div>

        {/* Content */}
        <div class="flex w-full h-full">
          {/* Left sidebar */}
          <div class="min-w-[150px] w-[200px] max-w-[250px] bg-[#252535] p-4 flex flex-col gap-3 rounded-bl-md">
            <button
              class={`text-left text-sm ${
                activeTab() === "connection" ? "text-white" : "text-gray-400"
              }`}
              onClick={() => setActiveTab("connection")}
            >
              Connection
            </button>
            <button
              class={`text-left text-sm ${
                activeTab() === "sharing" ? "text-white" : "text-gray-400"
              }`}
              onClick={() => setActiveTab("sharing")}
            >
              Sharing
            </button>
            <button
              class={`text-left text-sm ${
                activeTab() === "details" ? "text-white" : "text-gray-400"
              }`}
              onClick={() => setActiveTab("details")}
            >
              Details
            </button>
          </div>

          {/* Main content */}
          <div class=" p-4 h-full w-full">
            <Show when={activeTab() === "connection"}>
              <div class="flex h-full">
                {/* Left form section */}
                <div class="flex-1 pr-4">
                  <div class="mb-4">
                    <label class="block text-sm mb-1">
                      Connect using <span class="text-red-500">*</span>
                    </label>
                    <div class="flex gap-2">
                      <label class="flex items-center gap-1 bg-[#333345] px-2 py-1 rounded cursor-pointer">
                        <input
                          // form="gmailParam"
                          name="connectMethod"
                          type="radio"
                          value={"oauth2"}
                          checked={connectMethod() === "oauth2"}
                          // onChange={() => {
                          //   setConnectMethod("oauth2");
                          //   setFormData({
                          //     ...formData(),
                          //     [formConfig().id]: {
                          //       ...formData()[formConfig().id],
                          //       "connection type": connectMethod(),
                          //     },
                          //   });
                          // }}
                        />
                        <span class="text-sm">OAuth2 (recommended)</span>
                      </label>
                      <label class="flex items-center gap-1 bg-[#333345] px-2 py-1 rounded cursor-pointer">
                        <input
                          // form="gmailParam"
                          type="radio"
                          name="connectMethod"
                          value={"service"}
                          checked={connectMethod() === "service"}
                          // onChange={() => {
                          //   setConnectMethod("service");
                          //   setFormData({
                          //     ...formData(),
                          //     [formConfig().id]: {
                          //       ...formData()[formConfig().id],
                          //       "connection type": connectMethod(),
                          //     },
                          //   });
                          // }}
                        />
                        <span class="text-sm">Service Account</span>
                      </label>
                    </div>
                  </div>

                  <div class="mb-4">
                    <label class="block text-sm mb-1">OAuth Redirect URL</label>
                    <input
                      // form="gmailParam"
                      type="text"
                      name="oauthRedirectUrl"
                      class="w-full bg-[#333345] border border-gray-700 rounded p-2 text-sm"
                      value="https://workflow.juwelt.net/rest/oauth2-credentials/callback"
                      // readOnly
                      title="OAuth Redirect URL"
                      placeholder="OAuth Redirect URL"
                      onChange={(e) => {
                        setFormData({
                          ...formData(),
                          [currentFormConfig().id]: {
                            ...formData()[currentFormConfig().id],
                            "OAuth Redirect URL": e.target.value,
                          },
                        });
                      }}
                    />
                    <p class="text-xs text-gray-400 mt-1">
                      In Gmail, use this URL above when prompted to enter an
                      OAuth callback or redirect URL.
                    </p>
                  </div>

                  <div class="mb-4">
                    <input
                      // form="gmailParam"
                      type="text"
                      name="clientId"
                      class="w-full bg-[#333345] border border-gray-700 rounded p-2 text-sm"
                      title="Client ID"
                      placeholder="Enter your Client ID"
                      onChange={(e) => {
                        setFormData({
                          ...formData(),
                          [currentFormConfig().id]: {
                            ...formData()[currentFormConfig().id],
                            "Client ID": e.target.value,
                          },
                        });
                      }}
                    />
                  </div>
                  <div class="mb-4">
                    <input
                      // form="gmailParam"
                      autocomplete="off"
                      type="password"
                      name="clientSecret"
                      class="w-full bg-[#333345] border border-gray-700 rounded p-2 text-sm"
                      value=""
                      title="Client Secret"
                      placeholder="Enter your Client Secret"
                      onChange={(e) => {
                        setFormData({
                          ...formData(),
                          [currentFormConfig().id]: {
                            ...formData()[currentFormConfig().id],
                            "Client Secret": e.target.value,
                          },
                        });
                      }}
                    />
                  </div>

                  <div class="flex items-center gap-1 text-xs text-gray-400">
                    <span class="w-4 h-4 flex items-center justify-center rounded-full border border-gray-400">
                      i
                    </span>
                    <span>
                      Enterprise plan users can pull in credentials from
                      external vaults.{" "}
                      <a href="#" class="text-blue-400">
                        More info
                      </a>
                    </span>
                  </div>
                </div>

                {/* Right guide section */}
                <div
                  id="right"
                  class="w-[300px] bg-[#252535] rounded p-4 h-full"
                >
                  <div class="flex justify-between items-center mb-4">
                    <h3 class="text-sm font-medium">Setup guide</h3>
                    <a
                      href="#"
                      class="text-xs text-blue-400 flex items-center gap-1"
                    >
                      Docs
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                      </svg>
                    </a>
                  </div>

                  <div class="text-xs text-gray-300 overflow-y-auto h-full">
                    <p class="mb-2">Configure this credential:</p>
                    <ul class="list-disc pl-5 space-y-2">
                      <li>
                        Log in to your{" "}
                        <a href="#" class="text-blue-400">
                          Google Cloud console
                        </a>
                        .
                      </li>
                      <li>
                        Go to Google Cloud Console / APIs and Services /
                        Credentials. If you don't have a project yet, you'll
                        need to create a new one and select it.
                      </li>
                      <li>
                        If you haven't used OAuth in this Google Cloud project
                        before,{" "}
                        <a href="#" class="text-blue-400">
                          configure the consent screen
                        </a>
                        .
                      </li>
                      <li>
                        In Credentials, select + CREATE CREDENTIALS + OAuth
                        client ID.
                      </li>
                      <li>
                        In the Application type dropdown, select Web
                        application.
                      </li>
                      <li>
                        Under Authorized redirect URLs, select + ADD URI. Paste
                        in the OAuth redirect URL shown on the left.
                      </li>
                      <li>Select Create.</li>
                      <li>
                        In Enabled APIs and services, select + ENABLE APIS AND
                        SERVICES.
                      </li>
                      <li>Select and enable the Gmail API.</li>
                      <li>
                        Back to Credentials, click on the credential in OAuth
                        2.0 Client IDs, and copy the Client ID and Client
                        Secret.
                      </li>
                    </ul>
                    <p class="mt-2">
                      Click the docs link above for more detailed instructions.
                    </p>
                  </div>
                </div>
              </div>
            </Show>

            <Show when={activeTab() === "sharing"}>
              <div class="text-sm">Sharing settings content goes here...</div>
            </Show>

            <Show when={activeTab() === "details"}>
              <div class="text-sm">Details content goes here...</div>
            </Show>
          </div>
        </div>
      </div>
    </form>
  );
}
