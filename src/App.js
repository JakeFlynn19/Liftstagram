import { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import "./App.css";

import { auth } from "./services/firebase";

export default function App() {
  const [state, setState] = useState({
    user: null,
    posts: [],
    newPost: {
      exercise: "",
      sets: "",
      reps: "",
    },
    editMode: false,
  });

  async function getAppData() {
    if (!state.user) return;
    try {
      const BASE_URL = `http://localhost:3001/api/posts?uid=${state.user.uid}`;
      const posts = await fetch(BASE_URL).then((res) => res.json());
      setState((prevState) => ({
        ...prevState,
        posts,
      }));
    } catch (error) {
      console.log(error);
    }
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
          posts: [],
          user,
        }));
      }
    });
  }, [state.user]);

  async function handleSubmit(e) {
    if (!state.user) return;

    e.preventDefault();

    const BASE_URL = "http://localhost:3001/api/posts";

    if (!state.editMode) {
      const posts = await fetch(BASE_URL, {
        method: "POST",
        headers: {
          "Content-type": "Application/json",
        },
        body: JSON.stringify({ ...state.newPost, uid: state.user.uid }),
      }).then((res) => res.json());

      setState((prevState) => ({
        ...prevState,
        posts,
        newPost: {
          exercise: "",
          sets: "",
          reps: "",
        },
      }));
    } else {
      const { exercise, sets, reps, _id } = state.newPost;

      const posts = await fetch(`${BASE_URL}/${_id}`, {
        method: "PUT",
        headers: {
          "Content-type": "Application/json",
        },
        body: JSON.stringify({ exercise, sets, reps }),
      }).then((res) => res.json());

      setState((prevState) => ({
        ...prevState,
        posts,
        newPost: {
          exercise: "",
          sets: "",
          reps: "",
        },
        editMode: false,
      }));
    }
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

  async function handleDelete(postId) {
    if (!state.user) return;
    const URL = `http://localhost:3001/api/posts/${postId}`;

    const posts = await fetch(URL, {
      method: "DELETE",
    }).then((res) => res.json());

    setState((prevState) => ({
      ...prevState,
      posts,
    }));
  }

  function handleEdit(postId) {
    const { exercise, sets, reps, _id } = state.posts.find(
      (post) => post._id === postId
    );
    setState((prevState) => ({
      ...prevState,
      newPost: {
        exercise,
        sets,
        reps,
        _id,
      },
      editMode: true,
    }));
  }

  function handleCancel() {
    setState((prevState) => ({
      ...prevState,
      newPost: {
        exercise: "",
        sets: "",
        reps: "",
      },
      editMode: false,
    }));
  }

  return (
    <>
      <Header user={state.user} />
      <main>
        <section>
          {state.user && (
            <>
              <form onSubmit={handleSubmit}>
                <label>
                  <span>EXERCISE</span>
                  <input
                    name="exercise"
                    value={state.newPost.exercise}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  <span>SETS</span>
                  <input
                    name="sets"
                    value={state.newPost.sets}
                    onChange={handleChange}
                  ></input>
                </label>
                <label>
                  <span>REPS</span>
                  <input
                    name="reps"
                    value={state.newPost.reps}
                    onChange={handleChange}
                  ></input>
                </label>
                <button>
                  {state.editMode ? "EDIT WORKOUT" : "ADD WORKOUT"}
                </button>
              </form>
              {state.editMode && <button onClick={handleCancel}>CANCEL</button>}
            </>
          )}
          <hr />
          {state.posts.map((s) => (
            <article key={s.post}>
              <div>{s.exercise}</div>
              <div>{s.sets}</div>
              <div>{s.reps}</div>
              <div onClick={() => handleDelete(s._id)}>{"🚫"}</div>
              {!state.editMode && (
                <div onClick={() => handleEdit(s._id)}>{"✏️"}</div>
              )}
            </article>
          ))}
        </section>
      </main>
    </>
  );
}
