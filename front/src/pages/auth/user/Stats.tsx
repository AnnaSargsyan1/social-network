import { HTMLAttributes, useState } from "react"
import { Modal } from "../../../lib/helpers/Modal";
import { IContext, type IAccount } from "../../../types";
import { useOutletContext } from "react-router-dom";

interface StatsProps extends HTMLAttributes<HTMLDivElement> {
	postsLength: number;
	followers: IAccount[];
	following: IAccount[];
	isPrivate?: boolean;
}
export const Stats = ({ postsLength, following, followers, isPrivate, ...rest}: StatsProps) => {
	const [followersIsOpen, setFollowersIsOpen] = useState(false);
	const [followingIsOpen, setFollowingIsOpen] = useState(false);
	return <div {...rest}>
		<div className="text-center">
			<p className="text-white text-lg font-bold">{postsLength}</p>
			<p className="text-sm">Posts</p>
		</div>
		<div className={`text-center ${ !isPrivate && "cursor-pointer"}`}	 onClick={() => setFollowersIsOpen(prev => !prev)}>
			<p className="text-white text-lg font-bold">{followers.length}</p>
			<p className="text-sm">Followers</p>
		</div>
		{ followersIsOpen && !isPrivate && <Modal title="Followers" accounts={followers} onClose={() => setFollowersIsOpen(false)} />}
		<div className={`text-center ${ !isPrivate && "cursor-pointer"}`} onClick={() => setFollowingIsOpen(prev => !prev)}>
			<p className="text-white text-lg font-bold">{following.length}</p>
			<p className="text-sm">Following</p>
		</div>
		{ followingIsOpen && !isPrivate && <Modal title="Following" accounts={following} onClose={() => setFollowingIsOpen(false)} />}
	</div>
}