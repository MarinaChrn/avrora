import React, { useState, useEffect, useRef } from "react";
import { ChevronRight, Send, Mic } from "lucide-react";

// Define styles object
const styles = {
  pageContainer: {
    minHeight: "100vh",
    backgroundColor: "#fef9c3",
    padding: "1rem",
  },
  contentContainer: {
    maxWidth: "42rem",
    margin: "0 auto",
  },
  logoContainer: {
    backgroundColor: "white",
    borderRadius: "9999px",
    padding: "1rem",
    display: "inline-block",
  },
  logo: {
    height: "3rem",
  },
  assistantIntro: {
    display: "flex",
    alignItems: "flex-start",
    gap: "1rem",
    marginTop: "1.5rem",
  },
  avatarContainer: {
    backgroundColor: "#fde047",
    borderRadius: "9999px",
    padding: "0.5rem",
  },
  avatarLarge: {
    width: "6rem",
    height: "6rem",
    borderRadius: "9999px",
    overflow: "hidden",
  },
  avatarSmall: {
    width: "2rem",
    height: "2rem",
    borderRadius: "9999px",
    overflow: "hidden",
    marginRight: "0.5rem",
  },
  avatarImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  introText: {
    fontSize: "1.25rem",
    fontWeight: 500,
    marginTop: "1rem",
  },
  questionsContainer: {
    marginTop: "2rem",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
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
    minHeight: "100vh",
    backgroundColor: "#fef9c3",
    display: "flex",
    flexDirection: "column",
  },
  chatHeader: {
    backgroundColor: "white",
    padding: "1rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  endChatButton: {
    backgroundColor: "#dc2626",
    color: "white",
    padding: "0.5rem 1rem",
    borderRadius: "0.5rem",
    border: "none",
    cursor: "pointer",
  },
  messagesContainer: {
    flex: 1,
    padding: "1rem",
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

export const ChatStartPage = ({ onStartChat }) => {
  const predefinedQuestions = [
    "Мені потрібен подарунок на День Матері",
    "Можеш перевірити наявність товару",
    "Які акційні пропозиції є сьогодні?",
  ];

  return (
    <div style={styles.pageContainer}>
      <div style={styles.contentContainer}>
        <div style={styles.logoContainer}>
          <img
            src="../src/images/logo-avrora.png"
            alt="Аврора мультимаркет"
            style={styles.logo}
          />
        </div>

        <div style={styles.assistantIntro}>
          <div style={styles.avatarContainer}>
            <div style={styles.avatarLarge}>
              <img
                src="/api/placeholder/96/96"
                alt="Assistant"
                style={styles.avatarImg}
              />
            </div>
          </div>
          <div style={styles.introText}>
            Привіт, я Ваш асистент, давайте поспілкуємось!
          </div>
        </div>

        <div style={styles.questionsContainer}>
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
  );
};

export const ChatPage = ({ initialMessage = "", onExit }) => {
  const [messages, setMessages] = useState([
    { text: "Привіт! Чим я можу Вам допомогти?", sender: "assistant" },
    ...(initialMessage
      ? [
          { text: initialMessage, sender: "user" },
          { text: "Звісно! Який товар вас цікавить?", sender: "assistant" },
        ]
      : []),
  ]);
  const [input, setInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [inactivityTimer, setInactivityTimer] = useState(null);
  const recognition = useRef(null);

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

  useEffect(() => {
    const resetTimer = () => {
      if (inactivityTimer) clearTimeout(inactivityTimer);
      setInactivityTimer(setTimeout(() => onExit(), 180000));
    };

    const events = [
      "mousedown",
      "mousemove",
      "keypress",
      "scroll",
      "touchstart",
    ];
    events.forEach((event) => document.addEventListener(event, resetTimer));
    resetTimer();

    return () => {
      if (inactivityTimer) clearTimeout(inactivityTimer);
      events.forEach((event) =>
        document.removeEventListener(event, resetTimer)
      );
    };
  }, [onExit, inactivityTimer]);

  const toggleRecording = () => {
    if (!recognition.current) return;

    if (isRecording) {
      recognition.current.stop();
    } else {
      recognition.current.start();
    }
    setIsRecording(!isRecording);
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    setMessages([...messages, { text: input, sender: "user" }]);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          text: "Дякую за ваше повідомлення! Чим ще можу допомогти?",
          sender: "assistant",
        },
      ]);
    }, 1000);
    setInput("");
  };

  return (
    <div style={styles.chatContainer}>
      <div style={styles.chatHeader}>
        <div style={styles.logoContainer}>
          <img
            src="../src/images/logo-avrora.png"
            alt="Аврора мультимаркет"
            style={styles.logo}
          />
        </div>
        <button onClick={onExit} style={styles.endChatButton}>
          Завершити чат
        </button>
      </div>

      <div style={styles.messagesContainer}>
        <div style={styles.contentContainer}>
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
                <div style={styles.avatarSmall}>
                  <img
                    src="/api/placeholder/32/32"
                    alt="Assistant"
                    style={styles.avatarImg}
                  />
                </div>
              )}
              <div
                style={{
                  ...styles.messageBubble,
                  ...(message.sender === "user"
                    ? styles.messageBubbleUser
                    : styles.messageBubbleAssistant),
                }}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>
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
          />
          <button
            onClick={toggleRecording}
            style={{
              ...styles.voiceButton,
              ...(isRecording
                ? styles.voiceButtonRecording
                : styles.voiceButtonIdle),
            }}
          >
            <Mic />
          </button>
          <button onClick={sendMessage} style={styles.sendButton}>
            <Send />
          </button>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [page, setPage] = useState("start");
  const [initialMessage, setInitialMessage] = useState("");

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
        <ChatPage initialMessage={initialMessage} onExit={handleExit} />
      )}
    </div>
  );
};

export default App;
