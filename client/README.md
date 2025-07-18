# kjw-TaskList is just a task list I use

## kjw-TaskList is a conversion from the original ToDo Task list I made for classlist

About: Just an easy-to-use task list where you can create tasks quickly, then come back to them at a more convenient time to add additional information

It is a front end REACT interface paired with a backend Node.js with an API connection to the Mongo Atlas DB.

Authentication is via JWT tokens

### Attributions

1- For sectioning a grid with a nested grid, a found guidance in [mdm web docs: Section 3.4 Nested vs. Sub gridded Items](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS\_grid\_layout)
 
2- For placing items in appropriate grid locations, I found assistance in [CSS Grid (Part 9) — Placing Grid Items](https://medium.com/uncurated/css-grid-series-9-f72b34281eb)
 
3- Troubleshooting assistance and error explanations were provided by various AI models including GitHub Copilot and OpenAI Codex.

### Technologies used

1- HTML
 
2- CSS
 
3- REACT
 
4- Vite
 
5- Node.js
 
6- Express
 
7- GitHub Copilot
 
8- OpenAI Codex

### Next Steps

### These enhancements are currently in Development as of 7/17/25

## Functional Blueprint: Task List Interaction System
## 📌 Task Slot Memory
Tasks are assigned visual slots based on an indexed array.

Drag-and-drop actions update task position and persist this order via localStorage.

On app load, tasks are rendered using the stored slot structure, retaining user-defined layout.

## 🖱️ Interaction Effects
Each task responds visually to user engagement:

Click → Ripple or pulse animation.

Edit → Brief “jitter” to signal recognition.

Drag/Drop → Ghost trail or static echo to preserve kinetic memory.

## 🔴 Critical Mode
Toggle triggers full red-toned overlay state for urgent visual clarity.

Tasks marked critical (late, flagged, high-priority with low progress) are:

Pulsing subtly with border animation.

Displaying trigger cause as blurred text above or beside their container (e.g., “Missed deadline”).

Overlay dims non-critical tasks, placing emphasis on attention targets.

## 🧪 DB Toggle System
App operates in either Local Mode or Synced Mode.

Developer toggle switches between localStorage and external DB (e.g. Firebase).

DB mode enables cross-device slot memory, syncing user-defined order securely across platforms.
