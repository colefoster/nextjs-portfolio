import Head from 'next/head'

import Header from "@components/Header";
import Footer from "@components/Footer";
import FeedbackForm from "@components/FeedbackForm";
import JokeBlock from "@components/JokeBlock";

export default function tailwindExample() {
    return (
        <h1 className="text-3xl font-bold underline bg-blue-700">
        Hello world!
      </h1>

    );
}

