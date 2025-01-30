import React, { useState, useEffect, useRef } from "react";
import { ChevronRight, Send, Mic } from "lucide-react";
import "./App.css";
import logo from "./images/logo-avrora.png";
import girl from "./images/girl-avrora.png";

// Стилі
const styles = {
  pageContainer: {
    backgroundColor: "#ffffff",
    padding: "0",
    minHeight: "100vh",
    width: "100%",
  },
  contentContainer: {
    maxWidth: "100vw",
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    paddingTop: "0",
    paddingBottom: "0",
  },
  logoContainer: {
    backgroundColor: "white",
    borderRadius: "24px",
    padding: "1rem 5rem 2rem 5rem",
  },
  logoPageContainer: {
    width: "50%",
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    paddingTop: "65px",
  },
  logo: {
    width: "350px",
    height: "122px",
  },
  assistantIntro: {
    marginTop: "70px",
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
  },
  chatBoxContainer: {
    backgroundColor: "#FCED96",
    height: "100vh",
    width: "50%",
  },
  assistantContainer: {
    marginTop: "-40px",
  },
  assistentSpan: {
    backgroundColor: "#E20712",
    width: "47px",
    height: "112px",
    marginRight: "20px",
    borderRadius: "10px 0 0 10px",
  },
  assistantLabel: {
    fontWeight: "700",
    color: "#E5030F",
    fontSize: "32px",
  },
  assistantMessage: {
    backgroundColor: "white",
    borderRadius: "9px",
    minWidth: "362px",
    maxWidth: "820px",
    minHeight: "112px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    marginTop: "-15px",
  },
  assistantMess: {
    fontWeight: "500",
    fontSize: "24px",
    padding: "10px 25px",
  },
  avatarContainer: {
    padding: "0.1rem",
    width: "100%",
  },
  avatarLarge: {
    paddingRight: "50px",
    display: "block",
    margin: "0 auto",
    width: "60%",
  },
  avatarSmall: {
    overflow: "hidden",
    marginRight: "2rem",
    width: "12.5rem",
    height: "auto",
  },
  avatarImg: {
    width: "100%",
    height: "auto",
  },
  introText: {
    fontWeight: 700,
    fontSize: "36px",
    letterSpacing: "0.08em",
    textAlign: "center",
    width: "100%",
    color: "#000",
    marginTop: "46px",
    marginBottom: "47px",
    display: "flex",
    justifyContent: "center",
  },
  introTextParagraph: {
    width: "50%",
  },
  questionsContainer: {
    marginTop: "2rem",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    padding: "30px",
  },
  questionButton: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: "0.5rem",
    padding: "1rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.2s",
  },
  startChatButton: {
    width: "100%",
    backgroundColor: "#dc2626",
    color: "white",
    borderRadius: "0.5rem",
    padding: "1rem",
    marginTop: "1.5rem",
    border: "none",
    cursor: "pointer",
  },
  chatContainer: {
    height: "100vh",
    width: "100%",
    background: "linear-gradient(to bottom, #FFFFFF, #FCED96)",
    position: "fixed",
    display: "flex",
    flexDirection: "column",
  },
  chatHeader: {
    backgroundColor: "#FFDD00",
    padding: "1rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  endChatButton: {
    backgroundColor: "#dc2626",
    color: "white",
    width: "260px",
    height: "100px",
    borderRadius: "0.5rem",
    fontSize: "2rem",
    border: "none",
    cursor: "pointer",
  },
  messageBlock: {
    display: "flex",
    flexDirection: "row",
  },
  messagesContainer: {
    flex: 1,
    padding: "5rem 20rem",
    overflowY: "auto",
  },
  messageWrapper: {
    display: "flex",
    marginBottom: "1rem",
  },
  messageUser: {
    justifyContent: "flex-end",
  },
  messageAssistant: {
    justifyContent: "flex-start",
  },
  messageBubble: {
    maxWidth: "80%",
    padding: "0.75rem",
    borderRadius: "0.5rem",
  },
  messageBubbleUser: {
    backgroundColor: "#fde047",
    marginLeft: "1rem",
  },
  messageBubbleAssistant: {
    backgroundColor: "white",
  },
  inputContainer: {
    backgroundColor: "white",
    padding: "1rem",
  },
  inputWrapper: {
    maxWidth: "42rem",
    margin: "0 auto",
    display: "flex",
    gap: "0.5rem",
  },
  chatInput: {
    flex: 1,
    border: "1px solid #e5e7eb",
    borderRadius: "0.5rem",
    padding: "0.5rem 1rem",
  },
  voiceButton: {
    padding: "0.5rem",
    borderRadius: "0.5rem",
    border: "none",
    cursor: "pointer",
  },
  voiceButtonRecording: {
    backgroundColor: "#ef4444",
    color: "white",
  },
  voiceButtonIdle: {
    backgroundColor: "#e5e7eb",
  },
  sendButton: {
    backgroundColor: "#fbbf24",
    padding: "0.5rem",
    borderRadius: "0.5rem",
    border: "none",
    cursor: "pointer",
  },
};

// Генерація унікального user_id
const generateUserId = () => {
  return Math.random().toString().slice(2, 11);
};

// Компонент стартової сторінки
export const ChatStartPage = ({ onStartChat }) => {
  const predefinedQuestions = [
    "Мені потрібен подарунок на День Матері",
    "Можеш перевірити наявність товару",
    "Які акційні пропозиції є сьогодні?",
  ];

  return (
    <div style={styles.pageContainer}>
      <div style={styles.contentContainer}>
        <div style={styles.logoPageContainer}>
          <div style={styles.logoContainer}>
            <img src={logo} alt="Аврора мультимаркет" style={styles.logo} />
          </div>

          <div style={styles.assistantIntro}>
            <div style={styles.avatarContainer}>
              <div style={styles.avatarLarge}>
                <img src={girl} alt="Assistant" style={styles.avatarImg} />
              </div>
            </div>
            <div style={styles.introText}>
              <p style={styles.introTextParagraph}>
                Привіт, я Ваш асистент, давайте поспілкуємось!
              </p>
            </div>
          </div>
        </div>
        <div style={styles.chatBoxContainer}>
          <div style={styles.questionsContainer}>
            <div style={styles.assistantContainer}>
              <p style={styles.assistantLabel}>Аврора</p>
              <div style={styles.assistantMessage}>
                <span style={styles.assistentSpan}></span>
                <span style={styles.assistantMess}>
                  Чим я можу Вам допомогти?
                </span>
              </div>
            </div>
            <div style={styles.introText}>
              Розпочніть чат з потрібним вам запитом
            </div>
            {predefinedQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => onStartChat(question)}
                style={styles.questionButton}
              >
                <span>{question}</span>
                <ChevronRight />
              </button>
            ))}
          </div>

          <button onClick={() => onStartChat()} style={styles.startChatButton}>
            Перейти до чату
          </button>
        </div>
      </div>
    </div>
  );
};

export const ChatPage = ({ initialMessage = "", onExit, userId }) => {
  const [messages, setMessages] = useState(() => {
    // Початковий стан без привітання, якщо є initialMessage
    return initialMessage
      ? [
          { text: "Привіт! Чим я можу Вам допомогти?", sender: "assistant" },
          { text: initialMessage, sender: "user" },
        ]
      : [{ text: "Привіт! Чим я можу Вам допомогти?", sender: "assistant" }];
  });

  const [input, setInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const recognition = useRef(null);
  const messagesEndRef = useRef(null);
  const abortControllerRef = useRef(new AbortController());

  // Відправка початкового повідомлення (якщо є)
  useEffect(() => {
    const controller = new AbortController();
    abortControllerRef.current = controller;

    const sendInitialMessage = async () => {
      if (!initialMessage) return;

      try {
        const response = await fetch("http://20.215.194.147:8000/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id: userId,
            input: initialMessage,
          }),
          signal: controller.signal,
        });

        const data = await response.json();
        setMessages((prev) => [
          ...prev,
          { text: data.response, sender: "assistant" },
        ]);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error:", error);
          setMessages((prev) => [
            ...prev,
            { text: "Не вдалося обробити запит", sender: "assistant" },
          ]);
        }
      }
    };

    sendInitialMessage();

    return () => controller.abort();
  }, [initialMessage, userId]);
  // Функція для переключення голосового вводу
  const toggleRecording = () => {
    if (!recognition.current) return;

    if (isRecording) {
      recognition.current.stop();
    } else {
      recognition.current.start();
    }
    setIsRecording(!isRecording);
  };

  // Автоскролл
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  // Ініціалізація голосового вводу
  useEffect(() => {
    if ("webkitSpeechRecognition" in window) {
      recognition.current = new window.webkitSpeechRecognition();
      recognition.current.continuous = false;
      recognition.current.interimResults = false;
      recognition.current.lang = "uk-UA";

      recognition.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsRecording(false);
      };

      recognition.current.onerror = () => {
        setIsRecording(false);
      };
    }
  }, []);

  // Відправка повідомлення
  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    setIsLoading(true);
    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const response = await fetch("http://20.215.194.147:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          input: input,
        }),
      });

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        { text: data.response, sender: "assistant" },
      ]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        { text: "Помилка з'єднання з сервером", sender: "assistant" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Оновлена функція очищення історії
  const handleExit = async () => {
    try {
      await fetch("http://20.215.194.147:8000/clear_history", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId }),
      });
    } catch (error) {
      console.error("Помилка очищення історії:", error);
    }
    onExit();
  };

  return (
    <div style={styles.chatContainer}>
      <div style={styles.chatHeader}>
        <div style={styles.logoContainer}>
          <img src={logo} alt="Аврора мультимаркет" style={styles.logo} />
        </div>
        <button onClick={handleExit} style={styles.endChatButton}>
          Завершити чат
        </button>
      </div>

      <div style={styles.messagesContainer}>
        {messages.map((message, index) => (
          <div
            key={index}
            style={{
              ...styles.messageWrapper,
              ...(message.sender === "user"
                ? styles.messageUser
                : styles.messageAssistant),
            }}
          >
            {message.sender === "assistant" && (
              <div style={styles.messageBlock}>
                <div style={styles.avatarSmall}>
                  <img src={girl} alt="Assistant" style={styles.avatarImg} />
                </div>
                <div style={styles.assistantContainer}>
                  <p style={styles.assistantLabel}>Аврора</p>
                  <div style={styles.assistantMessage}>
                    <span style={styles.assistantMess}>{message.text}</span>
                  </div>
                </div>
              </div>
            )}

            {message.sender === "user" && (
              <div>
                <p>Ви</p>
                <div
                  style={{
                    ...styles.messageBubble,
                    ...styles.messageBubbleUser,
                  }}
                >
                  <span style={styles.assistantMess}>{message.text}</span>
                </div>
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div style={styles.inputContainer}>
        <div style={styles.inputWrapper}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            style={styles.chatInput}
            placeholder="Введіть повідомлення..."
            disabled={isLoading}
          />
          <button
            onClick={toggleRecording}
            style={{
              ...styles.voiceButton,
              ...(isRecording
                ? styles.voiceButtonRecording
                : styles.voiceButtonIdle),
            }}
            disabled={isLoading}
          >
            <Mic size={20} />
          </button>
          <button
            onClick={sendMessage}
            style={styles.sendButton}
            disabled={isLoading}
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

// Основний компонент додатка
const App = () => {
  const [page, setPage] = useState("start");
  const [initialMessage, setInitialMessage] = useState("");
  const [userId] = useState(() => {
    // Відновлюємо user_id з localStorage або генеруємо новий
    const savedUserId = localStorage.getItem("avrora_user_id");
    if (savedUserId) return savedUserId;

    const newUserId = generateUserId();
    localStorage.setItem("avrora_user_id", newUserId);
    return newUserId;
  });

  const handleStartChat = (message) => {
    setInitialMessage(message || "");
    setPage("chat");
  };

  const handleExit = () => {
    setPage("start");
    setInitialMessage("");
  };

  return (
    <div>
      {page === "start" ? (
        <ChatStartPage onStartChat={handleStartChat} />
      ) : (
        <ChatPage
          initialMessage={initialMessage}
          onExit={handleExit}
          userId={userId}
        />
      )}
    </div>
  );
};

export default App;
