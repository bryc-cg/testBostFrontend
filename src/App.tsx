import React, { useState } from 'react';
// import logo from './logo.svg';
import './App.css';
import logo from './Casper.png';

function AppFirst() {
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState<any[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const chat = async (e: any, message: any) => {
    e.preventDefault();

    if (!message) return;
    setIsTyping(true);
    // eslint-disable-next-line no-restricted-globals
    // scrollTo(0, 1000)
    document?.querySelector('body')!.scrollTo(0, 10000)
    let msgs: any[] = chats;
    msgs.push({ role: "YQNZ", content: message });
    setChats(msgs);

    setMessage("");

    await fetch("http://10.220.174.183:5600/llm", {
      method: "POST",
      mode: 'cors',
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': 'http://10.220.174.183:5600',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
        'Access-Control-Allow-credentials': 'true',
        'Access-Control-Allow-Headers': 'OriOrigin, X-Requested-With, Content-Type, Accept, Authorization',
        // 'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
      },
      // body: JSON.stringify({

      //   "question": "your question"

      // })
    })
      .then((res: any) => {
        console.log(res);
        msgs.push({
          role: <img
            alt="logo"
            className="answer"
            src={logo}
          />, content: " success"
        });
        setChats(msgs);
        setIsTyping(false);
        setTimeout(function () {
          window.scrollTo({ top: 2e20, behavior: "smooth" })
        }, 2);
        // eslint-disable-next-line no-restricted-globals
        // window.scrollTo({ top: 2e10, behavior: "smooth" })
      })
      .catch((error: any) => {
        console.log(error);
        msgs.push({
          role: <img
            alt="logo"
            className="answer"
            src={logo}
          />, content: "this is test content"
        });
        setChats(msgs);
        setIsTyping(false);
        console.log("happen")
        // eslint-disable-next-line no-restricted-globals
        setTimeout(function () {
          window.scrollTo({ top: 2e20, behavior: "smooth" })
        }, 2);
      });
  };

  return (
    <main>
      <div className='topContainer'>
        <img
          alt="logo"
          className="logo"
          src={logo}
          onClick={() => setChats([])}
        />
        <h1>CANDOR</h1>

      </div>

      <section>
        {chats && chats.length
          ? chats.map((chat, index) => (
            <div key={index} className={chat.role === "YQNZ" ? "talk-bubble user_msg tri-right right-in border" : "talk-bubble anser_msg tri-left left-in border"} >
              <div>
                <p >
                  <span>
                    {chat.role}
                  </span>
                  <span>:</span>
                  <span>{chat.content}</span>
                </p>
              </div>
            </div>

          ))
          : ""}
      </section>

      <div className={isTyping ? "" : "hide"}>
        <p>
          {isTyping ? <div className='loadingContainer'>
            <div className="loading__letter">T</div>
            <div className="loading__letter">y</div>
            <div className="loading__letter">p</div>
            <div className="loading__letter">i</div>
            <div className="loading__letter">n</div>
            <div className="loading__letter">g</div>
            <div className="loading__letter">.</div>
            <div className="loading__letter">.</div>
            <div className="loading__letter">.</div>
          </div> : <></>}
        </p>
      </div>

      <form action="" onSubmit={(e) => chat(e, message)}>
        <input
          type="text"
          name="message"
          value={message}
          placeholder="Type a message here and hit Enter..."
          onChange={(e) => setMessage(e.target.value)}
          disabled={isTyping}
        />
      </form>
    </main>
  );
}

export default AppFirst;
