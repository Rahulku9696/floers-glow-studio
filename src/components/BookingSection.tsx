import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Flower2, Droplets, Sparkles, Heart, Leaf,
  CalendarDays, Clock, User, Phone, Mail, MessageSquare,
  ChevronRight, ChevronLeft, Check, AlertCircle, Loader2,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

/* ─── data ─── */
const services = [
  { id: "massage", icon: Flower2, title: "Massage Therapy", duration: "60 min", price: "$120", gradient: "from-primary/10 to-peach/20" },
  { id: "spa", icon: Droplets, title: "Spa & Wellness", duration: "90 min", price: "$180", gradient: "from-lavender/20 to-primary/10" },
  { id: "facial", icon: Sparkles, title: "Facial Treatments", duration: "45 min", price: "$95", gradient: "from-peach/20 to-blush/30" },
  { id: "skincare", icon: Heart, title: "Skin Care", duration: "60 min", price: "$110", gradient: "from-blush/20 to-lavender/20" },
  { id: "relaxation", icon: Leaf, title: "Relaxation Therapy", duration: "75 min", price: "$140", gradient: "from-primary/10 to-lavender/15" },
];

const timeSlots = [
  { time: "9:00 AM", available: true },
  { time: "10:00 AM", available: true },
  { time: "11:00 AM", available: false },
  { time: "12:00 PM", available: true },
  { time: "1:00 PM", available: true },
  { time: "2:00 PM", available: false },
  { time: "3:00 PM", available: true },
  { time: "4:00 PM", available: true },
  { time: "5:00 PM", available: true },
  { time: "6:00 PM", available: false },
  { time: "7:00 PM", available: true },
  { time: "8:00 PM", available: true },
];

const steps = ["Service", "Date & Time", "Details", "Confirm"];

/* ─── helpers ─── */
function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const dayLabels = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

/* ─── component ─── */
const BookingSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);

  /* form state */
  const [selectedService, setSelectedService] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");

  /* fetch booked slots when date changes */
  const fetchBookedSlots = useCallback(async (date: Date) => {
    const dateStr = date.toISOString().split("T")[0];
    const { data } = await supabase
      .from("bookings")
      .select("booking_time")
      .eq("booking_date", dateStr)
      .neq("status", "cancelled");
    setBookedSlots(data?.map((b) => b.booking_time) ?? []);
  }, []);

  useEffect(() => {
    if (selectedDate) {
      fetchBookedSlots(selectedDate);
      setSelectedTime("");
    }
  }, [selectedDate, fetchBookedSlots]);

  /* calendar state */
  const today = new Date();
  const [calMonth, setCalMonth] = useState(today.getMonth());
  const [calYear, setCalYear] = useState(today.getFullYear());

  const daysInMonth = getDaysInMonth(calYear, calMonth);
  const firstDay = getFirstDayOfMonth(calYear, calMonth);

  const prevMonth = () => {
    if (calMonth === 0) { setCalMonth(11); setCalYear(calYear - 1); }
    else setCalMonth(calMonth - 1);
  };
  const nextMonth = () => {
    if (calMonth === 11) { setCalMonth(0); setCalYear(calYear + 1); }
    else setCalMonth(calMonth + 1);
  };

  const isDatePast = (day: number) => {
    const d = new Date(calYear, calMonth, day);
    const t = new Date(); t.setHours(0, 0, 0, 0);
    return d < t;
  };

  const isSameDate = (day: number) => {
    if (!selectedDate) return false;
    return selectedDate.getDate() === day && selectedDate.getMonth() === calMonth && selectedDate.getFullYear() === calYear;
  };

  /* navigation */
  const canNext = () => {
    if (step === 0) return !!selectedService;
    if (step === 1) return !!selectedDate && !!selectedTime;
    if (step === 2) return name.trim().length > 0 && phone.trim().length > 0 && email.trim().length > 0;
    return true;
  };

  const goNext = () => {
    if (!canNext()) return;
    setDirection(1);
    if (step < 3) setStep(step + 1);
    else handleSubmit();
  };
  const goBack = () => { setDirection(-1); setStep(step - 1); };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const resetForm = () => {
    setStep(0);
    setSubmitted(false);
    setSelectedService("");
    setSelectedDate(null);
    setSelectedTime("");
    setName("");
    setPhone("");
    setEmail("");
    setNotes("");
  };

  /* scroll into view on step change */
  useEffect(() => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [step]);

  const service = services.find((s) => s.id === selectedService);

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
  };

  const availableCount = timeSlots.filter((t) => t.available).length;

  return (
    <section id="booking" ref={sectionRef} className="py-24 md:py-32 relative overflow-hidden scroll-mt-20">
      <div className="absolute -top-32 left-1/4 w-96 h-96 bg-lavender/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 right-1/4 w-80 h-80 bg-peach/10 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-blob" style={{ animationDelay: "2s" }} />

      <div className="container mx-auto px-4 relative z-10">
        {/* header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-sm font-body font-semibold tracking-widest uppercase text-primary">
            Book Appointment
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 mb-4">
            Reserve Your <span className="text-gradient">Glow Session</span>
          </h2>
          <p className="text-muted-foreground font-body max-w-xl mx-auto">
            Your journey to radiance is just 4 simple steps away.
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          {/* progress */}
          {!submitted && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between mb-10 px-2"
            >
              {steps.map((label, i) => (
                <div key={label} className="flex items-center gap-0 flex-1 last:flex-initial">
                  <div className="flex flex-col items-center gap-1.5 relative z-10">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-500 ${
                        i < step
                          ? "gradient-rose text-primary-foreground shadow-lg"
                          : i === step
                          ? "gradient-rose text-primary-foreground shadow-lg scale-110"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {i < step ? <Check size={16} /> : i + 1}
                    </div>
                    <span
                      className={`font-body text-xs font-medium transition-colors hidden sm:block ${
                        i <= step ? "text-primary" : "text-muted-foreground"
                      }`}
                    >
                      {label}
                    </span>
                  </div>
                  {i < steps.length - 1 && (
                    <div className="flex-1 h-[2px] mx-2 mt-[-18px] sm:mt-[-22px]">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${
                          i < step ? "bg-primary" : "bg-muted"
                        }`}
                      />
                    </div>
                  )}
                </div>
              ))}
            </motion.div>
          )}

          {/* card */}
          <div className="glass-card p-6 md:p-10 min-h-[420px] flex flex-col">
            <AnimatePresence mode="wait" custom={direction}>
              {submitted ? (
                /* ── Success ── */
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="flex-1 flex flex-col items-center justify-center text-center py-8"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.2 }}
                    className="w-24 h-24 rounded-full gradient-rose flex items-center justify-center mb-6 shadow-xl"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", delay: 0.5 }}
                    >
                      <Check size={40} className="text-primary-foreground" />
                    </motion.div>
                  </motion.div>
                  <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="font-display text-2xl md:text-3xl font-bold mb-3"
                  >
                    Booking Confirmed! ✨
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="text-muted-foreground font-body max-w-sm mb-2"
                  >
                    Your {service?.title} session is reserved for{" "}
                    <strong className="text-foreground">
                      {selectedDate?.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
                    </strong>{" "}
                    at <strong className="text-foreground">{selectedTime}</strong>.
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="text-muted-foreground font-body text-sm mb-8"
                  >
                    We'll send a confirmation to <strong className="text-foreground">{email}</strong> shortly.
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1 }}
                    className="flex flex-col sm:flex-row gap-3"
                  >
                    <a
                      href={`https://wa.me/14236652266?text=${encodeURIComponent(
                        `Hi! I just booked a ${service?.title || "service"} on ${selectedDate?.toLocaleDateString()} at ${selectedTime}. Name: ${name}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glass text-foreground px-6 py-3 rounded-full text-sm font-semibold inline-flex items-center justify-center gap-2 hover:bg-primary/10 transition-colors"
                    >
                      <MessageSquare size={16} />
                      Confirm via WhatsApp
                    </a>
                    <button
                      onClick={resetForm}
                      className="gradient-rose text-primary-foreground px-6 py-3 rounded-full text-sm font-semibold glow-button inline-flex items-center justify-center gap-2"
                    >
                      Book Another Session
                    </button>
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div
                  key={step}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="flex-1 flex flex-col"
                >
                  {/* ── Step 0: Select Service ── */}
                  {step === 0 && (
                    <div className="flex-1">
                      <h3 className="font-display text-xl font-bold mb-1">Choose Your Treatment</h3>
                      <p className="text-muted-foreground font-body text-sm mb-6">Select the perfect service for your glow-up.</p>
                      <div className="grid gap-3">
                        {services.map((s) => {
                          const active = selectedService === s.id;
                          return (
                            <button
                              key={s.id}
                              onClick={() => setSelectedService(s.id)}
                              className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all duration-300 group ${
                                active
                                  ? "border-primary bg-primary/5 shadow-md"
                                  : "border-transparent bg-background/40 hover:bg-background/70 hover:border-primary/20"
                              }`}
                            >
                              <div
                                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.gradient} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}
                              >
                                <s.icon size={22} className="text-primary" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="font-display font-semibold text-sm">{s.title}</div>
                                <div className="text-muted-foreground font-body text-xs">{s.duration}</div>
                              </div>
                              <div className="text-right flex-shrink-0">
                                <div className="font-display font-bold text-primary text-sm">{s.price}</div>
                              </div>
                              <div
                                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                                  active ? "border-primary bg-primary" : "border-muted-foreground/30"
                                }`}
                              >
                                {active && <Check size={12} className="text-primary-foreground" />}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* ── Step 1: Date & Time ── */}
                  {step === 1 && (
                    <div className="flex-1">
                      <h3 className="font-display text-xl font-bold mb-1">Pick Date & Time</h3>
                      <div className="flex items-center gap-2 mb-6">
                        <p className="text-muted-foreground font-body text-sm">Choose your preferred slot.</p>
                        <span className="inline-flex items-center gap-1 text-xs font-body font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                          <AlertCircle size={12} />
                          {availableCount} slots left today
                        </span>
                      </div>

                      {/* Calendar */}
                      <div className="bg-background/50 rounded-2xl p-4 mb-6 border border-border/40">
                        <div className="flex items-center justify-between mb-4">
                          <button onClick={prevMonth} className="p-1.5 rounded-lg hover:bg-primary/10 transition-colors">
                            <ChevronLeft size={18} className="text-foreground" />
                          </button>
                          <span className="font-display font-semibold text-sm">
                            {monthNames[calMonth]} {calYear}
                          </span>
                          <button onClick={nextMonth} className="p-1.5 rounded-lg hover:bg-primary/10 transition-colors">
                            <ChevronRight size={18} className="text-foreground" />
                          </button>
                        </div>
                        <div className="grid grid-cols-7 gap-1 mb-2">
                          {dayLabels.map((d) => (
                            <div key={d} className="text-center text-xs font-body font-medium text-muted-foreground py-1">
                              {d}
                            </div>
                          ))}
                        </div>
                        <div className="grid grid-cols-7 gap-1">
                          {Array.from({ length: firstDay }).map((_, i) => (
                            <div key={`empty-${i}`} />
                          ))}
                          {Array.from({ length: daysInMonth }).map((_, i) => {
                            const day = i + 1;
                            const past = isDatePast(day);
                            const selected = isSameDate(day);
                            const isToday = day === today.getDate() && calMonth === today.getMonth() && calYear === today.getFullYear();
                            return (
                              <button
                                key={day}
                                disabled={past}
                                onClick={() => setSelectedDate(new Date(calYear, calMonth, day))}
                                className={`h-9 rounded-lg text-sm font-body font-medium transition-all duration-200 ${
                                  past
                                    ? "text-muted-foreground/30 cursor-not-allowed"
                                    : selected
                                    ? "gradient-rose text-primary-foreground shadow-md scale-105"
                                    : isToday
                                    ? "bg-primary/10 text-primary hover:bg-primary/20"
                                    : "hover:bg-primary/10 text-foreground"
                                }`}
                              >
                                {day}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Time Slots */}
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <Clock size={14} className="text-primary" />
                          <span className="font-body text-sm font-medium text-foreground/80">
                            {selectedDate
                              ? selectedDate.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })
                              : "Select a date first"}
                          </span>
                        </div>
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                          {timeSlots.map((slot) => {
                            const active = selectedTime === slot.time;
                            return (
                              <button
                                key={slot.time}
                                disabled={!slot.available || !selectedDate}
                                onClick={() => setSelectedTime(slot.time)}
                                className={`py-2.5 rounded-xl text-xs font-body font-medium transition-all duration-200 ${
                                  !slot.available
                                    ? "bg-muted/50 text-muted-foreground/40 cursor-not-allowed line-through"
                                    : active
                                    ? "gradient-rose text-primary-foreground shadow-md scale-105"
                                    : !selectedDate
                                    ? "bg-background/40 text-muted-foreground/50 cursor-not-allowed"
                                    : "bg-background/60 text-foreground border border-border/40 hover:border-primary/40 hover:bg-primary/5"
                                }`}
                              >
                                {slot.time}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ── Step 2: Details ── */}
                  {step === 2 && (
                    <div className="flex-1">
                      <h3 className="font-display text-xl font-bold mb-1">Your Details</h3>
                      <p className="text-muted-foreground font-body text-sm mb-6">Tell us a bit about yourself so we can prepare your experience.</p>
                      <div className="space-y-5">
                        <div className="space-y-1.5">
                          <label className="font-body text-sm font-medium text-foreground/80 flex items-center gap-2">
                            <User size={14} className="text-primary" /> Full Name
                          </label>
                          <input
                            type="text"
                            required
                            maxLength={100}
                            placeholder="Your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-background/60 border border-border/60 font-body text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all"
                          />
                        </div>
                        <div className="grid md:grid-cols-2 gap-5">
                          <div className="space-y-1.5">
                            <label className="font-body text-sm font-medium text-foreground/80 flex items-center gap-2">
                              <Phone size={14} className="text-primary" /> Phone Number
                            </label>
                            <input
                              type="tel"
                              required
                              maxLength={20}
                              placeholder="+1 (___) ___-____"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              className="w-full px-4 py-3 rounded-xl bg-background/60 border border-border/60 font-body text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="font-body text-sm font-medium text-foreground/80 flex items-center gap-2">
                              <Mail size={14} className="text-primary" /> Email
                            </label>
                            <input
                              type="email"
                              required
                              maxLength={255}
                              placeholder="you@email.com"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="w-full px-4 py-3 rounded-xl bg-background/60 border border-border/60 font-body text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all"
                            />
                          </div>
                        </div>
                        <div className="space-y-1.5">
                          <label className="font-body text-sm font-medium text-foreground/80 flex items-center gap-2">
                            <MessageSquare size={14} className="text-primary" /> Notes (optional)
                          </label>
                          <textarea
                            placeholder="Any special requests or preferences..."
                            maxLength={500}
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            rows={3}
                            className="w-full px-4 py-3 rounded-xl bg-background/60 border border-border/60 font-body text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all resize-none"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ── Step 3: Confirm ── */}
                  {step === 3 && (
                    <div className="flex-1">
                      <h3 className="font-display text-xl font-bold mb-1">Review & Confirm</h3>
                      <p className="text-muted-foreground font-body text-sm mb-6">Everything looks perfect? Let's lock in your glow session!</p>

                      <div className="space-y-4">
                        {/* Service */}
                        <div className="bg-background/50 rounded-2xl p-5 border border-border/40">
                          <div className="flex items-center gap-4">
                            {service && (
                              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center flex-shrink-0`}>
                                <service.icon size={22} className="text-primary" />
                              </div>
                            )}
                            <div className="flex-1">
                              <div className="font-display font-semibold">{service?.title}</div>
                              <div className="text-muted-foreground font-body text-xs">{service?.duration} · {service?.price}</div>
                            </div>
                          </div>
                        </div>

                        {/* Date & Time */}
                        <div className="bg-background/50 rounded-2xl p-5 border border-border/40">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                <CalendarDays size={18} className="text-primary" />
                              </div>
                              <div>
                                <div className="font-body text-xs text-muted-foreground">Date</div>
                                <div className="font-display text-sm font-semibold">
                                  {selectedDate?.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                <Clock size={18} className="text-primary" />
                              </div>
                              <div>
                                <div className="font-body text-xs text-muted-foreground">Time</div>
                                <div className="font-display text-sm font-semibold">{selectedTime}</div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Contact */}
                        <div className="bg-background/50 rounded-2xl p-5 border border-border/40">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm font-body">
                              <User size={14} className="text-primary" />
                              <span className="text-muted-foreground">Name:</span>
                              <span className="font-medium">{name}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm font-body">
                              <Phone size={14} className="text-primary" />
                              <span className="text-muted-foreground">Phone:</span>
                              <span className="font-medium">{phone}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm font-body">
                              <Mail size={14} className="text-primary" />
                              <span className="text-muted-foreground">Email:</span>
                              <span className="font-medium">{email}</span>
                            </div>
                            {notes && (
                              <div className="flex items-start gap-2 text-sm font-body">
                                <MessageSquare size={14} className="text-primary mt-0.5" />
                                <span className="text-muted-foreground">Notes:</span>
                                <span className="font-medium">{notes}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Footer nav */}
            {!submitted && (
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-border/30">
                {step > 0 ? (
                  <button
                    onClick={goBack}
                    className="flex items-center gap-1.5 text-sm font-body font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ChevronLeft size={16} /> Back
                  </button>
                ) : (
                  <div />
                )}
                <button
                  onClick={goNext}
                  disabled={!canNext()}
                  className={`gradient-rose text-primary-foreground px-8 py-3 rounded-full text-sm font-semibold glow-button inline-flex items-center gap-2 group transition-all ${
                    !canNext() ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {step === 3 ? (
                    <>
                      <Check size={16} />
                      Confirm Booking
                    </>
                  ) : (
                    <>
                      Continue
                      <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
