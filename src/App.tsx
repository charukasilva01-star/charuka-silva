/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { 
  Heart, 
  Calendar, 
  MapPin, 
  Clock, 
  Music,
  Volume2,
  VolumeX,
  ChevronDown,
  Search,
  Pause,
  Play,
  Star
} from "lucide-react";

// --- Constants ---
const WEDDING_DATE = "2027-03-02T10:00:00";
const NAMES = { bride: "Malithi", groom: "Chathura" };
const VENUE = "Earl's Regency Hotel, Kandy";
const MUSIC_URL = "https://cdn.pixabay.com/audio/2022/03/15/audio_7833503b41.mp3"; // Calm piano melody

// --- Helper Components ---

const Petals = () => {
  const petals = Array.from({ length: 15 });
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {petals.map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            top: -20, 
            left: `${Math.random() * 100}%`,
            rotate: Math.random() * 360,
            opacity: 0
          }}
          animate={{ 
            top: "110%",
            left: `${Math.random() * 100}%`,
            rotate: Math.random() * 720,
            opacity: [0, 1, 1, 0]
          }}
          transition={{ 
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            delay: Math.random() * 10,
            ease: "linear"
          }}
          className="absolute w-4 h-4 bg-primary/20 rounded-full blur-[1px]"
          style={{ borderRadius: "10% 80% 20% 80%" }}
        />
      ))}
    </div>
  );
};

const MusicPlayer = ({ shouldPlay }: { shouldPlay: boolean }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (shouldPlay && audioRef.current && !isPlaying) {
      audioRef.current.play().catch(err => console.log("Playback blocked:", err));
      setIsPlaying(true);
    }
  }, [shouldPlay]);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(err => console.log("Playback error:", err));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <audio ref={audioRef} src={MUSIC_URL} loop />
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleMusic}
        className="w-14 h-14 rounded-full bg-[#B37E84] text-white flex items-center justify-center shadow-xl opacity-90 hover:opacity-100 transition-opacity"
      >
        {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
      </motion.button>
    </div>
  );
};

const CountdownItem = ({ value, label }: { value: number; label: string }) => {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="relative">
        <span className="text-5xl md:text-7xl font-light text-gray-800 tabular-nums tracking-tighter">
          {value.toString().padStart(2, '0')}
        </span>
      </div>
      <span className="text-[10px] uppercase tracking-[0.4em] text-primary/50 font-bold mt-2">
        {label}
      </span>
    </div>
  );
};

// --- Main Components ---

const OpeningPage = ({ onOpen }: { onOpen: () => void; key?: string }) => {
  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, transition: { duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] } }}
      className="fixed inset-0 z-[60] flex flex-col items-center justify-center p-6 bg-blush"
    >
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.img 
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.4 }}
          transition={{ duration: 3, ease: "easeOut" }}
          src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=2000" 
          alt="Wedding Theme" 
          className="w-full h-full object-cover grayscale"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-linear-to-b from-transparent to-blush/90" />
      </div>

      <Petals />
      
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        className="text-center space-y-12 z-20"
      >
        <div className="space-y-6">
          <div className="flex items-center justify-center gap-4">
            <div className="w-8 h-px bg-primary/30" />
            <p className="font-sans text-[11px] tracking-[0.5em] uppercase text-primary font-bold">The Wedding of</p>
            <div className="w-8 h-px bg-primary/30" />
          </div>
          <h1 className="font-cursive text-8xl md:text-11xl text-gray-800 drop-shadow-sm">
            {NAMES.groom} & {NAMES.bride}
          </h1>
        </div>
        
        <div className="flex justify-center items-center pt-4">
          <motion.button
            whileHover={{ scale: 1.05, shadow: "0 20px 25px -5px rgb(179 126 132 / 0.3)" }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpen}
            className="px-16 py-6 bg-primary text-white rounded-full font-sans text-[13px] tracking-[0.4em] uppercase shadow-2xl shadow-primary/30 transition-all font-bold"
          >
            Open Invitation
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Section = ({ title, subtitle, children, id, className = "" }: { title?: string; subtitle?: string; children: React.ReactNode; id?: string; className?: string }) => {
  return (
    <section id={id} className={`py-16 px-6 max-w-6xl mx-auto space-y-12 ${className}`}>
      {title && (
        <div className="text-center space-y-2">
          {subtitle && <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-primary font-bold">{subtitle}</p>}
          <h2 className="font-cursive text-4xl md:text-5xl text-gray-800">{title}</h2>
          <div className="gold-line w-24 mx-auto" />
        </div>
      )}
      {children}
    </section>
  );
};

const InvitationContent = (_props: { key?: string }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date(WEDDING_DATE).getTime();
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      if (distance < 0) {
        clearInterval(timer);
        return;
      }
      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-blush min-h-screen"
    >
      {/* Hero Section */}
      <div className="relative min-h-[100vh] flex flex-col items-center justify-center overflow-hidden py-20">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=2000" 
            alt="Wedding Hero Background" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/45" />
        </div>
        
        <Petals />
        
        <div className="relative z-10 text-center text-white space-y-6 px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className="space-y-4"
          >
            <p className="font-sans text-[10px] md:text-[12px] tracking-[0.7em] uppercase text-white/80 font-medium">Save the Date</p>
            <h2 className="font-cursive text-6xl md:text-9xl text-white drop-shadow-2xl">
              {NAMES.groom} <span className="text-2xl md:text-3xl font-serif italic mx-1 opacity-40">&</span> {NAMES.bride}
            </h2>
            <div className="w-16 h-[1px] bg-primary mx-auto opacity-60" />
            <p className="font-sans text-[9px] md:text-[10px] tracking-[0.5em] uppercase text-white/60 font-light">Are Getting Married</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1.5 }}
            className="space-y-3"
          >
             <p className="font-serif text-2xl md:text-4xl text-white tracking-widest font-light opacity-95">02 . 03 . 2027</p>
             <p className="font-serif text-base md:text-lg tracking-[0.2em] text-white/80 uppercase italic">{VENUE}</p>
          </motion.div>

          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center pt-8">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('rsvp-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-56 py-4.5 bg-white text-gray-900 rounded-full font-sans text-[10px] tracking-[0.4em] uppercase font-bold shadow-2xl shadow-black/20 transition-all"
            >
              RSVP
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, y: -2, backgroundColor: "rgba(255, 255, 255, 1)", color: "#111827" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('seating-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-56 py-4.5 bg-white/30 border border-white/50 text-white rounded-full font-sans text-[10px] tracking-[0.4em] uppercase font-bold transition-all backdrop-blur-md shadow-2xl shadow-black/10"
            >
              FIND MY TABLE
            </motion.button>
          </div>
        </div>

        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 flex flex-col items-center gap-4"
        >
          <span className="text-[9px] tracking-[0.5em] uppercase font-bold">Discover</span>
          <div className="w-[1px] h-16 bg-white/20 relative">
            <motion.div 
              animate={{ top: ["0%", "100%", "0%"] }}
              transition={{ repeat: Infinity, duration: 2.5 }}
              className="absolute left-1/2 -translate-x-1/2 w-[2px] h-4 bg-white/50 rounded-full"
            />
          </div>
        </motion.div>
      </div>

      {/* Countdown Section */}
      <div className="bg-white py-12 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-12 bg-primary/10" />
        <Section title="Counting down to our big day" className="!py-0">
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-0 relative">
            <CountdownItem value={timeLeft.days} label="Days" />
            <div className="hidden md:block w-px h-12 bg-primary/10 mx-10" />
            <CountdownItem value={timeLeft.hours} label="Hours" />
            <div className="hidden md:block w-px h-12 bg-primary/10 mx-10" />
            <CountdownItem value={timeLeft.minutes} label="Minutes" />
            <div className="hidden md:block w-px h-12 bg-primary/10 mx-10" />
            <CountdownItem value={timeLeft.seconds} label="Seconds" />
          </div>
        </Section>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-12 bg-primary/10" />
      </div>

      {/* Special Note Section */}
      <div className="bg-white overflow-hidden">
        <Section className="!py-8">
          <div className="max-w-3xl mx-auto grid md:grid-cols-[1fr_1.3fr] gap-0 bg-white rounded-[20px] overflow-hidden shadow-2xl shadow-primary/5 border border-primary/5">
            <div className="relative min-h-[180px] md:min-h-full">
              <img 
                src="https://images.unsplash.com/photo-1525203135335-74d272fc8d9c?auto=format&fit=crop&q=80&w=1000" 
                alt="Lovely Details" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
            </div>
            <div className="p-6 md:p-10 flex flex-col justify-center space-y-4 text-left bg-blush/30 relative">
              <div className="absolute -bottom-10 -right-10 w-24 h-24 border border-primary/10 rounded-full" />
              <div className="space-y-2 relative z-10">
                <p className="font-sans text-[8px] tracking-[0.5em] uppercase text-primary/60 font-bold">A SPECIAL NOTE</p>
                <h2 className="font-cursive text-3xl md:text-4xl text-gray-800 leading-tight">To Our Lovely Guests</h2>
              </div>
              <div className="space-y-2 text-[#4A5568] font-sans text-xs md:text-sm leading-relaxed font-light relative z-10">
                <p>
                  With hearts full of love and gratitude, we are so happy to celebrate this beautiful chapter of our lives with you. Your presence means more to us than words can truly express.
                </p>
                <p>
                  Thank you for your love and blessings. We cannot wait to share these unforgettable moments with you.
                </p>
              </div>
              <div className="pt-4 border-t border-primary/10 relative z-10">
                <p className="font-sans text-[8px] tracking-widest text-gray-400 uppercase font-bold pb-1">With all our love,</p>
                <p className="font-cursive text-3xl text-primary">{NAMES.groom} & {NAMES.bride}</p>
              </div>
            </div>
          </div>
        </Section>
      </div>

      {/* RSVP Section - Moved here */}
      <div className="relative overflow-hidden py-16">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1510076857177-74700760be15?auto=format&fit=crop&q=80&w=2000" 
            alt="RSVP Background" 
            className="w-full h-full object-cover opacity-10 grayscale"
            referrerPolicy="no-referrer"
          />
        </div>
        <Section subtitle="GUEST CONFIRMATION" id="rsvp-section" className="!py-0 relative z-10">
          <div className="max-w-4xl mx-auto bg-white/95 backdrop-blur-sm p-10 md:p-16 rounded-[40px] shadow-3xl shadow-primary/10 text-left space-y-10 border border-primary/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-bl-[100%] z-0" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-tr-[100%] z-0" />
            
            <div className="space-y-4 relative z-10">
              <p className="font-sans text-[10px] tracking-[0.5em] uppercase text-primary font-bold">RSVP</p>
              <h2 className="font-cursive text-6xl md:text-7xl text-gray-800 leading-tight">Join Our Celebration</h2>
              <p className="font-sans text-sm md:text-base text-gray-500 leading-relaxed max-w-xl font-light">
                Please confirm your attendance by searching your family name. We look forward to seeing you.
              </p>
            </div>
            
            <div className="space-y-6 pt-4 relative z-10">
              <div className="space-y-2">
                <label className="font-sans text-[10px] font-bold uppercase text-gray-600 tracking-[0.4em] ml-2">Enter Family Name</label>
                <input 
                  type="text" 
                  placeholder="Ex. Rajapaksha"
                  className="w-full px-8 py-5 rounded-3xl border-2 border-primary/5 focus:outline-none focus:border-primary/30 font-sans text-lg transition-all placeholder:text-gray-200 bg-gray-50 focus:bg-white shadow-inner"
                />
              </div>
              
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-5 bg-primary text-white rounded-3xl font-sans text-[11px] tracking-[0.4em] uppercase font-bold shadow-3xl shadow-primary/30 hover:bg-primary/90 transition-all"
              >
                Search Guest List
              </motion.button>
            </div>
          </div>
        </Section>
      </div>

      {/* Timeline Section */}
      <Section subtitle="OUR CELEBRATION" title="The Wedding Lineup">
        <div className="max-w-4xl mx-auto space-y-8 px-4">
          {[
            { time: "10:15", period: "AM", event: "Poruwa Ceremony", align: "left", num: "01", icon: <Heart className="w-5 h-5" />, desc: "Traditional rituals and blessings" },
            { time: "12:30", period: "PM", event: "Grand Lunch Reception", align: "right", num: "02", icon: <Music className="w-5 h-5" />, desc: "Lunch, laughter, and celebration" },
            { time: "01:30", period: "PM", event: "Dancing Floor Starts", align: "left", num: "03", icon: <Star className="w-5 h-5" />, desc: "Celebration and music begins" },
            { time: "04:30", period: "PM", event: "Going Away", align: "right", num: "04", icon: <Clock className="w-5 h-5" />, desc: "A new journey begins" },
          ].map((item, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`flex items-start md:items-center gap-6 md:gap-16 ${item.align === 'right' ? 'md:flex-row-reverse text-left md:text-right' : 'text-left'}`}
            >
              <div className="md:w-1/3 flex flex-col pt-1 md:pt-0">
                <span className="text-3xl md:text-5xl font-serif text-gray-800 tabular-nums font-light">{item.time}</span>
                <span className="text-[10px] tracking-[0.4em] uppercase text-primary font-bold">{item.period}</span>
              </div>
              
              <div className="relative flex flex-col items-center">
                <div className="w-12 h-12 bg-white border border-primary/20 rounded-full flex items-center justify-center text-primary shadow-sm z-10 transition-transform hover:scale-110">
                  {item.icon}
                </div>
                {idx !== 3 && <div className="absolute top-12 bottom-[-32px] w-px bg-gradient-to-b from-primary/20 to-transparent" />}
              </div>
              
              <div className="md:w-1/3 space-y-1 pb-10 md:pb-0">
                <p className="text-[9px] text-primary/40 font-bold uppercase tracking-[0.5em] font-sans">{item.num}</p>
                <h4 className="font-serif text-2xl md:text-3xl text-gray-800 leading-tight font-light">{item.event}</h4>
                <p className="text-[11px] text-gray-400 font-sans tracking-widest uppercase">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Beautiful Image Divider */}
      <div className="h-[40vh] relative overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=2000" 
          alt="Wedding Vibe" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white space-y-3">
            <Heart className="w-8 h-8 mx-auto text-white/80" />
            <p className="font-serif text-2xl md:text-4xl italic font-light tracking-wider">A Journey of Eternal Love</p>
          </div>
        </div>
      </div>

      {/* Details Card */}
      <Section subtitle="RECEPTION" title="Wedding Details">
        <div className="max-w-2xl mx-auto bg-white p-10 md:p-16 rounded-[40px] shadow-2xl shadow-primary/5 text-center space-y-10 relative overflow-hidden border border-primary/5">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/5 rounded-full" />
          <div className="space-y-3">
            <p className="font-sans text-[9px] tracking-[0.6em] uppercase text-gray-400 font-bold">THE DATE</p>
            <p className="font-serif text-4xl md:text-6xl text-primary font-bold">2nd March 2027</p>
            <p className="font-sans text-[10px] tracking-[0.4em] uppercase opacity-40 italic">Tuesday</p>
          </div>
          <div className="space-y-2">
            <p className="font-sans text-[10px] tracking-[0.5em] uppercase text-gray-400 font-bold">TIME</p>
            <p className="font-serif text-2xl text-gray-800 font-light">10.00 AM Onwards</p>
          </div>
          <div className="space-y-4 pt-4">
            <div className="flex items-center justify-center gap-4">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                <MapPin size={20} />
              </div>
              <div className="text-left">
                <p className="font-serif text-xl text-gray-800 font-bold tracking-tight">Earl's Regency Hotel</p>
                <p className="text-[10px] text-gray-400 tracking-[0.2em] uppercase">Tennekumbura, Kandy</p>
              </div>
            </div>
          </div>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-10 py-4 bg-white border-2 border-primary/10 text-gray-800 font-sans text-[10px] tracking-[0.4em] uppercase rounded-full hover:bg-primary/5 transition-all shadow-sm font-bold"
          >
            Find on Map
          </motion.button>
        </div>
      </Section>

      {/* Quote section */}
      <div className="py-16 bg-white text-center">
        <div className="max-w-4xl mx-auto px-6 space-y-8">
          <div className="flex justify-center items-center gap-6">
            <div className="h-px w-8 bg-primary/20" />
            <Heart className="w-5 h-5 text-primary/30" />
            <div className="h-px w-8 bg-primary/20" />
          </div>
          <p className="font-serif text-2xl md:text-4xl italic text-gray-800 leading-snug font-light opacity-80">
            "Once in a while, right in the middle of an ordinary life, love gives us a fairy tale."
          </p>
        </div>
      </div>

      {/* Find Your Table (Seating Section) - Moved here */}
      <div className="relative overflow-hidden py-16">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1522673607200-164883eecd4c?auto=format&fit=crop&q=80&w=2000" 
            alt="Seating Background" 
            className="w-full h-full object-cover opacity-10 grayscale"
            referrerPolicy="no-referrer"
          />
        </div>
        <Section subtitle="WEDDING SEATING" id="seating-section" className="!py-0 relative z-10">
          <div className="max-w-4xl mx-auto bg-white/95 backdrop-blur-sm p-10 md:p-16 rounded-[40px] shadow-3xl shadow-primary/10 text-left space-y-10 border border-primary/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-bl-[100%] z-0" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-tr-[100%] z-0" />
            
            <div className="space-y-4 relative z-10">
              <p className="font-sans text-[10px] tracking-[0.5em] uppercase text-primary font-bold">SEATING</p>
              <h2 className="font-cursive text-6xl md:text-7xl text-gray-800 leading-tight">Find Your Table</h2>
              <p className="font-sans text-sm md:text-base text-gray-500 leading-relaxed max-w-xl font-light">
                We've saved a special place for you. Please enter your name to discover your assigned table for the reception.
              </p>
            </div>
            
            <div className="space-y-6 pt-4 relative z-10">
              <div className="space-y-2">
                <label className="font-sans text-[10px] font-bold uppercase text-gray-600 tracking-[0.4em] ml-2">Your Full Name</label>
                <div className="relative">
                  <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-primary/40" size={18} />
                  <input 
                    type="text" 
                    placeholder="Enter name to search"
                    className="w-full pl-14 pr-8 py-5 rounded-3xl border-2 border-primary/5 focus:outline-none focus:border-primary/30 font-sans text-lg transition-all placeholder:text-gray-200 bg-gray-50 focus:bg-white shadow-inner"
                  />
                </div>
              </div>
              
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-5 bg-primary text-white rounded-3xl font-sans text-[11px] tracking-[0.4em] uppercase font-bold shadow-3xl shadow-primary/30 hover:bg-primary/90 transition-all"
              >
                Search Seating
              </motion.button>
            </div>
          </div>
        </Section>
      </div>

      <footer className="text-center py-24 bg-white border-t border-primary/5 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-serif italic text-primary/5 select-none opacity-50 z-0">
          Love
        </div>
        <div className="space-y-6 relative z-10">
          <div className="flex flex-col gap-1 items-center mb-4">
            <div className="w-4 h-px bg-primary"></div>
            <div className="w-12 h-px bg-primary"></div>
            <div className="w-4 h-px bg-primary"></div>
          </div>
          <h2 className="font-cursive text-6xl text-gray-800">Chathura & Malithi</h2>
          <p className="font-sans text-[10px] opacity-40 tracking-[0.5em] uppercase font-bold">See you there!</p>
        </div>
      </footer>
    </motion.div>
  );
};

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [shouldPlayMusic, setShouldPlayMusic] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    setShouldPlayMusic(true);
  };

  return (
    <div className="relative font-sans text-text-main selection:bg-primary/20 bg-blush">
      {isOpen && <MusicPlayer shouldPlay={shouldPlayMusic} />}
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <OpeningPage key="opening" onOpen={handleOpen} />
        ) : (
          <InvitationContent key="content" />
        )}
      </AnimatePresence>
    </div>
  );
}
