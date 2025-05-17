import Image from "next/image";
import React from "react";

function AboutUs() {
  return (
    <div>
      <section className="px-6 py-12 max-w-desktop mx-auto">
        <div className="text-center mb-10 lg:w-[974px] mx-auto">
          <p className="text-sm text-cyan-600 font-semibold uppercase mb-2">
            About Us
          </p>
          <h2 className="text-3xl md:text-[40px] font-bold mb-6">
            Discover our mission to transform telecom learning through
            innovation and technology
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            TelcoLearn Learning Experience Platform (TLXP) is a cutting-edge
            online platform designed specifically for professionals in the
            telecom industry. TLXP empowers organizations and individuals to
            develop essential skills, foster innovation, and achieve business
            goals in an ever-evolving telecom landscape.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div className="space-y-6 text-gray-700">
            <p>
              With a comprehensive library of telecom-specific courses, TLXP
              offers flexible, self-paced learning opportunities, helping
              learners balance their career growth with daily commitments. The
              platform integrates cloud labs, assessments, real-life case
              studies, and interactive tools to make learning engaging and
              impactful.
            </p>
            <p>
              Equipped with advanced analytics, TLXP enables learners and
              managers to track progress, identify skill gaps, and make informed
              decisions about capability development. Whether you’re onboarding
              new employees, upskilling your team, or building leadership
              pipelines, TLXP is the ultimate solution for driving telecom
              excellence.
            </p>
            <p>
              Experience a tailored learning journey that combines technology,
              innovation, and expert insights to unlock the full potential of
              your workforce. Transform the way your organization learns and
              grows with TLXP!
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-8 justify-end relative items-start p-4 ">
            {/* Rahul Card */}
            <div className="flex flex-col absolute z-30 top-[17%] left-[2%] items-center">
              <div className="w-72 h-96 overflow-hidden rounded-md shadow-lg">
                <img
                  src="/image/images.png"
                  alt="Rahul Singh Khichi"
                  className="w-full h-full border object-cover"
                />
              </div>
              <div className="text-center mt-4">
                <h3 className="text-lg font-semibold">Rahul Singh Khichi</h3>
                <p className="text-sm text-cyan-600 mt-1">Founder</p>
              </div>
            </div>

            {/* Saurabh Card */}
            <div className="flex flex-col items-center">
              <div className="w-[300px] h-[364px] overflow-hidden rounded-md shadow-lg">
                <Image
                  src="/image/images.png"
                  alt="Saurabh Tailor"
                  width={300}
                  height={364}
                  className="w-[300px] h-[364px] object-cover"
                />
              </div>
              <div className="text-center mt-4">
                <h3 className="text-lg font-semibold ">Saurabh Tailor</h3>
                <p className="text-sm text-cyan-600 mt-1">Co-Founder</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 px-6 ">
        <div className="text-center mb-12">
          <p className="text-cyan-600 font-semibold uppercase mb-2">
            Testimonials
          </p>
          <h2 className="text-3xl md:text-4xl font-bold">Our Reviews</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Testimonial Card */}
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="border-2 border-dashed border-orange-400 rounded-xl p-6 flex flex-col justify-between"
            >
              <div>
                {/* Review Text */}
                <p className="text-gray-600 mb-6">
                  “Lorem ipsum dolor sit amet, elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Orci nulla
                  pellentesque dignissim enim. Amet consectetur adipiscing”
                </p>
              </div>

              {/* User Info */}
              <div className="flex items-center gap-4 mt-4">
                <img
                  src="/image/images.png"
                  alt="Kathy Sullivan"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold ">Kathy Sullivan</p>
                  <a href="#" className="text-cyan-600 text-sm">
                    CEO at ordian it
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default AboutUs;
