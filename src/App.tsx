import React, { useState, useEffect, useMemo } from 'react';
import { 
  Clock, 
  Briefcase, 
  Target, 
  Zap,
  Lightbulb,
  CheckCircle2,
  Timer,
  Coins,
  ArrowDownRight,
  Activity
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface PersonProfile {
  name: string;
  role: string;
  strategy: string;
  philosophy: string[];
  timeManagement: string[];
}

const TOTAL_GOAL = 26000000000; // 26 Billion VND
const START_DATE = new Date('2026-01-01T00:00:00').getTime();
const END_DATE = new Date('2036-01-01T00:00:00').getTime();
const TOTAL_DURATION_MS = END_DATE - START_DATE;

const PEOPLE: PersonProfile[] = [
  {
    name: "Thu",
    role: "Nhà Đầu Tư Chiến Lược",
    strategy: "Tập trung vào lãi suất kép và đầu tư giá trị dài hạn.",
    philosophy: [
      "Việc gì sẽ mang lại 1 triệu đô? Đầu tư vào bản thân và các tài sản sinh lời thụ động.",
      "Làm việc thông minh hơn, không phải chăm chỉ hơn.",
      "Digital Detox: Giảm thiểu xao nhãng từ mạng xã hội.",
    ],
    timeManagement: [
      "Nguyên tắc 80/20: Tập trung vào 20% công việc tạo ra 80% kết quả.",
      "Time Blocking: Chia nhỏ thời gian cho các mục tiêu quan trọng.",
      "Deep Work: Dành ít nhất 4 tiếng mỗi ngày cho công việc chuyên sâu."
    ]
  },
  {
    name: "Trung",
    role: "Doanh Nhân Công Nghệ",
    strategy: "Xây dựng hệ thống kinh doanh có khả năng mở rộng (Scalability).",
    philosophy: [
      "Việc gì sẽ mang lại 1 triệu đô? Giải quyết vấn đề cho 1 triệu người.",
      "Thất bại nhanh, học hỏi nhanh.",
      "Sản phẩm tốt nhất là sản phẩm giải quyết được nỗi đau của khách hàng."
    ],
    timeManagement: [
      "Ma trận Eisenhower: Ưu tiên việc quan trọng nhưng không khẩn cấp.",
      "Batching: Gộp các công việc tương tự để xử lý một lần.",
      "Zero Email Inbox: Quản lý thông tin liên lạc hiệu quả."
    ]
  },
  {
    name: "Tuấn Anh",
    role: "Chuyên Gia Sáng Tạo",
    strategy: "Xây dựng thương hiệu cá nhân và đa dạng hóa nguồn thu nhập.",
    philosophy: [
      "Việc gì sẽ mang lại 1 triệu đô? Biến đam mê thành giá trị độc bản.",
      "Sáng tạo là tài sản quý giá nhất.",
      "Kết nối là sức mạnh: Mạng lưới quan hệ chính là tài sản ròng."
    ],
    timeManagement: [
      "Phương pháp Pomodoro: Làm việc tập trung trong 25 phút.",
      "Morning Routine: Tối ưu hóa năng lượng vào buổi sáng.",
      "Kỷ luật là chìa khóa của sự tự do tài chính."
    ]
  }
];

const RealTimeMoneyTracker = () => {
  const [currentRemaining, setCurrentRemaining] = useState(TOTAL_GOAL);
  const [earned, setEarned] = useState(0);

  useEffect(() => {
    const update = () => {
      const now = Date.now();
      const elapsed = now - START_DATE;
      const progress = Math.min(Math.max(elapsed / TOTAL_DURATION_MS, 0), 1);
      
      const currentEarned = TOTAL_GOAL * progress;
      const remaining = TOTAL_GOAL - currentEarned;
      
      setEarned(currentEarned);
      setCurrentRemaining(remaining);
    };

    const timer = setInterval(update, 50);
    update();
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Remaining Card */}
        <div className="bg-stone-900 rounded-[2rem] p-8 border border-white/10 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
            <ArrowDownRight className="w-24 h-24 text-brand" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 text-brand text-xs font-bold uppercase tracking-[0.2em] mb-4">
              <Activity className="w-4 h-4 animate-pulse" /> Khoảng cách còn lại
            </div>
            <div className="text-4xl sm:text-5xl font-mono font-bold text-white tabular-nums tracking-tighter">
              {currentRemaining.toLocaleString('vi-VN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              <span className="text-xl ml-2 text-stone-500 font-sans">VND</span>
            </div>
            <p className="mt-4 text-stone-400 text-sm font-light">
              Số tiền cần chinh phục để chạm mốc 26 tỷ vào năm 2036.
            </p>
          </div>
        </div>

        {/* Progress Card */}
        <div className="bg-white rounded-[2rem] p-8 border border-stone-200 shadow-xl shadow-stone-200/30 relative overflow-hidden">
          <div className="flex items-center gap-2 text-stone-400 text-xs font-bold uppercase tracking-[0.2em] mb-4">
            <Coins className="w-4 h-4 text-brand" /> Số tiền đã mất đi
          </div>
          <div className="text-4xl sm:text-5xl font-mono font-bold text-[#1A1A1A] tabular-nums tracking-tighter">
            {earned.toLocaleString('vi-VN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            <span className="text-xl ml-2 text-stone-400 font-sans">VND</span>
          </div>
          <div className="mt-6 w-full bg-stone-100 h-2 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-brand"
              initial={{ width: 0 }}
              animate={{ width: `${(earned / TOTAL_GOAL) * 100}%` }}
              transition={{ duration: 1 }}
            />
          </div>
          <p className="mt-4 text-stone-400 text-sm font-light">
            Tỷ lệ đã mất đi: {((earned / TOTAL_GOAL) * 100).toFixed(6)}%
          </p>
        </div>
      </div>
    </div>
  );
};

const CountdownTimer = () => {
  const targetDate = useMemo(() => END_DATE, []);
  const [timeLeft, setTimeLeft] = useState(targetDate - Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now();
      const difference = targetDate - now;
      setTimeLeft(difference > 0 ? difference : 0);
    }, 10);

    return () => clearInterval(timer);
  }, [targetDate]);

  const formatTime = (ms: number) => {
    const years = Math.floor(ms / (1000 * 60 * 60 * 24 * 365.25));
    const days = Math.floor((ms % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24));
    const hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((ms % 1000) / 10);

    return { years, days, hours, minutes, seconds, milliseconds };
  };

  const t = formatTime(timeLeft);

  return (
    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-4 text-center">
      {[
        { label: 'Năm', value: t.years },
        { label: 'Ngày', value: t.days },
        { label: 'Giờ', value: t.hours },
        { label: 'Phút', value: t.minutes },
        { label: 'Giây', value: t.seconds },
        { label: 'Ms', value: t.milliseconds, highlight: true },
      ].map((item, idx) => (
        <div key={idx} className={cn(
          "bg-stone-900 rounded-2xl p-3 border border-white/10",
          item.highlight && "bg-brand/10 border-brand/30"
        )}>
          <div className={cn(
            "text-2xl sm:text-3xl font-mono font-bold text-white",
            item.highlight && "text-brand"
          )}>
            {item.value.toString().padStart(2, '0')}
          </div>
          <div className="text-[10px] uppercase tracking-widest text-stone-500 font-bold">{item.label}</div>
        </div>
      ))}
    </div>
  );
};

export default function App() {
  const [activePerson, setActivePerson] = useState(PEOPLE[0]);

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-[#1A1A1A] font-sans selection:bg-brand/20">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-brand rounded-lg flex items-center justify-center">
                <Target className="text-white w-5 h-5" />
              </div>
              <span className="font-bold text-xl tracking-tight">MillionGoal</span>
            </div>
            <div className="flex gap-1 sm:gap-4 overflow-x-auto no-scrollbar">
              {PEOPLE.map((person) => (
                <button
                  key={person.name}
                  onClick={() => setActivePerson(person)}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap",
                    activePerson.name === person.name
                      ? "bg-brand text-white shadow-md shadow-brand/20"
                      : "text-stone-500 hover:bg-stone-100"
                  )}
                >
                  {person.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePerson.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="space-y-12"
          >
            {/* Hero Section */}
            <header className="text-center space-y-6">
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/10 border border-brand/20 text-brand text-xs font-bold uppercase tracking-widest"
              >
                <Timer className="w-3 h-3" /> Lộ trình 10 năm (Từ 01/01/2026)
              </motion.div>
              <h1 className="text-5xl sm:text-7xl font-bold tracking-tighter leading-none">
                Chinh phục <span className="text-brand">26 Tỷ VND</span>
              </h1>
              
              <div className="max-w-3xl mx-auto">
                <CountdownTimer />
              </div>

              <p className="text-xl text-stone-500 max-w-2xl mx-auto font-light">
                {activePerson.name} — {activePerson.role}. {activePerson.strategy}
              </p>
            </header>

            {/* Real-time Calculator Section */}
            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    <Activity className="text-brand" /> Máy tính đếm ngược tài sản
                  </h2>
                  <p className="text-stone-400 text-sm">Cập nhật số dư mục tiêu theo thời gian thực</p>
                </div>
              </div>
              
              <RealTimeMoneyTracker />
            </section>

            {/* Insights Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Art of Work */}
              <motion.section 
                whileHover={{ y: -5 }}
                className="bg-stone-900 text-white rounded-3xl p-8 sm:p-10 space-y-8"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-brand/20 flex items-center justify-center">
                    <Briefcase className="text-brand w-6 h-6" />
                  </div>
                  <h2 className="text-3xl font-bold tracking-tight">Nghệ thuật làm việc</h2>
                </div>
                
                <div className="space-y-6">
                  {activePerson.philosophy.map((item, idx) => (
                    <div key={idx} className="flex gap-4 group">
                      <div className="text-brand font-mono text-lg opacity-50 group-hover:opacity-100 transition-opacity">0{idx + 1}</div>
                      <p className="text-lg text-stone-300 leading-relaxed font-light italic">
                        "{item}"
                      </p>
                    </div>
                  ))}
                </div>

                <div className="pt-6 border-t border-white/10">
                  <div className="flex items-center gap-2 text-brand text-sm font-bold uppercase tracking-widest">
                    <Lightbulb className="w-4 h-4" /> Câu hỏi cốt lõi
                  </div>
                  <p className="mt-2 text-stone-400">
                    Việc gì sẽ mang lại 26 tỷ VND (1 triệu đô) trong 10 năm? Câu trả lời nằm ở giá trị bạn trao đi.
                  </p>
                </div>
              </motion.section>

              {/* Time Management */}
              <motion.section 
                whileHover={{ y: -5 }}
                className="bg-white border border-stone-200 rounded-3xl p-8 sm:p-10 space-y-8"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-brand/10 flex items-center justify-center">
                    <Clock className="text-brand w-6 h-6" />
                  </div>
                  <h2 className="text-3xl font-bold tracking-tight">Thuật quản lý thời gian</h2>
                </div>

                <div className="space-y-4">
                  {activePerson.timeManagement.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4 p-4 rounded-2xl bg-stone-50 border border-stone-100 hover:border-brand/30 hover:bg-brand/10 transition-all cursor-default">
                      <CheckCircle2 className="text-brand w-5 h-5 shrink-0" />
                      <span className="font-medium text-stone-700">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-stone-900 text-white">
                    <div className="text-xs text-stone-400 uppercase font-bold mb-1">Tập trung</div>
                    <div className="text-2xl font-bold">Deep Work</div>
                  </div>
                  <div className="p-4 rounded-2xl border border-stone-200">
                    <div className="text-xs text-stone-400 uppercase font-bold mb-1">Kỷ luật</div>
                    <div className="text-2xl font-bold text-brand">100%</div>
                  </div>
                </div>
              </motion.section>
            </div>

            {/* Footer Quote */}
            <footer className="text-center py-12 border-t border-stone-100">
              <p className="text-stone-400 font-serif italic text-lg">
                "Chúng ta thường đánh giá quá cao những gì có thể làm trong 1 năm, <br className="hidden sm:block" />
                nhưng lại đánh giá quá thấp những gì có thể làm trong 10 năm."
              </p>
            </footer>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
