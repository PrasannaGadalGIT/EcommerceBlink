import {
    ActionPostResponse,
    createActionHeaders,
    createPostResponse,
    ActionGetResponse,
    ActionPostRequest,
  } from "@solana/actions";
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction, Connection, clusterApiUrl } from "@solana/web3.js";

  const headers = createActionHeaders({
    chainId: "devnet", // or chainId: "devnet"
  });

  export const GET = async (req: Request) => {

    const payload: ActionGetResponse ={
      title: 'Alice\'s Adventures',
      icon: 'https://ucarecdn.com/7aa46c85-08a4-4bc7-9376-88ec48bb1f43/-/preview/880x864/-/quality/smart/-/format/auto/',
      label: 'Donate SOL',
      description: 'Cybersecurity Enthusiast | Sign up for my newsletter!',
      "links": {
       "actions": [
         {
           "label": "Pay", // button text
           "href": req.url,
          //  "parameters": [
          //    {
          //      type: "text",
          //      name: "name",
          //      label: "Enter your Name",
          //      required: true,
          //    },
          //    {
          //      type: "email",
          //      name: "email",
          //      label: "Enter your Email",
          //      required: true,
          //    },
          //    {
          //      type: "number",
          //      name: "phone",
          //      label: "Enter your Phone Number",
          //      required: true,
          //    },
          //    {
          //      type: "textarea",
          //      name: "message",
          //      label: "What do you expect from this newsletter?",
          //      required: true,
          //    },
          //    {
          //     type: "radio",
          //     name: "choice", // parameter name in the `href` above
          //     label: "Do you want to sign up for our newsletter", // placeholder of the text input
          //     required: true,
          //     options: [
          //       { label: "Yes", value: "1" },
          //       { label: "No", value: "0" },
          //     ],
          //   },
          //  ],
           type: "message"
         }
       ]
     }
   };
    return Response.json(payload, {
      headers,
    });
  }
  export const OPTIONS = GET;

  export const POST = async (req: Request) => {
    const body : ActionPostRequest = await req.json();
    const senderKey = body.account
    const transferAmount = 0.01; // 0.01 SOL
    const sender = new PublicKey(senderKey)
    const reciever = new PublicKey("BmQuXK4wJdLEULMvzwyiNE9p7Rj3Pg4pgFfoB1SY53pj")
    const transferInstruction = SystemProgram.transfer({
      fromPubkey : sender,
      toPubkey : reciever,
      lamports : transferAmount * LAMPORTS_PER_SOL,
    })

    const connection = new Connection(clusterApiUrl('devnet'))

    const transaction = new Transaction().add(transferInstruction)
    
    transaction.feePayer = new PublicKey(sender)
    transaction.recentBlockhash = (await connection.getLatestBlockhash({commitment : "finalized"})).blockhash
    const serialTX = transaction.serialize({requireAllSignatures : false, verifySignatures : false}).toString("base64")
    
    const payload : ActionPostResponse = await createPostResponse({
      fields : {
        transaction,
        message: serialTX,
        type : "transaction"
      }
    })


    return Response.json(payload, {
      headers,
    });
  }