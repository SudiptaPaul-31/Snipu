import { CodeSnippet } from "./SnippetDataType";

export const codeSnippets: CodeSnippet[] = [
  {
    id: 1,
    title: "Hello World in JavaScript",
    language: "JavaScript",
    code: `console.log("Hello, World!");`,
  },
  {
    id: 2,
    title: "Basic React Component",
    language: "React",
    code: `
  function HelloWorld() {
    return <h1>Hello, World!</h1>;
  }
      `,
  },
  {
    id: 3,
    title: "Fetch Data with Axios",
    language: "JavaScript",
    code: `
  import axios from 'axios';

  axios.get('/api/data')
    .then(response => console.log(response.data))
    .catch(error => console.error(error));
      `,
  },
  {
    id: 4,
    title: "UseState Hook Example",
    language: "React",
    code: `
  import { useState } from 'react';

  function Counter() {
    const [count, setCount] = useState(0);
    return (
      <button onClick={() => setCount(count + 1)}>
        Clicked {count} times
      </button>
    );
  }
      `,
  },
];
