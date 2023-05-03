import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import axios from 'axios'
import Navbar from '../components/Navbar'
import * as toxicity from '@tensorflow-models/toxicity'
import 'tailwindcss/tailwind.css'
import 'daisyui/dist/full.css'
import CommentCard from '@components/CommentCard'
import * as cheerio from 'cheerio';

export default function RedditUser() {
  const [username, setUsername] = useState('')
  const [userData, setUserData] = useState(null)
  const [comments, setComments] = useState([])
  const [threshold, setThreshold] = useState(0.9)
  const [numComments, setNumComments] = useState(5)
  const [toxicityResults, setToxicityResults] = useState([])

  const handleAnalyzeButtonClick = () => {
    const fetchUser = async () => {
        if (username) {
            const response = await fetch("/api/getRedditUser?username=" + username + "&numComments=" + numComments);
            const data = await response.json();
            console.log(data);
            setUserData(data.data.children[0].data);
            setComments(data.data.children.filter((comment) => comment.kind === 't1'));
        }
    }
    fetchUser();

  }
  

  

  useEffect(() => {
    const classifyComments = async () => {
        console.log(comments);
        if (comments !== undefined) {
          const toxicityLabels = [
            'identity_attack',
            'insult',
            'obscene',
            'severe_toxicity',
            'sexual_explicit',
            'threat',
            'toxicity',
          ];
          
          const model = await toxicity.load(threshold, toxicityLabels);
          const results = await Promise.all(
            comments.map(async (comment) => {
              if (comment && comment.body) {
                const predictions = await model.classify([comment.body]);
                return predictions.reduce((acc, { label, results }) => {
                  acc[label] = results[0].match ? 1 : 0;
                  return acc;
                }, {});
              } else {
                return toxicityLabels.reduce((acc, label) => {
                  acc[label] = '-';
                  return acc;
                }, {});
              }
            })
          );
          setToxicityResults(results);
        }
    };      
    classifyComments()
    }, [comments])

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

      <div className="mb-4">
        <label htmlFor="username" className="block mb-1">
          Reddit Username:
        </label>
        <input
          type="text"
          id="username"
          className="input w-full"
          value={username}
          onChange={
            (e) => setUsername(e.target.value)
        }
            />
            <div className="mb-4 justify-center">
            <label htmlFor="numComments" className="block mb-1">
              Number of Comments to Analyze:
            </label>
            <select
              id="numComments"
              className="input w-full"
              value={numComments}
              onChange={(e) => setNumComments(parseInt(e.target.value))}
            >
              {[5, 10, 15, 20].map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
            <button
              className="btn btn-accent w-full mt-2 align-middle justify-center justify-items-center"
              onClick={handleAnalyzeButtonClick}
            >
              Analyze
            </button>
          </div>
            
          {userData && (
            <div className="mb-4 items-center text-center align-middle justify-center justify-items-center">
              <h2 className="text-2xl font-bold mb-2">User Details</h2>
              <img
                src={userData.avatarImageSrc}
                alt={`${userData.author}'s avatar`}
                className="w-20 h-20 rounded-full mb-2 relative left-1/2 -translate-x-1/2"
              />
              <p className='text-xl'>Username: 
              <span className=" font-bold"> {userData.author}</span>
              </p>
              <p className='text-xl'>Karma: 
              <span className=" font-bold"> {userData.karma}</span>
              </p>
                <p className='text-xl'>Cake Day:
                <span className=" font-bold"> {userData.cakeDay}</span>
                </p>
                
            </div>
          )}
        
          {toxicityResults.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-2">Toxicity Results</h2>
              
                  {toxicityResults.map((result, index) => (
                     <CommentCard
                     
                     key={index}
                     comment={comments[index].data}
                     toxicityLabels={Object.keys(result)}
                     toxicityResult={result}
                   />
                  ))}

            </div>
          )}
        </div>
        </>
        </div>
      )
    }



    
    