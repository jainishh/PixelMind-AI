import React, { useState, useEffect } from "react";
import TopBar from "./topBar/TopBar";
import Stats from "./stas/stats";
import RecentConversations from "./recentConversations/recentConversations";
import MessageBreakdown from "./messageBreakdown/messageBreakdown";
import Explore from "./explore/explore";
import AcvitivityOverniview from "./activityOverview/avitivityOverniview";
import PhoneTop from "../../components/Phone/PhoneTop";
import { useOutletContext } from "react-router-dom";

const Dashboard = () => {
  const API_URL = import.meta.env.VITE_APP_API_URL;
  const { openSidebar } = useOutletContext();
  const [conversations, setConversations] = useState([]);
  const [totalConversation, setTotalConversation] = useState(0);
  const [totalMessagesLength, setTotalMessagesLength] = useState(0);
  const [avgResponseTime, setAvgResponseTime] = useState(0);
  const [todayMessage, setTodayMessage] = useState(0);
  const [yesterdayMessage, setyesterdayMessage] = useState(0);
  const [weekMessage, setWeekMessage] = useState(0);
  const [usermsg, setUsermsg] = useState(0);
  const [AImsg, setAImsg] = useState(0);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const getMessagesLength = async () => {
      try {
        const res = await fetch(
          `${API_URL}/api/v1/messages/getMessageLength`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();
        if (data.success) {
          setTotalMessagesLength(data.totalMessages);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getMessagesLength();
  }, [token]);

  useEffect(() => {
    const getMessagesByTime = async () => {
      try {
        const res = await fetch(
          `${API_URL}/api/v1/messages/getMessagesByTime`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();
        if (data.success) {
          setTodayMessage(data.todayMessages);
          setyesterdayMessage(data.yesterdayMessages);
          setWeekMessage(data.weekMessages);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getMessagesByTime();
  }, [token]);

  useEffect(() => {
    const getAvgResponseTime = async () => {
      try {
        const res = await fetch(
          `${API_URL}/api/v1/messages/getAverageResponseTime`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await res.json();
        if (data.success) {
          setAvgResponseTime(data.avgResponseTime);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getAvgResponseTime();
  }, [token]);

  useEffect(() => {
    const getAllMessages = async () => {
      try {
        const res = await fetch(
          `${API_URL}/api/v1/messages/getAllMessages`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();
        if (data.success) {
          setUsermsg(data.usermsgCount);
          setAImsg(data.AImsgCount);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getAllMessages();
  }, [token]);

  useEffect(() => {
    const loadConversationList = async () => {
      try {
        const res = await fetch(
          `${API_URL}/api/v1/conversations/getConversation`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();
        setTotalConversation(data.length);
        setConversations(data || []);
      } catch (err) {
        console.error("Failed to load conversations", err);
      }
    };
    loadConversationList();
  }, [token]);

  return (
    <>
      <div className="md:hidden mb-4">
        <PhoneTop openSidebar={openSidebar} />
      </div>

      <div className="min-h-screen text-white p-6 font-sans bg-gradient-to-br from-gray-900 via-slate-900 to-black">
        <div className="mb-6">
          <TopBar />
        </div>

        <div className="mb-6">
          <Stats
            totalConversationLength={totalConversation}
            totalMessagesLength={totalMessagesLength}
            avgResponseTime={avgResponseTime}
            todayMessage={todayMessage}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-10  ">
          <div className="lg:col-span-2 ">
            <div>
              <RecentConversations allConversations={conversations} />
            </div>
          </div>

          <div className="flex flex-col gap-6 lg:justify-center lg:h-full">
            <div>
              <AcvitivityOverniview
                todayMessage={todayMessage}
                yesterdayMessage={yesterdayMessage}
                weekMessage={weekMessage}
              />
            </div>

            <div>
              <MessageBreakdown usermsgCount={usermsg} AImsgCount={AImsg} />
            </div>
          </div>
        </div>

        <div>
          <Explore />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
