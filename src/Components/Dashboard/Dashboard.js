import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import StatusCircle from "../StatusCircle/StatusCircle";

export default function Dashboard() {
  const [userName, setUserName] = useState(null);
  const [approval, setApproval] = useState("");
  const [dataLoaded, setDataLoaded] = useState(false);
  const [data, setData] = useState(null);

  const tasks = [
    {
      id: 1,
      task: "added email service back",
    },
    {
      id: 2,
      task: "Do this",
    },
    {
      id: 3,
      task: "Do that",
    },
  ];

  

  useEffect(() => {
    console.log("Calling useEffect...");
    fetch("/api/v1/account/github", {
      credentials: "include",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setUserName(responseJson[0].author.login);
        setData(responseJson)
        if(data!=null){
            setDataLoaded(true)
        }
      });
  }, []);

  function mapData(values, phrase) {
    values.forEach((value) => {
      if (value.commit.message.includes(phrase)) {
        return true;
      }
    });
    return false;
  }


 

  return (
    <div id="taskwrapper">
      {tasks.map((task) => (
        <div id="container" className="">
          <div>{task.task}</div>
          <StatusCircle
            taskId={task.id}
            isVerified={mapData(data,task.task)}
          />
        </div>
      ))}
    </div>
  );
}
