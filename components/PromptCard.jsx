"use client";

import { useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from './ui/button';

const PromptCard = ({ 
  post, 
  handleTagClick, 
  handleEdit, 
  handleDelete
 }) => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const router = useRouter();

  const [copied, setCopied] = useState("");

  const handleProfileClick = () => {
    console.log(post);

    if (post.creator._id === session?.user.id) return router.push("/profile");

    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
  };

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(""), 3000);
  }

  return (
    <div className='prompt_card'>
      <div className='flex justify-between items-start gap-5'>
        <div 
          className='flex-1 flex justify-start items-center gap-3 cursor-pointer'
          onClick={handleProfileClick}
        >
          <Image 
            src={post.creator.image}
            alt='user_image'
            width={40}
            height={40}
            className='rounded-full object-contain'
          />

          <div className='flex flex-col'>
            <h3 className='font-satoshi font-semibold text-gray-950'>
              {post.creator.username}
            </h3>
            <p className='font-inter text-sm text-gray-300'>
              {post.creator.email}
            </p>
          </div>
        </div>

        <div className='copy_btn' onClick={handleCopy}>
          <Image 
            src={copied === post.prompt
              ? '/assets/icons/tick.svg'
              : '/assets/icons/copy.svg'
            }
            width={14}
            height={14}
          />
        </div>
      </div>

      <p className='my-4 font-satoshi text-sm text-gray-400'>{post.prompt}</p>
      <p className='font-inter text-sm text-orange-500 cursor-pointer'
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        {post.tag}
      </p>

      {session?.user.id === post.creator._id && pathname === '/profile' && (
        <div className='mt-5 flex-center gap-4 border-t border-gray-100 pt-3'>
          <Button
            className='bg-black hover:bg-black/80 text-white'
            variant="outline"
            size="sm"
          >
            <p
              className='font-inter text-xs cursor-pointer'
              onClick={handleEdit}
            >
              Edit
            </p>
          </Button>
          <Button
            className='bg-black hover:bg-black/80 text-white'
            variant="outline"
            size="sm"
          >
            <p
              className='font-inter text-xs cursor-pointer'
              onClick={handleDelete}
            >
              Delete
            </p>
          </Button>
        </div>
      )}
    </div>
  )
}

export default PromptCard;