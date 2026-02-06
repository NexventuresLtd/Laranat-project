import React from 'react';
import { motion } from 'framer-motion';

/* Exact from instruction: OUR TEAM */
const team = [
  { name: 'Lan Gabriel', role: 'Founder & Creative Director', focus: 'Branding, Animation & Motion' },
  { name: 'Sauveur', role: 'Associate Creative Director & Lead Inker / Sketch Artist', focus: '' },
  { name: 'Jospine', role: 'Colorist', focus: '' },
  { name: 'Ciella', role: 'Typography Designer & Editor', focus: '' },
];

const Team: React.FC = () => {
  return (
    <section
      id="team"
      className="py-16 md:py-24 font-noteworthy"
      style={{
        fontFamily: 'var(--font-noteworthy)',
        backgroundColor: 'rgba(103, 51, 176, 0.04)',
      }}
    >
      <div className="w-[91.666667%] mx-auto">
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--color-primary-blue)' }}>
            Expert creatives
          </p>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4"
            style={{ color: 'var(--color-deep-blue)' }}
          >
            Our Team
          </h2>
          <p className="text-lg text-[var(--navbar-text)]/80 max-w-2xl mx-auto">
            The people behind Lanart21 Creative Studio.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              className="text-center p-6 rounded-2xl bg-white border border-[var(--navbar-border)] shadow-sm hover:shadow-lg transition-all duration-300"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              whileHover={{ y: -4 }}
            >
              <motion.div
                className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center text-2xl font-bold text-white"
                style={{ backgroundColor: 'var(--color-primary-blue)' }}
                whileHover={{ scale: 1.05 }}
              >
                {member.name.charAt(0)}
              </motion.div>
              <h3 className="text-lg font-bold" style={{ color: 'var(--navbar-text)' }}>
                {member.name}
              </h3>
              <p className="text-sm font-semibold mt-1" style={{ color: 'var(--color-primary-blue)' }}>
                {member.role}
              </p>
              {member.focus ? (
                <p className="text-sm mt-2 text-[var(--navbar-text)]/80">({member.focus})</p>
              ) : null}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
