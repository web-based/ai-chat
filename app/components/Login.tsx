'use client'
import { signIn } from "next-auth/react"
import Image from "next/image"
import openai_logo from "public/openai_logo.png"


function Login() {
  const notify = ('Please note that ChatGPT models are machine learning algorithms designed to provide human-like responses to text inputs. While we strive to provide accurate and helpful responses, the quality and accuracy of responses may vary depending on the model and the input text. Each model is trained on a specific dataset and has its own strengths and limitations. Information provided through ChatGPT should be used at your own discretion and risk, as we cannot guarantee its accuracy or reliability.By using ChatGPT, you acknowledge and accept that any information provided is solely for informational purposes and should not be relied upon as a substitute for professional advice. We disclaim any liability for any loss or damage arising from reliance on any responses generated by ChatGPT models.'
   );
  return (
    <div className="bg-[#3e806e] h-screen flex flex-col items-center justify-center text-center ">
      <Image
        src={openai_logo}
        width={200}
        height={200}
        alt="logo"
        className="hover:animate-spin duration-75"

      />
      <button
        onClick={() => signIn("google")}
        className="text-white font-bold text-3xl animate-pulse mb-10">Sign In to use ChatGPT Messanger</button>
    
      <div  className="flex mt-10 px-16 text-[#4d4c4c]">
          <p className="">Disclaimer:<br/> {notify}
          </p>
      
        
        </div>
    </div>
  )
}

export default Login