import { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Header from './components/Header/Header';
import { login, logout, auth } from "./services/firebase.js";

export default function App() {
  const [state, setState] = useState({
    user: null,
    posts: {},
    newPost: {
      exercise: "",
    },
  });

  async function getAppData() {
    const BASE_URL = "http://localhost:3001/api/skills";
    const skills = await fetch(BASE_URL).then((res) => res.json());
    setState((prevState) => ({
      ...prevState,
      skills,
    }));
  }

  useEffect(() => {
    getAppData();
    auth.onAuthStateChanged((user) => {
      if (user) {
        setState((prevState) => ({
          ...prevState,
          user,
        }));
      } else {
        setState((prevState) => ({
          ...prevState,
          user: null,
        }));
      }
    });
  }, []);

  async function addPost(e) {
    if (!state.user) return;
    e.preventDefault();
    const BASE_URL = ""; // <--- maybe?
    const post = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-type": "Application/json",
      },
      body: JSON.stringify(state.newPost),
    }).then((res) => res.json());
    setState((prevState) => ({
      ...prevState,
      posts: [...prevState.posts, prevState.newPost],
      newPost: {
        exercise: "",
      },
    }));
  }

  function handleChange(e) {
    setState((prevState) => ({
      ...prevState,
      newPost: {
        ...prevState.newPost,
        [e.target.name]: e.target.value,
      },
    }));
  }

  return (
    <>
    <Header user={state.user} />
    <main>
      <section>
        {/* {state.posts.map((p) => (
          <article key={p.post}>
            <div>{p.exercise}</div>
          </article>
        ))} */}
        {state.user && (
          <>
            <hr />
            <form onSubmit={addPost}>
              <label>
                <span>EXERCISE</span>
                <input
                  name="exercise"
                  value={state.newPost.exercise}
                  onChange={handleChange}
                />
              </label>
              <button>POST</button>
            </form>
          </>
        )}
      </section>
    </main>
  </>
  );
}
