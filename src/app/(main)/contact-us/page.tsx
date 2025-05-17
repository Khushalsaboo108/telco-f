import { MapPin, Clock, Phone } from "lucide-react"
import ContactUsForm from "@/components/contact-us/ContactUsForm";

export default function ContactForm() {

  return (
    <div className="w-full min-h-screen  px-4 py-12 md:px-6 lg:px-8">
      <div className="max-w-desktop mx-auto">
        <div className="grid grid-cols-1 bg-newBackgroundColor lg:grid-cols-2 gap-8 bg-backgroundContactUs rounded-lg shadow-lg p-6 md:p-8 lg:p-12 animate-fadeInSlideUp">
          {/* Left Column */}
          <div className="space-y-8 ">
            {" "}
            {/* Change background color here */}
            <div>
              <h1 className="text-headingSizeMobile md:text-headingSizeDesktop font-bold mb-4">
                Ready to Transform Your Workforce?
              </h1>
              <p className="text-textSizeMobile md:text-textSizeDesktop  ">
                Contact us today to schedule a demo or explore how our
                assessments can drive your organizational success. Let's shape
                the future of telecom talent together!
              </p>
            </div>
            <div className="space-y-6 bg-inputBackgroundColor py-5 px-4 rounded ">
              <div className="flex items-start space-x-4">
                <div className="bg-[#ff782d]/10 p-3 rounded-full">
                  <MapPin className="w-6 h-6 text-subHeadingOrange" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Our Address</h3>
                  <p className="bg-inputBackgroundColor">
                    Indiqube Delta 6,
                    <br />
                    Sec 5, HSR Layout, Koramangala,
                    <br />
                    Bangalore South, Bangalore-560034,
                    <br />
                    Karnataka
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-[#ff782d]/10 p-3 rounded-full">
                  <Clock className="w-6 h-6 text-subHeadingOrange" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Hours Of Operation</h3>
                  <p className="bg-inputBackgroundColor">
                    Mon - Fri: 9.00am to 5.00pm
                  </p>
                  <p className="bg-inputBackgroundColor">[Sat Holiday]</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-[#ff782d]/10 p-3 rounded-full">
                  <Phone className="w-6 h-6 text-subHeadingOrange" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Contact</h3>
                  <p className="bg-inputBackgroundColor">+91-8810549800</p>
                  <p className="bg-inputBackgroundColor">Info@TelcoLearn.Com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <ContactUsForm />
          {/* add the button */}
        </div>
      </div>
    </div>
  )
}


