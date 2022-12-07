import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function JoinProjectCard() {
  const params = useParams();
  const jsonArray = JSON.stringify(params);
  const token = JSON.parse(jsonArray).token;

  let jwt = localStorage.getItem("jwt")

  useEffect(() => {
    fetch(`api/v1/projects/getProjectByToken/${token}`, {
      credentials: "include",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    }).then((response) => response.json())
    .then((responseJson) => {
        console.log(responseJson)
    });
  }, []);

  return <div>{token}</div>;
}
