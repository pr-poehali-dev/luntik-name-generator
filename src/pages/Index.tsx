import { useState, useEffect } from "react";

const CHARACTERS = [
  {
    name: "Лунтик",
    emoji: "🌙",
    color: "#a78bfa",
    bgColor: "#ede9fe",
    description: "Главный герой мультфильма — маленький фиолетовый пушистый малыш, упавший с Луны прямо в лес. Он добрый, любознательный и наивный. Лунтик быстро заводит друзей и всегда старается помочь окружающим. Он воспринимает мир с чистым, незамутнённым взглядом и учится всему с нуля.",
    traits: ["Добрый", "Любознательный", "Наивный"],
  },
  {
    name: "Кузя",
    emoji: "🦗",
    color: "#f97316",
    bgColor: "#fff7ed",
    description: "Лучший друг Лунтика — кузнечик, худой и невероятно энергичный. Кузя не может сидеть на месте: он прыгает, скачет и всегда готов к новым приключениям. Его задор и непоседливость иногда приводят к забавным ситуациям, но верность Лунтику у него в сердце.",
    traits: ["Энергичный", "Верный друг", "Непоседа"],
  },
  {
    name: "Мила",
    emoji: "🐞",
    color: "#ec4899",
    bgColor: "#fdf2f8",
    description: "Красивая и добрая божья коровка, которая стала одной из первых подруг Лунтика. Мила отзывчива, заботлива и всегда готова поддержать в трудную минуту. Она очень любит цветы и природу. Порой бывает немного кокетлива, но это лишь придаёт ей шарм.",
    traits: ["Добрая", "Заботливая", "Изящная"],
  },
  {
    name: "Пчелёнок",
    emoji: "🐝",
    color: "#eab308",
    bgColor: "#fefce8",
    description: "Трудолюбивый пчелёнок из семьи пчёл. Он немного зазнайка, но в глубине души добрый и справедливый. Пчелёнок гордится своим мёдом и работой, иногда хвастается, но всегда приходит на помощь друзьям, когда это действительно нужно.",
    traits: ["Трудолюбивый", "Гордый", "Справедливый"],
  },
  {
    name: "Баба Капа",
    emoji: "🐝",
    color: "#84cc16",
    bgColor: "#f7fee7",
    description: "Приёмная бабушка Лунтика — строгая, но добросердечная оса. Баба Капа взяла Лунтика под своё крыло с первых дней его появления в лесу. Она требовательна и держит порядок в доме, но искренне любит своего необычного внука и всегда защитит его.",
    traits: ["Строгая", "Заботливая", "Добросердечная"],
  },
  {
    name: "Деда Шер",
    emoji: "🐛",
    color: "#0ea5e9",
    bgColor: "#f0f9ff",
    description: "Приёмный дедушка Лунтика — добродушный шершень с большим животом и ещё большим аппетитом. Деда Шер обожает поесть и редко отказывается от угощения. Несмотря на грозный вид, он мягкий и ласковый дедушка, который души не чает в Лунтике.",
    traits: ["Добродушный", "Любит поесть", "Ласковый"],
  },
  {
    name: "Шнюк",
    emoji: "🕷️",
    color: "#ef4444",
    bgColor: "#fff1f2",
    description: "Старый паук-поэт, который живёт в своей паутине и сочиняет стихи. Шнюк считает себя великим творцом и читает свои произведения при каждом удобном случае. Стихи его получаются странноватые, но он искренне гордится каждой строчкой.",
    traits: ["Поэт", "Гордый", "Творческий"],
  },
  {
    name: "Вупсень",
    emoji: "🐛",
    color: "#10b981",
    bgColor: "#f0fdf4",
    description: "Один из братьев-гусениц. Вупсень дерзкий и задиристый — он всегда говорит первым, смеётся громче всех и никогда не лезет за словом в карман. Именно он, как правило, придумывает очередную пакость, а потом хвастается этим перед братом.",
    traits: ["Дерзкий", "Задиристый", "Заводила"],
  },
  {
    name: "Пупсень",
    emoji: "🐛",
    color: "#06b6d4",
    bgColor: "#ecfeff",
    description: "Младший брат Вупсеня — толстый и добродушный. Пупсень обожает поесть и редко отказывается от угощения. Он охотно поддерживает проделки брата, хотя сам придумывает их редко. Его круглый животик и добродушная улыбка делают его весьма обаятельным, несмотря на шалости.",
    traits: ["Толстый", "Добродушный", "Любит поесть"],
  },
  {
    name: "Корней Корнеевич",
    emoji: "🪱",
    color: "#78716c",
    bgColor: "#fafaf9",
    description: "Старый червяк, живущий глубоко под землёй. У него целый подземный дом с множеством дверей и коридоров — каждый ход ведёт куда-то своего. Корней Корнеевич обожает копать новые тоннели и очень гордится своим хозяйством.",
    traits: ["Трудолюбивый", "Домовитый", "Любит копать"],
  },
  {
    name: "Тётя Мотя",
    emoji: "🐢",
    color: "#d97706",
    bgColor: "#fffbeb",
    description: "Старая черепаха, живущая на берегу пруда. Тётя Мотя невероятно медлительна — она делает всё не спеша, в своём собственном ритме. Её неторопливость порой раздражает окружающих, но сама она совершенно не переживает: она уверена, что черепахи знают толк в жизни.",
    traits: ["Медлительная", "Спокойная", "Невозмутимая"],
  },
];

const RANDOM_NAMES = CHARACTERS.map((c) => c.name);

const FloatingElement = ({
  style,
  children,
}: {
  style: React.CSSProperties;
  children: React.ReactNode;
}) => (
  <div
    className="absolute pointer-events-none select-none animate-float"
    style={style}
  >
    {children}
  </div>
);

export default function Index() {
  const [randomName, setRandomName] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedChar, setSelectedChar] = useState<(typeof CHARACTERS)[0] | null>(null);
  const [visibleCards, setVisibleCards] = useState<boolean[]>(
    new Array(CHARACTERS.length).fill(false)
  );

  useEffect(() => {
    CHARACTERS.forEach((_, i) => {
      setTimeout(() => {
        setVisibleCards((prev) => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
      }, 100 + i * 80);
    });
  }, []);

  const handleLuntik = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setRandomName(null);
    setTimeout(() => {
      const name = RANDOM_NAMES[Math.floor(Math.random() * RANDOM_NAMES.length)];
      setRandomName(name);
      setIsAnimating(false);
    }, 400);
  };

  return (
    <div
      className="min-h-screen relative overflow-x-hidden"
      style={{
        background: "linear-gradient(180deg, #bfefff 0%, #e8f8e0 50%, #c8f0a0 100%)",
        fontFamily: "'Nunito', sans-serif",
      }}
    >
      {/* Фоновое изображение */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url(https://cdn.poehali.dev/projects/5c811817-ab0c-4377-afd6-71f04b1671f2/files/34a94027-6042-4c17-a5c8-e2c54cbb18bb.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "bottom",
        }}
      />

      {/* Плавающие декоративные элементы */}
      <FloatingElement style={{ top: "5%", left: "3%", fontSize: "2.5rem", animationDelay: "0s" }}>🌸</FloatingElement>
      <FloatingElement style={{ top: "8%", right: "5%", fontSize: "2rem", animationDelay: "0.5s" }}>⭐</FloatingElement>
      <FloatingElement style={{ top: "15%", left: "8%", fontSize: "1.8rem", animationDelay: "1s" }}>🍄</FloatingElement>
      <FloatingElement style={{ top: "20%", right: "10%", fontSize: "2.2rem", animationDelay: "1.5s" }}>🦋</FloatingElement>
      <FloatingElement style={{ top: "3%", left: "45%", fontSize: "1.5rem", animationDelay: "0.7s" }}>🌼</FloatingElement>
      <FloatingElement style={{ top: "12%", right: "25%", fontSize: "1.6rem", animationDelay: "2s" }}>🌿</FloatingElement>
      <FloatingElement style={{ top: "6%", left: "20%", fontSize: "1.4rem", animationDelay: "1.2s" }}>✨</FloatingElement>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8">
        {/* Hero секция */}
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <span
              className="text-7xl md:text-8xl block animate-float"
              style={{ filter: "drop-shadow(0 4px 12px rgba(167,139,250,0.4))" }}
            >
              🌙
            </span>
          </div>
          <h1
            className="text-5xl md:text-7xl font-extrabold mb-2"
            style={{
              fontFamily: "'Baloo 2', cursive",
              background: "linear-gradient(135deg, #7c3aed 0%, #db2777 50%, #ea580c 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              textShadow: "none",
              filter: "drop-shadow(0 2px 8px rgba(124,58,237,0.3))",
            }}
          >
            Лунтик
          </h1>
          <p
            className="text-xl md:text-2xl font-semibold mb-8"
            style={{ color: "#5b4891" }}
          >
            и его замечательные друзья 🌿
          </p>

          {/* Кнопка Лунтичь */}
          <div className="flex flex-col items-center gap-4">
            <button
              onClick={handleLuntik}
              className="relative group transition-all duration-200 active:scale-95"
              style={{
                background: "linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)",
                color: "white",
                fontFamily: "'Baloo 2', cursive",
                fontSize: "1.6rem",
                fontWeight: "800",
                padding: "18px 52px",
                borderRadius: "60px",
                border: "4px solid #ffffff",
                boxShadow: "0 6px 0 #5b21b6, 0 8px 20px rgba(124,58,237,0.4)",
                cursor: "pointer",
                letterSpacing: "0.02em",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-3px)";
                (e.currentTarget as HTMLButtonElement).style.boxShadow =
                  "0 9px 0 #5b21b6, 0 12px 28px rgba(124,58,237,0.5)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLButtonElement).style.boxShadow =
                  "0 6px 0 #5b21b6, 0 8px 20px rgba(124,58,237,0.4)";
              }}
            >
              <span className="mr-2">🌙</span>
              Лунтить!
              <span className="ml-2">✨</span>
            </button>

            {/* Всплывающее имя */}
            {randomName && (
              <div
                key={randomName}
                className="animate-bounce-in"
                style={{
                  background: "white",
                  borderRadius: "24px",
                  padding: "16px 36px",
                  boxShadow: "0 8px 32px rgba(124,58,237,0.25)",
                  border: "3px solid #a78bfa",
                }}
              >
                <p className="text-lg font-semibold" style={{ color: "#6b7280" }}>
                  Ты — это...
                </p>
                <p
                  className="text-3xl font-extrabold"
                  style={{
                    fontFamily: "'Baloo 2', cursive",
                    background: "linear-gradient(135deg, #7c3aed, #db2777)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {randomName}! 🎉
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Персонажи */}
        <div className="mb-8 text-center">
          <h2
            className="text-3xl md:text-4xl font-extrabold"
            style={{
              fontFamily: "'Baloo 2', cursive",
              color: "#3b0764",
            }}
          >
            Все персонажи 🎭
          </h2>
          <p className="text-base mt-1 font-semibold" style={{ color: "#6b21a8" }}>
            Нажми на карточку, чтобы узнать подробнее
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CHARACTERS.map((char, i) => (
            <div
              key={char.name}
              onClick={() => setSelectedChar(char)}
              className="cursor-pointer transition-all duration-300 hover:scale-105 hover:-translate-y-1"
              style={{
                opacity: visibleCards[i] ? 1 : 0,
                transform: visibleCards[i] ? "translateY(0)" : "translateY(24px)",
                transition: "opacity 0.5s ease, transform 0.5s ease",
              }}
            >
              <div
                className="rounded-3xl p-6 h-full"
                style={{
                  background: char.bgColor,
                  border: `3px solid ${char.color}40`,
                  boxShadow: `0 4px 20px ${char.color}25`,
                }}
              >
                <div className="flex items-center gap-4 mb-3">
                  <div
                    className="flex items-center justify-center text-3xl rounded-2xl"
                    style={{
                      width: 60,
                      height: 60,
                      background: `${char.color}20`,
                      border: `2px solid ${char.color}40`,
                      flexShrink: 0,
                    }}
                  >
                    {char.emoji}
                  </div>
                  <div>
                    <h3
                      className="text-xl font-extrabold leading-tight"
                      style={{
                        fontFamily: "'Baloo 2', cursive",
                        color: char.color,
                      }}
                    >
                      {char.name}
                    </h3>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {char.traits.map((t) => (
                        <span
                          key={t}
                          className="text-xs font-bold px-2 py-0.5 rounded-full"
                          style={{
                            background: `${char.color}20`,
                            color: char.color,
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <p
                  className="text-sm leading-relaxed line-clamp-3"
                  style={{ color: "#4b5563" }}
                >
                  {char.description}
                </p>
                <p
                  className="text-xs font-bold mt-3"
                  style={{ color: char.color }}
                >
                  Подробнее →
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-16 pb-6">
          <p className="text-base font-semibold" style={{ color: "#7c3aed" }}>
            🌙 Лунтик и его друзья — Мир добра и приключений ✨
          </p>
        </div>
      </div>

      {/* Модальное окно персонажа */}
      {selectedChar && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(6px)" }}
          onClick={() => setSelectedChar(null)}
        >
          <div
            className="animate-bounce-in max-w-md w-full rounded-3xl p-8 relative"
            style={{
              background: selectedChar.bgColor,
              border: `4px solid ${selectedChar.color}`,
              boxShadow: `0 20px 60px ${selectedChar.color}50`,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedChar(null)}
              className="absolute top-4 right-4 text-2xl hover:scale-110 transition-transform"
            >
              ✕
            </button>
            <div className="text-center mb-4">
              <span className="text-6xl block mb-2">{selectedChar.emoji}</span>
              <h2
                className="text-4xl font-extrabold"
                style={{
                  fontFamily: "'Baloo 2', cursive",
                  color: selectedChar.color,
                }}
              >
                {selectedChar.name}
              </h2>
            </div>
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {selectedChar.traits.map((t) => (
                <span
                  key={t}
                  className="text-sm font-bold px-3 py-1 rounded-full"
                  style={{
                    background: `${selectedChar.color}25`,
                    color: selectedChar.color,
                    border: `1.5px solid ${selectedChar.color}50`,
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
            <p
              className="text-base leading-relaxed text-center"
              style={{ color: "#374151" }}
            >
              {selectedChar.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}