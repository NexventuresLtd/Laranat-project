import { motion } from "framer-motion";

interface AboutTeamProps {
  darkMode: boolean;
}

const team = [
  { name: "Alice Johnson", role: "Creative Director", initials: "AJ" },
  { name: "Brian Smith", role: "Lead Designer", initials: "BS" },
  { name: "Cynthia Lee", role: "Story & Publishing", initials: "CL" },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function AboutTeam({ darkMode }: AboutTeamProps) {
  return (
    <section
      className={`py-24 ${darkMode ? "bg-slate-950" : "bg-white"}`}
    >
      <div className="w-11/12 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${darkMode ? "text-white" : "text-slate-900"}`}>
            Meet the Team
          </h2>
          <p className={`max-w-xl mx-auto ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
            The people behind Lanart21—designers, storytellers, and creatives.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {team.map((member) => (
            <motion.div
              key={member.name}
              variants={itemVariants}
              whileHover={{ y: -6 }}
              className={`p-8 rounded-2xl border-2 text-center transition-all duration-300 ${
                darkMode
                  ? "bg-slate-800/50 border-slate-700 hover:border-orange-500/40"
                  : "bg-slate-50 border-slate-200 hover:border-orange-500/40 shadow-md"
              }`}
            >
              <div
                className={`w-24 h-24 mx-auto mb-5 rounded-2xl flex items-center justify-center text-2xl font-bold ${
                  darkMode ? "bg-orange-500/20 text-orange-400" : "bg-orange-500 text-white"
                }`}
              >
                {member.initials}
              </div>
              <h3 className={`text-xl font-bold mb-2 ${darkMode ? "text-white" : "text-slate-900"}`}>
                {member.name}
              </h3>
              <p className={`text-sm font-medium ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
                {member.role}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
