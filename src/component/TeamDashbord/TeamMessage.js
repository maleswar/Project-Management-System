import { useState, useEffect, useRef } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDs4XO1tXF_sLG78uJ5BTtHM2pGjiS1OqQ",
  authDomain: "react-chat-app-83412.firebaseapp.com",
  projectId: "react-chat-app-83412",
  storageBucket: "react-chat-app-83412.appspot.com",
  messagingSenderId: "490133271178",
  appId: "1:490133271178:web:40e90b7f2997c71c20b373"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();

const TeamMessage = () => {
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        firebase.auth().signInAnonymously();
      }
    });
  }, []);

  useEffect(() => {
    const unsubscribe = db
      .collection("messages")
      .orderBy("timestamp")
      .onSnapshot((snapshot) => {
        const messagesData = snapshot.docs.map((doc) => doc.data());
        setMessages(messagesData);
      });
    return () => unsubscribe();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleInputChange = (event) => {
    setText(event.target.value);
  };

  const sendMessage = () => {
    if (text.trim() !== "") {
      db.collection("messages").add({
        text: text,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        userId: user.uid,
        userName: user.displayName || "Anonymous",
      });
      setText("");
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <div className="flex-grow flex flex-col px-4 py-2 overflow-y-auto">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`${
              message.userId === user?.uid
                ? "self-end bg-customBlue text-white"
                : "self-start bg-gray-300"
            } p-2 m-2 rounded-lg max-w-md`}
          >
            <span className="text-xs font-semibold mb-1">
              {message.userName}
            </span>
            <p>{message.text}</p>
          </div>
        ))}
        <div ref={messagesEndRef}></div>
      </div>
      <div className="flex items-center px-4 py-2">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-grow border rounded-lg px-4 py-2 mr-2"
          value={text}
          onChange={handleInputChange}
        />
        <button
          className="bg-customBlue text-white rounded-lg px-4 py-2"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default TeamMessage;