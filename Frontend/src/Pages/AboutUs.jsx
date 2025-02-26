import React from 'react'

export const AboutUs = () => {
  return (
    <>
      <div className="bg-gray-100 py-16 pt-28 px-6 md:px-16">
        {/* Header Section */}
        <div className="text-center mb-12 ">
          <h2 className="text-5xl font-bold sm:pt-8 text-blue-600">Who We Are</h2>
          <p className="text-gray-600 mt-4 text-lg font-bold">
            Your trusted partner in health and wellness, ensuring a safer tomorrow.
          </p>
        </div>

        {/* About Us Section */}
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <img
              src="/public/3rd-page.jpg"
              alt="About Us"
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="md:w-1/2 min-h-full flex flex-col justify-center">
            {/* <h3 className="text-3xl font-semibold text-blue-600">Our Story</h3> */}
            <p className="text-gray-700 mt-0 leading-relaxed">
              At <span className="font-semibold text-blue-500">Health Life Insurance</span>, we started with a vision—to make healthcare
              accessible, affordable, and stress-free for everyone. Since our foundation in <b>2025</b>, we’ve helped hundredss
              of families secure their health with innovative insurance plans.
            </p>
            <p className="text-gray-700 mt-4 leading-relaxed">
              We continuously improve our services, ensuring personalized coverage that meets the unique needs of individuals and families.
              Our team works hard to simplify the insurance process, making it easier for our customers to manage their health.
            </p>
            <p className="text-gray-700 mt-4 leading-relaxed">
              As we expand, we remain committed to our mission: to make healthcare simple, affordable, and accessible for all.
            </p>
          </div>
        </div>

        {/* Our Values Section */}
        <div className="mt-16">
          <h3 className="text-4xl font-semibold text-center text-blue-600">Our Core Values</h3>
          <div className="mt-10 grid md:grid-cols-3 gap-8">
            <div className="bg-white shadow-lg rounded-lg p-6 text-center">
              <h4 className="text-xl font-semibold text-blue-500">Trust And  Transparency</h4>
              <p className="text-gray-600 mt-2">
                We believe in honesty and ensure complete transparency in all our policies.
              </p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6 text-center">
              <h4 className="text-xl font-semibold text-blue-500">Customer-Centric Approach</h4>
              <p className="text-gray-600 mt-2">
                Your health and satisfaction are our top priorities, and we are here for you 24/7.
              </p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6 text-center">
              <h4 className="text-xl font-semibold text-blue-500">Innovation And Excellence</h4>
              <p className="text-gray-600 mt-2">
                We use advanced technology to make insurance simple, fast, and efficient.
              </p>
            </div>
          </div>
        </div>

        {/* Meet Our Team Section */}
        <div className="mt-16 text-center">
          <h3 className="text-4xl font-semibold text-blue-600">Meet Our Team</h3>
          <div className="mt-10 grid md:grid-cols-3 gap-8">
            {[
              { name: "Aditya Chavan", role: "CEO & Founder", image: "/./public/p6.jpg" },
              { name: "John Doe", role: " Manager", image: "./public/p1.jpg" },
              { name: "John Doe", role: " Software Developer", image: "./public/p3.jpg" },
              { name: "John Doe", role: " Software Tester", image: "./public/p4.jpg" },
              { name: "John Doe", role: " AWS Developer", image: "./public/p5.jpg" },
              { name: "Jane Smith", role: "Technical Support", image: "./public/p2.jpg" }
            ].map((member, index) => (
              <div key={index} className="bg-white shadow-lg rounded-lg p-6 text-center">
                <img src={member.image} alt={member.name} className="w-40 h-48 mx-auto rounded shadow-md" />
                <h4 className="text-xl font-semibold text-blue-500 mt-4">{member.name}</h4>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="mt-16 text-center">
          <h3 className="text-3xl font-semibold text-blue-600">Join Our Family</h3>
          <p className="text-gray-700 mt-4 text-lg">
            Get the best health insurance coverage tailored for your needs.
          </p>
          <button className="mt-6 px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition duration-300">
            Get a Free Quote
          </button>
        </div>
      </div>
    </>
  )
}

export default AboutUs