import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Editor from '../components/editor';
import { Chat } from '../components/Chats';
import WorkspaceFiles from '../components/WorkspaceFiles';
import TasksView from '../components/TasksView';
// import CommentsPanel from '../components/CommentsPanel';
import { Comment } from '../components/Comment';

const Workspace = () => {
	const { id } = useParams();
	const [activeTab, setActiveTab] = useState('editor');
	
	// Sanitize ID to match Liveblocks room ID requirements

	const navItems = [
		{ id: 'editor', label: 'Editor', icon: '✎' },
		{ id: 'files', label: 'Files', icon: '📁' },
		{ id: 'tasks', label: 'Tasks', icon: '✅' },
		{ id: 'chat', label: 'Chat', icon: '💬' },
	];

	return (
		<div className="min-h-screen bg-black">
			<div className="flex">
				{/* Left sidebar */}
				<aside className="w-72 bg-gray-900 text-white min-h-screen p-4 hidden md:block">
					<div className="mb-6">
						<h2 className="text-lg font-bold">Workspace</h2>
						<p className="text-sm text-gray-300 mt-1">Your teams & projects</p>
					</div>
					<div className="mb-4">
						<input placeholder="Search..." className="w-full bg-gray-800 placeholder-gray-300 text-sm rounded px-3 py-2 focus:outline-none" />
					</div>
					<div className="space-y-2 mt-4">
						<button className="w-full text-left px-3 py-2 rounded bg-gray-800/50 flex items-center justify-between">
							<span>Product Design Team</span>
							<span className="text-xs bg-gray-700 px-2 py-0.5 rounded">8</span>
						</button>
						<button className="w-full text-left px-3 py-2 rounded hover:bg-gray-800/40">Marketing Campaign</button>
						<button className="w-full text-left px-3 py-2 rounded hover:bg-gray-800/40">Development Sprint</button>
					</div>
					<div className="mt-8 border-t border-gray-700 pt-4">
						<h3 className="text-xs uppercase text-gray-400">Navigation</h3>
						<ul className="mt-3 space-y-2">
							{navItems.map((item) => (
								<li key={item.id}>
									<button
										onClick={() => setActiveTab(item.id)}
										className={`w-full text-left px-2 py-1 rounded flex items-center gap-2 ${
											activeTab === item.id ? 'bg-gray-800' : 'hover:bg-gray-800/40'
										}`}
									>
										<span>{item.icon}</span>
										{item.label}
									</button>
								</li>
							))}
						</ul>
					</div>
				</aside>

				{/* Main area */}
				<div className="flex-1 flex flex-col h-screen">
					<header className="bg-gray-900 border-b border-gray-800 shrink-0">
						<div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
							<div>
								<h1 className="text-lg font-semibold text-white">Product Design Team</h1>
								<p className="text-sm text-gray-400">Collaborative workspace for your team</p>
							</div>
							<div className="flex items-center gap-3">
								<button className="px-3 py-1 rounded bg-gray-800 text-white text-sm hover:bg-gray-700">Share</button>
								<button className="px-3 py-1 rounded bg-blue-600 text-white text-sm hover:bg-blue-700">Save</button>
							</div>
						</div>
					</header>

					<main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 overflow-hidden">
						{activeTab === 'editor' ? (
							<div className="flex gap-6 h-full">
								{/* Editor column - takes up remaining space */}
								<div className="flex-1">
									<div className="bg-gray-900 rounded-xl shadow-sm overflow-hidden relative border border-gray-800 h-full flex flex-col">
										<div className="px-6 py-4 border-b border-gray-800 flex items-center justify-between shrink-0">
											<div className="flex items-center gap-3">
												<span className="text-xl">✎</span>
												<h2 className="font-semibold text-white">Product Requirements Doc</h2>
											</div>
											<div className="flex items-center gap-2">
												<button className="text-sm px-3 py-1 rounded bg-gray-800 text-white hover:bg-gray-700">Share</button>
												<button className="text-sm px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700">Save</button>
											</div>
										</div>

										{/* Editor component - takes remaining height */}
										<div className="flex-1 overflow-hidden h-full">
											<Editor docId={`workspace_${id}`} username="You" />
										</div>

										{/* Bottom status bar */}
										<div className="absolute left-6 right-6 bottom-4 flex items-center justify-between">
											<div className="text-sm text-gray-400 bg-gray-900/90 px-3 py-1 rounded border border-gray-800">3 collaborators editing — Last saved: 2 minutes ago</div>
											<div className="flex items-center -space-x-3">
												<div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-semibold">S</div>
												<div className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center text-white text-xs font-semibold">M</div>
												<div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-semibold">E</div>
											</div>
										</div>
									</div>
								</div>

								{/* Right column for comments - fixed width */}
								<div className="w-80 shrink-0">
									<div className="bg-gray-900 rounded-xl shadow-sm overflow-hidden h-full border border-gray-800">
										<Comment />
									</div>
								</div>
							</div>
						) : (
							<div className="bg-gray-900 rounded-xl shadow-sm overflow-hidden h-full border border-gray-800">
								{activeTab === 'files' && <WorkspaceFiles />}
								{activeTab === 'tasks' && <TasksView />}
								{activeTab === 'chat' && <Chat />}
							</div>
						)}
					</main>
				</div>
			</div>
		</div>
	);
};

export default Workspace;
