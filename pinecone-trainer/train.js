require('dotenv').config();

const { Pinecone } = require('@pinecone-database/pinecone');
const { Document } = require('langchain/document');
const { OpenAIEmbeddings } = require('langchain/embeddings/openai');
const { PineconeStore } = require('langchain/vectorstores/pinecone');
const { VectorDBQAChain } = require('langchain/chains');
const { OpenAI } = require('langchain/llms/openai');
const { ChatOpenAI } = require('langchain/chat_models/openai');
const { PromptTemplate } = require('langchain/prompts');
const { PDFLoader } = require('langchain/document_loaders/fs/pdf');
const { RecursiveCharacterTextSplitter } = require('langchain/text_splitter');
const { DirectoryLoader } = require('langchain/document_loaders/fs/directory');
const { TextLoader } = require('langchain/document_loaders/fs/text');

const main = async () => {
  const pinecone = new Pinecone();

  const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX);

  const chat = new ChatOpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
  });

  /* Load all PDFs within the specified directory */
  const directoryLoader = new DirectoryLoader('./training', {
    '.pdf': (path) => new PDFLoader(path),
    '.txt': (path) => new TextLoader(path),
  });

  const docs = await directoryLoader.load();
  console.log(docs);
  // const loader = new PDFLoader('./training/trainer.pdf');

  // const docs2 = await loader.load();
  // console.log(docs2);
  const openAIEmbeddings = new OpenAIEmbeddings({
    openAIApiKey: process.env.OPENAI_API_KEY,
  });

  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 800,
    chunkOverlap: 50,
  });

  const splitDocs = await textSplitter.splitDocuments(docs);

  await PineconeStore.fromDocuments(splitDocs, openAIEmbeddings, {
    pineconeIndex,
    maxConcurrency: 5, 
  });
};
main();