
export type MBTIDimension = 'I' | 'E' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P';

export type MBTIQuestion = {
  id: string;
  text: string;
  options: [
    { text: string; dimension: MBTIDimension },
    { text: string; dimension: MBTIDimension }
  ];
};

export const mbtiQuestions: MBTIQuestion[] = [
  // Introversion (I) vs. Extraversion (E)
  {
    id: 'q1',
    text: 'After a long week, you prefer a:',
    options: [
      { text: 'Quiet evening with a book or movie', dimension: 'I' },
      { text: 'Large social gathering with lots of people', dimension: 'E' },
    ],
  },
  {
    id: 'q2',
    text: 'When in a group, you are more likely to:',
    options: [
      { text: 'Listen and observe', dimension: 'I' },
      { text: 'Initiate conversations and be talkative', dimension: 'E' },
    ],
  },
   {
    id: 'q9',
    text: 'You feel more energized by:',
    options: [
      { text: 'Spending time alone or with a small group', dimension: 'I' },
      { text: 'Interacting with a variety of people', dimension: 'E' }
    ]
  },
  // Sensing (S) vs. Intuition (N)
  {
    id: 'q3',
    text: 'When making decisions, you trust:',
    options: [
      { text: 'Facts, details, and past experience', dimension: 'S' },
      { text: 'Possibilities, patterns, and future implications', dimension: 'N' },
    ],
  },
    {
    id: 'q4',
    text: 'You are more interested in:',
    options: [
      { text: 'The actual and practical', dimension: 'S' },
      { text: 'The theoretical and abstract', dimension: 'N' },
    ],
  },
  {
    id: 'q10',
    text: 'When learning something new, you prefer to:',
    options: [
      { text: 'Follow clear, step-by-step instructions', dimension: 'S' },
      { text: 'Understand the underlying concepts and theories first', dimension: 'N' }
    ]
  },
  // Thinking (T) vs. Feeling (F)
  {
    id: 'q5',
    text: 'When giving feedback, you prioritize:',
    options: [
      { text: 'Logic, truth, and directness', dimension: 'T' },
      { text: 'Harmony, empathy, and people\'s feelings', dimension: 'F' },
    ],
  },
  {
    id: 'q6',
    text: 'You are more drawn to:',
    options: [
      { text: 'Objective principles and impartial justice', dimension: 'T' },
      { text: 'Personal circumstances and compassion', dimension: 'F' },
    ],
  },
   {
    id: 'q11',
    text: 'You find it more important to be:',
    options: [
        { text: 'Objective and fair', dimension: 'T' },
        { text: 'Supportive and compassionate', dimension: 'F' }
    ]
  },
  // Judging (J) vs. Perceiving (P)
  {
    id: 'q7',
    text: 'In your daily life, you prefer to:',
    options: [
      { text: 'Have a plan and stick to it', dimension: 'J' },
      { text: 'Be spontaneous and flexible', dimension: 'P' },
    ],
  },
    {
    id: 'q8',
    text: 'You feel more comfortable when things are:',
    options: [
      { text: 'Decided and settled', dimension: 'J' },
      { text: 'Open to change and new options', dimension: 'P' },
    ],
  },
  {
    id: 'q12',
    text: 'When working on a project, you prefer to:',
    options: [
      { text: 'Finish one task before starting another', dimension: 'J' },
      { text: 'Keep your options open and work on multiple things at once', dimension: 'P' }
    ]
  },
];
