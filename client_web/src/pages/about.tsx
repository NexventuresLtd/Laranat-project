import React from "react";
import { motion } from "framer-motion";

interface AboutProps {
  darkMode: boolean;
}

const About: React.FC<AboutProps> = ({ darkMode }) => {
  return (
    <div className={`min-h-screen ${darkMode ? "bg-slate-950 text-slate-100" : "bg-white text-slate-900"} transition-colors duration-500`}>
      {/* Hero Section */}
      <div className="w-11/12 max-w-6xl mx-auto py-20 flex flex-col items-center text-center">
        <motion.h1 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-lg"
        >
          About LANART
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-lg md:text-xl max-w-3xl leading-relaxed"
        >
          LANART is a creative studio dedicated to delivering exceptional design and digital experiences. 
          Our mission is to bring innovative ideas to life and empower creatives around the world.
        </motion.p>
      </div>

      {/* Mission & Vision */}
      <div className="w-11/12 max-w-6xl mx-auto grid md:grid-cols-2 gap-16 py-20">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="p-6 rounded-xl shadow-xl bg-gradient-to-tr from-orange-500/20 to-orange-300/10"
        >
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-lg leading-relaxed">
            To create visually stunning designs that connect brands with their audiences, 
            combining creativity with technology to deliver meaningful digital experiences.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="p-6 rounded-xl shadow-xl bg-gradient-to-tr from-blue-500/20 to-blue-300/10"
        >
          <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
          <p className="text-lg leading-relaxed">
            To become a global leader in creative solutions, inspiring innovation and 
            empowering artists, designers, and brands to realize their full potential.
          </p>
        </motion.div>
      </div>

      {/* Team Section */}
      <div className="w-11/12 max-w-6xl mx-auto py-20">
        <h2 className="text-4xl font-bold text-center mb-12 drop-shadow-md">Meet the Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {["Alice Johnson", "Brian Smith", "Cynthia Lee"].map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="p-6 rounded-xl shadow-lg text-center bg-gradient-to-tr from-slate-200/10 to-slate-300/5"
            >
              <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-orange-500 flex items-center justify-center text-white text-2xl font-bold">
                {member.split(" ").map(n => n[0]).join("")}
              </div>
              <h3 className="text-xl font-semibold mb-2">{member}</h3>
              <p className="text-sm text-gray-400">Creative Designer</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="w-11/12 max-w-4xl mx-auto text-center py-20">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-6 drop-shadow-lg"
        >
          Want to collaborate with us?
        </motion.h2>
        <motion.button
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          onClick={() => window.location.href="/login"} // redirect to login
          className="px-10 py-4 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg shadow-lg transition-all"
        >
          Get Started
        </motion.button>
      </div>
    </div>
  );
};

export default About;
