import { Connection, LAMPORTS_PER_SOL, PublicKey,Keypair } from "@solana/web3.js";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import base58 from  "bs58";
import "dotenv/config";

const suppliedPublicKey = process.argv[2];
if (!suppliedPublicKey) {
  throw new Error("Provide a public key to check the balance of!");
}

try{
    new PublicKey(suppliedPublicKey);
}
catch (error) {
    console.error("Invalid public key");
}


const publickey = process.argv[2];
const p = new PublicKey(publickey);
 
const connection = new Connection("https://api.devnet.solana.com", "confirmed");
 
const balanceInLamports = await connection.getBalance(p);
 
const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;
 
console.log(`✅ Finished! The balance for the wallet at address ${p} is ${balanceInSOL}!`);