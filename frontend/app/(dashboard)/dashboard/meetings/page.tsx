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
  ChevronRight,
  ArrowLeft,
  AlertTriangle,
  Search,
  Tag,
  CheckCircle2,
  AlertCircle
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

interface MeetingRisk {
  severity: "critical" | "high" | "medium" | "low";
  description: string;
  mitigation: string;
}

interface Meeting {
  id: string;
  title: string;
  type: string; // e.g., "Sprint Planning", "Architecture Review", "Daily Standup"
  date: string;
  duration: string;
  participants: string[];
  sentiment: string;
  energy: number;
  summary: string;
  decisions: string[];
  actionItems: ActionItem[];
  tickets: Ticket[];
  risks: MeetingRisk[];
}

const MOCK_MEETINGS: Meeting[] = [
  {
    id: "meeting-1",
    title: "Sprint 24 Planning & RAG Core Integration",
    type: "Sprint Planning",
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
    ],
    risks: [
      {
        severity: "high",
        description: "Deadlock risk detected in concurrent thread pools for the vector loading gateway.",
        mitigation: "Adopt async connection lifespans and pool timeouts."
      }
    ]
  },
  {
    id: "meeting-2",
    title: "Architecture Review — Gateway Microservices Strangler",
    type: "Architecture Review",
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
    ],
    risks: [
      {
        severity: "critical",
        description: "Single point of failure: All authentication routes proxy to a single instance of legacy auth middleware.",
        mitigation: "Deploy gateway auth plugin in active-active clustering mode across zones."
      }
    ]
  },
  {
    id: "meeting-3",
    title: "Daily Standup & Production Deploy Sync",
    type: "Daily Standup",
    date: "Dec 11, 2025",
    duration: "15 min",
    participants: ["Alice Chen", "Bob Kumar", "Sarah Williams", "Emma Rodriguez"],
    sentiment: "positive",
    energy: 88,
    summary: "Quick daily sync. Qdrant vector store is fully seeded. Bob verified that credentials log masking passed staging gate check. Setup for production deployment target window is scheduled for tonight at 10 PM UTC.",
    decisions: [
      "Authorize production push of Sprint 24 base branch at 10 PM UTC.",
      "Keep fallback cluster on standby during the DNS switch window."
    ],
    actionItems: [
      { id: "act-7", task: "Verify DNS records replication timing metrics", assignee: "Sarah Williams", due: "Dec 11", done: false },
      { id: "act-8", task: "Run live check script against production endpoints post-deployment", assignee: "Bob Kumar", due: "Dec 11", done: false }
    ],
    tickets: [
      { type: "TASK", title: "Run post-deploy endpoints validation test suite", points: 1 }
    ],
    risks: [
      {
        severity: "medium",
        description: "DNS propagation delays might impact routing latency for active user sessions.",
        mitigation: "Lower TTL to 60 seconds on current records 6 hours before deploy."
      }
    ]
  }
];

export default function MeetingsPage() {
  const [selectedMeetingId, setSelectedMeetingId] = useState<string | null>(null);
  const [meetings, setMeetings] = useState<Meeting[]>(MOCK_MEETINGS);
  const [searchQuery, setSearchQuery] = useState("");

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
  };

  const selectedMeeting = meetings.find(m => m.id === selectedMeetingId);

  const filteredMeetings = meetings.filter(m => 
    m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.summary.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full h-full bg-[#0B1220] text-[#F8FAFC] overflow-y-auto min-h-screen">
      <div className="content-container py-10">
        
        <AnimatePresence mode="wait">
          {!selectedMeetingId ? (
            <motion.div
              key="list-view"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-8"
            >
              {/* Header Info */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                    <Video className="w-6 h-6 text-[#2563EB]" />
                    Meeting Intelligence
                  </h1>
                  <p className="text-sm text-[#94A3B8] mt-1">
                    Convert raw transcript recordings into action items, critical decisions, and project risk indicators.
                  </p>
                </div>
                <button 
                  onClick={() => alert("Recording connection panel coming soon!")}
                  className="self-start px-4 py-2 bg-[#2563EB] hover:bg-[#2563EB]/90 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all shadow-[0_0_12px_rgba(37,99,235,0.2)]"
                >
                  <Plus className="w-4 h-4" />
                  Connect New Meeting
                </button>
              </div>

              {/* Search Bar */}
              <div className="flex items-center gap-3 p-3 bg-[#111827] border border-[rgba(255,255,255,0.08)] rounded-xl max-w-md focus-within:border-[#2563EB]/50 transition-all">
                <Search className="w-4 h-4 text-[#94A3B8]" />
                <input
                  type="text"
                  placeholder="Search meetings by title, type, or context..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent text-xs text-[#F8FAFC] outline-none placeholder-[#94A3B8]/60"
                />
              </div>

              {/* Meetings Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMeetings.map((m) => (
                  <div
                    key={m.id}
                    onClick={() => setSelectedMeetingId(m.id)}
                    className="card-flat p-6 hover:border-[#2563EB]/40 hover:shadow-[0_0_15px_rgba(37,99,235,0.05)] transition-all cursor-pointer flex flex-col justify-between group h-full space-y-4"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="px-2 py-0.5 bg-[#2563EB]/10 border border-[#2563EB]/25 text-[#3B82F6] rounded text-[10px] font-mono font-bold">
                          {m.type}
                        </span>
                        <div className="flex items-center gap-1 text-[10px] text-[#94A3B8] font-mono">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{m.duration}</span>
                        </div>
                      </div>

                      <h3 className="text-sm font-bold text-slate-100 group-hover:text-[#3B82F6] transition-colors leading-snug">
                        {m.title}
                      </h3>

                      <p className="text-xs text-[#94A3B8] line-clamp-3 leading-relaxed">
                        {m.summary}
                      </p>
                    </div>

                    <div className="space-y-3 pt-4 border-t border-[rgba(255,255,255,0.06)]">
                      <div className="flex items-center justify-between text-[10px] text-[#94A3B8]">
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3 text-[#94A3B8]/80" />
                          {m.participants.length} Present
                        </span>
                        <span className="font-mono bg-slate-800/40 border border-[rgba(255,255,255,0.04)] px-1.5 py-0.5 rounded text-[9px]">
                          Energy: {m.energy}%
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-[11px] font-semibold text-[#3B82F6] pt-1">
                        <span>Open Document summary</span>
                        <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="detail-view"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-8"
            >
              {/* Back Button & Top Action */}
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setSelectedMeetingId(null)}
                  className="px-3.5 py-1.5 bg-[#111827] border border-[rgba(255,255,255,0.08)] hover:border-[#2563EB]/40 text-[#94A3B8] hover:text-[#F8FAFC] rounded-lg text-xs font-semibold flex items-center gap-2 transition-all"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Meetings
                </button>

                <div className="flex items-center gap-2 text-[10px] font-mono text-[#94A3B8] bg-[#111827] px-3 py-1.5 rounded-lg border border-[rgba(255,255,255,0.08)]">
                  <span>Processed: {selectedMeeting?.date}</span>
                </div>
              </div>

              {/* Notion-style Document */}
              <div className="bg-[#111827] border border-[rgba(255,255,255,0.08)] rounded-xl overflow-hidden shadow-2xl">
                
                {/* Header Block */}
                <div className="p-8 border-b border-[rgba(255,255,255,0.06)] bg-[#111827] space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 bg-[#2563EB]/15 border border-[#2563EB]/25 text-[#3B82F6] rounded text-[10px] font-mono font-bold">
                      {selectedMeeting?.type}
                    </span>
                    <span className="text-xs text-[#94A3B8]">•</span>
                    <span className="text-xs text-[#94A3B8] flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {selectedMeeting?.duration} Duration
                    </span>
                  </div>

                  <h1 className="text-2xl font-bold tracking-tight text-white leading-tight">
                    {selectedMeeting?.title}
                  </h1>

                  {/* Attendees */}
                  <div className="space-y-1.5 pt-2">
                    <span className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider block">Attendees</span>
                    <div className="flex flex-wrap gap-2">
                      {selectedMeeting?.participants.map((p, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 bg-[#0B1220] border border-[rgba(255,255,255,0.04)] px-2.5 py-1 rounded-full text-xs text-slate-300">
                          <div className="w-4 h-4 rounded-full bg-[#2563EB]/15 flex items-center justify-center font-bold text-[9px] text-[#3B82F6] font-mono">
                            {p.charAt(0)}
                          </div>
                          <span>{p}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Content grid */}
                <div className="p-8 space-y-8">
                  
                  {/* Summary */}
                  <div className="space-y-3">
                    <h3 className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider flex items-center gap-2 border-b border-[rgba(255,255,255,0.06)] pb-1.5">
                      <FileText className="w-4 h-4 text-[#2563EB]" />
                      AI Summary Summary
                    </h3>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {selectedMeeting?.summary}
                    </p>
                  </div>

                  {/* Decisions Log */}
                  <div className="space-y-3">
                    <h3 className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider flex items-center gap-2 border-b border-[rgba(255,255,255,0.06)] pb-1.5">
                      <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                      Decisions Log
                    </h3>
                    <ul className="space-y-2.5">
                      {selectedMeeting?.decisions.map((decision, idx) => (
                        <li key={idx} className="text-sm text-slate-300 leading-relaxed flex items-start gap-2.5">
                          <span className="font-mono text-[#2563EB] select-none font-bold">0{idx + 1}.</span>
                          <span>{decision}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Detected Risks */}
                  {selectedMeeting?.risks && selectedMeeting.risks.length > 0 && (
                    <div className="space-y-3">
                      <h3 className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider flex items-center gap-2 border-b border-[rgba(255,255,255,0.06)] pb-1.5">
                        <AlertCircle className="w-4 h-4 text-[#F59E0B]" />
                        Detected Risks
                      </h3>
                      <div className="space-y-3">
                        {selectedMeeting.risks.map((risk, idx) => (
                          <div key={idx} className="p-4 bg-[#F59E0B]/5 border border-[#F59E0B]/20 rounded-xl space-y-2">
                            <div className="flex items-center gap-2">
                              <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase bg-[#F59E0B]/10 text-[#F59E0B] border border-[#F59E0B]/20">
                                {risk.severity} severity
                              </span>
                              <span className="text-xs font-bold text-[#F59E0B]">Predictive Risk Alert</span>
                            </div>
                            <p className="text-xs text-slate-200 font-semibold">{risk.description}</p>
                            <div className="text-[11px] text-[#94A3B8]">
                              <span className="font-bold text-[#F59E0B]">Recommended Mitigation:</span> {risk.mitigation}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action items checklist */}
                  <div className="space-y-3">
                    <h3 className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider flex items-center gap-2 border-b border-[rgba(255,255,255,0.06)] pb-1.5">
                      <CheckSquare className="w-4 h-4 text-[#2563EB]" />
                      Action Items Checklist
                    </h3>
                    <div className="grid grid-cols-1 gap-2.5">
                      {selectedMeeting?.actionItems.map(act => (
                        <button
                          key={act.id}
                          onClick={() => toggleActionItem(selectedMeeting.id, act.id)}
                          className="w-full text-left flex items-start gap-3 p-3.5 bg-[#0B1220] border border-[rgba(255,255,255,0.05)] rounded-xl hover:border-[#2563EB]/30 transition-all group"
                        >
                          <div className="mt-0.5 flex-shrink-0">
                            {act.done ? (
                              <CheckSquare className="w-4 h-4 text-[#2563EB]" />
                            ) : (
                              <Square className="w-4 h-4 text-slate-500 group-hover:text-slate-300" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`text-xs font-semibold leading-normal ${
                              act.done ? "text-slate-500 line-through font-normal" : "text-slate-200"
                            }`}>
                              {act.task}
                            </p>
                            <div className="flex items-center gap-3 text-[9px] text-[#94A3B8]/60 mt-1 font-mono">
                              <span>Assignee: {act.assignee}</span>
                              <span>•</span>
                              <span>Due: {act.due}</span>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Suggested Jira Tickets */}
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.06)] pb-1.5">
                      <h3 className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider">Suggested Backlog Tickets</h3>
                      <button 
                        onClick={() => alert("Syncing suggested backlog tickets to Jira...")}
                        className="text-[10px] font-bold text-[#2563EB] hover:text-[#3B82F6] uppercase tracking-wider font-mono"
                      >
                        Sync all suggestions
                      </button>
                    </div>
                    <div className="space-y-2">
                      {selectedMeeting?.tickets.map((t, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3.5 bg-[#0B1220] border border-[rgba(255,255,255,0.03)] rounded-xl text-xs">
                          <div className="flex items-center gap-2.5">
                            <span className={`px-1.5 py-0.5 font-mono font-bold text-[9px] rounded ${
                              t.type === "BUG" ? "bg-[#EF4444]/10 text-[#EF4444] border border-[#EF4444]/20" :
                              t.type === "EPIC" ? "bg-purple-500/10 text-purple-400 border border-purple-500/20" :
                              "bg-[#2563EB]/10 text-[#3B82F6] border border-[#2563EB]/20"
                            }`}>
                              {t.type}
                            </span>
                            <span className="text-slate-300 font-semibold">{t.title}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            {t.points && <span className="text-[10px] text-[#94A3B8] font-mono">{t.points} pts</span>}
                            <button 
                              onClick={() => alert(`Creating Jira ticket: ${t.title}`)}
                              className="px-2.5 py-1 bg-[#2563EB]/10 text-[#3B82F6] hover:bg-[#2563EB]/20 rounded border border-[#2563EB]/25 text-[10px] font-bold flex items-center gap-0.5"
                            >
                              Push
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
