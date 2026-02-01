import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Globe,
  Twitter,
  Instagram,
  ExternalLink,
  BookOpen,
  ChevronLeft,
} from "lucide-react";
import { artistsData } from "../data/artists";
import { comicsData } from "../data/comics";

interface ArtistProfileProps {
  darkMode: boolean;
}

const SocialIcon = ({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-colors ${
      "bg-orange-500/20 text-orange-600 dark:text-orange-400 hover:bg-orange-500/30"
    }`}
    aria-label={label}
  >
    {icon}
    <span>{label}</span>
    <ExternalLink size={14} />
  </a>
);

export default function ArtistProfile({ darkMode }: ArtistProfileProps) {
  const { id } = useParams<{ id: string }>();
  const artistId = id ? parseInt(id, 10) : NaN;
  const artist = artistsData.find((a) => a.id === artistId);

  if (!artist) {
    return (
      <div
        className={`min-h-screen pt-24 pb-20 flex items-center justify-center ${
          darkMode ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-900"
        }`}
      >
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Artist not found</h1>
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 text-orange-500 font-bold hover:underline"
          >
            <ChevronLeft size={18} /> Back to Portfolio
          </Link>
        </div>
      </div>
    );
  }

  const works = comicsData.filter((c) => artist.comicIds.includes(c.id));
  const { socialLinks } = artist;

  return (
    <div
      className={`min-h-screen transition-colors duration-500 pb-20 ${
        darkMode ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-900"
      }`}
    >
      <div className="w-11/12 max-w-5xl mx-auto pt-24">
        <Link
          to="/portfolio#artists"
          className={`inline-flex items-center gap-2 mb-8 font-medium ${
            darkMode ? "text-slate-400 hover:text-orange-400" : "text-slate-600 hover:text-orange-600"
          }`}
        >
          <ChevronLeft size={18} /> Back to Artists
        </Link>

        {/* Profile header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className={`rounded-3xl overflow-hidden shadow-2xl mb-12 ${
            darkMode ? "bg-slate-800 border border-slate-700" : "bg-white border border-slate-200"
          }`}
        >
          <div className="flex flex-col md:flex-row gap-8 p-8 md:p-10">
            <div className="flex-shrink-0 mx-auto md:mx-0">
              <img
                src={artist.profileImage}
                alt={artist.name}
                className="w-40 h-40 md:w-48 md:h-48 rounded-2xl object-cover border-2 border-orange-500/50 shadow-lg"
              />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-black tracking-tight text-orange-500 mb-1">
                {artist.name}
              </h1>
              <p className={`text-lg italic mb-4 ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
                {artist.penName}
              </p>
              <p
                className={`text-lg leading-relaxed mb-6 ${
                  darkMode ? "text-slate-300" : "text-slate-600"
                }`}
              >
                {artist.shortBio}
              </p>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-6">
                {artist.genres.map((g) => (
                  <span
                    key={g}
                    className={`text-sm px-3 py-1 rounded-full font-medium ${
                      darkMode
                        ? "bg-orange-500/20 text-orange-400"
                        : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    {g}
                  </span>
                ))}
              </div>
              {/* Social links */}
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                {socialLinks.website && (
                  <SocialIcon
                    href={socialLinks.website}
                    icon={<Globe size={18} />}
                    label="Website"
                  />
                )}
                {socialLinks.twitter && (
                  <SocialIcon
                    href={socialLinks.twitter}
                    icon={<Twitter size={18} />}
                    label="Twitter"
                  />
                )}
                {socialLinks.instagram && (
                  <SocialIcon
                    href={socialLinks.instagram}
                    icon={<Instagram size={18} />}
                    label="Instagram"
                  />
                )}
                {socialLinks.artstation && (
                  <SocialIcon
                    href={socialLinks.artstation}
                    icon={<ExternalLink size={18} />}
                    label="ArtStation"
                  />
                )}
              </div>
            </div>
          </div>
        </motion.header>

        {/* Their works */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <h2
            className={`text-2xl font-bold mb-6 flex items-center gap-2 ${
              darkMode ? "text-white" : "text-slate-900"
            }`}
          >
            <BookOpen size={28} className="text-orange-500" />
            Their Works
          </h2>
          {works.length === 0 ? (
            <p className={`py-8 ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
              No published works listed yet.
            </p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {works.map((comic) => (
                <Link
                  key={comic.id}
                  to="/comics"
                  className={`group rounded-2xl overflow-hidden shadow-lg transition-all ${
                    darkMode ? "bg-slate-800 border border-slate-700" : "bg-white border border-slate-200"
                  }`}
                >
                  <div className="aspect-[2/3] overflow-hidden">
                    <img
                      src={comic.cover}
                      alt={comic.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3
                      className={`font-bold line-clamp-2 ${
                        darkMode ? "text-white" : "text-slate-900"
                      }`}
                    >
                      {comic.title}
                    </h3>
                    <p
                      className={`text-sm mt-1 ${
                        darkMode ? "text-slate-400" : "text-slate-600"
                      }`}
                    >
                      {comic.genre}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </motion.section>

        {/* CTA */}
        <section className="mt-12">
          <Link
            to="/portfolio"
            className={`block p-6 rounded-2xl text-center transition-all ${
              darkMode
                ? "bg-slate-800/80 border border-slate-700 hover:border-orange-500/50"
                : "bg-white border-2 border-slate-200 hover:border-orange-400"
            }`}
          >
            <span className="inline-flex items-center gap-2 text-orange-500 font-bold">
              <ChevronLeft size={18} /> Back to Portfolio & Artists
            </span>
          </Link>
        </section>
      </div>
    </div>
  );
}
