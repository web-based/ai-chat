import { ExclamationTriangleIcon, SunIcon,BoltIcon } from '@heroicons/react/24/outline'



function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center text-white h-screen px-2 ">
      <h1 className="text-2xl lg:text-6xl font-bold mb-20  sm:text-4xl transition-all"> ChatGPT Messanger</h1>
      
      <div className="flex lg:flex-row space-x-2 text-center flex-col sm:flex-col">
        <div>
          <div className="flex flex-col items-center justify-center mb-5">
            <SunIcon className="h-8 w-8"/>
            <h2>Examples</h2>
          </div>
          <div className="space-y-2">
            <p className="info_text sm:text-lg transition-all">"Explain something to me"</p>
            <p className="info_text sm:text-lg transition-all">"What is the difference between a dog and a cat?"</p>
            <p className="info_text sm:text-lg transition-all">"What is the color of the sun?"</p>
          </div>
        </div>
        <div>
          <div className="flex flex-col items-center justify-center mb-5">
            <BoltIcon className="h-8 w-8"/>
            <h2>Capabilities</h2>
          </div>
          <div className="space-y-2">
            <p className="info_text sm:text-lg transition-all">"Change the ChatGPT Model to use"</p>
            <p className="info_text sm:text-lg transition-all">"Messages are stored in Firebase's Firestore"</p>
            <p className="info_text sm:text-lg transition-all">"Hot Toast notifications when ChatGPT is thinking"</p>
          </div>
        </div>
        <div>
          <div className="flex flex-col items-center justify-center mb-5">
            <ExclamationTriangleIcon className="h-8 w-8"/>
            <h2>Limitations</h2>
          </div>
          <div className="space-y-2">
            <p className="info_text sm:text-lg transition-all">"May occasionally generate incorrect information "</p>
            <p className="info_text sm:text-lg transition-all">"May occasionally produce harmful instructions or biased content"</p>
            <p className="info_text sm:text-lg transition-all">"Limited knowledge of world and events after 2021"</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage