import React, { useState } from 'react';
import {
  Users,
  MessageCircle,
  Plus,
  Send,
  BookOpen,
  Sparkles,
  Award,
  Video,
  Radio,
  FileText,
  UserCheck,
  X,
} from 'lucide-react';
import { StudyRoom, StudyMessage } from '../types';

interface StudyConnectSectionProps {
  rooms: StudyRoom[];
  onCreateRoom: (newRoom: Partial<StudyRoom>) => Promise<void>;
  onSendMessage: (roomId: string, text: string, author: string) => Promise<void>;
}

export const StudyConnectSection: React.FC<StudyConnectSectionProps> = ({
  rooms,
  onCreateRoom,
  onSendMessage,
}) => {
  const [activeRoomId, setActiveRoomId] = useState<string>(rooms[0]?.id || '');
  const [messageInput, setMessageInput] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // New room form
  const [newTitle, setNewTitle] = useState('');
  const [newTopic, setNewTopic] = useState('');
  const [newCategory, setNewCategory] = useState('Paramedical Studies');
  const [newHost, setNewHost] = useState('Dr. S. Chatterjee');
  const [newNotes, setNewNotes] = useState('');

  const activeRoom = rooms.find((r) => r.id === activeRoomId) || rooms[0];

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim() || !activeRoom) return;

    await onSendMessage(activeRoom.id, messageInput, 'Student Participant');
    setMessageInput('');
  };

  const handleCreateRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newTopic.trim()) return;

    await onCreateRoom({
      title: newTitle,
      topic: newTopic,
      courseCategory: newCategory,
      hostName: newHost || 'Study Fellow',
      summaryNotes: newNotes || 'Collaborative study session initialized.',
      maxMembers: 15,
    });

    setIsCreateModalOpen(false);
    setNewTitle('');
    setNewTopic('');
    setNewNotes('');
  };

  return (
    <section id="study-connect" className="py-12 bg-slate-900 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-bold mb-2">
              <Users className="w-3.5 h-3.5 text-cyan-400" />
              <span>CIHM PEER STUDY CONNECT</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit']">
              Connect to Study &amp; Discuss Complex Projects
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mt-1">
              Paramedical students, clinical interns, and healthcare professionals collaborate in
              real-time on diagnostic case studies, ECG strip decoding, and hospital SOPs.
            </p>
          </div>

          <button
            id="create-study-room-btn"
            onClick={() => setIsCreateModalOpen(true)}
            className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-cyan-600 hover:bg-cyan-500 text-white shadow-md flex items-center gap-1.5 transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Create Study Group</span>
          </button>
        </div>

        {/* Study Rooms Grid & Live Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Room Selector Column */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Active Peer Study Rooms ({rooms.length})
            </h3>

            {rooms.map((room) => {
              const isSelected = room.id === activeRoom?.id;
              return (
                <div
                  key={room.id}
                  onClick={() => setActiveRoomId(room.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-slate-800 border-cyan-500/80 shadow-lg shadow-cyan-950/40'
                      : 'bg-slate-800/40 border-slate-700/60 hover:bg-slate-800/70'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-950 text-cyan-300 border border-cyan-800">
                      {room.courseCategory}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-semibold">
                      <Radio className="w-3 h-3 animate-pulse" />
                      {room.activeMembersCount} Live
                    </span>
                  </div>

                  <h4 className="font-bold text-sm text-white font-['Outfit'] line-clamp-1">
                    {room.title}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">{room.topic}</p>

                  <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-slate-700/60 text-[11px] text-slate-400">
                    <span className="flex items-center gap-1 text-slate-300 truncate">
                      <UserCheck className="w-3 h-3 text-cyan-400" />
                      Host: {room.hostName}
                    </span>
                    <span className="text-cyan-400 font-bold">Enter Room →</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Room Interactive Chat & Whiteboard */}
          <div className="lg:col-span-8 bg-slate-800/90 rounded-2xl border border-slate-700 p-5 flex flex-col justify-between shadow-2xl">
            {activeRoom ? (
              <div className="flex flex-col h-full space-y-4">
                {/* Room Header */}
                <div className="flex flex-wrap items-center justify-between pb-3 border-b border-slate-700/80 gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-white font-['Outfit']">
                        {activeRoom.title}
                      </h3>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                        LIVE STUDYING
                      </span>
                    </div>
                    <p className="text-xs text-cyan-300 font-medium mt-0.5">
                      Topic: {activeRoom.topic}
                    </p>
                  </div>

                  <div className="text-right text-xs text-slate-400">
                    <span className="block font-semibold text-slate-200">
                      Facilitator: {activeRoom.hostName}
                    </span>
                    <span className="text-[10px] text-slate-500">
                      Cap: {activeRoom.activeMembersCount}/{activeRoom.maxMembers} Students
                    </span>
                  </div>
                </div>

                {/* Whiteboard Summary Notes */}
                <div className="p-3 bg-slate-900/90 rounded-xl border border-cyan-900/40 text-xs">
                  <div className="flex items-center gap-1.5 text-cyan-400 font-bold mb-1">
                    <FileText className="w-3.5 h-3.5" />
                    <span>Live Blackboard Takeaways &amp; Formulas:</span>
                  </div>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    {activeRoom.summaryNotes}
                  </p>
                </div>

                {/* Live Message Stream */}
                <div className="flex-1 bg-slate-950/60 rounded-xl p-3.5 space-y-3 overflow-y-auto max-h-72 border border-slate-800">
                  {activeRoom.messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`p-3 rounded-xl text-xs space-y-1 ${
                        msg.isFaculty
                          ? 'bg-cyan-950/80 border border-cyan-800/80 text-cyan-100 ml-0 mr-4'
                          : 'bg-slate-800/90 border border-slate-700 text-slate-200 ml-4 mr-0'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[11px]">
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-white">{msg.author}</span>
                          {msg.isFaculty && (
                            <span className="px-1.5 py-0.2 rounded text-[9px] font-extrabold bg-cyan-500 text-slate-950 uppercase">
                              Faculty Mentor
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-slate-400">{msg.timestamp}</span>
                      </div>
                      <p className="leading-relaxed">{msg.text}</p>
                    </div>
                  ))}
                </div>

                {/* Message Input Box */}
                <form onSubmit={handleSend} className="flex gap-2 pt-2">
                  <input
                    type="text"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    placeholder={`Ask a question or explain clinical concepts in ${activeRoom.title}...`}
                    className="flex-1 px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-bold transition-all shadow-md active:scale-95 flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send</span>
                  </button>
                </form>
              </div>
            ) : (
              <div className="text-center py-12 text-slate-400">
                <Users className="w-10 h-10 mx-auto mb-2 text-slate-600" />
                <p>Select a study room from the list to join live peer discussions.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Create Room Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-6 shadow-2xl text-white">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold font-['Outfit']">Launch New Study Group</h3>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateRoom} className="space-y-3 pt-3 text-xs">
              <div>
                <label className="block font-bold text-slate-300 mb-1">Group Title *</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Anesthesia Gas Mixtures & Safety Circuits"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">Discussion Topic *</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Scavenging systems and nitrous oxide dosage calculations"
                  value={newTopic}
                  onChange={(e) => setNewTopic(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">Category / Discipline</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                >
                  <option value="Paramedical Studies">Paramedical Studies</option>
                  <option value="Radiology & Medical Imaging">Radiology &amp; Imaging</option>
                  <option value="Critical Care & Dialysis">Critical Care &amp; Dialysis</option>
                  <option value="Hospital Operations & NABH">Hospital Operations &amp; NABH</option>
                  <option value="Cardiology & ECG">Cardiology &amp; ECG</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">Host / Moderator Name</label>
                <input
                  type="text"
                  value={newHost}
                  onChange={(e) => setNewHost(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">Initial Key Notes</label>
                <textarea
                  rows={2}
                  placeholder="Points or diagnostic formulas for the blackboard..."
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-slate-700 text-slate-300 hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold"
                >
                  Launch Room
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
