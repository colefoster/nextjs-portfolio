import React from 'react'
import Head from 'next/head'

import Navbar from '../components/Navbar'

import RedditToxicityTester from '@components/RedditToxicityTester'

export default function RedditUser() {
 

  return (
  <div className="min-h-screen bg-purple-900 text-white overflow-scroll">
      <Head>
        <title>Reddit Comment Toxicity</title>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>😻</text></svg>" />
      </Head>
    <>
    
    <Navbar />
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-4">Reddit User Toxicity Analyzer</h1>

        <RedditToxicityTester />
      
        </div>
        </>
        </div>
      )
    }



    
    