import React from "react";

const messages = [
  {
    role: "AGENT",
    text: "Thank you. Let’s move on to the next part. Which of these was in the address I asked you to remember earlier: John Brown, James Green, or William White?",
  },
  {
    role: "PATIENT",
    text: "John Brown.",
  },
  {
    role: "AGENT",
    text: "Thank you. Now, I am going to say some numbers, and when I am through, you must repeat them to me in backward order. Let’s begin: four, two, eight.",
  },
  {
    role: "PATIENT",
    text: "Four to eight.",
  },
  {
    role: "AGENT",
    text: "Okay, let’s continue with the next part of the assessment.",
  },
  {
    role: "AGENT",
    text: "Thank you. Let’s move on to the next part. Which of these was in the address I asked you to remember earlier: John Brown, James Green, or William White?",
  },
  {
    role: "PATIENT",
    text: "John Brown.",
  },
  {
    role: "AGENT",
    text: "Thank you. Now, I am going to say some numbers, and when I am through, you must repeat them to me in backward order. Let’s begin: four, two, eight.",
  },
  {
    role: "PATIENT",
    text: "Four to eight.",
  },
  {
    role: "AGENT",
    text: "Okay, let’s continue with the next part of the assessment.",
  },
  {
    role: "AGENT",
    text: "Thank you. Let’s move on to the next part. Which of these was in the address I asked you to remember earlier: John Brown, James Green, or William White?",
  },
  {
    role: "PATIENT",
    text: "John Brown.",
  },
  {
    role: "AGENT",
    text: "Thank you. Now, I am going to say some numbers, and when I am through, you must repeat them to me in backward order. Let’s begin: four, two, eight.",
  },
  {
    role: "PATIENT",
    text: "Four to eight.",
  },
  {
    role: "AGENT",
    text: "Okay, let’s continue with the next part of the assessment.",
  },
];
const ConversationTranscript = () => {
  return (
    <div className="w-full bg-white">
      <div className="mt-8 bg-gray-100 border-l-4 border-r-4 border-[#374151] rounded-md p-4 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">
          Conversation Transcript
        </h2>
      </div>
      <div className="w-full mt-8  border rounded-lg shadow-md  mx-auto h-[400px] overflow-y-auto p-4 space-y-6">
        <div className="bg-white w-full mx-auto p-4 ">
          {messages.map((msg, index) => (
            <div key={index} className="space-y-2">
              {/* Role */}
              <p className="text-gray-600 mt-3 font-semibold uppercase text-sm">
                {msg?.role}
              </p>

              {/* Message Box */}
              {msg?.role === "AGENT" ? (
                <div className="bg-gray-100 text-gray-700 p-4 rounded-lg shadow-sm border border-gray-200">
                  {msg?.text}
                </div>
              ) : (
                <div className="bg-gray-700 text-white px-4 py-3 rounded-lg shadow-sm  w-full">
                  {msg?.text}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConversationTranscript;
