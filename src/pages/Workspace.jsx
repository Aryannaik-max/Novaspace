import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Editor from '../components/editor';
import { Chat } from '../components/Chats';
import WorkspaceFiles from '../components/WorkspaceFiles';
import TasksView from '../components/TasksView';
import background from '../assets/background.png';
// import CommentsPanel from '../components/CommentsPanel';
import { Comment } from '../components/Comment';

const Workspace = () => {
	const { id } = useParams();
	const [activeTab, setActiveTab] = useState('editor');
	
	// Sanitize ID to match Liveblocks room ID requirements

	const navItems = [
		{ id: 'editor', label: 'Editor' },
		{ id: 'files', label: 'Files'},
		{ id: 'tasks', label: 'Tasks'},
		{ id: 'chat', label: 'Chat' },
	];

	return (
		<div className="min-h-screen">
			<div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-yellow-300 border-t-4 border-black">
				<div className="flex justify-around items-center px-2 py-3">
					{navItems.map((item) => (
						<button
							key={item.id}
							onClick={() => setActiveTab(item.id)}
							className={`px-3 py-2 rounded-full font-Coiny text-xs border-2 border-black transition ${
								activeTab === item.id 
									? 'bg-black text-yellow-300 shadow-[2px_2px_0px_rgba(0,0,0,0.3)]' 
									: 'bg-yellow-200 text-black shadow-[2px_2px_0px_black]'
							}`}
						>
							{item.label}
						</button>
					))}
				</div>
			</div>

			<div className="flex">
				<aside className="w-72 min-h-screen p-4 hidden md:block bg-white border-r-4 border-black" style={{backgroundImage: `url(${background})`}}>
					<div className="mb-6">
						<h2 className="text-lg font-bold font-Coiny">Workspace</h2>
						<p className="text-sm text-gray-600 mt-1 font-Coiny">Your teams & projects</p>
					</div>
					<div className="mb-4">
						<input placeholder="Search..." className="w-full border-2 border-black text-sm placeholder-black text-black rounded px-3 py-2 focus:outline-none" />
					</div>
					{/* <div className="space-y-2 mt-4">
						<button className="w-full text-left px-3 py-2 rounded text-black flex items-center justify-between border-2 border-black bg-yellow-300 hover:shadow-[5px_5px_0px] hover:-translate-y-0.5 shadow-[2px_2px_0px_black] font-Coiny">
							<span>Product Design Team</span>
							<span className="text-xs text-black  px-2 py-0.5 rounded">8</span>
						</button>
						<button className="w-full text-left px-3 py-2 rounded text-black border-2 hover:shadow-[5px_5px_0px] hover:-translate-y-0.5 border-black bg-yellow-300 shadow-[2px_2px_0px_black] font-Coiny">Marketing Campaign</button>
						<button className="w-full text-left hover:shadow-[5px_5px_0px] hover:-translate-y-0.5 px-3 py-2 rounded text-black border-2 border-black bg-yellow-300 shadow-[2px_2px_0px_black] font-Coiny">Development Sprint</button>
					</div> */}
					<div className="mt-8 border-t-4 border-black pt-4">
						<h3 className="text-xs uppercase text-black font-Coiny">Navigation</h3>
						<ul className="mt-3 space-y-2 ">
							{navItems.map((item) => (
								<li key={item.id} className='flex justify-center items-center text-center'>
									<button
										onClick={() => setActiveTab(item.id)}
										className={`w-full text-left px-3  py-2 rounded-full font-Coiny justify-center border-2 border-black flex items-center gap-3 ${activeTab === item.id ? 'bg-yellow-400 text-black' : 'bg-yellow-300 text-black hover:shadow-[5px_5px_0px] hover:-translate-y-0.5 transition '} shadow-[4px_4px_0px_black]`}
									>
										{item.label}
									</button>
								</li>
							))}
						</ul>
					</div>
				</aside>

				{/* Main area */}
				<div className="flex-1 flex flex-col h-screen" style={{ backgroundImage: `url(${background})` }}>
					<header className="border-b-4 border-black bg-white shrink-0" style={{backgroundImage: `url(${background})`}}>
						<div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
						<div>
							<h1 className="text-lg font-semibold text-black font-Coiny">Product Design Team</h1>
							<p className="text-sm text-gray-700 font-Coiny">Collaborative workspace for your team</p>
						</div>
						<div className="flex items-center gap-3">
							<button className="px-3 py-1 rounded-full border-2 border-black bg-yellow-300 text-black text-sm shadow-[2px_2px_0px_black] font-Coiny">Share</button>
							<button className="px-3 py-1 rounded-full border-2 border-black bg-yellow-300 text-black text-sm shadow-[2px_2px_0px_black] font-Coiny">Save</button>
						</div>
						</div>
					</header>

					<main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 pb-24 md:pb-6 overflow-hidden">
						{activeTab === 'editor' ? (
							<div className="flex gap-6 h-full">
								<div className="flex-1">
									<div className="bg-white rounded-xl shadow-[7px_7px_0px_black] overflow-hidden relative border-4 border-black h-full flex flex-col">
										<div className="px-6 py-3 border-b-4 border-black bg-yellow-300 flex items-center justify-between shrink-0">
											<div className="flex items-center justify-center gap-3">
												<span className="text-xl">✎</span>
												<h2 className=" text-black font-Coiny">Product Requirements Doc</h2>
											</div>
										<div className="flex items-center gap-2 font-Coiny">
											<button className="text-sm px-3 py-1 rounded-full border-2 border-black bg-yellow-300 text-black shadow-[2px_2px_0px_black]">Share</button>
											<button className="text-sm px-3 py-1 rounded-full border-2 border-black bg-yellow-300 text-black shadow-[2px_2px_0px_black]">Save</button>
										</div>
										</div>
										<div className="flex-1 overflow-hidden h-full">
											<Editor key={`editor-${id}`} docId={`workspace_${id}`} username="You" />
										</div>

										{/* Bottom status bar */}
								{/* <div className="absolute left-6 right-6 bottom-4 flex items-center justify-between">
									<div className="text-sm bg-yellow-300 px-3 py-1 rounded-full border-2 border-black shadow-[2px_2px_0px_black] font-Coiny">3 collaborators editing — Last saved: 2 minutes ago</div>
											<div className="flex items-center -space-x-3">
												<div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-semibold">S</div>
												<div className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center text-white text-xs font-semibold">M</div>
												<div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-semibold">E</div>
											</div>
										</div> */}
									</div>
								</div>

								{/* Right column for comments - fixed width */}
								{/* <div className="w-80 shrink-0 ">
									<div className="bg-white rounded-xl shadow-[6px_6px_0px_black] overflow-hidden h-full border-4 border-black flex flex-col">
										<div className="px-4 py-3 border-b-4 border-black bg-yellow-300 font-semibold font-Coiny">Workspace Comments</div>
										<div className="flex-1 overflow-auto bg-red-500" style={{backgroundImage: `url(${background})`}}>
											<Comment/>
										</div>
									</div>
								</div> */}
							</div>
						) : (
						 	<div className="bg-white border-4 rounded-xl shadow-[6px_6px_0px_black] overflow-hidden h-full flex flex-col" style={{backgroundImage: `url(${background})`}}>
								<div className="px-6 py-3 border-b-4 border-black bg-yellow-300 flex items-center justify-between shrink-0">
									<h2 className="font-semibold font-Coiny text-black">
										{activeTab === 'files' && 'Files'}
										{activeTab === 'tasks' && 'Tasks'}
										{activeTab === 'chat' && 'Chat'}
									</h2>
								</div>
								<div className="flex-1 overflow-auto">
									{activeTab === 'files' && <WorkspaceFiles />}
									{activeTab === 'tasks' && <TasksView />}
									{activeTab === 'chat' && <Chat />}
								</div>
							</div>
						)}
					</main>
				</div>
			</div>
		</div>
	);
};

export default Workspace;
