import React, { useState } from 'react';
import {
  MessageSquare,
  ThumbsUp,
  Tag,
  Send,
  Plus,
  Search,
  CheckCircle2,
  Clock,
  User,
  Sparkles,
  WifiOff,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { ForumPost, ForumReply } from '../types';

interface CommunityForumSectionProps {
  posts: ForumPost[];
  isOnline: boolean;
  onAddPost: (newPost: Partial<ForumPost>) => Promise<void>;
  onAddReply: (postId: string, content: string, author: string) => Promise<void>;
  onUpvotePost: (postId: string) => Promise<void>;
}

export const CommunityForumSection: React.FC<CommunityForumSectionProps> = ({
  posts,
  isOnline,
  onAddPost,
  onAddReply,
  onUpvotePost,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isNewPostOpen, setIsNewPostOpen] = useState(false);
  const [expandedPostId, setExpandedPostId] = useState<string | null>(posts[0]?.id || null);
  const [replyTextMap, setReplyTextMap] = useState<{ [postId: string]: string }>({});

  // New post state
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostCategory, setNewPostCategory] = useState<ForumPost['category']>(
    'Paramedical Techniques'
  );
  const [newPostAuthor, setNewPostAuthor] = useState('');
  const [newPostTags, setNewPostTags] = useState('DMLT, HospitalTech');

  const categories = [
    'All',
    'Paramedical Techniques',
    'Clinical Case Studies',
    'Hospital Management',
    'Exam Preparation',
    'Internship Experiences',
  ];

  const filteredPosts = posts.filter((p) => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostTitle.trim() || !newPostContent.trim()) return;

    await onAddPost({
      title: newPostTitle,
      content: newPostContent,
      category: newPostCategory,
      author: newPostAuthor || 'CIHM Scholar',
      authorRole: 'Student',
      tags: newPostTags.split(',').map((t) => t.trim()),
    });

    setNewPostTitle('');
    setNewPostContent('');
    setIsNewPostOpen(false);
  };

  const handleSendReply = async (postId: string) => {
    const text = replyTextMap[postId];
    if (!text || !text.trim()) return;

    await onAddReply(postId, text, 'CIHM Member');
    setReplyTextMap({ ...replyTextMap, [postId]: '' });
  };

  return (
    <section id="forum" className="py-12 bg-slate-100 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-100 text-cyan-900 text-xs font-bold mb-2">
              <MessageSquare className="w-3.5 h-3.5 text-cyan-700" />
              <span>CIHM COMMUNITY &amp; CLINICAL Q&amp;A</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Outfit']">
              Interactive Community Forums
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mt-1">
              Engage with faculty, clinical interns, alumni, and fellow paramedical students to
              resolve practical diagnostic questions and share hospital insights.
            </p>
          </div>

          <button
            id="start-discussion-topic-btn"
            onClick={() => setIsNewPostOpen(true)}
            className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-cyan-700 hover:bg-cyan-800 text-white shadow-sm flex items-center gap-1.5 transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Ask Question / Start Topic</span>
          </button>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-cyan-800 text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions, tags, topics..."
              className="w-full pl-9 pr-4 py-1.5 text-xs sm:text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-600 text-slate-800"
            />
          </div>
        </div>

        {/* Forum Posts List */}
        <div className="space-y-4">
          {filteredPosts.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center border border-slate-200 shadow-sm">
              <MessageSquare className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <p className="text-slate-700 font-semibold text-sm">No discussions found.</p>
              <p className="text-xs text-slate-500 mt-1">
                Be the first to start a topic in this category!
              </p>
            </div>
          ) : (
            filteredPosts.map((post) => {
              const isExpanded = expandedPostId === post.id;
              return (
                <div
                  key={post.id}
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all p-5 space-y-4"
                >
                  {/* Post Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-50 text-cyan-800 border border-cyan-200">
                          {post.category}
                        </span>
                        <span className="text-[11px] text-slate-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.createdAt}
                        </span>
                      </div>
                      <h3 className="font-bold text-base text-slate-900 font-['Outfit'] hover:text-cyan-800 cursor-pointer">
                        {post.title}
                      </h3>
                    </div>

                    {/* Upvote Button */}
                    <button
                      id={`upvote-post-${post.id}`}
                      onClick={() => onUpvotePost(post.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 hover:border-cyan-500 hover:bg-cyan-50 text-slate-700 hover:text-cyan-800 text-xs font-bold transition-colors active:scale-95 shrink-0"
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span>{post.upvotes}</span>
                    </button>
                  </div>

                  {/* Post Content */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{post.content}</p>

                  {/* Post Tags & Author */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs">
                    <div className="flex flex-wrap items-center gap-1.5">
                      {post.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-medium"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 text-[11px] text-slate-500">
                      <User className="w-3 h-3 text-slate-400" />
                      <span className="font-semibold text-slate-700">{post.author}</span>
                      <span className="text-cyan-700 font-medium">({post.authorRole})</span>
                    </div>
                  </div>

                  {/* Toggle Replies Bar */}
                  <div className="pt-2 flex items-center justify-between">
                    <button
                      onClick={() => setExpandedPostId(isExpanded ? null : post.id)}
                      className="text-xs font-bold text-cyan-800 hover:text-cyan-900 flex items-center gap-1"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>
                        {post.replies?.length || 0} {post.replies?.length === 1 ? 'Reply' : 'Replies'}
                      </span>
                      {isExpanded ? (
                        <ChevronUp className="w-3.5 h-3.5" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>

                  {/* Expanded Replies Thread */}
                  {isExpanded && (
                    <div className="mt-3 pt-3 border-t border-slate-200 space-y-3 bg-slate-50 p-4 rounded-xl">
                      <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                        Discussion Responses ({post.replies?.length || 0})
                      </h4>

                      {post.replies?.map((reply) => (
                        <div
                          key={reply.id}
                          className="bg-white p-3 rounded-xl border border-slate-200/80 space-y-1 text-xs"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5">
                              <span className="font-bold text-slate-800">{reply.author}</span>
                              <span
                                className={`px-1.5 py-0.2 rounded text-[10px] font-bold ${
                                  reply.authorRole === 'Faculty'
                                    ? 'bg-purple-100 text-purple-800'
                                    : reply.authorRole === 'Alumni'
                                    ? 'bg-amber-100 text-amber-800'
                                    : 'bg-slate-100 text-slate-600'
                                }`}
                              >
                                {reply.authorRole}
                              </span>
                            </div>
                            <span className="text-[10px] text-slate-400">{reply.createdAt}</span>
                          </div>
                          <p className="text-slate-700 text-xs leading-relaxed">{reply.content}</p>
                        </div>
                      ))}

                      {/* Reply Box */}
                      <div className="flex gap-2 pt-2">
                        <input
                          type="text"
                          value={replyTextMap[post.id] || ''}
                          onChange={(e) =>
                            setReplyTextMap({ ...replyTextMap, [post.id]: e.target.value })
                          }
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleSendReply(post.id);
                          }}
                          placeholder="Write a clinical explanation or question..."
                          className="flex-1 px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-600"
                        />
                        <button
                          onClick={() => handleSendReply(post.id)}
                          className="px-4 py-2 bg-cyan-700 hover:bg-cyan-800 text-white rounded-xl text-xs font-bold transition-all shadow shrink-0 flex items-center gap-1 active:scale-95"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>Reply</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* New Post Modal */}
      {isNewPostOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 font-['Outfit'] mb-1">
              Start a Community Discussion
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Ask about paramedical techniques, clinical cases, or hospital workflows.
            </p>

            <form onSubmit={handleCreatePost} className="space-y-3 text-xs sm:text-sm">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Your Name</label>
                <input
                  type="text"
                  placeholder="e.g. Rahul Sen (DMLT Intern)"
                  value={newPostAuthor}
                  onChange={(e) => setNewPostAuthor(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Topic Title *</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. How to interpret hyperkalemia on ECG?"
                  value={newPostTitle}
                  onChange={(e) => setNewPostTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-800 focus:ring-2 focus:ring-cyan-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                <select
                  value={newPostCategory}
                  onChange={(e) =>
                    setNewPostCategory(e.target.value as ForumPost['category'])
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-800"
                >
                  <option value="Paramedical Techniques">Paramedical Techniques</option>
                  <option value="Clinical Case Studies">Clinical Case Studies</option>
                  <option value="Hospital Management">Hospital Management</option>
                  <option value="Exam Preparation">Exam Preparation</option>
                  <option value="Internship Experiences">Internship Experiences</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Question Details / Context *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Share details, symptoms, diagnostic machine observations, or questions..."
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-800 focus:ring-2 focus:ring-cyan-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  placeholder="ECG, Cardiology, Dialysis, NABH"
                  value={newPostTags}
                  onChange={(e) => setNewPostTags(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-800"
                />
              </div>

              {!isOnline && (
                <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-center gap-2">
                  <WifiOff className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Offline: Post will be cached and automatically synced once reconnected.</span>
                </div>
              )}

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsNewPostOpen(false)}
                  className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-cyan-700 hover:bg-cyan-800 text-white text-xs font-bold shadow"
                >
                  Post to Forum
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
