import {
    Connection,
    Transaction,
    SystemProgram,
    sendAndConfirmTransaction,
    PublicKey,
    clusterApiUrl,
    LAMPORTS_PER_SOL,
  } from "@solana/web3.js";
  import "dotenv/config";
  import bs58 from "bs58"; 

  import {
    getKeypairFromEnvironment,
    airdropIfRequired,
  } from "@solana-developers/helpers";
  


  const receiver = process.argv[2];

  if(!receiver){
    console.error('Please provide a receiver address as an argument');
    process.exit(1);
  }

  var toPubkey;
  try{
    toPubkey = new PublicKey(receiver);
  }
  catch(error){
    console.error('Invalid receiver address');
  }

  
  const secretkeypair = getKeypairFromEnvironment("SECRET_KEY");

  if(!secretkeypair){
    console.error('Please provide a secret key as an environment variable');
    process.exit(1);
  }

  try{
    new PublicKey(secretkeypair.publicKey);
  }
  catch(error){
    console.error('Invalid keypair');
  }
   
  const transaction = new Transaction();
   
  const LAMPORTS_TO_SEND = 10000;

  const connection = new Connection(clusterApiUrl("devnet"));


  const balanceInLamports = await connection.getBalance(secretkeypair.publicKey);
  console.log(`Current balance: ${balanceInLamports / LAMPORTS_PER_SOL} SOL`);

   
  const sendSolInstruction = SystemProgram.transfer({
    fromPubkey: secretkeypair.publicKey,
    toPubkey,
    lamports: LAMPORTS_TO_SEND,
  });


   
  transaction.add(sendSolInstruction);
   
  const signature = await sendAndConfirmTransaction(connection, transaction, [
    secretkeypair,
  ]);
   
  console.log(
    `💸 Finished! Sent ${LAMPORTS_TO_SEND} to the address ${toPubkey}. `,
  );
  console.log(`Transaction signature is ${signature}!`);
