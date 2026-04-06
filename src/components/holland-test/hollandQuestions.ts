
export type HollandActivity = {
  id: string;
  text: string;
};

export type HollandCategory = {
  code: 'R' | 'I' | 'A' | 'S' | 'E' | 'C';
  name: string;
  description: string;
  activities: HollandActivity[];
};

export const hollandCategories: HollandCategory[] = [
  {
    code: 'R',
    name: 'Realistic (Doers)',
    description: 'People who like to work with objects, tools, machines, or animals. They often prefer physical activity and practical, hands-on tasks.',
    activities: [
      { id: 'r1', text: 'Fix electrical things or mechanical equipment.' },
      { id: 'r2', text: 'Work with tools (e.g., power tools, hand tools).' },
      { id: 'r3', text: 'Build things from wood, metal, or other materials.' },
      { id: 'r4', text: 'Operate machinery or heavy equipment.' },
      { id: 'r5', text: 'Work outdoors (e.g., farming, construction, forestry).' },
    ],
  },
  {
    code: 'I',
    name: 'Investigative (Thinkers)',
    description: 'People who like to observe, learn, analyze, evaluate, or solve problems, especially of a scientific or mathematical nature.',
    activities: [
      { id: 'i1', text: 'Do scientific research or experiments.' },
      { id: 'i2', text: 'Solve complex math problems or puzzles.' },
      { id: 'i3', text: 'Analyze data or information to find patterns.' },
      { id: 'i4', text: 'Read scientific or technical articles.' },
      { id: 'i5', text: 'Work in a laboratory setting.' },
    ],
  },
  {
    code: 'A',
    name: 'Artistic (Creators)',
    description: 'People who have artistic, innovating, or intuitional abilities and like to work in unstructured situations using their imagination and creativity.',
    activities: [
      { id: 'a1', text: 'Play a musical instrument or sing.' },
      { id: 'a2', text: 'Write stories, poems, or articles.' },
      { id: 'a3', text: 'Design graphics, websites, or fashion.' },
      { id: 'a4', text: 'Act in a play or movie.' },
      { id: 'a5', text: 'Paint, draw, or sculpt.' },
    ],
  },
  {
    code: 'S',
    name: 'Social (Helpers)',
    description: 'People who like to work with people to enlighten, inform, help, train, or cure them, or are skilled with words.',
    activities: [
      { id: 's1', text: 'Help people with their problems or concerns.' },
      { id: 's2', text: 'Teach or train others.' },
      { id: 's3', text: 'Lead group discussions or activities.' },
      { id: 's4', text: 'Volunteer for a cause you believe in.' },
      { id: 's5', text: 'Work as a counselor or therapist.' },
    ],
  },
  {
    code: 'E',
    name: 'Enterprising (Persuaders)',
    description: 'People who like to work with people, influencing, persuading, performing, leading or managing for organizational goals or economic gain.',
    activities: [
      { id: 'e1', text: 'Start your own business or venture.' },
      { id: 'e2', text: 'Persuade or influence people.' },
      { id: 'e3', text: 'Manage projects or teams.' },
      { id: 'e4', text: 'Give speeches or presentations.' },
      { id: 'e5', text: 'Sell products or services.' },
    ],
  },
  {
    code: 'C',
    name: 'Conventional (Organizers)',
    description: 'People who like to work with data, have clerical or numerical ability, carry out tasks in detail or follow through on others’ instructions.',
    activities: [
      { id: 'c1', text: 'Organize files, records, or data.' },
      { id: 'c2', text: 'Work with numbers, spreadsheets, or budgets.' },
      { id: 'c3', text: 'Follow clear instructions and procedures.' },
      { id: 'c4', text: 'Manage an office or administrative tasks.' },
      { id: 'c5', text: 'Check documents for errors and accuracy.' },
    ],
  },
];
