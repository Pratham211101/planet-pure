"use client"
import { ClerkLoaded, SignInButton, UserButton, useUser } from '@clerk/nextjs'
import Link from 'next/link';
import React from 'react'
import Form from 'next/form'
import { PackageIcon, TrolleyIcon } from '@sanity/icons';

function Header() {
  const {user} = useUser();

  const createClerkPasskey = async() => {
    try {
     const response = await user?.createPasskey()
     console.log(response);
    } catch (err) {
      console.log("Error:",JSON.stringify(err,null,2));
    }
      

  }
  return (
    <header className='flex flex-wrap justify-between items-center px-4 py-2'>
      <div className=' flex flex-wrap w-full justify-between items-center'>
        <Link
          href='/'
          className='text-2xl font-bold cursor-pointer bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent hover:opacity-50 mx-auto
          sm:mx-0'
        >
          Planet Pure
        </Link>
        <Form
          action="/search"
          className='w-full mt-2 
                    sm:w-auto sm:flex-1 sm:mx-4 sm:mt-0'
        >
          <input type='text' name='query' placeholder='search for products '
            className='bg-gray-100 text-gray-800 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-0 border w-full max-w-4xl'/>
        </Form>
        <div className='flex items-center space-x-4 mt-4 sm:mt-0 flex-1 sm:flex-none'>
          <Link href='/basket'
            className="flex-1 relative  justify-center sm:justify-start flex sm:flex-none items-center space-x-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            <TrolleyIcon className='w-6 h-6 '></TrolleyIcon>
            {/* span item cnt after global state */}
            <span>My Basket</span>
          </Link>

          {/* user badge & optional */}
          <ClerkLoaded>
            {user && (
              <Link
              href='/orders'
              className="flex-1 relative flex justify-center sm:justify-start sm:flex-none items-center space-x-2
              bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                <PackageIcon className='w-6 h-6'></PackageIcon>
                <span>My Orders</span>
              </Link>
            )}
          
            { user ? (
              <div className='flex items-center space-x-2'>
                <UserButton/>
                <div className='hidden sm:block text:xs'>
                  <p className='text-gray-400'>Welcome Back</p>
                  <p className='font-bold'>{user.fullName}!</p>
                </div>
              </div>
            ) : 
            (<SignInButton mode='modal'/>)}

            {user?.passkeys.length===0 && (
              <button
                onClick={createClerkPasskey}
                className='bg-white hover:bg-green-700  hover:text-white animate-pulse text-green-500 font-bold py-2 px-4 rounded border-green-300 border '
              >
                Create Passkey
              </button>
            )}
          </ClerkLoaded>
        </div>
      </div>
    </header>
  )
}

export default Header