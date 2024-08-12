import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, onSnapshot } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDtY2caFxHp68q36FdMr-CJGms1oP2oU14",
  authDomain: "dino-final.firebaseapp.com",
  projectId: "dino-final",
  storageBucket: "dino-final.appspot.com",
  messagingSenderId: "1084088251347",
  appId: "1:1084088251347:web:65d7ac81433b54aacab526"
};

initializeApp(firebaseConfig);

const db = getFirestore();
const colRef = collection(db, 'data');

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(colRef, (snapshot) => {
      const booksData = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      booksData.sort((a, b) => b.score - a.score); // Sort books by score in descending order
      setBooks(booksData);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="mainContainer">
      <div className="container" style={{ border: "2px solid grey", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)", borderRadius: "10px", maxWidth: "40%" }}>
        <table className="table">
          <thead>
            <tr className="table table-light">
              <th scope="col">Name</th>
              <th scope="col">Reg - No</th>
              <th scope="col">Score</th>
            </tr>
          </thead>
          <tbody>
            {books.map((data) => (
              <tr key={data.id}>
                <th scope="row">{data.name}</th>
                <td>{data.regno}</td>
                <td>{data.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
