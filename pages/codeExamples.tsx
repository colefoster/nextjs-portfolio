import React, { useState } from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import CodeBlock from '../components/CodeBlock';
import ThemeDropdown from '../components/ThemeDropdown';
const codeExamples = () => {
    const [theme, setTheme] = useState("dracula");

   const sampleJSCode = `
   const GroceryItem: React.FC<GroceryItemProps> = ({ item }) => {
    return (
      <div>
        <h2>{item.name}</h2>
        <p>Price: {item.price}</p>
        <p>Quantity: {item.quantity}</p>
      </div>
    );
  }`.trim();

    const sampleJavaCode = `
public class HelloWorld {
  public static void main(String[] args) {
    System.out.println("Hello, World!");
  }
}
`.trim();

    return (
        <div className="min-h-screen bg-purple-900 text-white">

        <Head>
            <title>Code Examples</title>
            <meta
            name="Code Examples"
            content="Various code snippets from different projects and languages"/>
            <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>😻</text></svg>"/>
        </Head>
        <Navbar />

        <main>
            <div className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
                <Header title="Code Examples"/>
                
            </div>
            <div className='flex justify-end'>
                <ThemeDropdown theme={theme} changeTheme={setTheme} />
            </div>

            <CodeBlock code={sampleJavaCode} language={"java"} theme={theme} />

            <br/>

            <CodeBlock code={sampleJSCode} language={"js"} theme={theme} />

        </main>

        </div>
    );
}

export default codeExamples;
