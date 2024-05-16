'use client'
import React, { useState } from 'react'
import { FaShare } from "react-icons/fa";
import { Icons } from './ui/Icons';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { FaCopy } from "react-icons/fa";
import { CheckIcon } from 'lucide-react';

function Share({ factoidId }) {
    const [copied, setCopied] = useState(false);
    const url = encodeURIComponent(`https://www.37heaven.xyz/factoid/${factoidId}`);
    const text = encodeURIComponent("Check out this really cool 37 factoid!");

    const shareLinks = {
        twitter: `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
        reddit: `https://www.reddit.com/submit?url=${url}&title=${text}`,
        telegram: `https://t.me/share/url?url=${url}&text=${text}`,
        linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${text}`,
        whatsapp: `https://api.whatsapp.com/send?text=${text}%20${url}`,
    };

    const openPopup = (url) => {
        window.open(url, 'shareWindow', 'width=600,height=400,scrollbars=yes');
    };

    const handleCopy = (e) => {
        e.preventDefault();
        navigator.clipboard.writeText(`https://www.37heaven.xyz/factoid/${factoidId}`);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 800);
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <div
                    className="cursor-pointer flex items-center justify-center gap-1 text-zinc-600/75 hover:text-zinc-700"
                >
                    <FaShare className='h-4 w-4' />
                    <p>Share</p>
                </div>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-2">
                <div
                    className='flex items-center justify-center gap-1.5'
                >
                    <span onClick={(e) => {
                        e.preventDefault();
                        openPopup(shareLinks.twitter);
                    }} className="hover:opacity-75 cursor-pointer">
                        <Icons.twitter />
                    </span>
                    <span onClick={(e) => {
                        e.preventDefault();
                        openPopup(shareLinks.facebook);
                    }} className="hover:opacity-75 cursor-pointer">
                        <Icons.facebook />
                    </span>
                    <span onClick={(e) => {
                        e.preventDefault();
                        openPopup(shareLinks.reddit);
                    }} className="hover:opacity-75 cursor-pointer">
                        <Icons.reddit />
                    </span>
                    <span onClick={(e) => {
                        e.preventDefault();
                        openPopup(shareLinks.telegram);
                    }} className="hover:opacity-75 cursor-pointer">
                        <Icons.telegram />
                    </span>
                    <span onClick={(e) => {
                        e.preventDefault();
                        openPopup(shareLinks.linkedin);
                    }} className="hover:opacity-75 cursor-pointer">
                        <Icons.linkedin />
                    </span>
                    <span onClick={(e) => {
                        e.preventDefault();
                        openPopup(shareLinks.whatsapp);
                    }} className="hover:opacity-75 cursor-pointer">
                        <Icons.whatsapp />
                    </span>
                    <span onClick={handleCopy}
                        className='bg-gray-200 rounded-full p-[5px] cursor-pointer hover:opacity-75 border border-gray-300'>
                        {copied ? <CheckIcon className='h-3 w-3 text-green-500' /> : <FaCopy className='h-3 w-3 text-zinc-900' />}
                    </span>
                </div>
            </PopoverContent>
        </Popover>
    )
}

export default Share