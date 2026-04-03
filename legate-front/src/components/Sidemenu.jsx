import { use, useEffect, useState } from "react";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/outline";
import SidemenuBtn from "./SidemenuBtn";
import SidemenuGroup from "./SidemenuGroup";
import axios from "axios";
let DEBUG = true;

export default function Sidemenu({ conversations, groups }) {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (DEBUG) {
      console.log(
        "Ungrouped convs:",
        conversations.filter((conv) => conv.groupId === null),
      );
      if (conversations.length > 0 && groups.length > 0) {
        console.log(
          "typeof group.id:",
          typeof groups[0].id,
          "typeof conv.groupId:",
          typeof conversations[0].groupId,
        );
      }
    }
  }, [conversations, groups]);

  return (
    <div
      className={`flex h-screen flex-col justify-between border-e border-gray-100 bg-white transition-all duration-300 dark:border-gray-700 dark:bg-gray-900 ${collapsed ? "w-16" : "w-64"}`}
    >
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <span className="grid h-10 w-32 place-content-center rounded-lg bg-gray-100 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-300">
              Logo
            </span>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            title={collapsed ? "Expand" : "Collapse"}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
          >
            {collapsed ? (
              <ChevronDoubleRightIcon className="h-5 w-5" />
            ) : (
              <ChevronDoubleLeftIcon className="h-5 w-5" />
            )}
          </button>
        </div>

        {!collapsed && (
          <ul className="mt-6 space-y-1">
            {/* Groups and affiliated conversations */}
            {groups.map((group) => {
              /* Print the group and affiliated conversations in debug mode */

              if (DEBUG) {
                console.log(`Group: ${group.name}`, conversations);
              }

              return (
                <SidemenuGroup
                  key={group.id}
                  name={group.name}
                  conversations={conversations.filter(
                    (conv) => conv.groupId == group.id,
                  )}
                />
              );
            })}

            {/* Conversations without a group */}
            {conversations
              .filter((conv) => conv.groupId === null)
              .map((conv) => (
                <SidemenuBtn key={conv.id} name={conv.name} />
              ))}
          </ul>
        )}
      </div>

      <div className="sticky inset-x-0 bottom-0 border-t border-gray-100 dark:border-gray-700">
        <a
          href="#"
          className={`flex items-center bg-white hover:bg-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800 ${collapsed ? "justify-center p-3" : "gap-2 p-4"}`}
        >
          <img
            alt=""
            src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?auto=format&amp;fit=crop&amp;q=80&amp;w=1160"
            className={`rounded-full object-cover ${collapsed ? "size-8" : "size-10"}`}
          />

          {!collapsed && (
            <div>
              <p className="text-xs dark:text-gray-400">
                <strong className="block font-medium dark:text-gray-200">
                  Eric Frusciante
                </strong>

                <span> someone@example.com </span>
              </p>
            </div>
          )}
        </a>
      </div>
    </div>
  );
}
