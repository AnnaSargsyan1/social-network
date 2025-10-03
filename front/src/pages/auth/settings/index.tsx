import { CoverPicker } from "./utilities/CoverPicker.tsx"
import { ImagePicker } from "./utilities/ImagePicker.tsx"
import { UpdateLogin } from "./utilities/UpdateLogin.tsx"
import { UpdatePassword } from "./utilities/UpdatePassword.tsx"
import { UpdatePrivacy } from "./utilities/UpdatePrivacy.tsx"

export const Settings = () => {
  return (
    <div className="min-h-screen text-center pt-6">

      {/* Page title */}
      <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
        Settings
      </h1>
        <div className="flex flex-col items-center py-12 px-4">

          {/* Settings cards container */}
          <div className="w-full max-w-4xl grid gap-8 md:grid-cols-2">
              <UpdateLogin />
              <UpdatePassword />
              <UpdatePrivacy />
              <div className="md:col-span-2">
                <ImagePicker />
              </div>
              <div className="md:col-span-2">
                <CoverPicker />
              </div>
          </div>
        </div>
    </div>  
  )
}
