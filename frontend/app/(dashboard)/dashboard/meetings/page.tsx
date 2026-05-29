"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Video, 
  Plus, 
  Calendar, 
  Clock, 
  Users, 
  FileText,
  CheckSquare,
  Square,
  HelpCircle,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  FolderMinus
} from "lucide-react";

interface ActionItem {
  id: string;
  task: string;
  assignee: string;
  due: string;
  done: boolean;
}

interface Ticket {
  type: string;
  title: string;
  points: number | null;
}

interface Meeting {
  id: string;
  title: string;
  date: string;
  duration: string;
  participants: string[];
  sentiment: string;
  energy: number;
  summary: string;
  decisions: string[];
  actionItems: ActionItem[];
  tickets: Ticket[];
}

const MOCK_MEETINGS: Meeting[] = [
  {
    id: "meeting-1",
    title: "Sprint 24 Planning & RAG Core Integration",
    date: "Dec 9, 2025",
    duration: "54 min",
    participants: ["Alice Chen", "Bob Kumar", "Sarah Williams", "Marcus Johnson"],
    sentiment: "positive",
    energy: 78,
    summary: "The backend engineering team met to sync on the RAG pipeline integration. Alice presented the connection configuration for the Qdrant cluster. We resolved a deadlock risk in parallel thread processing by adopting async lifespans. We agreed that the production deploy is safe once masking is added to credentials logs.",
    decisions: [
      "Adopt strangler fig pattern for migrating the gateway services.",
      "Mask Qdrant API keys in stdout logging immediately.",
      "Postpone Redis connection pool updates to Sprint 25 to focus resources on RAG.",
    ],
    actionItems: [
      { id: "act-1", task: "Configure Qdrant client connection pool masking in main.py", assignee: "Alice Chen", due: "Dec 12", done: false },
      { id: "act-2", task: "Fix webhook race condition inside authentication service handlers", assignee: "Bob Kumar", due: "Dec 11", done: true },
      { id: "act-3", task: "Write unit tests for CodeBERT annotation pipeline endpoints", assignee: "Marcus Johnson", due: "Dec 13", done: false },
      { id: "act-4", task: "Refresh OpenAPI documentation with asymmetric auth details", assignee: "Sarah Williams", due: "Dec 14", done: false },
    ],
    tickets: [
      { type: "STORY", title: "RAG Pipeline — Mask Credential Logs", points: 5 },
      { type: "BUG", title: "Webhook race condition causes parallel duplicate triggers", points: 3 },
      { type: "TASK", title: "Write code reviews tests mapping for CodeBERT", points: 3 },
    ]
  },
  {
    id: "meeting-2",
    title: "Architecture Review — Gateway Microservices Strangler",
    date: "Dec 7, 2025",
    duration: "1h 23 min",
    participants: ["Emma Rodriguez", "Alice Chen", "Bob Kumar", "Chris Park"],
    sentiment: "neutral",
    energy: 65,
    summary: "Review of the monolith refactoring approach. The team evaluated direct routing versus stranger pattern facades. We aligned on building a lightweight Fastify gateway instance to proxy routes incrementally, starting with Auth endpoints.",
    decisions: [
      "Adopt stranger pattern rather than rebuilding in place.",
      "First microservice target is defined as Auth.",
    ],
    actionItems: [
      { id: "act-5", task: "Setup basic Fastify router project skeleton", assignee: "Alice Chen", due: "Dec 15", done: false },
      { id: "act-6", task: "Draft docker compose file routing proxies", assignee: "Chris Park", due: "Dec 20", done: false },
    ],
    tickets: [
      { type: "EPIC", title: "Monolith Migration to Fastify Gateway", points: null },
      { type: "STORY", title: "Extract Auth Microservice endpoints", points: 13 },
    ]
  }
];

export default function MeetingsPage() {
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting>(MOCK_MEETINGS[0]);
  const [meetings, setMeetings] = useState<Meeting[]>(MOCK_MEETINGS);

  const toggleActionItem = (meetingId: string, actionId: string) => {
    setMeetings(prev => prev.map(m => {
      if (m.id !== meetingId) return m;
      return {
        ...m,
        actionItems: m.actionItems.map(act => {
          if (act.id !== actionId) return act;
          return { ...act, done: !act.done };
        })
      };
    }));
    // Sync active select state
    setSelectedMeeting(prev => {
      if (prev.id !== meetingId) return prev;
      return {
        ...prev,
        actionItems: prev.actionItems.map(act => {
          if (act.id !== actionId) return act;
          return { ...act, done: !act.done };
        })
      };
    });
  };

  return (
    <div className="flex-1 flex overflow-hidden bg-[#0B0F14]">
      
      {/* LEFT PANEL: Meetings Logs */}
      <div className="w-[300px] md:w-[340px] border-r border-[rgba(255,255,255,0.06)] bg-[#121826]/20 flex flex-col flex-shrink-0">
        <div className="p-4.5 border-b border-[rgba(255,255,255,0.06)] flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-slate-200 flex items-center gap-1.5">
              <Video className="w-4 h-4 text-blue" />
              Decision Log
            </h2>
            <p className="text-[10px] text-slate-500 font-mono mt-0.5">Whisper + T5 Pipeline</p>
          </div>
          <button className="p-1.5 bg-blue/15 text-blue rounded-lg border border-blue/20 hover:bg-blue/25 transition-colors">
            <Plus className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-[rgba(255,255,255,0.04)]">
          {meetings.map(m => {
            const isSelected = selectedMeeting.id === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setSelectedMeeting(m)}
                className={`w-full text-left p-4.5 transition-colors relative ${
                  isSelected ? "bg-[#121826]" : "hover:bg-[#121826]/40"
                }`}
              >
                {isSelected && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue" />
                )}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[9px] text-slate-500 font-mono">
                    <span>{m.date}</span>
                    <span>{m.duration}</span>
                  </div>
                  <h3 className="text-xs font-bold text-slate-200 line-clamp-2 leading-snug">
                    {m.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded border border-[rgba(255,255,255,0.04)] font-mono">
                      Sent: {m.sentiment}
                    </span>
                    <span className="text-[9px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded border border-[rgba(255,255,255,0.04)] font-mono">
                      Energy: {m.energy}%
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* RIGHT PANEL: Notion Document Style Content */}
      <div className="flex-1 overflow-y-auto bg-[#0b0f14]">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedMeeting.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="p-8 md:p-12 space-y-8 max-w-3xl"
          >
            {/* Header Title */}
            <div className="space-y-4">
              <h1 className="text-2xl md:text-3xl font-extrabold text-white leading-tight font-sans">
                {selectedMeeting.title}
              </h1>

              {/* Metadata row */}
              <div className="flex flex-wrap items-center gap-5 text-xs text-slate-400 border-b border-[rgba(255,255,255,0.06)] pb-5">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-slate-500" />
                  <span>{selectedMeeting.date}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-slate-500" />
                  <span>{selectedMeeting.duration} duration</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-slate-500" />
                  <span>{selectedMeeting.participants.length} present</span>
                </div>
              </div>
            </div>

            {/* Participants avatars */}
            <div className="space-y-2">
              <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Present</h4>
              <div className="flex flex-wrap gap-2">
                {selectedMeeting.participants.map((p, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 bg-[#121826] border border-[rgba(255,255,255,0.04)] px-2.5 py-1 rounded-full text-xs text-slate-300">
                    <div className="w-4.5 h-4.5 rounded-full bg-blue/15 flex items-center justify-center font-bold text-[9px] text-blue font-mono">
                      {p.charAt(0)}
                    </div>
                    <span>{p}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Summary */}
            <div className="space-y-3">
              <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <FileText className="w-3.5 h-3.5 text-blue" />
                Whisper Summary
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-sans font-normal">
                {selectedMeeting.summary}
              </p>
            </div>

            {/* Decisions list */}
            <div className="space-y-3">
              <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Decisions Log</h3>
              <ol className="list-decimal list-inside space-y-2.5 pl-1">
                {selectedMeeting.decisions.map((decision, idx) => (
                  <li key={idx} className="text-sm text-slate-300 leading-relaxed font-medium">
                    <span className="text-slate-100">{decision}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Action items checklist */}
            <div className="space-y-3">
              <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Action Items</h3>
              <div className="space-y-2">
                {selectedMeeting.actionItems.map(act => (
                  <button
                    key={act.id}
                    onClick={() => toggleActionItem(selectedMeeting.id, act.id)}
                    className="w-full text-left flex items-start gap-3 p-3 bg-[#121826] border border-[rgba(255,255,255,0.05)] rounded-lg hover:border-slate-700 transition-colors group"
                  >
                    <div className="mt-0.5 flex-shrink-0">
                      {act.done ? (
                        <CheckSquare className="w-4 h-4 text-blue" />
                      ) : (
                        <Square className="w-4 h-4 text-slate-500 group-hover:text-slate-300" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-xs font-semibold leading-normal ${
                        act.done ? "text-slate-500 line-through" : "text-slate-200"
                      }`}>
                        {act.task}
                      </p>
                      <div className="flex items-center gap-3 text-[9px] text-slate-500 mt-1 font-mono">
                        <span>Assignee: {act.assignee}</span>
                        <span>•</span>
                        <span>Due: {act.due}</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Jira tickets */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Suggested Jira Tickets</h3>
                <button className="text-[9px] font-bold text-blue hover:text-blue-hover uppercase tracking-wider font-mono">
                  Sync all
                </button>
              </div>
              <div className="space-y-2">
                {selectedMeeting.tickets.map((t, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-[#0b0f14]/50 border border-[rgba(255,255,255,0.03)] rounded-lg text-xs">
                    <div className="flex items-center gap-2">
                      <span className={`px-1.5 py-0.5 font-mono font-bold text-[9px] rounded ${
                        t.type === "BUG" ? "bg-rose-500/10 text-rose-400 border border-rose-500/20" :
                        t.type === "EPIC" ? "bg-purple-500/10 text-purple-400 border border-purple-500/20" :
                        "bg-blue/10 text-blue border border-blue/20"
                      }`}>
                        {t.type}
                      </span>
                      <span className="text-slate-300 font-semibold">{t.title}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      {t.points && <span className="text-[10px] text-slate-500 font-mono">{t.points} pts</span>}
                      <button className="text-[9px] text-blue font-bold flex items-center gap-0.5 hover:text-blue-hover">
                        Push <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  );
}
