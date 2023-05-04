import React, { useState, useEffect } from 'react'
import * as toxicity from '@tensorflow-models/toxicity'
import CommentCard from '@components/CommentCard'
import 'tailwindcss/tailwind.css'
import 'daisyui/dist/full.css'
import dynamic from 'next/dynamic';
const ReactAnimatedEllipsis = dynamic(() => import('react-animated-ellipsis'), { ssr: false });

function RedditToxicityTester() {

    const [username, setUsername] = useState('')
    const [loadingUser, setLoadingUser] = useState(false)
    const [loadingComments, setLoadingComments] = useState(false)
    const [loadingPercent, setLoadingPercent] = useState(0)
    const [userData, setUserData] = useState(null)
    const [comments, setComments] = useState([])
    const [threshold, setThreshold] = useState(0.9)
    const [numComments, setNumComments] = useState(5)
    const [toxicityResults, setToxicityResults] = useState([])
  
    const handleAnalyzeButtonClick = () => {
      const fetchUser = async () => {
          if (username.length > 2) {
              setLoadingUser(true);
              setLoadingComments(true);

              setToxicityResults([]);
              setUserData(null);
                setComments([]);
              const response = await fetch("/api/getRedditUser?username=" + username + "&numComments=" + numComments);
              const data = await response.json();
              setUserData(data.data.children[0].data);
              setLoadingUser(false);
              setComments(data.data.children.filter((comment) => comment.kind === 't1'));
              
          }
      }
      fetchUser();
  
    }

  
    const handleLoadMoreClick = async() => {
        setLoadingComments(true);
        const response = await fetch("/api/getRedditUser?username=" + username + "&numComments=" + numComments +"&offset=" + numComments);
        const data = await response.json();
        setComments(comments => ([...comments, ...data.data.children.filter((comment) => comment.kind === 't1')]));
    }
    
  
    useEffect(() => {
      const classifyComments = async () => {
          if (comments !== undefined && comments.length > 0) {

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
              comments.map(async (comment, index) => {
                console.log({comment})
                if (comment && comment.data.body ) {
                  const predictions = await model.classify([comment.data.body]);
                  setLoadingPercent(loadingPercent + 20);
                  console.log({predictions})
                  return predictions.reduce((acc, { label, results }) => {
                    acc[label] = results[0].match ? `${(results[0].probabilities[1] * 100).toFixed(1)}%` : `${(results[0].probabilities[1] * 100).toFixed(1)}%`;
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
            console.log({results})
            setToxicityResults(results);
            setLoadingComments(false);
          }
      };      
      classifyComments()
      }, [comments])
    return (
        <div className="mb-4">
            <label htmlFor="username" className="block mb-1">
                Reddit Username: &nbsp;<small>{"type random for random user"}</small>
            </label>
            <input
            type="text"
            id="username"
            className="input w-full"
            value={username}
            onChange={
                (e) => setUsername(e.target.value)}/>
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
            className={`btn ${username.length > 2 ? 'btn-primary' : 'btn-disabled'} w-full mt-2 mb-3 align-middle justify-center justify-items-center`}
            onClick={handleAnalyzeButtonClick}>
                Analyze
            </button>
            
                
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

            {loadingUser && comments.length ===0 &&(
                <>
                <br/>
                <div role="status" className='text-center items-center text'>
                <svg aria-hidden="true" className="inline w-32 h-32 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-pink-700" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                <span className="sr-only">Loading...</span>
                </div>
                </>
            )}

            {loadingComments && !loadingUser &&(
                <>
                <br/>

                <div role="status" className='text-center items-center text'>
                    
                <svg aria-hidden="true" className="inline w-32 h-32 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-green-700" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                <span className='absolute left-1/2  -translate-x-1/2 translate-y-10'>Determining Toxicity<ReactAnimatedEllipsis /></span>
                <span className="sr-only">Loading...</span>
                
                </div>
                </>
            )}

            {!loadingComments && !loadingUser && comments.length > 0 &&(
                <>
                <br/>
                <button
            className={`btn btn-secondary w-full mt-2 mb-3 align-middle justify-center justify-items-center`}
            onClick={handleLoadMoreClick}>
                Load More
            </button>
                
                </>
            )}
        </div>

    );
}

export default RedditToxicityTester;