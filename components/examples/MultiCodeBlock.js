import React, {useState} from 'react';
function MultiCodeBlock({ children, theme}) {
    const [activeTab, setActiveTab] = useState(0)
    const blocks = children.length === undefined ? [children] : children

    console.log(children)
    return (
        <div className='relative'>
            <div className='flex absolute ml-4 z-index-0'>
                {blocks.map((block, i) => (
                    <button key={i} className={`btn btn-sm pb-3 rounded-full ${activeTab === i ? 'btn-primary' : 'btn-secondary'}`} onClick={()=>{setActiveTab(i)}}>{block.props.filename}</button>
                ))}
            </div>
            <div className='mt-5' >
                {blocks[activeTab]}
            </div>
        </div>
    );
}

export default MultiCodeBlock;