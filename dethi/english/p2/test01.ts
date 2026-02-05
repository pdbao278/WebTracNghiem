const test01 = {
  id: "test01",
  title: "Listening Test 1",
  questions: [
    {
      id: 16,
      question:
        "What does the announcer say about the new novel?",
      options: [
        { id: "A", text: "It is different from his earlier works", isCorrect: true },
        { id: "B", text: "It is romantic and soft", isCorrect: false },
        { id: "C", text: "It is less famous than his earlier works", isCorrect: false }
      ]
    },
    {
      id: 17,
      question:
        "What does the announcer say the writer should do in the future?",
      options: [
        { id: "A", text: "The writer should continue to write this genre", isCorrect: false },
        { id: "B", text: "The writer should go back to his original genre", isCorrect: false },
        { id: "C", text: "He should listen to critics before writing his next work", isCorrect: true }
      ]
    },
    {
      id: 18,
      question:
        "What does the expert say when talking about professionalism?",
      options: [
        { id: "A", text: "To maintain positive attitude", isCorrect: true },
        { id: "B", text: "To create good working environment", isCorrect: false },
        { id: "C", text: "To make good impressions", isCorrect: false }
      ]
    },
    {
      id: 19,
      question:
        "What does the expert say about the definition of professionalism?",
      options: [
        { id: "A", text: "It is the same of 40 years ago", isCorrect: false },
        { id: "B", text: "Our definition of it is changing", isCorrect: true },
        { id: "C", text: "It will not change anymore", isCorrect: false }
      ]
    }
  
  ]
};

export default test01;
