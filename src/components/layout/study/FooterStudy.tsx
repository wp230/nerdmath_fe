'use client';

import { useState } from 'react';

export default function FooterStudy() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: '안녕하세요! 학습에 도움이 필요하시면 언제든 물어보세요.',
      isBot: true,
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    // 사용자 메시지 추가
    const userMessage = { id: Date.now(), text: inputMessage, isBot: false };
    setMessages((prev) => [...prev, userMessage]);

    // 하드코딩된 봇 응답
    const botResponses = [
      '좋은 질문이네요! 더 자세히 설명해드릴게요.',
      '이 부분이 어려우시다면 단계별로 설명해드릴 수 있습니다.',
      '문제를 푸는 방법에 대해 힌트를 드릴까요?',
      '다른 예시로 설명해드리는 것이 도움이 될 것 같아요.',
      '이해가 안 되는 부분이 있으시면 언제든 다시 물어보세요!',
    ];

    const randomResponse =
      botResponses[Math.floor(Math.random() * botResponses.length)];

    setTimeout(() => {
      const botMessage = {
        id: Date.now() + 1,
        text: randomResponse,
        isBot: true,
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);

    setInputMessage('');
  };

  return (
    <>
      <footer className="flex h-16 items-center justify-between border-t bg-gray-50 px-4">
        <button className="text-sm">📖 목차</button>
        <button className="text-sm">다음 ▶</button>
      </footer>

      {/* 플로팅 챗봇 버튼 */}
      <button
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-blue-500 text-white shadow-lg hover:bg-blue-600 transition-colors z-40"
      >
        💬
      </button>

      {/* 챗봇 대화창 */}
      {isChatOpen && (
        <div className="fixed bottom-24 right-6 bg-white rounded-lg w-[480px] h-[600px] flex flex-col shadow-2xl border z-50">
          {/* 헤더 */}
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="font-semibold">학습 도우미</h3>
            <button
              onClick={() => setIsChatOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          {/* 메시지 영역 */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-xs px-3 py-2 rounded-lg ${
                    message.isBot
                      ? 'bg-gray-100 text-gray-800'
                      : 'bg-blue-500 text-white'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          {/* 입력 영역 */}
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="질문을 입력하세요..."
                className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSendMessage}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                전송
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
